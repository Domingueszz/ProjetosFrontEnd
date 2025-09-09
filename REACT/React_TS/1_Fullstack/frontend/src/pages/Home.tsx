import { useEffect, useState } from "react";
import { getMemories } from "../services/memoriesApi";
import MemoryCard from "../components/MemoryCard";
import AddCard from "../components/AddCard";
import MemoryModal from '../components/MemoryModal';
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

  async function fetchData() {
    const data = await getMemories();
    const lastTwo = [...data].slice(-2).reverse();
    setMemories(lastTwo);
  }

  useEffect(() => {
    fetchData();
  }, []);

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

      <button className="blob-btn view-collection">
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

      {/* Modal de detalhes */}
      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onEdit={(id) => console.log("Editar", id)}
          onDelete={(id) => console.log("Excluir", id)}
        />
      )}

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
