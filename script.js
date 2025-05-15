// 請替換成您的 OpenWeatherMap API 金鑰
const apiKey = "e5d4251d31712cd24f799bae6f792224";
// 您想查詢的城市
const city = "Taipei";
// API 端點
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`;

// DOM 元素
const cityNameElement = document.getElementById("city-name");
const temperatureValueElement = document.getElementById("temperature-value");
const weatherDescriptionElement = document.getElementById(
  "weather-description"
);
const humidityValueElement = document.getElementById("humidity-value");
const windSpeedValueElement = document.getElementById("wind-speed-value");
const lastUpdatedTimeElement = document.getElementById("last-updated-time");

// 獲取並顯示天氣資料的函數
async function fetchWeather() {
  // 檢查 API 金鑰是否已設定
  if (apiKey === "YOUR_API_KEY") {
    cityNameElement.textContent = "請設定 API 金鑰";
    weatherDescriptionElement.textContent =
      "無法獲取天氣資料，因為 API 金鑰未設定。請在 script.js 中更新 apiKey 常數。";
    temperatureValueElement.textContent = "-";
    humidityValueElement.textContent = "-";
    windSpeedValueElement.textContent = "-";
    lastUpdatedTimeElement.textContent = new Date().toLocaleTimeString();
    return;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
    }
    const data = await response.json();

    // 更新 DOM
    cityNameElement.textContent = data.name;
    temperatureValueElement.textContent = Math.round(data.main.temp);
    weatherDescriptionElement.textContent = data.weather[0].description;
    humidityValueElement.textContent = data.main.humidity;
    windSpeedValueElement.textContent = data.wind.speed.toFixed(1);
    lastUpdatedTimeElement.textContent = new Date().toLocaleTimeString();
  } catch (error) {
    console.error("無法獲取天氣資料:", error);
    cityNameElement.textContent = city; // 即使出錯也顯示預設城市名稱
    weatherDescriptionElement.textContent = "無法載入天氣資料";
    temperatureValueElement.textContent = "-";
    humidityValueElement.textContent = "-";
    windSpeedValueElement.textContent = "-";
    lastUpdatedTimeElement.textContent = new Date().toLocaleTimeString();
  }
}

// 頁面載入時立即獲取天氣
fetchWeather();

// 每10分鐘自動更新天氣資訊 (10 * 60 * 1000 毫秒)
setInterval(fetchWeather, 10 * 60 * 1000);
