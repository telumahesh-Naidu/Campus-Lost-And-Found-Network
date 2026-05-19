import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <Link to={`/item/${item._id}`}>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p>{item.type}</p>
        <p>{item.location}</p>
      </div>
    </Link>
  );
}

export default ItemCard;