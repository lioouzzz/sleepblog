+++
date = '2024-12-07'
draft = false
title = 'JS-Getter & Setter'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'

+++

### 什麼是 Getter 和 Setter？

是 JS 中用來**操作物件屬性的方法**，他們可以讓我們像存取普通屬性一樣簡單地取值、或設定值，但其實背後可以執行更多的程式邏輯。

<!--more-->

- getter(取值器)  
  用來「讀取屬性」時執行的函式。
  像普通屬性一樣存取，但可以執行程式邏輯。

- setter（設值器）
  用來「設定屬性」時執行的函式。
  可以在設值時檢查、轉換或處理值，保護資料的一致性。

#### 如果不使用 getter & setter

```js
class Person {
  contructor(name) {
    this.name = name
  }
}

const person = new Person('Elaine')
console.log(person.name) //直接存取屬性，印出Elaine
person.name = 'Bob' //改變屬性
console.log(person.name) //印出Bob
```

任何人都可以直接修改 name，可能帶來不正確的結果。

#### 使用 getter & setter

```js
class Person {
  contructor(name) {
    this._name = name //私有屬性（用 `_` 表示內部使用）
  }

  // 定義 getter，讓外部可以「讀取」名稱
  get name() {
    return this._name
  }

  set name(value) {
    if (!value) {
      throw new Error('Name cannot be empty!')
    }
    this._name = value
  }
}
const person = new Person('Elaine')
console.log(person.name) // 使用 getter，印出 Elaine

person.name = 'Bob' // 使用 setter，設置名稱
console.log(person.name) // 使用 getter，印出 Bob

try {
  person.name = '' // 使用 setter，嘗試設置無效值
} catch (error) {
  console.log(error.message) // 印出錯誤：Name cannot be empty!
}
```

#### 為什麼要用 getter 和 setter？

1. 封裝邏輯  
   當存取或設定屬性時，可以在背後執行檢查或計算，例如 set name(value)可以檢查名稱是否有效，確保資料一致性

2. 提高程式可讀性
   使用 person.name 存取名稱，程式碼看起來像直接讀取屬性，實際執行的是函式邏輯，易於理解

3. 控制屬性存取權限
   可以限制某些屬性是「唯讀」的，只允許 getter，不定義 setter
   javascript
