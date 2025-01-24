+++
date = '2024-12-09'
draft = false
title = 'Js-var、let、const'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'
categories = ["javascripts"]
tags = ["Js","前端"]
toc = true
+++

### let，var，const 有什麼差別？

1.早期 Js 只有`var`，只到 ES6(ES2015)時，才加入了 `let`跟 `const`  
2.在作用域上，`var`可以是**全域**，也可以是**函式**做為範圍。

<!--more-->

- var 在全域中有可能造成全局汙染

```js
var greeting = 'hello'

window.greeting //"hello"
```

3.`let`和 `const` 則是以**區塊**作為範圍。  
4.`var`可以被**重複宣告**，但是 `let` 和 `const` 不行。

```js
var hello = 'goodmorning'
var hello = 'byebye'
//var 可以重複宣告
```

```js
let greeting = 'hello!'
let greeting = 'byebye'

//let不能重複宣告
```

```js
let greeting = 'hello!'
greeting = 'byebye'

//let可以重新賦值
```

5.`let`可以重新賦值，但是`const`是常數，不能重新賦值。

### 賦值差異

如果變數是原生值，例如字串、數字.....，則不可改變。
如果變數是**物件(objects)**，則不論 `let` 和 `const` 都可以改變該物件。
