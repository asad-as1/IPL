const matchData = require("./matchesData.json");
const { Router } = require("express");
const router = Router();
const { Battle } = require("../models/match.model");

router.get("/", async (req, res) => {
  try {
    const filteredData = {};
    const bowlers = new Set();
    const batsmans = new Set();

    matchData.forEach((match) => {
      const year = match.date.substring(0, 4);
      const matchId = match.mid;

      batsmans.add(match.batsman);
      bowlers.add(match.bowler);

      if (!filteredData[year]) {
        filteredData[year] = {};
      }

      if (!filteredData[year][matchId]) {
        filteredData[year][matchId] = [];
      }

      filteredData[year][matchId].push(match);
    });

    const playersOfBatsman = {};
    const playersOfBowler = {};

    batsmans.forEach((batsman) => {
      playersOfBatsman[batsman] = {};
    });

    bowlers.forEach((bowler) => {
      playersOfBowler[bowler] = {};
    });

    for (const [year, matches] of Object.entries(filteredData)) {
      for (const [matchId, matchArray] of Object.entries(matches)) {
        let prev = { runs: 0, wickets: 0 };

        matchArray.forEach((bowl) => {
          if (!bowl.batsman || !bowl.bowler) return;

          // Update Batsman Data
          if (!playersOfBatsman[bowl.batsman][bowl.bowler]) {
            playersOfBatsman[bowl.batsman][bowl.bowler] = {};
          }
          if (!playersOfBatsman[bowl.batsman][bowl.bowler][year]) {
            playersOfBatsman[bowl.batsman][bowl.bowler][year] = {
              bowls: 0,
              runs: 0,
            };
          }

          const battingData = playersOfBatsman[bowl.batsman][bowl.bowler][year];
          battingData.bowls += 1;
          battingData.runs += Math.max(Number(bowl.runs) - prev.runs, 0);

          // Update Bowler Data
          if (!playersOfBowler[bowl.bowler][bowl.batsman]) {
            playersOfBowler[bowl.bowler][bowl.batsman] = {};
          }
          if (!playersOfBowler[bowl.bowler][bowl.batsman][year]) {
            playersOfBowler[bowl.bowler][bowl.batsman][year] = {
              bowls: 0,
              givesRun: 0,
              wickets: 0,
            };
          }

          const bowlingData = playersOfBowler[bowl.bowler][bowl.batsman][year];
          bowlingData.bowls += 1;
          bowlingData.givesRun += Math.max(Number(bowl.runs) - prev.runs, 0);
          bowlingData.wickets += Math.max(
            Number(bowl.wickets) - prev.wickets,
            0
          );

          prev = {
            runs: Number(bowl.runs) || 0,
            wickets: Number(bowl.wickets) || 0,
          };
        });
      }
    }

    // Save processed data to the database
    await Battle.deleteMany({}); // Clear existing data
    const dataToSave = [];

    // Prepare data for insertion
    Object.entries(playersOfBatsman).forEach(([batsman, bowlersData]) => {
      Object.entries(bowlersData).forEach(([bowler, yearsData]) => {
        dataToSave.push({
          name: batsman,
          stats: { bowler, years: yearsData, type: "batsman" }, // Stats include bowler and yearly data
        });
      });
    });

    Object.entries(playersOfBowler).forEach(([bowler, batsmansData]) => {
      Object.entries(batsmansData).forEach(([batsman, yearsData]) => {
        dataToSave.push({
          name: bowler,
          stats: { batsman, years: yearsData, type: "bowler" }, // Stats include batsman and yearly data
        });
      });
    });

    await Battle.insertMany(dataToSave);

    res
      .status(200)
      .json({
        message: "Data saved successfully",
        playersOfBatsman,
        playersOfBowler,
      });
  } catch (error) {
    console.error("Error processing matches:", error);
    res.status(500).json({ message: "Error processing matches", error });
  }
});

const createNameRegex = (fullName) => {
  const [firstName, lastName] = fullName.split(" ");
  if (!firstName || !lastName) return fullName; // Handle edge cases
  return new RegExp(`^${firstName[0]}\\.\\s*${lastName}$`, "i"); // Match "V Kohli"
};


router.get("/batsman/:batsman/bowler/:bowler", async (req, res) => {
  try {
    let { batsman, bowler } = req.params;

    // Extract first character & last name for batsman
    const batsmanParts = batsman.split(" ");
    const batsmanFirstChar = batsmanParts[0][0].toLowerCase();
    const batsmanLastName = batsmanParts.pop().toLowerCase();

    // Extract first character & last name for bowler
    const bowlerParts = bowler.split(" ");
    const bowlerFirstChar = bowlerParts[0][0].toLowerCase();
    const bowlerLastName = bowlerParts.pop().toLowerCase();

    // Fetch all batsmen matching pattern
    let batterdata = await Battle.find({
      name: { $regex: new RegExp(`^${batsmanFirstChar}.*\\b${batsmanLastName}\\b`, "i") },
    });

    // Fetch all bowlers matching pattern
    let bowlerdata = await Battle.find({
      name: { $regex: new RegExp(`^${bowlerFirstChar}.*\\b${bowlerLastName}\\b`, "i") },
    });

    if (!batterdata.length && !bowlerdata.length) {
      return res.status(404).json({ message: `No data found for ${batsman} vs ${bowler}` });
    }

    // Filter batterdata: Keep only entries where `stats.bowler` matches the bowler's first char & last name
    batterdata = batterdata.filter((entry) => {
      if (!entry.stats || !entry.stats.bowler) return false;
      const bowlerNameParts = entry.stats.bowler.split(" ");
      const entryBowlerFirstChar = bowlerNameParts[0][0].toLowerCase();
      const entryBowlerLastName = bowlerNameParts.pop().toLowerCase();
      return entryBowlerFirstChar == bowlerFirstChar && entryBowlerLastName == bowlerLastName;
    });

    // console.log(batterdata)

    // Filter bowlerdata: Keep only entries where `stats.batsman` matches the batsman's first char & last name
    bowlerdata = bowlerdata.filter((entry) => {
      if (!entry.stats || !entry.stats.batsman) return false;
      const batsmanNameParts = entry.stats.batsman.split(" ");
      const entryBatsmanFirstChar = batsmanNameParts[0][0].toLowerCase();
      const entryBatsmanLastName = batsmanNameParts.pop().toLowerCase();
      return entryBatsmanFirstChar === batsmanFirstChar && entryBatsmanLastName === batsmanLastName;
    });

    if (!batterdata.length && !bowlerdata.length) {
      return res.status(404).json({ message: `No matching filtered data found for ${batsman} vs ${bowler}` });
    }

    res.status(200).json({ batterdata, bowlerdata });
  } catch (error) {
    console.error("Error fetching data for batsman vs bowler:", error);
    res.status(500).json({ message: "Error fetching data for batsman vs bowler", error });
  }
});



router.delete("/delete/:playerName", async (req, res) => {
  try {
    const { playerName } = req.params;

    if (!playerName) {
      return res.status(400).json({ error: "Player name is required." });
    }

    // Delete all battles where the player appears as batsman or bowler
    const result = await Battle.deleteMany({
      $or: [{ name: playerName }, { name: playerName }],
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No battles found for this player." });
    }

    res.status(200).json({ message: "Battles deleted successfully.", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting battles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;




module.exports = router;
