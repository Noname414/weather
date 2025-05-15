// API 金鑰和 API 端點不再需要直接在前端
// const apiKey = 'YOUR_API_KEY';
// const city = 'Taipei';
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`;

// 數據來源檔案
const dataFile = "weather_data.json";

// DOM 元素
const cityNameElement = document.getElementById("city-name");
const temperatureValueElement = document.getElementById("temperature-value");
const weatherDescriptionElement = document.getElementById(
  "weather-description"
);
const humidityValueElement = document.getElementById("humidity-value");
const windSpeedValueElement = document.getElementById("wind-speed-value");
const lastUpdatedTimeElement = document.getElementById("last-updated-time");

// 從 JSON 檔案獲取並顯示天氣資料的函數
async function fetchWeather() {
  try {
    console.log(`正在從 ${dataFile} 載入天氣資料...`);
    const response = await fetch(dataFile);

    if (!response.ok) {
      // 如果檔案不存在或載入失敗，顯示錯誤訊息
      throw new Error(`無法載入資料檔案！狀態碼：${response.status}`);
    }

    const data = await response.json();
    console.log("成功載入天氣資料檔案。");

    // 更新 DOM (這裡的邏輯與之前從 API 獲取數據後更新相似)
    // 需要檢查數據結構是否與 API 返回的一致，目前假設是一致的
    if (
      data &&
      data.name &&
      data.main &&
      data.weather &&
      data.weather.length > 0 &&
      data.wind
    ) {
      cityNameElement.textContent = data.name;
      temperatureValueElement.textContent = Math.round(data.main.temp);
      weatherDescriptionElement.textContent = data.weather[0].description;
      humidityValueElement.textContent = data.main.humidity;
      windSpeedValueElement.textContent = data.wind.speed.toFixed(1);
      // 使用資料庫更新時間
      const updatedDate = data.updatedAt
        ? new Date(data.updatedAt)
        : new Date(data.dt * 1000);
      lastUpdatedTimeElement.textContent = updatedDate.toLocaleString();
    } else {
      throw new Error("載入的資料格式不正確。");
    }
  } catch (error) {
    console.error("無法載入或解析天氣資料檔案:", error);
    cityNameElement.textContent = "錯誤";
    weatherDescriptionElement.textContent = "無法載入天氣資料檔案";
    temperatureValueElement.textContent = "-";
    humidityValueElement.textContent = "-";
    windSpeedValueElement.textContent = "-";
    lastUpdatedTimeElement.textContent = new Date().toLocaleTimeString();
  }
}

// 頁面載入時立即獲取天氣資料檔案
fetchWeather();

// 您可以選擇保留定時器來重新載入 JSON 檔案，或移除它。
// 如果資料只靠 GitHub Actions 更新，移除這裡的定時器可以減少瀏覽器端的請求。
// 如果保留，它將每隔設定的時間嘗試重新載入 weather_data.json
// setInterval(fetchWeather, 10 * 60 * 1000); // 每10分鐘自動重新載入資料檔案
