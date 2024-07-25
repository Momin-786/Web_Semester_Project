import express from "express";
import WeatherReport from "../model/weatherReport.js";

const router = express.Router();

// Create a new weather report
router.post("/", async (req, res) => {
  try {
    const weatherReport = new WeatherReport(req.body);
    await weatherReport.save();
    res.status(201).send(weatherReport);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all weather reports
router.get("/", async (req, res) => {
  try {
    const weatherReports = await WeatherReport.find();
    console.log(weatherReports);
    
    res.status(200).json(weatherReports);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a weather report by ID
router.get("/:id", async (req, res) => {
  try {
    const weatherReport = await WeatherReport.findById(req.params.id);
    if (!weatherReport) {
      return res.status(404).send();
    }
    res.status(200).send(weatherReport);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a weather report by ID
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "location",
    "temperature",
    "description",
    "windSpeed",
    "dateTime",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const weatherReport = await WeatherReport.findById(req.params.id);

    if (!weatherReport) {
      return res.status(404).send();
    }

    updates.forEach((update) => (weatherReport[update] = req.body[update]));
    await weatherReport.save();

    res.status(200).send(weatherReport);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a weather report by ID
router.delete("/:id", async (req, res) => {
  try {
    const weatherReport = await WeatherReport.findByIdAndDelete(req.params.id);

    if (!weatherReport) {
      return res.status(404).send();
    }

    res.status(200).send(weatherReport);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
