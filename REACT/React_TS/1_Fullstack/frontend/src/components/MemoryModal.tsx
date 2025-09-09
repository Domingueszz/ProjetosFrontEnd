import "./MemoryModal.css";

type Props = {
  memory: {
    _id: string;
    title: string;
    image: string;
    description: string;
  };
  onClose: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function MemoryModal({ memory, onClose, onEdit, onDelete }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >
        <img src={memory.image} alt={memory.title} />
        <h2>{memory.title}</h2>
        <p>{memory.description}</p>

        <div className="modal-actions">
          <button onClick={() => onEdit(memory._id)}>Editar</button>
          <button onClick={() => onDelete(memory._id)}>Excluir</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
