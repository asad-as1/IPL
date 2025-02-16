const express = require("express");
const router = express.Router();
const { Batsman, Bowler, Venue } = require("../models/match.model");

// Helper function to extract first character and last word of a name
const getSearchPattern = (name) => {
  const words = name.trim().split(/\s+/);
  const firstChar = words[0][0]; // First character of first word
  const lastWord = words[words.length - 1]; // Last word of name
  return { firstChar, lastWord };
};

// Get all batsmen
router.get("/batsmen", async (req, res) => {
  try {
    const batsmen = await Batsman.find();
    res.status(200).json(batsmen);
  } catch (error) {
    console.error("Error fetching batsmen:", error);
    res.status(500).json({ error: "Failed to fetch batsmen." });
  }
});

// Get batsman by first character and last word of name
router.get("/batsman/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { firstChar, lastWord } = getSearchPattern(name);

    const batsman = await Batsman.findOne({
      name: new RegExp(`^${firstChar}.*\\b${lastWord}\\b`, "i"),
    });

    if (!batsman) return res.status(404).json({ error: "Batsman not found." });
    res.status(200).json(batsman);
  } catch (error) {
    console.error("Error fetching batsman:", error);
    res.status(500).json({ error: "Failed to fetch batsman." });
  }
});

// Get bowler by first character and last word of name
router.get("/bowlers/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { firstChar, lastWord } = getSearchPattern(name);

    const bowler = await Bowler.findOne({
      name: new RegExp(`^${firstChar}.*\\b${lastWord}\\b`, "i"),
    });

    if (!bowler) return res.status(404).json({ error: "Bowler not found." });
    res.status(200).json(bowler);
  } catch (error) {
    console.error("Error fetching bowler:", error);
    res.status(500).json({ error: "Failed to fetch bowler." });
  }
});

// Get venue by first character and last word of name
router.get("/venue/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { firstChar, lastWord } = getSearchPattern(name);

    const venue = await Venue.findOne({
      name: new RegExp(`^${firstChar}.*\\b${lastWord}\\b`, "i"),
    });

    if (!venue) return res.status(404).json({ error: "Venue not found." });
    res.status(200).json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ error: "Failed to fetch venue." });
  }
});

// Get all venues
router.get("/allVenue", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ error: "Failed to fetch venues." });
  }
});

// Get batsman by ID
router.get("/batsmen/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const batsman = await Batsman.findById(id);
    if (!batsman) return res.status(404).json({ error: "Batsman not found." });
    res.status(200).json(batsman);
  } catch (error) {
    console.error("Error fetching batsman:", error);
    res.status(500).json({ error: "Failed to fetch batsman." });
  }
});

// Get bowler by ID
router.get("/bowler/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bowler = await Bowler.findById(id);
    if (!bowler) return res.status(404).json({ error: "Bowler not found." });
    res.status(200).json(bowler);
  } catch (error) {
    console.error("Error fetching bowler:", error);
    res.status(500).json({ error: "Failed to fetch bowler." });
  }
});

// Get venue by ID
router.get("/venueById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findById(id);
    if (!venue) return res.status(404).json({ error: "Venue not found." });
    res.status(200).json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ error: "Failed to fetch venue." });
  }
});

module.exports = router;
