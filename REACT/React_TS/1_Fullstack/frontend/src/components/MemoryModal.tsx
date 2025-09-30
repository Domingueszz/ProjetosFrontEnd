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
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={`${API_URL}/uploads/${memory.image}`} alt={memory.title} />

        <h2>{memory.title}</h2>
        <p>{memory.description}</p>

        <div className="modal-actions">
          <button className="btn-edit" onClick={() => onEdit(memory._id)}>Editar</button>
          <button className="btn-delete" onClick={() => onDelete(memory._id)}>Excluir</button>
          <button className="btn-close" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}