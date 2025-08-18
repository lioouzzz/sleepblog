+++
date = '2025-08-18'
draft = false
title = 'MAGic CooKie 🍪'
show_reading_time=true
featured_image = 'images/butterflycookies.png'
categories = ["後端"]
tags = ["後端","驗證"]
toc=true
+++

magic cookie，幸運餅乾。

不知不覺轉眼已是 8 月下，
隔了好久有新文章，現在是邊上班邊學習的狀態，
還有好多的知識要補齊，
雖然當下總覺得整理資料好麻煩，不過隔段時間回來看，還是有可以學習的地方，
留下些產物總是好的 🪺

<!--more-->

## magic cookie，幸運餅乾

Cookie 是一種由「伺服器或用戶端（瀏覽器上的 JavaScript）」建立，然後「由瀏覽器儲存」的小型文字資料，用於在之後的請求中，自動附加在 HTTP Header 上送給伺服器。

瀏覽器為某個 **(網域、路徑)** 儲存的一小段 **鍵值資料** ，由伺服器透過`Set-Cookie`回應頭設定; 之後瀏覽器對**符合條件**的請求，會附上 Cookie 請求頭。

伺服器只有在「需要變更 Cookie 狀態」的時候才會回應 Set-Cookie，否則就不會出現。

**Set-Cookie 只會出現在 伺服器的回應 (Response)**
**用途：** 告訴瀏覽器「請你存這個 cookie」

格式:

```HTTP/1.1 200 OK
Set-Cookie: SessionId=abc123; Path=/; HttpOnly


```

瀏覽器收到後，會把它存起來（存在記憶體或硬碟，取決於是否設定 Expires 或 Max-Age）。

**Cookie 只會出現在 瀏覽器的請求 (Request)**

**用途：** 瀏覽器主動把符合網域與路徑條件的 cookie 附加回去給伺服器。

```
GET /home HTTP/1.1
Host: example.com
Cookie: SessionId=abc123
```

Set-Cookie → 後端寫的，出現在回應 (Response)

Cookie → 瀏覽器自動帶的，出現在請求 (Request)

## cookie 的屬性解釋

`Name=Value`:鍵值。同名 cookie 可能會因為網域/路徑不同而同時存在  
`Domain/Path`:定義了 cookie 的範圍，他們告訴瀏覽器 cookie 屬於什麼網站。 Cookies 只能設定在當前資源的頂級域和子域.

如果伺服器沒有指定 cookie 的`Domain`和`Path`，則他們預設為所請求資源的域和路徑

`Expires`/`Max-Age`:存活時間。格式為`Wdy, DD Mon YYYY HH:MM:SS GMT`或`Wdy, DD Mon YY HH:MM:SS GMT`（YY 大於或等於 0 並且小於等於 69）。

🕸️ 不設定 →Session Cookie (關掉瀏覽器就沒了)  
🕸️ 設 Max-Age=0 或過去的 Expires→ 刪除

`Secure`: 只在 HTTPS 下傳送

`HttpOnly`:要求瀏覽器不要通過(HTTP 和 HTTPS)以外的管道使用 cookie，這樣就無法通過客戶端手稿語言(js)，訪問 cookie，無法用**跨站點指令碼攻擊**輕易竊取。

`SameSite`:限制跨站自動帶出行為(防 CSRF)

🕸️`Lax`:預設值(多數瀏覽器)。同站請求會帶; 跨站頂層導覽 GET 也會帶，其他跨站請求 不帶。  
🕸️`Strict`:只有同站才帶，最保守

🕸️`None`:允許跨站，但必須同時有`Secure`

🕸️`Priority`: High | Medium | Low，瀏覽器資源吃緊時的清除優先序提示.

瀏覽器會對 **同網域（依 Domain 規則）且路徑匹配（依 Path）** 的請求，附上符合條件的 Cookie。

🕸️**所有資源請求** （HTML、XHR、圖片、CSS…）都可能帶 Cookie ⇒ 請勿把敏感資訊放在 Cookie 名稱或值中（避免落地到 Log、CDN）。

🕸️**跨站要受 SameSite 限制**；另外若用 `fetch/XHR`，要設 `credentials` 才會攜帶 Cookie（見下）。

```
HTTP/1.0 200 OK
Set-Cookie: LSID=DQAAAK…Eaem_vYg; Path=/accounts; Expires=Wed, 13 Jan 2021 22:23:01 GMT; Secure; HttpOnly
Set-Cookie: HSID=AYQEVn…DKrdst; Domain=.foo.com; Path=/; Expires=Wed, 13 Jan 2021 22:23:01 GMT; HttpOnly
Set-Cookie: SSID=Ap4P…GTEq; Domain=foo.com; Path=/; Expires=Wed, 13 Jan 2021 22:23:01 GMT; Secure; HttpOnly
```

## 用途典型搭配

🕸️**Session Cookie (最常見)**:
伺服器簽發 `sessionId` → `Set-Cookie` 存在瀏覽器 → 後續請求自動帶上 `sid`。

**優點:** 可立即撤銷（砍伺服器端 session）、權限變更即時生效。

**缺點：** 要維護伺服器狀態（分散式要共享/外部儲存）。

🕸️**Token-in-Cookie (最常見)**: 常把**Refersh Token**
或**短效 Access Token** 放在 Httyonly+Secure Cookie，減少 XSS 風險。
若走 Cookie，自動帶出站 → 要考慮 SameSite / CSRF。

CSRF 防護（與 Cookie 密切相關）

因為 Cookie 會自動帶，所以跨站請求可能被濫用 ⇒

設 SameSite=Lax/Strict；

🕸️ **CSRF Token（Double Submit/同步器 Token）** ：瀏覽器端額外送一個只有同站可取得的 Token，伺服器比對。

## 限制與陷阱

**大小限制：** 單個 Cookie 一般上限約 4KB；太大會被截斷或拒收。

**數量限制：** 每網域可存的 Cookie 有上限（各瀏覽器不同，數十到數百）；超過會被丟棄（常是最早/最低優先）。

**同名/遮蔽：** 同名不同 Path/Domain 的 Cookie 可能同時存在；伺服器解析時要留心「哪一個生效」。

**日誌與洩漏**：Cookie 會進入 HTTP 頭，不要把敏感資訊放進 Cookie 值或名稱；避免被 Proxy/CDN/Server 日誌記錄。

**效能：** 每次請求都帶 Cookie ⇒ 大型 Cookie 會增加頻寬與延遲。

**跨站定義：** Site ≠ Origin。SameSite 以「註冊式網域+子網域」為準（eTLD+1），而非含埠號的完整 Origin。

**None 要 Secure：** SameSite=None 必須搭 Secure，否則會被瀏覽器忽略。

### Cookie、sessionStorage、localStorage 有什麼差別？

`cookies`: 客戶端瀏覽器首次發送請求後，伺服器會`Set-Cookie`在回應的頭部新增 cookie，並將 cookie 放進回應，傳回使用者瀏覽器，cookie 就會儲存在用戶端本機，當下一次使用者瀏覽器發送請求時，就會攜帶 cookie 傳回給伺服器。

`sessionStorage` `localStorage` : 都屬於都屬於 Web Storage API，存放在 瀏覽器端（不像 Cookie 會自動發給伺服器）。

儲存的是 Key-Value 文字資料（字串型態）。如果要存物件，通常用 JSON.stringify() / JSON.parse()

容量比 Cookie 大很多（通常 5MB 左右，Cookie 只有 ~4KB）。

存資料

```
// localStorage
localStorage.setItem("theme", "dark");

// sessionStorage
sessionStorage.setItem("draft", "Hello World");

```

取資料

```
let theme = localStorage.getItem("theme");        // "dark"
let draft = sessionStorage.getItem("draft");      // "Hello World"

```

刪除資料

```
localStorage.removeItem("theme");
sessionStorage.clear(); // 清空所有

```

### 何時用哪一個

`cookies`會自動包含在 HTTP 請求裡面，所以他們經常使用於需要使用者識別的場景

`localStorage`比 cookie 大很多，而且不容易被刪除，所以 應用比較廣泛，所以 應用比較廣泛，例如跨頁面的資料傳輸，或是需要長期保存的資料。

`sessionStorage` 由於其生命週期較短，適合保存一次性使用的數據，例如保存表單資料。

#### 生命週期

`cookies` ：可以使用`Expires`表示過期時間，也`Max-Age`可以表示有效時間長度，不設定則預設關閉瀏覽器後過期。

`localStorage`:除非在客戶端手動刪除，或清除程式碼，否則會永久儲存。

`sessionStorage`:每次關閉頁面或關閉瀏覽器時都會自動清除。

#### http 請求

`cookies`：它將附加在 HTTP 標頭中並隨每個請求一起發送，因此如果使用過多，可能會導致效能問題。
`localStorage`和`sessionStorage`：它們僅存在於客戶端的瀏覽器中，並且不會隨每個請求發送。

#### 如何提高 cookie 安全性？

由於 cookie 會隨著 HTTP 請求自動傳送到伺服器，所以需要考慮安全性問題。

`Secure`：使用`Secure`，可以確保透過 HTTPS 協定傳送請求時，只有加密的請求才會傳送到伺服器。

`HttpOnly`：有了`HttpOnly`，就可以避免用`JavaScriptDocument.cookie`方法獲取`HttpOnly`

`cookies`，`HttpOnly cookies`只會傳送到伺服器，這種方法可以避免跨站腳本攻擊（XSS）。

資料來源：[請描述 cookie, sessionStorage 和 localStorage 的差異](https://www.explainthis.io/zh-hant/swe/cookie-sessionstorage-localstorage-difference)
