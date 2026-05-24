const mongoose = require("mongoose");
const Item = require("../models/Item");
const Claim = require("../models/Claim");

// ─── Search helper ────────────────────────────────────────────────────────────

/**
 * GET /api/items/search
 * Query params: keyword, category, type, status, color, location,
 *               dateRange (today|7days|30days), dateFrom, dateTo,
 *               sort (newest|oldest|updated|claimed), page, limit
 */
const searchItems = async (req, res) => {
  try {
    const {
      keyword = "",
      category = "",
      type = "",
      status = "",
      color = "",
      location = "",
      dateRange = "",
      dateFrom = "",
      dateTo = "",
      sort = "newest",
      page = "1",
      limit = "12",
    } = req.query;

    const filter = { isRemoved: { $ne: true } };

    // ── Keyword: search title, description, category, location ──────────────
    if (keyword.trim()) {
      const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { title:       { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
        { category:    { $regex: escaped, $options: "i" } },
        { location:    { $regex: escaped, $options: "i" } },
      ];
    }

    // ── Exact / enum filters ────────────────────────────────────────────────
    if (category) filter.category = { $regex: `^${category}$`, $options: "i" };
    if (type && ["lost", "found"].includes(type)) filter.type = type;
    if (status && ["open", "claimed", "resolved"].includes(status)) filter.status = status;
    if (location) filter.location = { $regex: location, $options: "i" };

    // ── Color: search inside title + description ────────────────────────────
    if (color) {
      const colorEsc = color.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const colorRx = { $regex: colorEsc, $options: "i" };
      // Merge with existing $or if keyword was set, otherwise create new
      if (filter.$or) {
        filter.$and = [
          { $or: filter.$or },
          { $or: [{ title: colorRx }, { description: colorRx }] },
        ];
        delete filter.$or;
      } else {
        filter.$or = [{ title: colorRx }, { description: colorRx }];
      }
    }

    // ── Date range ──────────────────────────────────────────────────────────
    const now = new Date();
    if (dateRange === "today") {
      const start = new Date(now); start.setHours(0, 0, 0, 0);
      filter.date = { $gte: start };
    } else if (dateRange === "7days") {
      filter.date = { $gte: new Date(now - 7 * 86400000) };
    } else if (dateRange === "30days") {
      filter.date = { $gte: new Date(now - 30 * 86400000) };
    } else if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo)   filter.date.$lte = new Date(dateTo);
    }

    // ── Sort ────────────────────────────────────────────────────────────────
    const sortMap = {
      newest:  { createdAt: -1 },
      oldest:  { createdAt:  1 },
      updated: { updatedAt: -1 },
      claimed: { claimCount: -1, createdAt: -1 },
    };
    const sortObj = sortMap[sort] || sortMap.newest;

    // ── Pagination ──────────────────────────────────────────────────────────
    const pageNum  = Math.max(1, parseInt(page,  10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip     = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Item.find(filter)
        .populate("postedBy", "name department")
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Item.countDocuments(filter),
    ]);

    // Attach pending-claim flag
    const pendingClaims = await Claim.find({ status: "pending" }).select("itemId").lean();
    const pendingSet = new Set(pendingClaims.map((c) => String(c.itemId)));
    const itemsOut = items.map((it) => ({ ...it, hasPendingClaim: pendingSet.has(String(it._id)) }));

    res.json({
      items: itemsOut,
      total,
      page:       pageNum,
      totalPages: Math.ceil(total / limitNum),
      limit:      limitNum,
    });
  } catch (error) {
    console.error("[searchItems]", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ─── Existing helpers ─────────────────────────────────────────────────────────

function imagePathsFromFile(file) {
  if (!file) return [];
  return [`/uploads/${file.filename}`];
}

const createItem = async (req, res) => {
  try {
    const { title, description, type, category, location, date, blurImage } = req.body;

    const item = await Item.create({
      title,
      description,
      type: type === "lost" || type === "found" ? type : "found",
      category,
      location,
      date: new Date(date),
      images: imagePathsFromFile(req.file),
      postedBy: req.user,
      blurImage: blurImage === "true" || blurImage === true,
    });

    res.status(201).json({
      message: "Item posted successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const reportLostItem = async (req, res) => {
  try {
    const { title, description, category, location, date, reward, contact, blurImage } =
      req.body;

    const item = await Item.create({
      title,
      description,
      type: "lost",
      category,
      location,
      date: new Date(date),
      reward: reward || "",
      contact: contact || "",
      images: imagePathsFromFile(req.file),
      postedBy: req.user,
      blurImage: blurImage === "true" || blurImage === true,
    });

    res.status(201).json({
      message: "Lost item reported successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const activeItemFilter = { isRemoved: { $ne: true } };

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find(activeItemFilter)
      .populate("postedBy", "name department")
      .sort({ createdAt: -1 });
    const claims = await Claim.find({ status: "pending" });
    const pendingItemIds = new Set(claims.map((c) => String(c.itemId)));

    const itemsWithClaims = items.map((item) => {
      const itemObj = item.toObject();
      itemObj.hasPendingClaim = pendingItemIds.has(String(item._id));
      return itemObj;
    });

    res.json(itemsWithClaims);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLostItems = async (req, res) => {
  try {
    const items = await Item.find({ ...activeItemFilter, type: "lost" })
      .populate("postedBy", "name department")
      .sort({ createdAt: -1 });
    const claims = await Claim.find({ status: "pending" });
    const pendingItemIds = new Set(claims.map((c) => String(c.itemId)));

    const itemsWithClaims = items.map((item) => {
      const itemObj = item.toObject();
      itemObj.hasPendingClaim = pendingItemIds.has(String(item._id));
      return itemObj;
    });

    res.json(itemsWithClaims);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleItem = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await Item.findById(req.params.id).populate(
      "postedBy",
      "name department"
    );
    if (!item || item.isRemoved) {
      return res.status(404).json({ message: "Item not found" });
    }

    const pendingClaimCount = await Claim.countDocuments({
      itemId: item._id,
      status: "pending",
    });

    const itemObj = item.toObject();
    itemObj.hasPendingClaim = pendingClaimCount > 0;

    res.json(itemObj);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createItem,
  reportLostItem,
  getAllItems,
  getLostItems,
  getSingleItem,
  searchItems,
};
