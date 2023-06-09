const express = require("express");
const router = express.Router();
const Client = require("../models/client");
const axios = require("axios");

//TODO: test removal not sure why its here 2 times
const client = require("../models/client");

//Getting all
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getClient, async (req, res) => {
  try {
    const clientId = req.params.id;

    // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    // Render the HTML template and pass the client data
    res.render("../views/client_detail.ejs", { client });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Get client insurance
router.get("/insurance/:id", getClient, async (req, res) => {
  try {
    const clientId = req.params.id;
    // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    const insuranceArray = client.insurance;
    res.send(insuranceArray);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:clientid/insurance/edit/:id", async (req, res) => {
  try {
    const clientId = req.params.clientid;
    const insuranceId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      console.log("Client not found");
      return;
    }

    // Find the specific insurance within the client's insurance array
    const insurance = client.insurance.find(
      (ins) => ins._id.toString() === insuranceId
    );

    if (!insurance) {
      console.log("Insurance not found");
      return;
    }

    res.render("../views/edit_insurance.ejs", { client, insurance });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:clientId/insurance/patch/:insuranceId", async (req, res) => {
  const clientId = req.params.clientId;
  const insuranceId = req.params.insuranceId;
  try {
    const client = await Client.findById(clientId);
    const insurance = client.insurance.id(insuranceId);

    if (req.body.type != null) {
      insurance.type = req.body.type;
    }
    if (req.body.amount != null) {
      insurance.amount = req.body.amount;
    }
    if (req.body.start_date != null) {
      insurance.start_date = req.body.start_date;
    }
    if (req.body.end_date != null) {
      insurance.end_date = req.body.end_date;
    }

    await client.save();
    res.json(insurance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



//render client details view
router.get("/edit/:id", getClient, async (req, res) => {
  try {
    const clientId = req.params.id;

    // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    // Render the HTML template and pass the client data
    res.render("../views/edit_client.ejs", { client });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//render add insurace view
router.get("/add_insurance/:id", getClient, async (req, res) => {
  try {
    const clientId = req.params.id;
    // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    res.render("../views/add_client_insurance.ejs", { client });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/add_insurance/add/:id", getClient, async (req, res) => {
  try {
    const clientId = req.params.id;
    const { insuranceEntry } = req.body;

    // Retrieve client data from MongoDB
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Add the insurance entry to the client's insurance array
    client.insurance.push(insuranceEntry);

    // Save the updated client data to the database
    await client.save();

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
    insurance: req.body.insurance,
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one
router.patch("/:id", getClient, async (req, res) => {
  if (req.body.first_name != null) {
    res.client.first_name = req.body.first_name;
  }
  if (req.body.last_name != null) {
    res.client.last_name = req.body.last_name;
  }
  if (req.body.age != null) {
    res.client.age = req.body.age;
  }
  if (req.body.phone_number != null) {
    res.client.phone_number = req.body.phone_number;
  }
  if (req.body.street != null) {
    res.client.street = req.body.street;
  }
  if (req.body.city != null) {
    res.client.city = req.body.city;
  }
  if (req.body.insurance != null) {
    res.client.insurance = req.body.insurance;
  }
  try {
    const updatedClient = await res.client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one
router.delete("/:id", getClient, async (req, res) => {
  try {
    await res.client.deleteOne();
    res.json({ message: "Deleted client" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:clientId/insurance/del/:insuranceId", async (req, res) => {
  const { clientId, insuranceId } = req.params;

  try {
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const insuranceIndex = client.insurance.findIndex(
      (ins) => ins.id === insuranceId
    );
    if (insuranceIndex === -1) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    client.insurance.splice(insuranceIndex, 1);
    await client.save();

    res.json({ message: "Insurance item deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

async function getClient(req, res, next) {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: "Cannont find client" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.client = client;
  next();
}

module.exports = router;
