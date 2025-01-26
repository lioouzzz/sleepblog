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

    add_to_box(5,6) #[5,6]
    add_to_box(7,8) #[5,6,7,8]
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
如果要用參數預設值，參數先賦值為 `None`，讓它進來函數裡面在做判斷。

#### 不定數量參數
Python的函數定義了幾個參數，執行的時候，引數的數量就要按照參數定義的數量，不然就會有錯誤。
如果我們不知道使用者會帶幾個參數進來，或想要讓函數使用起來更彈性，內鍵函數 `print()`就是個例子:

```py
print(1, 2, 3)       # 印出 1 2 3
print(1, 2, 3, 4, 5) # 印出 1 2 3 4 5

#要多少有多少
```
在python 可以用 `*` 來做到這件事，我們先用最簡單的型態看看是怎麼回事:
```py
def hi(*a):
    print(a)
```

```
>>> hi(1, 2, 3, 4, 5)
(1, 2, 3, 4, 5)

>>> hi(1, 2, 3)
(1, 2, 3)

>>> hi()
()
```
在參數面前加上 `*` ，表示這會吃下所有的「位置引數（Positional Arguments）
執行 `hi()` 函數之後就會發現，不論帶幾個引數給他，python都會把他們收集成一個Tuple，
甚至一個參數都不給，還會得到一個空的Tuple。

為什麼是Tuple，不是List? 因為Tuple不可變，效能也比串列好，參數列也不該一直被修改，包成Tuple也合理。

接下來就可以在函數裡利用迴圈來處理這一包引數，例如:
```py
def say_hello_to(*names):
    for name in names:
        print(f"哈囉{name}!")
```

這樣 `say_hello_to()`函數都能一次搞定:

```py
say_hello_to("小魔女") #哈囉小魔女!

say_hello_to("波音","麗娜","露亞")
#哈囉波音!
#哈囉麗娜!
#哈囉露亞!
```
如果 `*`會吃下所有的位置引數，我會這樣寫:
```py
def hi(a,*b):
    print(a,b)
```

```py
>>> hi(1, 2, 3)
1 (2, 3)
>>> hi(1)
1 ()
```

參數 a 是必要的，而參數 b 加上 `*` 表示會接收剩下所有的位置引數，所以如果執行 `hi(1, 2, 3)` 的話，數字 1 會分配給 a，而 2 和 3 會被包成 Tuple 丟給 `b`；如果是 `hi(1)` 的話，數字 1 還是分配給 `a`，但因為沒有剩下的引數，所以 `b` 會是空的 Tuple。


```py
def hi(a, *b, c):
    print(a, b, c)
```

```py
>>> hi(1, 2, 3, 4)

#執行會得到錯誤訊息：

TypeError: hi() missing 1 required keyword-only argument: 'c'
#b會吃下所有的位置引數，這樣c就要使用關鍵字引數才能正常運行
```

`*` 會把剩下的位置引數吃光光，這是因為如果引數裡有關鍵字引數會出錯：

```py
def hi(*a):
    print(a)

hi(1,2,3,x=4,y=5) #這行會出錯
```

抓取位置引數是 `*`，抓下關鍵字引數就是 `**`

```py
def hi(*a,**b):
    print(a,b)
```

```py
>>> hi(1, 2, 3, x=4, y=5)
(1, 2, 3) {'x': 4, 'y': 5}
```
這樣一來，前面 3 個位置引數同樣會被包成 Tuple 丟給參數 `a`，而後面的 `x=4` 以及 `y=5` 會被包成一個字典給參數 `b`

把 `*` 跟 `**` 像這樣組合在一起使用，就能讓函數抓到所有的引數。不過你可能更常看到這樣的寫法：
```py
def func(*args,**kwargs):
    print(args,kwargs)
```
`args` 跟 `kwargs` 其實就是 `arguments` 跟 `keyword arguments` 的意思。

<!-- 小疑問:`**`為什麼蒐集成{} -->

### 引數開箱
如果學過 Js 的話，可以理解成解構，把一包東西展開，在python翻譯成「解包」
串列、字典、Tuple、集合都可以用`*`來開箱，函數中的引數也可以使用開箱喔


好處在哪裡？　用一段程式碼介紹
如果這時有個串列，想帶進函數裡，一般會這樣做
```python
def water(a,b,c):
print(a,b,c)  #定義一個函數

flowers=["yellow","purple","green"]
print water(flowers[0],flowers[1],flowers[2])
```
寫久了會覺得這種方式很麻煩 
開箱這時派上用場，可以使用`*`直接展開他們!

```py
def water(a,b,c):
    print(a,b,c)

flowers = ["yellow", "purple", "green"]
print(water(*flowers))
```
如此一來就不用透過索引值一個一個寫，但如果串列裡的元素數量跟參數數量不一樣，
還是會出現引數過多或過少的錯誤。

使用`*`開箱要注意，Tuple、串列都可以使用
但不適用於集合，由於集合的無序性，解開的引數順序可能不理想!

延續`**`負責吃關鍵字引數，會蒐集成{}的概念，
字典使用`**`開箱(展開成關鍵字引數傳給函數)


```py
>>> heroes = {"a": "小可", "b": "小狗", "c": "小櫻"}
>>> hi(**heroes)
小可 小狗 小櫻
```

這樣就等於是把字典裡的 Key 對應到參數名稱，所以如果字典的 Key 跟參數的名字沒對上，也是會出現錯誤。

#### Docstring
```py
def say_hello_to(someone):
    """
    Say hello to someone.

    Parameters:
    someone (str): The name of the person you want to say hello to.

    Returns:
    str: A greeting message.
    """

    return f"Hello, {someone}!"
```

>What is a Docstring?  
A docstring is a string literal that occurs as the first statement in a module, function, class, or method definition. Such a docstring becomes the __doc__ special attribute of that object.

簡單來說，Docstring 就是一個支援換行的多行字串，要用單引號、雙引號都可以，當它出現在函數、類別或模組裡面的第一行的時候，這個字串會變成這個物件的 `__doc__` 特殊屬性。

Docstring 必須是函數或類別的第一個陳述句（Statement），這樣到時候 help() 函數或 `.__doc__ `屬性才會抓的到這段文字

### 回傳值

```py

def add(a, b):
    print(a + b)

add(3, 4)
```

執行 `add(3, 4)` 之後會在終端機印出 `7` 。但這並不是這個函數執行之後的「結果」，我們在終端機看到的 `7` 只是這個函數執行的「過程」，在執行的過程中把參數 `a` 跟 `b` 相加之後印出來。如果要有「結果」的話，在 Python 一定要使用 return 關鍵字：

```py
def add(a, b):
    return a + b
```

如果想要加上型別註記，也可以這樣寫：

```py
def add(a: int, b: int) -> int:
    return a + b
```
型別註記在 Python 並沒有強制性，以目前的版本來說，就算標記了型別但執行的時候不遵守也不會造成錯誤。

有了 `return` 回傳結果，接下來一樣也是執行它，只是稍稍有些不同：

```py
answer = add(3, 4)
print(answer)
```

`add()` 函數本身只有做計算，並且把計算完的結果交回給呼叫它的地方（也就是回傳）。正因為如此，單獨執行這個函數並不會在畫面上得到任何回應，也不會印出任何東西。所以這裡我先把結果存到一個變數裡，再呼叫 `print()` 函數把它印出來。

#### 早一點回傳
```py
def add(a, b):
    return a + b
    print("Hello World")
```

`return` 之後加印了一行 `"Hello World"`，這樣寫並不會出錯，但最後一行的 `print()` 函數永遠不會被執行。因為 `return` 關鍵字不是只有把回傳結果，當函數遇到 `return` 關鍵字，就會立刻結束這個函數的執行並回傳結果，所以在 `return`後面的程式碼永遠沒機會被執行。

例如有個 BMI 的計算公式原本會這樣寫：
```py
def calc_bmi(height,weight):
    if height<=0 or weight<=0:
        return None
    else height = height /100
        return round(weight /(height**2),2)

print(calc_bmi(170, -65))  # None
print(calc_bmi(170, 65))   # 22.49
```
因為 `return` 之後函數會直接結束，所以可以改寫成：
```py
def calc_bmi(height,weight):
    if height<=0 or weight<=0
    return None

    height=height/100
    return round(weight/(height**2),2)

print(calc_bmi(170, -65))  # None
print(calc_bmi(170, 65))   # 22.49
```

`if` 條件成立的話函數就會直接結束，所以這裡我把 `else `拿掉了，這個手法叫做「Early Return」。在函數的一開始先判斷條件，如果符合或不符合就直接 `return` 回傳結果，結束這個函數。

### 作用域

#### LEGB規則
python作用域分成四種，分別是區域(Local,L)，封閉(Enclosing.E)，全域(Global,G)，內建(Built-in,B)

LEGB 優先順序:
Local：如果自己函數有定義的話，會優先使用，L(Local)
Enclosing：如果在函數裡面還有函數的話，在自己這一層沒有定義，會往外層函數找
Global：如果各層函數都找不到或是函數只有一層的話，會往全域變數找
Built-in：如果全域變數也沒定義，才會找內建的函數或變數

#### Lexical Scope
```python
language = "Python"

def hi():
    print(language)

def hey():
    language = "Ruby"
    hi()

hey()
```
Python 採用的是 Lexical Scope 的設計，這個 Lexical 翻成中文是「詞彙的」，Lexical Scope 的意思是指當在找東西如果找不到會往外面找，**這個「外面」指的是函數定義的地方的外面**。也就是說，Python 的 Scope 只跟函數定義在什麼地方有關，跟它在哪裡被執行無關。


所以在上面這個範例中，雖然在呼叫 `hi()` 函數的前一行宣告了 `language` 變數，執行到 `hi()` 函數的時候因為自己沒有這個變數所以往外找，但 Python 會找當時定義 `hi()` 函數的地方的外面，所以執行之後會找到全域 Scope 的 `language` 變數而印出 `"Python" `字樣，而不是 `"Ruby"`。

nonlocal 不是區域變數，不會往全域變數找



<!-- a=a+1 -->
#### a=a+1

>Q: What are the rules for local and global variables in Python?
A: In Python, variables that are only referenced inside a function are implicitly global. If a variable is assigned a value anywhere within the function’s body, it’s assumed to be a local unless explicitly declared as global.


Python 透過一個很簡單的規則：如果在函數裡做賦值這件事，像是 a = 1，這個行為會被視為宣告一個區域變數 a，並且把值設定成 1，而不是取用或修改函數外層或全域變數。為什麼這樣設計？就是剛剛說的，Python 的變數並沒有明確的「宣告」設計，如果不加這條規則，以後在函數裡要宣告變數的時候，都得擔心外層是不是已經有同名的變數了，所以 Python 才定了這條規則。

因此在 hi() 函數裡面的 a += 1，也就是 a = a + 1，等號左邊的 a = 表示會有一個區域變數 a，而等號右邊的 a + 1 會試著問「嘿，請問在我們這個函數裡有沒有變數 a？」，這時 Python 會跟它說有，但這個變數還沒有被賦值，所以無法使用，因此出現 UnboundLocalError 的錯誤訊息。
```python
a=1

def hi():
    a=a+1  #這裡有a，但是還沒賦值，類似於Js的let 第一階段的TDZ
    print(a)

hi()
print(a)

#執行結果會報錯，cannot access local variable "a" where it is not associated with a value
```

解決方式：
```Python
a=1
def hi():
    global a  #把外面的a改成3
    a=3

hi()
print(a)
```
