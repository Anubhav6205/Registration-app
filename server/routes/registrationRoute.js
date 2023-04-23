const express = require("express");
const router = express.Router();
const schema = require("../models/registrationModel.js");

router.post("/", async (req, res) => {
  try {
    const {email,name,roll,profile}=req.body;
    if(!email || !name || !roll || !profile) {
      return res.status(400).send("Please fill all the fields");
    }
    const existingUser=await schema.findOne({email:email});
    if(existingUser) {
      res.status(400).send({
        error: "Student already exists in database"
      })
      return;
    }

    const registration = await schema(req.body);
    await registration.save();
    console.log("Saved registration")
    res.status(201).send(registration);
  } catch (err) {
    console.log("Error saving registration")
    res
      .status(400)
      .send(err);
  }
});

router.get("/", async(req, res) => {
  try{
    const registrations=await schema.find();
    console.log("Got registrations");
    res.status(200).send(registrations);

  }
  catch(error)
  {
    console.log("Error getting registrations")
    res.status(400).send(error);
  }
});
module.exports = router;
