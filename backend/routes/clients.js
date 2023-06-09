const express = require("express");
const router = express.Router();
const Client = require('../models/client');

//TODO: test removal not sure why its here 2 times
const client = require("../models/client");

//Getting all
router.get("/", async (req, res) => {
try{
const clients = await Client.find()
res.json(clients)
} catch (err){
res.status(500).json({message: err.message})
}
} );

//Getting one
router.get("/:id", getClient, (req, res) => {
  try{
    res.send(res.client)
  } catch(err){
      res.status(500).json({message: err.message})
  }

  });


//Creating one
router.post("/", async (req, res) => {
  const client = new Client({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    phone_number: req.body.phone_number,
    insurance: req.body.insurance
  })

try{
const newClient = await client.save()
res.status(201).json(newClient)
} catch(err){
  res.status(400).json({message: err.message })
}
});


//Updating one
router.patch("/:id", getClient, async(req, res) => {
if (req.body.first_name != null){
res.client.first_name = req.body.first_name
}
if (req.body.last_name != null){
  res.client.last_name = req.body.last_name
}
if (req.body.age != null){
  res.client.age = req.body.age
}
if (req.body.phone_number != null){
  res.client.phone_number = req.body.phone_number
}
if (req.body.insurance != null){
  res.client.insurance = req.body.insurance
}
try {
  const updatedClient = await res.client.save()
  res.json(updatedClient)
} catch (err) {
  res.status(400).json({message: err.message})
}
});


//Deleting one
router.delete("/:id", getClient, async(req, res) => {
try {
  await res.client.deleteOne()
  res.json({message: 'Deleted client'})
} catch (err) {
  res.status(500).json({message: err.message})
}
});

async function getClient(req, res, next) {
  let client
try {
  client = await Client.findById(req.params.id)
  if (client == null){
    return res.status(404).json({message: 'Cannont find client'})
  }
} catch (err) {
  return res.status(500).json({message: err.message})
}
res.client = client
next()
}

module.exports = router;