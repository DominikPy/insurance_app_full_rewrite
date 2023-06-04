const express = require("express");
const router = express.Router();
const Insurance = require("../models/insurance");

//Getting all
router.get("/", async (req, res) => {
  try {
    const insurance = await Insurance.find();
    res.json(insurance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getInsurance, async (req, res) => {
  try {
    res.send(res.insurance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Creating one
router.post("/", async (req, res) => {
  const insurance = new Insurance({
    name: req.body.name,
    amount: req.body.amount,
  });
  try {
    const newInsurance = await insurance.save();
    res.status(201).json(newInsurance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one
router.patch("/:id", getInsurance, async (req, res) => {
    if (req.body.name != null){
        res.insurance.name = req.body.name
    }
    if (req.body.amount != null){
        res.insurance.amount = req.body.amount
    }
    try {
        const updatedInsurance = await res.insurance.save()
        res.json(updatedInsurance)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one
router.delete("/:id", getInsurance, async (req, res) => {
  try {
    await res.insurance.deleteOne()
    res.json({message: 'Deleted insurance'})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getInsurance(req, res, next) {
  let insurance;
  try {
    insurance = await Insurance.findById(req.params.id);
    if (insurance == null) {
      return res.status(404).json({ message: "Cannont find insurance" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.insurance = insurance;
  next();
}

module.exports = router;
