import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Venues from "./Pages/Venues.jsx";
import Team from "./Pages/Team.jsx";
import Search from "./Pages/Search.jsx";
import Players from "./Pages/Players.jsx";
import BatterYearStats from "./Pages/BatterYearStats.jsx";
import SinglePlayer from "./Pages/SinglePlayer.jsx";
import SingleGround from "./Pages/SingleGround.jsx";
import App from "./App.jsx";
import "./index.css";
import VenueYearStats from "./Pages/VenueYearStats.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Battle from "./Pages/Battle.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/venues" element={<Venues />} />
      <Route path="/search" element={<Search />} />
      <Route
        path="/venues/:id"
        element={<SingleGround />}
      />
      <Route path="/teams" element={<Team />} />
      <Route
        path="/players"
        element={<Players />}
      />
      <Route
        path="/player/:id"
        element={<SinglePlayer />}
      />
      <Route
        path="/player"
        element={<BatterYearStats />}
      />
      <Route
        path="/venue"
        element={<VenueYearStats />}
      />
      <Route
        path="/battle"
        element={<Battle />}
      />
      <Route
        path= "*"
        element= {<NotFound />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
