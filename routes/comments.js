const router = require("express").Router();
const Comments = require("../models/Comments");

router.post("/", async (req, res) => {
  const newCat = new Comments(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const cats = await Comments.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
