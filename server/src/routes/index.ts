import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// import logger from '../middleware/logger';
// import { loggerMiddleware } from '../middleware/logger';

const prisma = new PrismaClient();
const router = express.Router();

// router.use(loggerMiddleware); // middlewareを使えるようにする

// listデータを新規で作成
router.post("/", async (req: Request, res: Response) => {
  const {
    categoryID,
    title,
    detail,
    completed,
  }: { categoryID: number; title: string; detail: string; completed: boolean } =
    req.body;
  try {
    //reqのカテゴリIDが正しいか確認（categoryIDsに全てのIDを格納）
    const categories = await prisma.category.findMany();
    const categoryIDs = categories.map((category: { id: any }) => category.id);
    if (!categoryIDs.includes(categoryID)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }
    //リストデータを作成
    const list = await prisma.list.create({
      data: {
        categoryID: categoryID,
        title: title,
        detail: detail,
        completed: completed,
      },
    });
    return res.send(list);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Faild to create list" });
  }
});

// listデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const lists = await prisma.list.findMany({
      include: { category: true },
    });
    res.send(lists);
  } catch (err) {
    console.log(err);
  }
});

// listデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const list = await prisma.list.findMany({
      where: {
        id: id,
      },
      include: { category: true },
    });
    res.send(list);
  } catch (err) {
    console.log(err);
  }
});

// listデータを更新
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    categoryID,
    title,
    detail,
    completed,
  }: { categoryID: number; title: string; detail: string; completed: boolean } =
    req.body;
  try {
    const updatedlist = await prisma.list.update({
      where: {
        id: id,
      },
      data: {
        categoryID: categoryID,
        title: title,
        detail: detail,
        completed: completed,
      },
    });
    return res.send(updatedlist);
  } catch (err) {
    console.log(err);
  }
});

// listデータを削除
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deletedlist = await prisma.list.delete({
      where: {
        id: id,
      },
      include: { category: true },
    });
    return res.send(deletedlist);
  } catch (err) {
    console.log(err);
  }
});

export default router;
