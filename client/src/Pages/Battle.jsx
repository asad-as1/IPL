import React, { useEffect, useState } from "react";
import { getbattle } from "../api/match.api";
import { Sword, User, Search, Loader } from "lucide-react";
import CricketChart from "./CricketChart";
import { useNavigate, useSearchParams } from "react-router-dom";

function Battle() {
  const [batsman, setBatsman] = useState("");
  const [bowler, setBowler] = useState("");
  const [loading, setLoading] = useState(false);
  const [battingData, setBattingData] = useState(null);
  const [bowlingData, setBowlingData] = useState(null);
  const [bowlerName, setBowlerName] = useState("");
  const [batterName, setBatterName] = useState("");
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const batting = searchParams.get("batter");
    const bowling = searchParams.get("bowler");
    setBatsman(batting || "");
    setBowler(bowling || "");
    if (batting || bowling) fetchData(batting, bowling);
  }, [searchParams]);

  const fetchData = async (batter, bowler) => {
    if (!batter?.trim() && !bowler?.trim()) {
      setError("Please enter at least one player!");
      return;
    }

    setLoading(true);
    setError(null);
    navigate(`?batter=${batter?.trim() || ""}&bowler=${bowler?.trim() || ""}`);

    try {
      const data = { batsman: batter?.trim(), bowler: bowler?.trim() };
      const res = await getbattle(data);

      if (!res?.data) {
        setError("No data found!");
        return;
      }

      setBowlerName(res?.data?.batterdata?.[0]?.name || "Unknown Bowler");
      setBatterName(res?.data?.bowlerdata?.[0]?.name || "Unknown Batsman");

      const battingStats = res?.data?.batterdata?.[0]?.stats?.years || null;
      const bowlingStats = res?.data?.bowlerdata?.[0]?.stats?.years || null;

      if (!battingStats && !bowlingStats) {
        setError("No data available for the selected players.");
        return;
      }

      setBattingData(battingStats);
      setBowlingData(bowlingStats);
    } catch (error) {
      console.error("Error fetching battle data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-80 mt-40 p-6 w-full mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center">
          <Sword className="w-6 h-6 mr-2 text-blue-500" />
          Battle Analysis
        </h1>
        <p className="text-gray-600">
          Compare performances between a batsman and a bowler.
        </p>
      </div>

      {/* Search Box */}
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-md space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter Batsman Name"
              className="flex-1 focus:outline-none"
              value={batsman}
              onChange={(e) => setBatsman(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter Bowler Name"
              className="flex-1 focus:outline-none"
              value={bowler}
              onChange={(e) => setBowler(e.target.value)}
            />
          </div>

          <p className="text-gray-700 text-sm text-center">
            ⚠️ We have IPL data from 2011 to 2017 only.
          </p>

          <button
            onClick={() => fetchData(batsman, bowler)}
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg flex items-center justify-center transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            {loading ? "Loading..." : "Let's Battle"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 text-center">
          <p className="text-red-600 text-lg font-semibold">❌ {error}</p>
        </div>
      )}

      {/* Chart Section */}
      {!error && (battingData || bowlingData) && (
        <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 p-4 lg:p-8">
          <div className="w-full h-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-blue-600 w-full text-white p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex w-full items-center space-x-4">
                <User className="text-white" size={40} />
                <div className="w-full flex justify-around">
                  <span className="text-2xl font-bold">{bowlerName}</span>
                  <span className="text-2xl font-bold">VS</span>
                  <span className="text-2xl font-bold">{batterName}</span>
                </div>
              </div>
            </div>

            <div className="w-full min-h-[500px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] flex flex-col md:flex-row justify-evenly">
              {battingData && (
                <div className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full md:w-1/2">
                  <CricketChart data={battingData} isBettle />
                </div>
              )}
              {bowlingData && (
                <div className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full md:w-1/2">
                  <CricketChart data={bowlingData} isBettle isBowler />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Battle;
