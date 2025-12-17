import React, { useEffect, useState } from "react";

const IndexPage = () => {
  const [weather, setWeather] = useState({
    condition: "Loading...",
    temperature: "Loading...",
  });
  const [error, setError] = useState(null);

  const loadWeather = () => {
    fetch("http://localhost:3001/weather")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setWeather(data);
          setError(null);
        }
      })
      .catch((err) => {
        setError("Failed to load weather data");
        console.error(err);
      });
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h1>Current Weather in Hong Kong</h1>
      <div
        style={{
          margin: "40px auto",
          padding: "30px",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontSize: "1.5em" }}>
          <strong>Condition:</strong> {weather.condition}
        </p>
        <p style={{ fontSize: "1.5em" }}>
          <strong>Temperature:</strong> {weather.temperature}
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          onClick={loadWeather}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Hong Kong Weather | Gatsby App</title>;