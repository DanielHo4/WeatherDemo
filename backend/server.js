const express = require('express');
const cors = require('cors');
const axios = require('axios')
const app = express();
const port = 3001;

app.use(cors()); // Allows frontend on different port

// Mapping of HKO icon codes to descriptions (from official HKO sources)
const weatherIcons = {
  50: 'Sunny',
  51: 'Sunny Periods',
  52: 'Sunny Intervals',
  53: 'Sunny Periods with A Few Showers',
  54: 'Sunny Intervals with Showers',
  55: 'Sunny Periods with Showers',
  56: 'Sunny Intervals with Showers',
  57: 'Sunny Periods with Isolated Showers',
  58: 'Sunny Intervals with Isolated Showers',
  59: 'Isolated Showers',
  60: 'Cloudy',
  61: 'Overcast',
  62: 'Light Rain',
  63: 'Rain',
  64: 'Heavy Rain',
  65: 'Thunderstorms',
  70: 'Mainly Fine',
  71: 'Mainly Fine (Night)',
  72: 'Fine (Night)',
  73: 'Mainly Cloudy (Night)',
  74: 'Cloudy (Night)',
  75: 'Overcast (Night)',
  76: 'Light Rain (Night)',
  77: 'Mainly Fine',
  80: 'Windy',
  81: 'Dry',
  82: 'Humid',
  83: 'Fog',
  84: 'Mist',
  85: 'Haze',
  90: 'Hot',
  91: 'Warm',
  92: 'Cool',
  93: 'Cold'
};

app.get('/weather', async (req, res) => {
  try {
    const apiUrl = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en';
    const response = await axios.get(apiUrl);
    const { data } = response;
    console.log(data)

    //if no icon, then return No data
    const iconCode = data.icon?.[0] || null;
    const condition = iconCode ? (weatherIcons[iconCode] || `Code ${iconCode}`) : 'No data';

    // Temperature from Hong Kong Observatory station
    const hkoTemp = data.temperature?.data?.find(station => station.place === "Hong Kong Observatory");
    const temperature = hkoTemp ? `${hkoTemp.value}°${hkoTemp.unit}` : 'No data';

    res.json({ condition, temperature });
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});