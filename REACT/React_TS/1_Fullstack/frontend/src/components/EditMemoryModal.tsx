import { useState, type FormEvent } from "react";
import "./EditMemoryModal.css";
import { updateMemory } from "../services/memoriesApi";

type Memory = {
  _id: string;
  title: string;
  image: string;
  description: string;
};

type Props = {
  memory: Memory;
  onClose: () => void;
  onUpdate: (updatedMemory: Memory) => void;
};

export default function EditMemoryModal({ memory, onClose, onUpdate }: Props) {
  const [title, setTitle] = useState(memory.title);
  const [description, setDescription] = useState(memory.description);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const updatedData = await updateMemory(memory._id, {
        title,
        description,
      });
      onUpdate(updatedData);
      onClose();
    } catch (error) {
      console.error("Falha ao atualizar a memória", error);
      alert("Não foi possível salvar as alterações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Editar Memória</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
          />

          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isLoading}
          />

          <div className="modal-actions">
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
