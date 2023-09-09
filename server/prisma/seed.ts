import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 1,
        category: "仕事",
      },
    }),
    prisma.category.create({
      data: {
        id: 2,
        category: "家事",
      },
    }),
    prisma.category.create({
      data: {
        id: 3,
        category: "勉強",
      },
    }),
    prisma.category.create({
      data: {
        id: 4,
        category: "趣味",
      },
    }),
    prisma.category.create({
      data: {
        id: 5,
        category: "健康",
      },
    }),
    prisma.category.create({
      data: {
        id: 6,
        category: "その他",
      },
    }),
  ]);

  // Create lists
  await prisma.list.createMany({
    data: [
      {
        title: "プロテインを購入",
        detail: "残り少ないのでAmazonで購入",
        completed: false,
        categoryID: categories[4].id,
      },
      {
        title: "パズルを完成",
        detail: "ジブリのパズルを完成させたい",
        completed: false,
        categoryID: categories[3].id,
      },
      {
        title: "Dockerを立ち上げる",
        detail: "Dockerfileの理解を深める",
        completed: false,
        categoryID: categories[2].id,
      },
      {
        title: "献立を考える",
        detail: "献立を考えて、スーパーに買い出し",
        completed: false,
        categoryID: categories[1].id,
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
