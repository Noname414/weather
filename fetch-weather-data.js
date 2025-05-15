// 這個腳本將在 Node.js 環境中運行 (透過 GitHub Actions)

// 從環境變數獲取 API 金鑰 (安全地)
const apiKey = process.env.OPENWEATHERMAP_API_KEY;
// 您想查詢的城市 (也可以透過環境變數或參數傳入)
const city = "Taipei";
// 儲存資料的檔案路徑
const outputFile = "weather_data.json";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`;

const fs = require("fs");

async function fetchAndSaveWeather() {
  if (!apiKey) {
    console.error(
      "錯誤：OpenWeatherMap API 金鑰未設定。請設定 OPENWEATHERMAP_API_KEY 環境變數。"
    );
    process.exit(1); // 退出並指示失敗
  }

  try {
    console.log(`正在獲取 ${city} 的天氣資料...`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP 錯誤！狀態碼：${response.status} - ${errorText}`);
    }

    const data = await response.json();
    // 新增資料庫更新時間
    data.updatedAt = new Date().toISOString();
    console.log("成功獲取天氣資料。");

    // 儲存資料到 JSON 檔案
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), "utf8");
    console.log(`天氣資料已儲存到 ${outputFile}`);
  } catch (error) {
    console.error("無法獲取或儲存天氣資料:", error);
    process.exit(1); // 退出並指示失敗
  }
}

fetchAndSaveWeather();
