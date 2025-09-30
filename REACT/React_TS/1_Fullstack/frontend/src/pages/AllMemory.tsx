import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getMemories, deleteMemory } from "../services/memoriesApi"; 
import MemoryCard from "../components/MemoryCard";
import MemoryModal from '../components/MemoryModal';
import EditMemoryModal from "../components/EditMemoryModal"; 
import "./AllMemory.css";

type Memory = {
  _id: string;
  title: string;
  image: string;
  description: string;
};

export default function AllMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null); 

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMemories();
        
        console.log("Dados recebidos na página AllMemories:", data);

        
        setMemories(data);

      } catch (error) {
        console.error("Falha ao buscar memórias na página de coleção:", error);
        setMemories([]); 
      }
    }
    fetchData();
  }, []); 

  
  async function handleDelete(id: string) {
    try {
      await deleteMemory(id);
      setMemories(memories.filter((memory) => memory._id !== id));
      setSelectedMemory(null);
    } catch (error) {
      console.error("Erro ao deletar memória:", error);
    }
  }

  function handleEdit(memory: Memory) {
    setSelectedMemory(null); 
    setEditingMemory(memory); 
  }

  function handleUpdate(updatedMemory: Memory) {
    setMemories(memories.map(m => (m._id === updatedMemory._id ? updatedMemory : m)));
    setEditingMemory(null);
  }

  return (
    <div className="all-memories-page">
      <h1>Minha Coleção</h1>
      <div className="memories-grid">
        {memories.map((memory) => (
          <MemoryCard
            key={memory._id}
            title={memory.title}
            image={memory.image}
            onClick={() => setSelectedMemory(memory)}
          />
        ))}
      </div>
      <Link to="/" className="back-button">Voltar</Link>

      {/* Modal de Detalhes */}
      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onEdit={() => handleEdit(selectedMemory)} 
          onDelete={() => handleDelete(selectedMemory._id)} 
        />
      )}

      {/* Modal de Edição */}
      {editingMemory && (
        <EditMemoryModal
          memory={editingMemory}
          onClose={() => setEditingMemory(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}