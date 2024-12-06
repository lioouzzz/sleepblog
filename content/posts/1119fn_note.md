+++
date = '2024-11-24T11:00:37+08:00'
draft = false
title = 'Python 函數'
show_reading_time=true
featured_image = '/static/images/ribbon candle.jpg'

+++

<!-- 參數、引數 -->

### 參數、引數

參數 參數預設值
引數 關鍵字引數、位置引數

<!-- 位置引數、關鍵字引數 -->

在函數的參數裡打 / ，代表在 / 之前的參數，都要用位置引數
在函數的參數裡打 _ ，代表在 _ 之後的參數，都要用關鍵字引數
夾在/ \*之間的參數都可以用
python 的參數預設值，在函數定義的時候就決定好了。

<!-- 參數預設值 -->

如果在參數的預設值放入可變動物件，[]、{}，可能不會得到想要的答案
如果要用參數預設值，參數先賦值為 None，讓它進來函數裡面在做判斷
不要急著把可變動物件在參數預設值時就直接定義。

<!--more-->

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
