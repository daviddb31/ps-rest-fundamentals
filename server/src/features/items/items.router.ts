import express from "express";

export const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res)=>{
  const items = await getItems();
  items.forEach((item) => {
    items.imageUrl = buildImageUrl(req, items.id);
  });
  res.json(items)
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function buildImageUrl(req: any, id: number): string {
  return `${req.protocol}://${req.get("host")}/images/${id}.jpg`;
}
