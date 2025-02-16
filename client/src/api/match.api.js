import axios from "axios";
const URI = `${import.meta.env.VITE_URL}/fetchMatch`;

// Fetch a specific batter
export const getBatter = async (name) => {
  try {
    const res = await axios.get(`${URI}/batsman/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching batter data:", error);
  }
};

// Fetch a specific bowler
export const getBowler = async (name) => {
  try {
    const res = await axios.get(`${URI}/bowlers/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getBowlerById= async (id) => {
  try {
    const res = await axios.get(`${URI}/bowler/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getBatterById = async (id) => {
  try {
    const res = await axios.get(`${URI}/batsmen/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getPlayerVenue = async (name) => {
  try {
    const res = await axios.get(`${URI}/venue/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const venueById = async (id) => {
  try {
    const res = await axios.get(`${URI}/venueById/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const allVenue = async () => {
  try {
    const res = await axios.get(`${URI}/allVenue`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getbattle = async(data) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/filterBattle/batsman/${data.batsman}/bowler/${data.bowler}`);
    // console.log(res);
    return res;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
}