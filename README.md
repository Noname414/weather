# 即時天氣網頁 https://noname414.github.io/weather/

這是一個簡單的即時天氣網頁專案，使用 HTML, CSS 和 JavaScript 構建，並利用 OpenWeatherMap API 獲取天氣資訊。網頁會自動更新顯示指定城市的天氣狀況。

這個專案透過 GitHub Actions 自動部署到 GitHub Pages。
網站更新

## 功能

*   顯示指定城市的即時天氣資訊（溫度、天氣描述、濕度、風速）。
*   網頁在瀏覽器中打開時，每 10 分鐘自動更新天氣資料。

## 使用技術

*   HTML5
*   CSS3
*   JavaScript
*   OpenWeatherMap API
*   GitHub Pages
*   GitHub Actions

## 設定與執行 (本地)

1.  **取得 OpenWeatherMap API 金鑰**:
    前往 [OpenWeatherMap 網站](https://openweathermap.org/api) 註冊帳號並取得您的 API 金鑰。

2.  **複製專案**:
    ```bash
    git clone <您的 GitHub 倉庫網址>
    cd <您的專案資料夾名稱>
    ```
    請將 `<您的 GitHub 倉庫網址>` 和 `<您的專案資料夾名稱>` 替換為實際的資訊。

3.  **設定 API 金鑰**:
    打開 `script.js` 檔案，將以下行的 `YOUR_API_KEY` 替換為您從 OpenWeatherMap 獲得的 API 金鑰：
    ```javascript
    const apiKey = 'YOUR_API_KEY';
    ```

4.  **設定城市 (可選)**:
    在 `script.js` 中，您可以修改 `const city = 'Taipei';` 來指定您想顯示天氣的城市。

5.  **打開網頁**:
    使用任何現代瀏覽器直接打開 `index.html` 檔案即可。

## 部署到 GitHub Pages

這個專案設定了 GitHub Actions，當有新的提交推送到 `main` (或 `master`) 分支時，會自動執行部署流程，將網頁發布到 GitHub Pages。

部署流程定義在 `.github/workflows/deploy.yml` 檔案中。

**部署步驟:**

1.  將您的專案推送到 GitHub 倉庫。
2.  前往您的 GitHub 倉庫 -> `Settings` -> `Pages`。
3.  在 `Source` 選項中，選擇從 `gh-pages` 分支部署 (這是 `peaceiris/actions-gh-pages` Action 的預設部署分支)。
4.  GitHub Pages 的網站網址通常會是 `https://<您的 GitHub 用戶名稱>.github.io/<您的倉庫名稱>/`。第一次部署可能需要幾分鐘才能生效。

## 注意事項

*   您的 OpenWeatherMap API 金鑰在 `script.js` 中是公開的。對於更安全的做法，可以考慮在後端獲取天氣資料，或使用 GitHub Actions 定期更新靜態資料檔案（如前面討論的進階方法）。目前這個簡單專案是將金鑰放在前端。
*   `script.js` 中的自動更新是依賴瀏覽器執行的 `setInterval`。

---

希望這個 README 能幫助您和他人理解和使用這個專案！ 
