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
router.get("/:id", getClient, async (req, res) => {
  try {
    const clientId = req.params.id;

    // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    // Render the HTML template and pass the client data
    res.render('../views/client_detail.ejs', { client });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error')};
  })

//render client details view
router.get("/edit/:id", getClient, async (req, res) => {
  try {
    const clientId = req.params.id;

    // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    // Render the HTML template and pass the client data
    res.render('../views/edit_client.ejs', { client });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error')};
  })
//render add insurace view
  router.get("/add_insurance/:id", getClient, async (req, res) => {
    try {
      const clientId = req.params.id
      // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    res.render('../views/add_client_insurance.ejs', { client })
    } catch (error) {
      console.log(error)
    }
  })

  router.patch('/add_insurance/add/:id', getClient, async (req, res) => {
    try {
      const clientId = req.params.id;
      const { insuranceEntry } = req.body;
  
      // Retrieve client data from MongoDB
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      // Add the insurance entry to the client's insurance array
      client.insurance.push(insuranceEntry);
  
      // Save the updated client data to the database
      await client.save();
  
      res.json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

//Creating one
router.post("/", async (req, res) => {
  const client = new Client({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    phone_number: req.body.phone_number,
    street: req.body.street,
    city: req.body.city,
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
if (req.body.street != null){
  res.client.street = req.body.street
}
if (req.body.city != null){
  res.client.city= req.body.city
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