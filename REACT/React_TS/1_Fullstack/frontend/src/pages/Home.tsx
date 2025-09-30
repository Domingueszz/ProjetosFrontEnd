import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { getMemories, deleteMemory } from "../services/memoriesApi"; 
import AddCard from "../components/AddCard";
import MemoryModal from '../components/MemoryModal';
import EditMemoryModal from "../components/EditMemoryModal"; 
import "./Home.css";

type Memory = {
  _id: string;
  title: string;
  image: string;
  description: string;
};

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null); 
  const navigate = useNavigate();

  async function fetchData() {
    const data = await getMemories();
    const latestTwo = data.slice(0, 2);
    setMemories(latestTwo);
  }

  useEffect(() => {
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

  const handleNavigateToCollection = () => {
    navigate('/collection');
  };

  return (
    <div className="home">
      <h1 className="title">My Memories</h1>

      <div className="cards-container">
        {memories.map((memory) => (
          <MemoryCard
            key={memory._id}
            title={memory.title}
            image={memory.image}
            onClick={() => setSelectedMemory(memory)}
          />
        ))}
        <AddCard />
      </div>

      <button 
        className="blob-btn view-collection" 
        onClick={handleNavigateToCollection}
      >
        
  Ver coleção
  <span className="blob-btn__inner">
    <span className="blob-btn__blobs">
      <span className="blob-btn__blob"></span>
      <span className="blob-btn__blob"></span>
      <span className="blob-btn__blob"></span>
      <span className="blob-btn__blob"></span>
    </span>
  </span>
</button>


      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onEdit={() => handleEdit(selectedMemory)}
          onDelete={() => handleDelete(selectedMemory._id)}
        />
      )}

      {editingMemory && (
        <EditMemoryModal
          memory={editingMemory}
          onClose={() => setEditingMemory(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}