/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longUrl) {
      setError("Please enter a URL to shorten");
      return;
    }

    const shorted = await axios.post(
      `${serverUrl}/api/url/shorten`,
      { originalUrl: longUrl },
      { withCredentials: true },
    );

    const fullUrl = `${serverUrl}/${shorted.data.shortUrl}`; // ✅ convert

    setShortUrl(fullUrl);

    setHistory([
      { original: longUrl, short: fullUrl }, // ✅ store full URL
      ...history,
    ]);

    setLongUrl("");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.message || "logout failed");
      setLoading(false);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">🔗 URL Shortener</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Shortener Box */}
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Shorten your URL</h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste your long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleShorten}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Shorten
          </button>
        </div>

        {/* Result */}
        {shortUrl && (
          <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline">
              {shortUrl}
            </a>

            <button
              onClick={() => handleCopy(shortUrl)}
              className="bg-green-500 text-white px-3 py-1 rounded-lg">
              Copy
            </button>
          </div>
        )}
      </div>

      {/* History */}
      <div className="mt-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Your URLs</h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No URLs shortened yet.</p>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <p className="text-blue-600">
                  <a
                    href={item.short}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline">
                    {item.short}
                  </a>
                </p>

                <button
                  onClick={() => handleCopy(item.short)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg">
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
