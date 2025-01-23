+++
date = '2025-01-04'
draft = false
title = 'Clipboard API 非同步剪貼簿API'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'
toc=true
+++


### Clipboard API
Clipboard API提供回應剪貼簿命令(剪下、複製、貼上)，以及<strong>非同步讀取</strong>和寫入系統剪貼簿的功能，支援一組有限的 MIME(媒體)類型，可從系統剪貼簿複製及貼上，具體來說是 `text/plain`、`text/html` 和 `image/png`
<!--more-->

還有另外一種方法是 ` document.execCommand()`，這種方式是同步的，只能讀取及寫入DOM，不建議使用的原因如下：

1. 即使只是貼上一小段文字，瀏覽器有時候還是需要暫時停住網頁的運作。
為什麼瀏覽器要這樣做？因為：
- 貼上的內容可能需要先清理或處理，確保安全
- 如果貼上的是圖片，需要時間解碼
- 如果貼上的內容包含連結，瀏覽器可能需要先載入這些資源

在這些情況下，瀏覽器需要等待：

1. 電腦硬碟的讀取
2. 網路連線的回應

另外還有權限的問題：
1. 瀏覽器需要先問使用者是否允許網頁存取剪貼簿
2. 不同瀏覽器對於剪貼簿的使用權限規定不太一樣
3. 舊式的 `document.execCommand()` 指令雖然權限比較寬鬆，但每個瀏覽器的做法都不太相同


[非同步剪貼簿 API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)可解決這些問題，提供明確的權限模型，不會封鎖網頁。Async Clipboard API 僅限於在大多數瀏覽器上處理文字和圖片，但支援程度各有不同。

### 使用Clipboard API 動態寫入內容，實現一鍵貼上
先來看最簡單的 `navigator.clipboard.writeText`

```JS
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText('這是寫入剪貼簿的內容');
});
```

另外，`clipboard.writeText`，會回傳Promise，可以利用`then()`、`catch()`，處理成功及失敗的邏輯

```JS
const copyButton = document.querySelector("#copyButton");
const copyInput = document.querySelector("#copyInput");

copyButton.addEventListener("click", function() {
    const text = copyInput.value;
    
    navigator.clipboard.writeText(text)
        .then(() => {
            alert(`成功複製到剪貼版: ${text}`);
        })
        .catch((error) => {
            alert("複製失敗，請重試");
        });
});
```

```js
const copyButton = document.querySelector("#copyButton");
const copyInput = document.querySelector("#copyInput");

    copyButton.addEventListener("click", async function () {
    const text = copyInput.value; 
    try {
        await navigator.clipboard.writeText(text); 
        alert(`成功複製到剪貼版: ${text}`);
    } catch (error) {
        alert("複製失敗，請重試");
    }
});

```


### 其他媒體類別的內容
要把其他媒體類別的內容放入剪貼簿相對較複雜，首先要使用的方法為`navigator.clipboard.write()`，該方法接受一個只有 `ClipboardItem` 項目的陣列（但直到目前為止各大瀏覽器的寫入剪貼簿實作 `navigator.clipboard.write()` ，只能帶入單個 ClipboardItem 至陣列中，接受一個物件作為參數，屬性是對應檔案大一月金型只接受 [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) 實例，假如要塞入 HTML 內容，就要建立對應的 text/html 媒體類別的 Blob 實例

```js
copyBtn.addEventListener('click', async () => {
  const clipboardItem = new ClipboardItem({
    "text/html": new Blob(
      ['<h1>這裡是 HTML 內容</h1><p>想不到吧！</p>'],
      { type: "text/html" },
    ),
  });

  await navigator.clipboard.write([clipboardItem]);
})
```

### ClipboardEvent
如果使用者在網頁中使用系統原生的複製、貼上功能，則可以使用 ClipboardEvent 中的copy 、paste 事件來進行監聽，例如有一些討論區會在你複製內容時，在結尾加入 來源於 xxx 的字句，這時就可以用 copy 事件：

```js
document.addEventListener('copy', function(event) {
  const selectedText = window.getSelection().toString();
  event.clipboardData.setData('text/plain', `${selectedText} 來源於: Elaine`);
  event.preventDefault();
})
```
使用者執行貼上時，對內容進行處理，可以使用paste事件:
```js
document.addEventListener('paste', function(event) {
    const pastedText = event.clipboardData.getData('text/plain');
    if (pastedText.includes('Elaine')) {
    console.error('(ㆆᴗㆆ)！');
  }
})
```

參考來源
[Medium文章](https://medium.com/@alexian853/clipboard-api-%E4%BD%A0%E8%A4%87%E8%A3%BD%E8%B2%BC%E4%B8%8A%E4%BA%86%E4%BB%80%E9%BA%BC-ae3afb515cd0)

[MDN — ClipboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent)

[Google Developers: Async Clipboard API](https://web.dev/articles/async-clipboard?hl=zh-tw)