import { Request, Response } from 'express';
import Memory from '../models/Memory';

export const createMemory = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;

    const newMemory = new Memory({
      title,
      description,
      image,
    });

    await newMemory.save();
    res.status(201).json(newMemory);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar memória' });
  }
};

export const getAllMemories = async (_req: Request, res: Response) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar memórias' });
  }
};

export const getMemoryById = async (req: Request, res: Response) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) return res.status(404).json({ error: 'Memória não encontrada' });
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar memória' });
  }
};

export const deleteMemory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Memory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Memória não encontrada' });
    }

    res.status(200).json({ message: 'Memória deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar memória' });
  }
};
