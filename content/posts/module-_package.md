+++
date = '2025-01-27'
draft = false
title = 'Python模組與套件'
show_reading_time=true
featured_image = 'images/2000-s-computer-.png'
categories = ["Python"]
tags = ["python","後端"]
toc=true
+++

### 什麼是模組(Module)？
是一個python檔案，裡面會有一些函數、變數、類別。
透過模組的設計可以讓程式碼更有組織性，也更容易維護。
<!--more-->

套件(Package)又是什麼？
如果說剛才講到的模組是一個檔案，一個套件裡可以有很多模組，
套件就是一個目錄、資料夾的概念，目錄裡能放很多檔案和子目錄。
基本上就像一個檔案系統一樣的結構。

### 使用模組
在Python中，使用模組，主要是透過 `import`關鍵字，這個關鍵字可以讓我們把模組匯入目前的程式碼。

#### 把自己寫的`.py檔案`模組匯入


```py
#greeting.py檔案
def helloworld():
    print("Hello World")

def hi():
    print("Hi!")

def hey():
    print("Hey!")

def bye():
    print("Bye!")
```

```py
#doggy.py檔案
import greeting
```
這樣就完成一個簡單的基本匯入

```py
#doggy.py檔案
import greeting

print(greeting)
# 印出 <module 'greeting' from '/demo/greeting.py'>

print(type(greeting))
# 印出 <class 'module'>
```
印出看看匯入進來的`greeting`是什麼，可以看到`import`關鍵字匯進來的是`module`物件。


在 Python 如果我們想要看看某個物件身上有哪些東西，可以透過那個物件身上的 `__dict__` 屬性，或是直接使用內建函數` dir()` 來查看。在 Python 很多東西都是物件，模組也是，所以：


```py
#doggy.py檔案
import greeting

print(dir(greeting))

# 印出
# ['__builtins__', '__cached__', '__doc__', '__file__', '__loader__',
#  '__name__', '__package__', '__spec__', 'bye', 'helloworld', 'hey', 'hi']
```

如果模組越來越多，我們可以使用套件(Package)，來幫模組做分類。
可以手動建立一個`utils`目錄，把`greetin.py`移動到這個目錄

```
├── utils
│   └── greeting.py
└── doggy.py
```

這樣在匯入模組的時候，需要把套件名字，也就是目錄名字加進去：
```py
#doggy.py
import utils.greeting
utils.greeting.hey()
```
也可以幫匯入的模組取小名
```py
#doggy.py
import utils.greeting as g
g.hey()
```
在 Python 所謂的匯入模組，其實就是執行那個模組裡的所有的程式碼。

#### 只匯入部分功能
跟`import`還有另一個搭配的關鍵字叫做`from`，這個關鍵字可以讓我們只匯入模組裡的某些功能，而不是整個模組，舉個小例子:

```py
from utils.greeting import hey
hey()
```
這樣的語法表示，utils這個目錄下的greeting模組，我只要匯入`hey()`函數。

```py
from utils.greeting import hey, hi, helloworld
hey()
```
像這樣，匯入多個也可以。
```py
from utils.greeting import *
```

後面的 `*` 表示要匯入 `utils.greeting` 模組裡所有的東西


#### 重複匯入模組？
因為 Python 會記住已經匯入過的模組。  
也就是同一個模組只會被匯入一次，後續再次匯入相同模組的時候也一樣
即使用不同的方式匯入同一個模組，Python 還是會視為同一個模組

#### 匯入模組的位置
大部份時候 `import`語法可能都是寫在檔案的最上面。  
但如果要寫在函數裡面也是可以的：
```py
def hello():
    from utils.greeting import hi, hey
    print(locals())

hello()
```

在函數裡的 `import` 語法是在被呼叫的時候才會執行，而且在函數裡匯入的東西，只有在函數裡有效，也就是會變成在這個函數裡的區域變數。

#### 模組的隱私
如果你在變數名稱前面加上底線 `_`，這樣在使用`import *`的時候，就會自動跳過。

```py
#greeting.py
def helloworld():
    print("Hello World")

def _welcome():
    print("Welcome!")
```

使用`import *`
```py
from utils.greeting import *

print(globals())
```
用 `globals()` 就會發現底線開頭的` _welcome()` 函數沒有被匯入進來。

硬是要匯入的話，其實也還是可以🤣
```py
from utils.greeting import _welcome
_welcome() 
```

#### 被匯入vs直接執行

例如我在` utils `裡另外新增一個 `math.py `檔案，內容如下：

```py
def add(a, b):
    return a + b

def sub(a, b):
    return a - b

print(add(1, 2) == 3)   # True
print(sub(3, -2) == 5)  # True
```
最後這兩行`print`，Python會直接執行這個檔案，會印出`True`的結果  但是如果今天`math.py`要被其他程式匯入時，`print`如果不想被執行印出來，可以使用Python預設的全域變數，有個叫`__name__`的特殊變數。

```py
#utils/math.py
def add(a,b):
    return a+b
print(__name__)
```
檔案直接執行下去，會印出`"__main__"`字串，這是Python預設的主程式名稱。

如果把這個檔案當作模組匯入的話，`__name__`會被設定為模組的名稱，
也就是`utils.math`，如此一來就不會被印出

```py
def add(a, b):
    return a + b

def sub(a, b):
    return a - b

if __name__ == "__main__":
    print(add(1, 2) == 3)   # True
    print(sub(3, -2) == 5)  # True
```
如此一來，在匯入時就不會被執行了。

#### 套件與模組
套件本身也是模組，它可以用來整理、組織其他套件或模組的模組。
它就是模組的容器，用內建函數`dir()`巡一下就會發現它長這樣

```py
>>> dir(utils)
['__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__']
```

對比一下之前的`math.py`

```py
>>> import utils.math
>>> dir(utils.math)
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'add', 'sub']
```
比較大的差異在於套件有`__path__`屬性，而一般的模組沒有

>any module that contains a __path__ attribute is considered a package.

也就是說，模組只要有 `__path__`屬性就可以被當作套件。

那套件的程式碼應該要寫在哪？
寫在`__init.py`
有些開發工具會在新增套件時新增`__init__.py`，如果沒有就自己建立就好嚕

現在的目錄結構：
```
├── utils
│   ├── __init__.py  <-- 在這裡
│   ├── greeting.py
│   └── math.py
└── app.py
```

在Python3.2版本之前一定要加入`__init__.py`這個檔案，這個目錄才會被當作套件，裡面的模組才能被`import`匯入使用。

不過在Python3.3之後就取消這個限制，即使沒有檔案，只要有相對應的目錄就會被當作套件看到，一樣可以匯入模組。


`__init__.py`是個Python的程式檔，當這個套件或是套件裡面的任何一個模組被匯入的時候，這個檔案都會被載入執行。
