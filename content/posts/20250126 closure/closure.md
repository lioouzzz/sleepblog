+++
date = '2025-01-26'
draft = false
title = 'Python-閉包(Closure)'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'
categories = ["Python"]
tags = ["python","後端"]
toc=true
+++


### 自由變數
<!--more-->

```py
def hi():
    message="hello,doggy!"
    def byebye():
        print(message)
```
在內層的`byebye()`並沒有定義`message`函數，依照LEGB順序，它會往外找到外層`hi()`函數的區域變數`message`，
像這種情況，**內層函數本身沒有定義，而是使用外層函數的區域變數情況**
我們就稱為「自由變數」。

如果把`message="Hello,doggy!"`放至全域變數，這種變數就不叫自由變數！
```py
message = "Hello, doggy!"

def hi():
    def hey():
        print(message)

    hey()
```

Python有提供一種更快速檢視函數中的自由變數，例如：
```py
def hi():
    a = 1
    b = 2

    def hey():
        print(a)

hi()
```
每個函數都有個` __code__ `屬性，它會回傳一個 Code Object
這是每個函數都有的屬性。這個 Code Object 裡記載了這個函數的相關資訊。

例如它有專門記錄自由變數的 `co_freevars` 屬性，開頭的 `co_` 就是 Code Object 的縮寫。

試著印出 `co_freevars` 屬性就會得到一個 Tuple `('a',)`，表示變數 a 對 hey() 函數來說就是個「自由變數」



### 閉包
閉包是指內部函數，能夠訪問外部函數，並且記住外部函數的變量，即使外部函數執行完畢，局部變量要被銷毀時，
內部變量依然能夠訪問這些變量。  

<!--more-->
閉包特點：  
1.外部函數裡面有一個內部函數，閉包就存在於內部函數中。  
2.內部函數必須引用外部函數的變量。  
3.外部函數返回內部函數，使外部依然可用，並保持對外部變量的引用。  

```py
def outer_function(x):
    y = 10
    def inner_function(z):
        return x + y + z
    return inner_function

# 創建閉包
closure_func = outer_function(5)

# 調用閉包
result = closure_func(3)  # 計算 5 + 10 + 3 = 18
print(result)  # 輸出：18

```
在這個例子中：
`outer_function` 定義了一個內部函數`inner_function`，並返回它。
`inner_function` 需要引用外部函數 `outer_function` 的變量 `x` 和 `y`。
Python 為 `x` 和 `y` 創建了 `cell objects`，以便 `inner_function` 可以訪問它們，即使 `outer_function` 已經執行完畢。

#### 閉包運作原理

>Cell Objects
“Cell” objects are used to implement variables referenced by multiple scopes.


拿以下這段程式碼做說明：
```py
def hi():
    a = 1
    b = 2

    def hey():
        print(a)
```
變數`a`分別被`hi()`函數和`hey()`函數這兩個Scope參照到，也就是說，
當遇到一個變數被參照到多個Scope，Python會在編譯階段會幫我們建立一個Cell物件。 

這個Cell物件會指向變數`a`原本要指向的數字1，原本的變數 `a` 跟 `hey()` 函數裡的變數 a 都是指向這個 Cell 物件，像這樣：

```py
a ------> < Cell 物件 > ----> 1
                    |
  hey.a -------|
```
不管有沒有發生閉包，只要變數在多個Scope被參考到，Python就會做這件事。這個Cell物件同樣可以透過函數的Code Object的`co_cellvars`屬性看到:

```py
>>> hi.__code__.co_cellvars
('a',)
```
執行之後會印出一個 Tuple ('a',)，表示在` hi()` 函數裡的變數 `a` 其實是指向 Cell 物件，再由 Cell 物件指向實際的值。

如果再繼續往下挖，在 Code Object 有一個 `co_varnames` 屬性是用來存放區域變數的：

```py
>>> hi.__code__.co_varnames
('b', 'hey')
```

從顯示結果可以看出來，在 `hi()` 函數裡面只有一個區域變數 `b` 跟函數 hey，也就是說變數` a `在 Code Object 的角度來看已經不算是區域變數，而是被歸類在 Cell 變數裡了。這些都是 Python 內部的實作細節，我們實際在寫程式碼的時候可以宏觀的來看就好，甚至就把它們都當區域變數來看待也沒問題。

```py
message = "Hello, doggy!" # 指向 Cell 物件

def hi():
    def hey():
        print(message) # 指向 Cell 物件
    return hey

greeting = hi()
greeting()
```

因為在 `hi()` 以及 `hey()` 這兩個函數的 Scope 裡都有參照到 message 變數，所以在這兩個 Scope 裡都是指向 Python 偷偷幫我們另外建立的 Cell 物件，因此在 `hi()` 外要執行 `greeting()` 函數試著想要印出 message 變數的時候，其實就是去找那個 Cell 物件，然後再找到這個物件對應到的值。

有興趣的話，可以透過函數的 `__closure__ `屬性可以看到這些 Cell 物件：

```py
>>> greeting.__closure__
(<cell at 0x104b553c0: str object at 0x104ba4c70>,)
```
`__closure__` 屬性是一個 Tuple，裡面放了一個 Cell 物件，再繼續往下挖就可以找到這個 Cell 物件對應到的值：

```py
>>> greeting.__closure__[0].cell_contents
'Hello, doggy!'
```
#### 閉包的應用
閉包有什麼用途，可以透過閉包用來建立一個私有的變數，就不會像全域變數那樣不小心被修改，宣告在函數裡的變數在外面是無法直接取用的。


閉包可以記住函數被定義時環境中的自由變數，利用這個特性可以用來實現一些有趣的功能，例如可以寫個簡單的計數器：

```py
def create_counter():
    count = 0

    def inner():
        nonlocal count
        count += 1
        return count

    return inner
```

在 `create_counter()` 函數裡設定了一個 `count` 變數，它會變成 `inner()`函數的自由變數，這裡也會發生閉包的行為。透過這個函數可以建立獨立的計數器，而且它們有各別的狀態：

```py
counter1 = create_counter()
counter2 = create_counter()

print(counter1())  # 印出 1
print(counter1())  # 印出 2
print(counter1())  # 印出 3

print(counter2())  # 印出 1
print(counter2())  # 印出 2

print(counter1())  # 印出 4
```

