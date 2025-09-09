import "./MemoryCard.css";

type Props = {
  title: string;
  image: string; // aqui já vem só o nome do arquivo, ex: "minha-imagem.jpg"
  onClick: () => void;
};

export default function MemoryCard({ title, image, onClick }: Props) {
  const API_URL = import.meta.env.VITE_API_URL; // ex: http://localhost:5000

  return (
    <div className="memory-card" onClick={onClick}>
      <img
        src={`${API_URL}/uploads/${image}`}
        alt={title}
        style={{ width: "100%", height: "auto" }}
      />
      <h3>{title}</h3>
    </div>
  );
}
