import { Router } from "express";
import furnitureService from "../services/furnitureService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const furnitureController = Router();

furnitureController.get("/", async (req, res) => {
  const query = req.query;
  const furniture = await furnitureService.getAll(query);

  res.json(furniture);
});
furnitureController.post("/", async (req, res) => {
  const userId = req.user._id;
  const furnitureData = req.body;

  try {
    const furniture = await furnitureService.create(furnitureData, userId);
    res.json(furniture);
  } catch (err) {
    const error = getErrorMessage(err);
    res.status(400).json({ message: getErrorMessage(error) });
  }
});
furnitureController.get("/:furnitureId", async (req, res) => {
  const furniture = await furnitureService.getOne(req.params.furnitureId);

  res.json(furniture);
});
furnitureController.delete("/:furnitureId", async (req, res) => {
  try {
    await furnitureService.delete(req.params.furnitureId);
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
});
furnitureController.put("/:furnitureId", async (req, res) => {
  const furnitureData = req.body;
  const furnitureId = req.params.furnitureId;

  try {
    const updatedFurniture = await furnitureService.update(
      furnitureId,
      furnitureData
    );
    res.json(updatedFurniture);
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }

});

export default furnitureController;
