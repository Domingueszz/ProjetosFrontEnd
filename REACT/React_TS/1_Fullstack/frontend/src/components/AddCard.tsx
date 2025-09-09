import { useNavigate } from "react-router-dom";
import "./AddCard.css";

export default function AddCard() {
  const navigate = useNavigate();

  return (
    <>
    <div className="add-card" onClick={() => navigate("/add")}>
      <div className="plus">+</div>
      <p>Add Card</p>
    </div>

    </>
  );
}
