# Hexabot Plugin: Weather

## Plugin Description
The **Hexabot Plugin: Weather** provides real-time weather updates and forecasts. It integrates seamlessly with Hexabot to fetch, display, and analyze weather information from various data sources.

## Features
- Fetch current weather conditions for any location.
- Get detailed forecasts (hourly, daily, and weekly).
- Support for multiple weather data providers.
- Localization options for different languages and units (Celsius/Fahrenheit).
- Alerts for severe weather conditions.

## Prerequisites
- Node.js (v14 or higher).
- An API key from a weather data provider (e.g., OpenWeatherMap, WeatherAPI).
- Basic understanding of JavaScript (optional for advanced customization).

## Installation Instructions
1. Navigate to the `hexabot-plugins` directory:
   ```bash
   cd hexabot-plugins
   ```
2. Clone or download the plugin into the `hexabot-plugin-weather` folder.
3. Install dependencies using npm:
   ```bash
   npm install
   ```

## Configuration
1. Create a `weather-config.json` file in the plugin directory with the following structure:
   ```json
   {
     "apiKey": "your-api-key-here",
     "defaultLocation": "New York",
     "units": "metric"
   }
   ```
2. Replace `your-api-key-here` with your API key from the weather provider.
3. Adjust the `defaultLocation` and `units` settings as needed.

## Usage Guide
### Import the Plugin
Register the plugin within Hexabot:
```javascript
const hexabotWeatherPlugin = require('hexabot-plugin-weather');
hexabot.use(hexabotWeatherPlugin);
```

### Example Commands
1. **Get Current Weather**:
   ```javascript
   hexabot.execute('weather now in Tokyo');
   ```
   Response: `The current weather in Tokyo is 22°C with clear skies.`

2. **Get a Weekly Forecast**:
   ```javascript
   hexabot.execute('weather forecast for Paris');
   ```
   Response: `The weekly forecast for Paris shows mild temperatures with occasional rain.`

3. **Set a Default Location**:
   ```javascript
   hexabot.execute('weather set location London');
   ```
   Response: `Default location updated to London.`

---

For additional support, refer to the plugin documentation or contact the development team.
