// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();

const PORT = 8080;

// Server our index.html
app.use(express.static("public"));

// GET - / - returns homepage
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  console.log(pets);
  res.send(pets);
});

// get pet by owner with query string
app.get("/api/v1/pets/owner", (req, res) => {
  //http://localhost:8080/api/v1/pets/owner/?query=John
  const { query } = req.query;
  const filteredPets = pets.filter((pet) => pet.owner === query);
  res.send(`
   <h1>Dog Onwers -  ${query}</h1>
  ${filteredPets.map((pet) => pet.name).join(" ")}
  `);
});

// get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  const { name } = req.params;

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name === name);
  console.log(pet);
  if (!pet) {
    return res.status(404).json({ error: "Pet Not Found" });
  }
  res.json({ pet });
  // send the pet as a response
  res.send(pet);
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
