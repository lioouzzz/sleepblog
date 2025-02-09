+++
date = '2025-02-09'
draft = false
title = 'Token'
show_reading_time=true
featured_image = 'images/token__.png'
categories = ["資安"]
tags = ["後端"]
toc=true
+++

### Token的基本定義
Token是一個代表某種權限或身分的字符串
通常包括加密或編碼的資訊
可以是暫時性或永久性的憑證
<!--more-->

簡單的來說就像一個「在網路上的臨時的識別證」  
登入網站後，系統會給你特殊的字串
這個字串包含了你的身分資訊，每次訪問網站，可以用這個識別證來證別身分。

### 為什麼需要Token?
☁️**解決無狀態問題**  
HTTP是無狀態的，每次請求都是獨立的。伺服器不會直接知道是來自哪個使用者，Token可以幫助伺服器是別使用者身分。  

◦ 免重複傳送敏感資訊(帳號密碼)。  
◦ 防止中間人攻擊，因為Token通常是加密的  
◦ 可以設定過期時間，降低被盜用的風險  
◦ 可以隨時撤銷特定的Token，而不影響其他登入狀態  

☁️**效能優化**  
◦ 減少資料庫的查詢  
◦ 不需要每次都查詢資料庫來驗證身分  
◦ 降低伺服器負擔  
◦ 不需要維護會話狀態  
◦ 適合分散是系統架構  

☁️**改善使用者體驗**  
◦ 不需要重複登入  
◦ 可以實現「記住我」的功能  
◦ 支援單一登入（SSO）機制  

☁️**支援多種認證方式**  
◦ OAuth 2.0    
◦ 第三方登入（Google、Facebook等）  
◦ 雙因素認證（2FA）  
◦ 一次性密碼（OTP）  

☁️**權限管理**  
◦ Token 可以包含使用者的權限資訊  
◦ 可以動態調整使用者權限  

```js
// JWT Token 範例
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjM0IiwibmFtZSI6IkpvaG4iLCJpYXQiOjE1MTYyMzkwMjJ9.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Token資訊包含
◦ 使用者資訊(ID、名稱)  
◦ 權限資訊(可以存取哪些資源)  
◦ 有效期限(什麼時候過期)  
◦ 其他資訊(如:發行者、簽名)  

```js
// 前端發送請求時帶上 Token
fetch('https://api.example.com/data', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
```
### 常見的Token類型
☁️JWT(JSON Web Token):最常見的格式  
☁️Refresh Token：用於更新 Access Token  
☁️Session Token：用於追蹤使用者會話  

### JWT
對Token有了基本概念之後，接下來可以來介紹JWT的登入機制
**所謂的JWT認證就是把「登入資訊儲存在前端Client中的一項技術」**，也就是說登入資訊會直接儲存在前端的Client，在後端是不會儲存任何一筆登入資訊。

簡單說明一下JWT的運作邏輯，如果我是一個使用者，帳號密碼是HAHA/610，這時當我在網站上輸入帳號密碼嘗試登入，後端Server一樣會先去認證這組HAHA/610有沒有註冊過。

不過！假如這組密碼存在，**後端Server就會產生JWT格式的Token，並且會直接返回該Token，並且不用在後端Server儲存這個Token的數據**
![alt text](image.png)
所以在JWT認證的世界裡，後端完全不用儲存任何一筆JWT數據，後端要做的事情就只有生成JWT Token，然後回傳就好，就是這麼簡單  
       ⸜(* ॑꒳ ॑* )⸝🌸

不過這樣要怎麼驗證JWT Token是有效的？

**可以把這整個流程想像成「入場券」的例子：**

1.登入與發放入場券  
當你成功登入後，後端會給你一個「入場券」，也就是 JWT Token。這個入場券上記錄了你的身份資訊（例如用戶 ID、權限等），而且後端用一個只有它知道的秘密金鑰對這張票做了簽名，就像在票上蓋了一個獨特的印章，保證票的真實性。  

2.使用入場券進入其他房間：   
當你之後要進入其他受保護的 API（可以想像成其他需要許可才能進入的房間）時，你只需要在 API 請求中把這張入場券（JWT Token）帶上。  

3.驗證入場券：  
後端在收到這個請求後，會先檢查你帶來的入場券上的簽名。這一步就像門衛驗證票上的印章是否正確。如果印章（簽名）是正確的，就證明這張票確實是後端發給你的，而且票上的資訊沒有被篡改。  

4.信任票中的內容：  
一旦驗證成功，後端就「無條件」信任票中記載的內容，不用再進一步驗證你的身份，直接認定你有權訪問該 API。  　　

總結來說：  
JWT Token 就像是一張經過簽名的入場券  　
每次進入受保護區域時，只要票（Token）上的印章（簽名）  正確，後端就相信票上的資訊，允許你進入。　 　

![alt text](image-1.png)

所以 JWT 這種登入機制，他就是「將登入的資訊儲存在前端 Client 上」的一項技術。

![alt text](image-2.png)

### Session
**所謂的Session認證，就是把登入資訊儲存在後端Server上**一項技術，，就是後端 Server 會儲存這個使用者的登入資訊，並且回傳一個 Session id 給使用者。

舉例來說，我是一個使用者，我的帳號密碼是HAHA/610，
這時我在網站上輸入我的帳號密碼，並且嘗試登入，這時後端Server一樣會先去驗證我的帳號密碼HAHA/610是否有註冊，**如果這組帳號密碼存在的話，後端Server會生成一個Session id(`66EE89C175E`)，並且將 Session id 存放在資料庫中，然後將 Session id 回傳給前端**。

所以當前端(以瀏覽器為例)收到Session id的值，前端可以把這個Session id的值放到Cookie中，等待後續使用。
因此這裡就完成登入的操作，所以使用者理論上就會被跳轉回首頁，並且已經是成功登入的狀態。

使用者成功登入後，如果想要去call其他受保護的api，這時前端就可以在call api時，同時也帶上當初後端Server發放的Session id，後端收到請求後，就可以去資料庫查詢這個Session id是否存在，如果存在，代表這個使用者已經成功登入，可以允許這次的api通過，進而返回結果給前端。

![alt text](image-3.png)

**所以對於 Session 這種登入機制而言，所有的登入記錄都是儲存在「後端 Server」上**，前端所拿到的 Session id 的值，其實就只是一組沒有意義的亂碼，只有後端 Server 才知道這組 Session id 實際上對應到的是哪個使用者的登入資訊。

**因此 Session 這種登入機制，他就是「將登入的資訊儲存在後端 Server 上」的一項技術**。
![alt text](image-4.png)

### 補充：JWT
在JWT的結構中，可以分成3個部分，`header`、`payload`、`signature`
舉例來說，下面這一串亂碼：
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoi5Y-k5Y-kIiwiaWF0IjoxNzIxMDAxNjAwfQ.G41XQGNNJ5Tp88U48aXh4n0XtGkpPkQ3xK6j43_61gE309hzyTVyciG5v05aVIvvY9NrApYiQdvwlMMrjRPFVV8xunghtKKFMj3kPx93Ll8Pf6n-tDiL_NZYqcusrgwtb-EDza80hMG5PTu75ogTIfRKr4jC0_FZzLaMix07LaZReoUSionTWTxJlm8qJc0BAFXgsaGNs9oVhCXOg_jJmOfFZBP0tD3q4xaKp9MTtLRTtslAhoAjPczdnPqaWGcaS8OY11RUTvvxijA7W-mPRlmqt0Hd_XForETUFZRdCKsPQIiGjkavycPtdiViVihQKstHlT4afEzYvzWSeK1cnw
```
就可以被解析成 `header`、`payload`、`signature` 這三個部分（每一個部分之間用一個點 `.` 隔開）。

header：
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
```
payload：
```
eyJzdWIiOiIxMjMiLCJuYW1lIjoi5Y-k5Y-kIiwiaWF0IjoxNzIxMDAxNjAwfQ

```
signature：
```
eyJzdWIiOiIxMjMiLCJuYW1lIjoi5Y-k5Y-kIiwiaWF0IjoxNzIxMDAxNjAwfQ
```

而後端在生成JWT時的Token時，後端會把`header`和`payload`的值組合起來然後用 **hash+非對稱加密**的方式，生成一個`signature`(簽名)的值出來。

假設駭客偷修改的`payload`的數據，最終解析出來的signature簽名，就會跟原始簽名值不一樣，因此可以透過這種 **數位簽名**的方式，避免被駭客偷偷修改`payload`中的數據。

#### Session的優缺點
因為Session的特性是把登入資訊儲存在後端Server上，
**因此後端Server能夠主動刪除使用者的登入資訊**，
（後端只要將資料庫中的 Session id 的數據刪除，該名使用者的登入記錄就會被刪除，因此就能夠實作「將使用者強制登出」的情境）。

但也**因為 Session 的數據是儲存在資料庫中，因此當數量變多時，就會影響資料庫效能**，所以當使用者數量到達百萬級之後，Session 認證就會遇到許多擴展上的困難。

#### 使用JWT的優缺點  
JWT 的特性是將登入的資訊儲存在前端 Client 中，所以就算使用者數量到達百萬級別，也不會對後端 Server 造成影響，因此很適合用在大型的微服務架構下、或是 SSO（Single Sign-On，單一登入）的使用情境。

但也因為 **JWT 是將登入的資訊儲存在前端 Client 中，因此後端 Server「沒有能力」主動刪除使用者的登入資訊**（因為後端會無條件相信 JWT Token 中的數據，所以後端沒有辦法主動撤銷某個 JWT Token，只能被動的等待該 JWT 自己過期失效）。

圖片來源：[古古的後端筆記](https://kucw.io/blog/session-vs-jwt/)  
參考來源：[古古的後端筆記](https://kucw.io/blog/session-vs-jwt/)、[JWT官網](https://jwt.io/introduction)