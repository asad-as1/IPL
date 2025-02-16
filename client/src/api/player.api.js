import axios from "axios"

const URI = `${import.meta.env.VITE_URL}`

export const getPlayer = async(allPlayer) => {
   try {
    const res = await axios.post(`${URI}/player/playerQuery`, allPlayer);
    // console.log(res);
    return res;
   } catch (error) {
     console.log("getPlayer", error);
   }
}