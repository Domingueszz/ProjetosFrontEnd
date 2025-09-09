import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import memoryRoutes from './routes/memoryRoutes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/memories', memoryRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Erro global:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ Conectado ao MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
    process.exit(1); 
  }
}

startServer();
