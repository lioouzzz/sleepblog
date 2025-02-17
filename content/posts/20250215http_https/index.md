+++
date = '2025-02-16'
draft = false
title = '了解HTTP&HTTPS'
show_reading_time=true
featured_image = 'images/lines.png'
categories = ["資安","網路安全"]
tags = ["",]
toc=true
+++

### 什麼是 HTTP？

預設連接埠 80  
HTTP，又名為(HyperText Transfer Protocol，超文本傳輸協議)  
是一種**無狀態**的應用層協議，用於網路上的數據通信，尤其是瀏覽器和 Web 伺服器之間的通信<!--more-->

🪹 無狀態(stateless)：每次請求都是獨立的，伺服器不會記得前一次的請求資訊

HTTP 是 Web 的核心協議，**負責客戶端(Client)和伺服器(Server)之間的請求(Request)和回應(Response)**，實際上是藉由 TCP 作為資料的傳輸方式。

🪹 基於請求-響應模式 (Request-Response Model)：
客戶端發送請求，伺服器回應相應數據

舉例，今天使用者送出一個請求，經過 TCP 三次握手，資料就可以透過 TCP 傳遞給伺服器，並等待伺服器回應，像這樣的傳輸過程，資料都是**明文**如果傳輸的過程有惡意竊聽，資料便有機會被窺探，盜用。

🪹 明文：數據不經過加密，容易被第三方攔截。

#### HTTP 請求結構

HTTP 請求由以下部分組成：

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html
```

**請求行**：指定請求方法(GET/POST/PUT/DELETE)，請求的資源`index.html`以及協議版本 `HTTP1.1`

**標頭**：包括用戶代理(`User-Agent`)、可接受的數據類型(Accept)、主機(`Host`)等

**請求主體**：主要在`POST`或`PUT`請求中攜帶數據

#### HTTP 響應結構(舉例):

```
HTTP/1.1 200 OK
Date: Mon, 17 Feb 2025 12:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 1256

<html>
<head><title>Example</title></head>
<body><h1>Hello, World!</h1></body>
</html>
```

**狀態行**：包含 HPPT 協議版本(`HTTP/1.1`)，狀態碼(`200 OK`)  
**標頭**：指定數據類型(`Content-Type`)、內容長度(`Content-Length`)
、時間(`Date`)  
**主體**：伺服器返回的 HTML、JSON 或其他格式的內容。

### HTTP 工作流程

1.使用者在瀏覽器輸入 URL，例如 `https://lioouzzz.github.io/sleepblog/`  
2.瀏覽器向 Web 伺服器發送 HTTP 請求。  
3.伺服器接收請求並返回相應的 HTML 頁面或其他資源。  
4.瀏覽器解析 HTML，並可能發出更多請求以獲取 CSS、JavaScript、圖片等資源。

#### 使用 HTTP 被盜用案例

像是，
惡意的使用者偽裝成功用網路來釣魚，當其他使用者連上時，就可以擷取封包，窺探傳書的內容，即使扣除掉這種不知名的網路免費網路，其實也沒辦法確認網路連線到目標伺服器的路上，每個節點都不會窺探、側錄你所傳遞的資料。

所以我們為了避免這種情況，就要把資料加密。

### HTTPS 是什麼？


所以 HTTPS 是什麼？
全名**HperText TransferProtocol Secure，安全超文本傳輸協議**，連接埠 443  
是在 HTTP 基礎上加上 SSL/TLS 加密層，使得數據在傳輸過程中是加密的，能夠有效防止攔截和竄改。

#### HTTPS 特點

1.數據加密(Encryption):透過 SSL/TLS 來加密傳輸中的數據，避免被中間人攻擊(MITM)  
2.數據完整性(Integrity):確保數據在傳輸過程中沒有修改或損壞  
3.身分驗證(Authentication):確保客戶端和伺服器之間的通信是可信的，通常透過 SSL/TLS 憑證(SSL Certificates)來驗證伺服器身分

#### HTTPS 工作流程

1.瀏覽器發送 HTTPS 請求，例如 `https://lioouzzz.github.io/sleepblog/`  
2.伺服器返回 SSL/TLS 憑證(Certificate)  
3.瀏覽器驗證憑證是否合法(是否由可信的 CA 簽發)  
4.若合法，瀏覽器和伺服器建立安全連線，交換加密密鑰(SSL/TLS Handshake)  
5.之後所有的 HTTP 數據都會被加密傳輸

### SSL/TLS 握手過程

1.Client Hello： 客戶端發送支持的 TLS 版本和加密算法列表  
2.Server Hello： 伺服器回應選擇的 TLS 版本、加密算法、提供 SSL 憑證  
3.憑證驗證： 客戶端驗證 SSL 憑證是否合法  
4.密鑰交換： 客戶端和伺服器交換密鑰，用於對稱加密  
5.開始加密通信

### HTTP 和 HTTPS 的比較

| 特性           | HTTP                     | HTTPS                       |
| -------------- | ------------------------ | --------------------------- |
| **安全性**     | 無加密，容易被竊聽、篡改 | 使用 SSL/TLS 加密，安全性高 |
| **傳輸速度**   | 快 (無加密)              | 稍慢 (需加密/解密)          |
| **數據完整性** | 容易被篡改               | 具備完整性驗證              |
| **使用場景**   | 普通網站                 | 電子商務、銀行、登入頁面    |

### 為什麼要使用 HTTPS

1.保護使用者隱私:防止密碼、個人訊息被竊取  
2.防止中間人攻擊:避免中間人修改訊息  
3.提高網站信任度:Google 會對 HTTPS 網站進行 SEO 加分  
4.瀏覽器強制 HTTPS:Chrome、Firefox 會對 HTTP 網站標記為「不安全」

#### 如何把 HTTP 升級至 HTTPS

1.申請 SSL(Let's Encrypt):適合個人或小型網站  
2.付費 SSL(DigiCert,GlobalSign,Verisign)  
3.配置 Web 伺服器

- Nginx 設定 HTTPS
- Apache 設定 HTTPS

### 總結

了解了 HTTP 和 HTTPS 的不同後，所有網站都應該使用 HTTPS，以確保數據安全並提升網站可信度！
