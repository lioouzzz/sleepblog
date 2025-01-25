+++
date = '2024-11-24T11:00:37+08:00'
draft = false
title = 'Python 函數'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'
categories = ["python"]
tags = ["python","後端"]
toc = true
+++


### 定義函數

寫函數的目的是為了把一段邏輯或程式碼抽象化，並且可以重複使用。
<!--more-->

```python
def say_hello():
    print("hello!")
```

執行函數之後要縮排(Indentation)，如果沒縮排就會出現 `IndentationError`的錯誤訊息喔!

或是也可以寫成一行
```python
def say_hello():print("hello")
```

#### pass

```python
def say_hello():
    pass
```
還沒想到要寫什麼可以先用pass卡位，連編譯時都會被忽略，因此放上任何關鍵字都不會有問題。

#### 參數
在python中，函數的參數是放在 `( )` 裡面，如果裡面有好幾個參數，就用 `,` 隔開，例如我有一個把
華氏溫度(Fahrenheit)轉換成攝氏溫度(Celsius)的計算函數:

```python
def fahrenheit_to_celsiue(temperature):
    return (temperature-32)*5/9
```
這裡的`temperature`就是這個函數的參數，也是這個函數的 **區域變數**

執行函數

```python
#無參數的
say_hello() 

#有參數的
fahrenheit_to_celsius(95) #35.0
fahrenheit_to_celsius(27) #-2.7777777777777777
```

在上面看到的  `95` 跟  `27` ，稱做引數 (Argument)
在定義函數的時候，放在小括號裡的是參數，在執行函數的時候，帶進小括號裡的是引數。


原本的函數如果定義了參數，在執行函數時，引數數量要和參數數量一樣，**不能多也不能少**

```PYTHON
# 不需要帶參數但硬給它一個
say_hello("小花")
TypeError: say_hello() takes 0 positional arguments but 1 was given
```


#### 關鍵字引數
假設寫了一個身體質量指數(Body Mass Index,BMI)的函數，並定義了 `height` 和 `weight` 兩個參數，像這樣:

```PYTHON
def calc_bmi(height,weight):
    print(height,weight)
```

執行函數時可以指定參數的名稱，甚至跟 **定義的參數位置不一樣也沒關係**，「關鍵字引數（Keyword Argument）」，
```PYTHON
calc_bmi(170, 60)
calc_bmi(weight=60, height=170)
calc_bmi(height=170, weight=60)
```

原本需要按照順序、逐個傳入引數的方式叫做「位置引數（Positional Argument）」


#### 位置引數和關鍵字引數的規則

1.位置引數必須要在關鍵字引數之前
```PYTHON
calc_bmi(170, weight=60) #這可以
calc_bmi(weight=60, 170) #這不行
```
報錯內容 `SyntaxError: positional argument follows keyword argument`

2.一個參數不能重複傳兩次
```PYTHON
calc_bmi(170, height=60) #這不行
```
第一個參數是放height，第二個是weight，不能重複!  
報錯內容 `TypeError: calc_bmi() got multiple values for argument 'height'`


如果在定義參數的時候加上 `/ ` 標記，像這樣：
```PYTHON
def print_something(a, b, c, /, d, e):
    print(a, b, c, d, e)
```
這表示，在 `/` 之前只能用位置引數，`/`之後都可以任意使用

```python
print_something(1, 2, 3, 4, 5)        # 全部都是位置引數，可以
print_something(1, 2, 3, e=5, d=4)    # 後面兩個是關鍵字引數，也行
print_something(1, 2, c=3, e=5, d=4)  # 這樣不行！
```

第三種寫法的報錯內容：
`TypeError: print_something() got some positional-only arguments passed as keyword arguments: 'c'`

如果在定義參數的時候加上 `* ` 標記，像這樣：
```python
def print_something(a,b,c,*,d,e):
    print(a,b,c,d,e)
```
`*` 之後的參數都只能用**關鍵字引數**，不可以使用位置引數：

```python
print_something(1, 2, 3, e=5, d=4)        # 後面兩個是關鍵字引數
print_something(a=1, b=2, c=3, e=5, d=4)  # 全部都是關鍵字引數
print_something(1, 2, 3, 4, 5)            # 全部都是位置引數，不行！
```

#### 參數預設值
有些程式語言，像JavaScript對函數定義的參數沒有強制都要傳，多了也不會錯，少了就是得到 `undefined`  
不過python可就不一樣，參數引數的數量要一致，數量不對就會有錯誤訊息，不過參數如果有設定預設值，有些參數
不給也沒關係。例如:

```python
def hello(name,message="哈囉"):
    return f"{message}!我是{name}"
```
雖然有設定參數預設值，但如果我們有帶自己的值，就會用我們的值

```python
hello("香香") #輸出哈囉!我是香香!

#香香是我們家的小狗狗🤭
```

```python
hello("歐嗨唷~","劉同學") #輸出歐嗨唷~!我是劉同學
```

以下介紹一個有趣的參數定義random()例子

```python
from random import random 

def add_random_value(number,value=random()):
    print(f"{number=} {value=}")
```
```python
print(add_random_value(10))  # number=10 value=0.8444218515250481
print(add_random_value(20))  # number=20 value=0.8444218515250481
print(add_random_value(30))  # number=30 value=0.8444218515250481
```
為什麼三次獨立執行，得到的隨機數值是一樣的?  
因為因為python在定義函數的時候，**預設值是在定義的時候就計算好的，而不是在執行的時候才計算**

如果想要有不同的隨機數值結果，要這樣寫
```python
from random import random

def add_random_value(number,value=None):
    if value is None:
        value=random()
    print(f"{number=} {value=}")
```
或是這種寫法也可以
```python
def add_random_value(number,value=None):
    value=value or random()
    print(f"{number=} {value}")
```
預設值先給個 `None` ，然後再函數裡面再進行檢查，如果是 `None`，表示這個函數在呼叫時沒有帶 `value`參數，
所以這時候才用 `random()`函數產生隨機數值。這樣一來隨機函數在每次呼叫 `add_random_value()` 函數才被執行，
所以每次執行的時候就會有不同的隨機數值。

再舉一個類似的例子：
```python
def add_to_box(a,b,box=[])
    box.append(a)
    box.append(b)
    return box

    add_to_box(5,6) #[1,4]
    add_to_box(7,8) #[1,4,7,8]
```
為什麼執行第二次的時候，為什麼這個 `box`會記得之前的結果？  
因為函數在定義的階段就先幫我們定義了一個空串列  
在執行階段**只會判斷有沒有參數進來**，有就用你的，沒有就用預設的，所以在上例中
其實都是修改同一個串列，而不是新的串列，所以第二次執行會印出 `[1,4,7,8]`

解決方式:
```py
def add_to_box(a,b,box=None):
    box=box or []
    box.append(a)
    box.append(b)
    return box
```

簡單的說，如果在參數預設值，放入可變動的資料結構，要特別注意，因為參數的預設值是在函數定義階段就決定的。
如果要用參數預設值，參數先賦值為 None，讓它進來函數裡面在做判斷。

#### 不定數量參數
Python的函數定義了幾個參數，執行的時候，引數的數量就要按照參數定義的數量，不然就會有錯誤。
如果我們不知道使用者會帶幾個參數進來，或想要讓函數使用起來更彈性，內鍵函數 `print()`就是個例子:

```py

```

<!-- 不定數量參數-->

想讓函數的在操作參數更加彈性的話，可以在參數前面加上 \* 標記
這代表他們會吃下所有的 "位置引數(Positional Arguments)"
在執行函數時，會蒐集成 Tuple。

為什麼蒐集成 Tuple？
1.Tuple 有不可變的特性。 2.效能好。

這裡要注意:不會吃關鍵字引數！會報錯 (TypeError: fn got an unexpected keyword arguent " ")

`*`負責吃位置引數，會蒐集成 Tuple
`**`負責吃關鍵字引數，會蒐集成{}

如果你之後的參數就是想接關鍵字引數，遇到這種情形怎麼辦?
登登登! 那就使用兩個`**`
`**`負責吃關鍵字引數，會自動蒐集成{}

```python
def haha(*args,**kwargs*):
    print(args,kwargs)

haha(1,2,3,x=1,y=2)
haha(1,x=1,y=2,z=3)
```

小疑問:`**`為什麼蒐集成{}

<!-- 引數開箱(Unpacking) -->

這裡可能會有小疑問，是要開箱什麼?
如果學過 Js 的話，可以理解成解構，把一包東西展開。

串列、字典、Tuple、集合都可以用`*`來開箱，函數中的引數也可以使用開箱喔!
開箱 Aka 解包

好處在哪裡？　用一段程式碼介紹

如果這時有個串列，想帶進函數裡，一般會這樣做

```python
def water(a,b,c):
print(a,b,c)  #定義一個函數

flowers=["yellow","purple","green"]
print water(flowers[0],flowers[1],flowers[2])
```

寫久了覺得這種方式很麻煩 ，do re mi so🪄
開箱這時派上用場，可以使用`*`直接展開他們!

```python
def water(a,b,c):
print(a,b,c)  #定義一個函數

flowers = ["yellow", "purple", "green"]
print(water(*flowers))
```

解開變成位置引數，帶到函數裡面

使用`*`開箱要注意，Tuple、串列都可以使用
但不適用於集合，由於集合的無序性，解開的引數順序可能不理想!

延續`**`負責吃關鍵字引數，會蒐集成{}的概念，
字典使用`**`開箱(展開成關鍵字引數傳給函數)

```python
flowers = {a:"yellow", b:"purple", c:"green"}
print(water(**flowers))
```

<!-- Docstring -->

```

```

<!-- 回傳值 -->

return value

<!-- Python 作用域 -->

作用域 LEGB

區域 Local
封閉 Enclosing (發生在函數裡面的函數)
全域 Global
內建 Built-in (list、str、int、print)

nonlocal 不是區域變數，不會往全域變數找

LEGB 優先順序:
如果自己函數有定義的話，會優先使用，L(Local)
如果在函數裡面還有函數的話，在自己這一層沒有定義，會往外曾函數找，這是 G
如果各層函數都找不到或是函數只有一層的話，會往全域變數找，這是 G
如果全域變數也沒定義，才會找內建的函數或變數，這是 B

<!-- a=a+1 -->

```python
a=1

def hi():
    a=a+1  #這裡有a，但是還沒賦值，類似於Js的let 第一階段的TDZ
    print(a)

hi()
print(a)

#執行結果會報錯，cannot access local variable "a" where it is not associated with a value
```

```Python
a=1
def hi():
    global a  #把外面的a改成3
    a=3

hi()
print(a)
```
