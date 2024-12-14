+++
date = '2024-12-09'
draft = false
title = 'Js-什麼是Hoisting'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'
+++

### 什麼是 提升(Hoisting)？

在宣告變數、函數前，就使用程式碼，稱為 Hoisting。  
Js 的兩階端運作，宣告期和執行期。<!--more-->

提升，**用來形容 JavaScript 編譯階段將變數和函式的宣告存入記憶體的概念**。

#### `var`提升

第一階段宣告期，會給名稱，初始化`undefined`，第二階段執行期才會進行賦值。
`var` 的提升(hoisting)，就是變數宣告被提升了，提早呼叫，但是並不會被賦值。

```js
console.log(name) //undefined
var name = 'Elaine'
```

#### `let`提升 & `const`提升

不會初始化，沒有初始值(undefined)，`let` 和 `const`在第一階段是 **TDZ 暫時死區**，第二階段執行期會重生。因為 ES6 的關係，`let`、`const`提升，會出現錯誤。

```js
console.log(greeting) //Uncaught ReferenceError: Cannot access 'greeting' before initialization
let greeting = 'hello!'
```

#### let、const、var 提升差異

`var`會提升到函示作用域(function Scope)  
`let`跟`const`只會提升到區塊作用域(block Scope)

#### 函示提升

函式宣告也有提升，**與變數宣告的差異在於，可以在宣告前呼叫。**

```js
water() //1

function water() {
  console.log(1)
}
```

不過函式提升要注意的是，宣告方式不同，會得到不同的結果
使用函示聲明，可以成立運算。

如果用變數宣告(函式表達式)，就會報錯

```js
water() //water is not a function

var water = function () {}
```

```js
water() ///Uncaught ReferenceError: Cannot access 'greeting' before initialization

const water = function () {}
```

#### 為什麼有暫時死區(TDZ)

暫時死區的好處  
1.可以避免我們在變數還沒有宣告之前就被拿來使用  
2.為了`const`設計，const 是常數，不可重新賦值。如果和 var 一樣，宣告前訪問到 undefined，就不符合規範。

#### ES6(const、let)

解決了變數提升、重複宣告、全局污染的問題
