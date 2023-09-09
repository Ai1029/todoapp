import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// Categoryはマスターだから、getだけ作成

// Categoryデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const categorys = await prisma.category.findMany();
    return res.send(categorys);
  } catch (err) {
    console.log(err);
  }
});

// Categoryデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const category = await prisma.category.findMany({
      where: {
        id: id,
      },
    });
    return res.send(category);
  } catch (err) {
    console.log(err);
  }
});

export default router;
