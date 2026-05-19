import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const res = await API.get(`/items/${id}`);
    setItem(res.data);
  };

  const handleClaim = async () => {
    try {
      await API.post("/claims/create", {
        itemId: id,
        claimantName: "Keerthana",
        claimantEmail: "keerthana@gmail.com",
        message: "This item belongs to me",
      });

      alert("Claim submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (!item) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>{item.location}</p>
      <p>{item.type}</p>

      <button onClick={handleClaim}>Claim Item</button>
    </div>
  );
}

export default ItemDetails;