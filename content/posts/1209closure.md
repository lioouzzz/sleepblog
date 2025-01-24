+++
date = '2024-12-09'
draft = false
title = 'Js-閉包(Closure)'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'
categories = ["javascripts"]
tags = ["Js","前端"]
toc=true
+++

### 什麼是閉包？

閉包被定義為函式被宣告時所在的作用域環境(lexical environment)，簡單來說，內部函式能夠取得外部函式的變數，並且記住這個變數，閉包很常被用來作為狀態保存。

<!--more-->

閉包這種特性，可以讓我們在內層函式，訪問到外部函式的作用域，並且記住外部的變數。

```js
function outer() {
  let a = 0
  function inner() {
    a += 1
    console.log(a)
  }
  return inner
}

const inner = outer()

inner() //1
inner() //2
inner() //3
```

當我們呼叫 inner 時，之所以可以能到外部函式 outer 的 a 變數，並保存在記憶體
之所以不是每次都回傳 1，而是回傳 1、2、3 且不斷加上去，是因為之前 a 的狀態被記住了。

#### 閉包的應用

1.狀態保存  
2.緩存機制  
3.模擬私有變數 在開發的程式碼內部細節並不想讓外部獲取，就可以用閉包做出類似功能。

#### 閉包缺點

閉包會讓內部函式記得外部變數，可能會造成變數常駐在記憶體中，使用過多會造成內存洩漏(memory leak)，要小心使用。
