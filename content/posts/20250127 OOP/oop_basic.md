+++
date = '2025-01-27'
draft = false
title = 'Python-OOP物件導向設計'
show_reading_time=true
featured_image = 'images/2000-s-computer-.png'
categories = ["Python"]
tags = ["python","後端"]
toc=true
+++

### 什麼是物件？
>物件(Object)=狀態(State)+行為(Behavior)

狀態就是物件的屬性(Attribute)，行為就是物件的方法(Method)，也就是經常寫在物件裡的函數。

為了讓大家更容易理解、學習程式，許多程式語言都有引進「擬人化」或「擬物化」的設計，讓我們可以用一般人更容易想像的方式來組織或管理程式碼，這就是所謂的物件導向程式設計。
<!--more-->

### 類別與物件
類別就像雞蛋糕的烤盤，也就是類別(class)的概念，一樣形狀的模具，放一樣的原料，就能做出香噴噴的雞蛋糕。

而透過烤盤做出來的雞蛋糕，以物件導向的專有名詞來說，可以解釋成實體(instance)。

定義類別，使用的關鍵字是`class`：
```py
class Dog:
    pass
```
#### 定義物件

```py
xiangxiang=Dog()
elaine=Dog()
```
透過`Dog()`這個類別，可以生成很多狗狗，雖然這兩個物件都是用`Dog()`類別生成的，不過他們是不同的物件，有相同的行為，但有不同的狀態。

```
>>> xiang
<__main__.Dog object at 0x104c6d160>
>>> xiang
<__main__.Dog object at 0x104c6f0b0>
```
後面那個 `0x104c6d160` 或是 `0x104c6f0b0` 這種看起來像隨機英文數字組合的東西，它代表這顆物件所在的記憶體位置。  

這兩個數值不一樣，表示這兩顆物件所在的記憶體位置是不一樣的，也就是說，它們是兩個不同且獨立的個體。

可以用`instance`來判定物件是不是某個類別生成的。

```
>>> isinstance(xiang, Dog)
True
>>> isinstance(elaine, Dog)
True
```

也可以用`__class__`屬性來觀察到這顆物件是由哪個類別產生的：

```py
>>> xiangxiang.__class__
<class'__main__.Dog'>
>>> xiangxiang.__class__.__name__
'Dog'
```
再補個` __name__ `屬性，就可以看到這個類別的名字。

#### 初始化和實體屬性
雞蛋糕如果加了各式各樣的餡料會更加美味😋，我們可以把實體加點料，讓它更加鮮明。

```py
xiangxiang=Dog("香香",咖啡色,6)
elaine=Dog("奕伶",藍色,24)
```

不過要注意的是，如果直接在實體加料會出現像這樣的錯誤。
```py
Traceback (most recent call last):
  File "/demo/dog.py", line 5, in <module>
    xiangxiang=Dog("香香",咖啡色,6)
            ^^^^^^^^^^^^^^^^^^^^^^^
TypeError: Cat() takes no arguments
```

如果實體要加料那一定要告知類別！  
需要在類別定義一個函數，`__init()__`

```py
class Dog:
    def __init__(self,color,age):
```
當我們透過類別建立實體時，**定義在這個類別的`__init__( )`函數就會自動被呼叫來進行初始化的行為**。

這裡要注意的是 `__init__( )`的第一個參數，`self`，這個參數名稱，指的就是自己這顆實體本身，你也可以改成別的變數名稱不要叫`self`，`self`只是大家的慣例。

為什麼要帶`self`參數給`__init__( )`，因為當我們呼叫`Dog( )`類別來建立實體時，Python會進行以下步驟：

1.建立一個`Dog`類別並指定給變數`xiangxiang`，這顆物件裡沒有什麼屬性  
2.立即執行`xiangxiang.__init__( )`，並且把其他參數傳給它，然後才透過`self`把這些參數指定成屬性  

Python中的`__init__()`不是建構子(Constructor)。因為執行`__init__()`方法時，這顆物件早就建立好了，`__init__()`是在做**初始化**的工作。  

所以在呼叫`__init()__`時，才需要`self`當作第一個參數，`self`指的是剛剛產生的物件。

`__new()`更接近其他程式語言在做的建構子的事。

建構子的資料：
>In class-based, object-oriented programming, a constructor is a special type of function called to create an object.

在 `__init__`() 函數裡應該要做些什麼事？其實它就只是個函數，所以你想做什麼都行，不過比較常見的就是把帶進來的參數指定成物件的屬性：  

```py
class Dog:
    def __init__(self, name, color, age):
        self.name = name
        self.color = color
        self.age = age
```

所以 `self.name` 或是 `self.age` 這樣的寫法就是在設定這顆物件的屬性。這樣我們就可以透過這些屬性來區分這兩隻狗勾：

```py
xiangxiang=Dog("香香",咖啡色,6)
elaine=Dog("奕伶",藍色,24)

print(xiangxiang.name) #輸出 香香
print(elaine.color) #輸出 藍色
```

除了用`.`的方式外，也可以透過物件身上的`__dict__`屬性來檢視這顆物件身上的屬性：

```
>>> xiangxinag.__dict__
{'name': '香香', 'color': '咖啡色', 'age': 6}
>>> elaine.__dict__
{'name': '奕伶', 'color': '藍色', 'age': 24}
```

不同實體之間的屬性、狀態，都是**獨立不受彼此影響的**，如果想要修改這些屬性，可以透過`.`來修改：
```python
xiangxiang=Dog("香香","咖啡色",6)
print(xiangxiang.clor) #印出咖啡色

xiangxiang.color="白色"
print(xiangxiang.color) #印出白色
```
因為這些屬性就像是這顆實體裡面的變數，我們也會稱這些屬性為「實體變數（Instance Variable）」。


#### 實體方法
除了屬性之外，我們也可以在類別裡面定義函數，在呼叫函數時，會稱叫他們
「方法（Method）」，在類別裡定義方法和定義函數沒什麼不同，都是使用`def`關鍵字  

在函數章節學到的(參數預設值、位置引述、關鍵字引數......)，在這裡也可以用  

類別比較特別的是，在定義方法的時候，第一個參數是自己這顆物件，也就是`self`，這樣才可以透過`self`變數來存取自己這顆物件身上的其他屬性或方法。  

```py
class Dog:
    def __init__(self,name,color,age):
        self.name=name
        self.color=color
        self.age=age
    def speak(self,sound="汪汪"):
        print(f"我是{self.name},{sound}")
```

在定義`speak()`函數的時候，不過有沒有用到`self`參數，在執行這個函數的時候都會自動幫我們把自己這顆物件傳進去當第一個參數，所以在定義函數的時候參數還是不能少。

```py
xiangxiang=Dog("香香","咖啡色",6)
xiangxiang.speak() #我是香香,汪汪
xiangxiang.speak("哈哈哈") #我是香香,哈哈哈
```

當Python看到我們執行`xiangxiang.speak()`方法的時候，它會自動把`xiangxiang`這顆物件傳給`speak()`函數當作第一個參數，也就是`self`
，所以不要忘記在定義實體方法的時候把`self`參數加上去

只要是`Dog`類別所產生的實體，就能夠使用這個類別的方法以及存取裡面的屬性，透過這樣的設計，我們可以把相關的資料和操作都放在同一個類別裡，讓程式碼更有組織性，也更容易維護。  

#### 類別屬性
在 Python 要在類別裡定義屬性，就直接寫在類別裡就好，像這樣：

```py
class Dog:
    count=0
    actions=[]
```
這些屬性是定義在類別本身，故稱為「類別屬性（Class Attribute）」。
類別屬性和實體屬性不同，類別屬性是屬於類別本身的，而不屬於類別所產生出來的實體(xiangxiang、elaine)。

如果我們想要存取類別屬性，直接透過類別就行了：
```PY
>>> Dog.count
0
>>> Dog.actions
[]
```
類別屬性也可以透過`__dict__`這個屬性來看類別的屬性：

```py
>>> Dog.__dict__
mappingproxy({'__module__': '__main__', 'count': 0, 'actions': [], '...略...'})
```
看起來的東西稍微比實體的屬性多了一些，但應該還是可以看到剛才定義的 `count` 跟 `actions` 屬性，這些屬性是存放在類別裡的。

如果想要在實體方法裡面取用類別變數，可以連名帶姓的把類別名稱寫上去：

```py
class Dog:
    count = 0
    actions = []

    def __init__(self, name, color, age):
        self.name = name
        self.color = color
        self.age = age
        Dog.count += 1   # <-- 在這裡
```

在上面這個例子中，因為是寫在 `__init__()`方法裡，效果就變成每次建立新的實體的時候，count 屬性的值就會加一：
```py
>>> Dog.count
0
>>> xiangxiang = Dog("香香", "咖啡色", 6)
>>> Dog.count
1
>>> elaine = Cat("奕伶", "藍色", 24)
>>> Dog.count
2
```
回頭看一下`xiangxiang`實體，如果我們試著印出`xiangxiang.count`會發生什麼事？，要注意，這裡是透過實體存取屬性，不是類別

```
>>> xiangxiang = Dog("香香", "咖啡色", 6)
>>> elaine = Cat("奕伶", "藍色", 24)
>>> xiangxiang.count
2
```
雖然這個`count`是類別屬性，可是竟然可以透過實體取得？
這是因為Python在找東西的時候，會先從實體自己本身看看有沒有，如果找到就沒事，找不到就會找類別。  

所以當我們印出`xiangxiang.count`時，Python在`xiangxiang`這個實體確實找不到，所以接著會到他所屬的類別`Dog`裡面找，然後就找到了。  

接下來，我想要在 `xiangxiang` 這顆物件身上新增一個 `count` 屬性的話，也是可以的：

```
>>> xiangxiang.count = 2000
>>> xiangxiang.__dict__
{'name': '凱蒂', 'color': '白色', 'age': 18, 'xiangxiang': 2000}
```
這時會發現原本的 `__dict__ `裡多了一個 `count` 屬性。

```
xiangxiang.count
2000
```
印出來的值是2000，而不是原本的1，因為Python會在`xiangxiang`物件看有沒有`count`屬性，有找到，所以印出2000

接著我再新增另一個 `elaine` 物件來做些實驗：

```
>>> elaine=Dog("奕伶","藍色",24)
>>> elaine.__dict__
{"name":"奕伶","color":"藍色","age":20}
>>> elaine.count
2
```
這個`elaine`物件身上`count`屬性，所以根據規則`elaine.count`會得到2，如果我們直接印出 `Dog.count` 這個類別變數的話：

```py
>>> Dog.count
2
```

#### 屬性裝飾器
如果想要限制這個屬性的存取，在其他的程式語言有些會用`getter`跟`setter`的設計來限制屬性的存取，像這樣：
```py
class Hero:
    def __init__(self,title,name,age):
        self.title=title
        self.name=name
        self._age=age

    def get_age(self):
        return self._age
    
    def set_age(self,age):
        if age<=0 or age>120:
            raise ValueError("年齡設定錯誤")
        self._age=age
```
在這裡，刻意把原本的 `self.age` 前面加上一個底線 `_` 變成 `self._age`，然後另外寫了 `.get_age()` 以及 `.set_age()` 這兩個方法來讀取或設定 `self._age` 的值，同時在 `.set_age()` 裡面加上簡單的判斷，如果設定的年齡不在適當範圍內就會丟出錯誤訊息：
```
>>> himmel.get_age()
18

# 正常操作
>>> himmel.set_age(30)
>>> himmel.get_age()
30

# 不正常操作
>>> himmel.set_age(1000)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/private/tmp/tt.py", line 12, in set_age
    raise ValueError("年齡設定錯誤")
ValueError: 年齡設定錯誤
```

雖然這樣寫可以控制屬性存取，但這種寫法還要加上小括號呼叫，這寫法有點囉嗦，用起來不像屬性，Python提供了一個名為`property`的函數裝飾器可以做到類似屬性的效果

```py
class Hero:
    def __init__(self,title,name,age):
        self.title=title
        self.name=name
        self._age=age
    
    @property   # <-- 掛在這裡會得到 getter
    def age(self):
        return self._age
    @age.setter # <-- 這是 setter
    def age(self,age):
        if age<=0 or age>120
            raise ValueError("年齡設定錯誤")
        self._age = age
```
這裡的`property`是一個內建類別。age() 函數本身的內容沒變，只是在定義的時候多掛上了 `property` 跟 `age.setter` 這兩個裝飾器，這樣在存取` age`屬性的時候，不需要加上小括號就能使用：

```
>>> himmel.age
18
>>> himmel.age = 38
>>> himmel.age
38
>>> himmel.age = 1000
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/private/tmp/tt.py", line 14, in age
    raise ValueError("年齡設定錯誤")
ValueError: 年齡設定錯誤
```
#### 私有屬性？
不管是`getter`或是`setter`還是掛上`property`函數裝飾器都一樣，Python並沒有真正的私有變數或屬性的設計，加底線只是一個慣例，讓開發者知道這個屬性不建議存取。如果硬要無視慣例，硬要拿來用也是可以。

```
>>> himmel._age
18
>>> himmel._age = 1000
>>> himmel._age
1000
```

如果改成`__age`，兩個底線。
```py
class Hero:
    def __init__(self, title, name, age):
        self.title = title
        self.name = name
        self.__age = age  # 這裡改成兩個底線的 __age

himmel = Hero("勇者", "欣梅爾", 18)
```
好像真的拿不到？
```
>>> himmel.__age
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Hero' object has no attribute '__age'
```

不過如果翻一下它的`__dict__`屬性，就會知道`__age`變成`_Hero_age`(_類別名稱__屬性名字)，這是Python的名字改編(Name Mangling)的特殊設計，如此一來就可以修改。

```
>>> himmel._Hero__age
18
>>> himmel._Hero__age = 1000
>>> himmel._Hero__age
1000
```

#### 限定屬性
Python的類別有個特別的屬性叫做`__slots__`，這個屬性可以限制物件的屬性只有設定在`__slots__`名單裡的才可以，如果新增物件以外的屬性，Python會拋出`AttributeError`的例外

像以下的程式碼，給類別設定，就可以限制類別的物件只能有`name`和`age`這兩個屬性。
```py
class Dog:
    __slots__ = ('name', 'age')
```

這個`__slot__`屬性可以迭代物件，可以定義成串列、元組、集合，只要可迭代物件裡的元素是字串就可以了，在這裡是泛，在這裡示範用元組(Tuple)。

`__slots__`除了限定屬性之外，它還有拔除`__dict__`屬性的功能：
```
>>> kitty.__dict__
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Cat' object has no attribute '__dict__'. Did you mean: '__dir__'?
```

因為`__slots__`一開始會先定義好物件身上有哪些屬性，所以Python在建立物件時就會預留固定的空間來儲存這些屬性。

不過`__slots__`遇上類別繼承的效果可能會不太一樣：
```py
class Animal:
    __slots__ = ('name', 'age')

    def __init__(self, name, age):
        self.name = name
        self.age = age

class Dog(Animal):
    pass
```

```
>>> kitty = Dog("Kitty", 18)
>>> kitty
<__main__.Dog object>
>>> kitty.name
'Kitty'
>>> kitty.hey = "Hey"
>>> kitty.__dict__
{'hey': 'Hey'}
```
為什麼這個`kitty`仍有`__dict__`屬性？這是因為`Dog`類別本身並沒有設定`__slots__`屬性，所以用它來建立物件的時候，還是會留有` __dict__` 屬性。

如果換成`Dog`類別加上`__slots__`
```py
class Animal:
    pass

class Dog(Animal):
    __slots__ = ('name', 'age')
```

```
>>> kitty = Dog()
>>> kitty.__dict__
{}
```
這裡的`kitty`實體為什麼還是有`__dict__` ?

以下是詳細說明：
因為`Animal`沒有定義`__slot__`，所以Python會為`Animal`(以及子類別的每個實例)都建立一個`__dict__`來儲存屬性。

`Dog`定義了`__slots__ = ('name', 'age')`，只限定`name`和`age`這兩個屬性，並且在`Dog`不會有`__dict__`來儲存屬性。

`Dog`繼承於`Animal`，而`Animal`並沒有使用`__slots_`，因此`Animal`的`dict`仍然存在，會被`Dog`實例(kitty)所繼承。

如何避免繼承 `__dict__`

```py
class Animal:
    __slots__ = ()  # 定義一個空的 __slots__

class Dog(Animal):
    __slots__ = ('name', 'age')

kitty = Dog()

```

還是有方法可以加回來`__slots__`
```py
class Cat:
    __slots__ = ('name', 'age', '__dict__')
    
```

小結：使用 `__slots__` 的確可以讓屬性的存取速度更快一點點，而且也比較節省記憶體，不過遇到繼承的時候就要稍微注意，一不小心可能就會出現跟預期不太一樣的結果。

### 類別方法與靜態方法

```py
class Duck:
    def all():
        print("鴨鴨們，集合了")

Duck.all()
```

`Duck.all()`這不是類別方法(Class Method)，只是剛好定義在類別裡的函數而已，跟類別沒有什麼關係

再回頭看看實體方法，所謂的實體方法，就是綁定在「實體」的方法，在執行時Python會把這個實體傳給這個方法作為第一個參數，同樣的概念，類別方法(class Method)就是綁定在「類別」的方法，在執行時會把類別傳給這個方法當作第一個參數。

定義類別方法，通常會用內建的函數裝飾器 `classmethod`：

```py
class Duck:
    def all():
        print("鴨子們，集合了!")

    @classmethod
    def list(cls):
        print(f"{cls.name}們，集合囉!")
```

在 `list()` 函數裡的 `cls` 跟 `self` 是差不多的概念，這不是什麼特殊的變數，就只是因為傳進來的是一個類別，所以慣例上會把參數命名為 `cls`，沒辦法，誰叫 `class` 在 Python 是個關鍵字不能拿來用所以只好妥協用 `cls`。

可以先來看看這個`list()`長什麼樣子：
```
>>> Duck.all
<function Duck.all>
>>> type(Duck.all)
<class 'function'>

>>> Duck.list
<bound method Duck.list of <class '__main__.Duck'>>
>>> type(Duck.list)
<class 'method'>
```
在這裡的`Duck.list`是個方法物件，前面也有個`bound`字樣，表示這個`.list()`方法是綁定在`Duck`類別上，相對的`Duck.all`就只是一般的函數。

雖然說是「類別」方法，但實體也可以用：

```
>>> donald = Duck()
>>> donald.list
<bound method Duck.list of <class '__main__.Duck'>>
>>> donald.list()
Duck們，集合囉！
```
當 `donald` 實體要找 `.list() `方法的時候，它會先找自己身上的有沒有，沒有的話就會去找它的所屬類別，不過這個執行的結果跟實體本身沒關係，因為這個 `.list()` 類別方法綁定的是類別，所以執行 `donald.list()` 跟執行 `Duck.list()` 的結果是一樣的。

另一個看起來也是很像的做法做叫「靜態方法（Static Method）」，同樣也是透過內建的函數裝飾器 `staticmethod` 來裝飾方法：

```py
class Duck:
    @staticmethod
    def make_sound(sound="呱呱呱"):
        print(sound)
```

所謂的靜態方法，就是跟類別或實體沒有關係的方法，也不需要接收任何隱藏的參數，也就是不用像實體方法或類別方法一樣在第一個參數把自己傳進來。

```
>>> Duck.make_sound
<function Duck.make_sound>
>>> type(Duck.make_sound)
<class 'function'>

>>> Duck.make_sound()
呱呱呱
```
它看起來就像一般的函數，不過這個函數是寫在`Duck`類別，可以透過`Duck`類別呼叫它，透過`staticmethod`裝飾器的`.make_sound()`，不需要接收像`self`(實例方法)或`cls`(類方法)這樣的隱式參數。  

主要用途是當一個方法的功能跟類別有關，但又不需要存取或修改類別或實例的屬性時，把這個方法封裝在類別內。

以下的例子(類別方法、靜態方法、一般方法)，來看看分別有什麼差別：
```py
class Duck:
    def all():
        print("鴨鴨們，集合囉！")

    @classmethod
    def walk(cls):
        print(f"{cls}會走路")

    @staticmethod
    def make_sound(sound="呱呱呱"):
        print(sound)
```
進 REPL 做點實驗：

```
# 一般方法
>>> Duck.all
<function Duck.all>

# 靜態方法
>>> Duck.make_sound
<function Duck.make_sound>

# 類別方法
>>> Duck.walk
<bound method Duck.walk of <class '__main__.Duck'>>
```

雖然看起來沒差別，不過從實體的角度看還是有差異：

```
>>> donald = Duck()

# 一般方法
>>> donald.all
<bound method Duck.all of <__main__.Duck object>>

# 類別方法
>>> donald.walk
<bound method Duck.walk of <class '__main__.Duck'>>

# 靜態方法
>>> donald.make_sound
<function Duck.make_sound>
```

靜態方法依舊只是一般的函數而已，也不會偷渡一些看不到的參數進去。

### 繼承

```py
class Primate:
    def grab(self, something=None):
        if something:
            return f"抓{something}"

        return "抓東西"
```

在物件導向程式設計裡有個`「繼承（Inheritance）」`的設計可以這樣寫：
```py
class Primate:
    def grab(self, something=None):
        if something:
            return f"抓{something}"

        return "抓東西"

class Human(Primate):
    pass

class Monkey(Primate):
    pass
```
「`Human`類別繼承自 `Primate` 類別」以及「`Monkey` 類別繼承自 `Primate` 類別」，這樣一來，就算 `Human` 跟 `Monkey` 類別什麼都沒寫，繼承的設計可以讓我們可以把共通的功能寫在上層類別裡，就不用一直重複寫一樣的程式碼了

```py
>>> goku = Monkey()
>>> someone = Human()
>>> goku.grab("香蕉")
'抓香蕉'
>>> someone.grab("錢錢")
'抓錢錢'
```

#### 沒寫就沒繼承嗎?

```py
class Animal:
    pass
class Mammal(Animal):
    pass
class Cat(Mammal):
    pass
```
雖然以上的程式碼沒有明確寫出繼承自哪個類別，Python 在這種情況會在幫我們偷偷繼承一個名為 `object` 的類別。我們可以透過類別身上的`.mro()`方法或是`__mro__`屬性看到這個類別的祖宗十八代

```
>>> Cat.mro()
(<class '__main__.Cat'>, <class '__main__.Mammal'>, <class '__main__.Animal'>, <class 'object'>)
>>> Cat.__mro__
(<class '__main__.Cat'>, <class '__main__.Mammal'>, <class '__main__.Animal'>, <class 'object'>)
>>> Mammal.__mro__
(<class '__main__.Mammal'>, <class '__main__.Animal'>, <class 'object'>)
>>> Animal.__mro__
(<class '__main__.Animal'>, <class 'object'>)
```
什麼是`MRO`? MRO是Method Resolution Order的縮寫，意思是Python在查找方法時候的尋找順序。  
前面有提過，要在某個物件裡找屬性或是方法的時候，會看這顆物件自己有沒有，沒有匯往它的所屬類別找，
再沒有會往所屬類別的上層類別找，直到找不到為止。  

從結果來看，最末端都是`object`類別，如果沒有特別標註上層類別的話，上層類別就是內建的`object`類別

#### 覆寫方法
當繼承自上層類別時，如果類別裡面有跟上層類別同名的方法時，會發生什麼事情？  

```py
class Animal:
def walk(self):
    print("animal is walking")

class Cat:
    def walk(self):
        print("Cat is walking")

kitty=Cat()
kitty.walk() # 會是哪一個 walk？
```
以上程式碼稱之Override，「to be more important than something」的意思，翻譯為「覆寫」，雖然叫覆寫，不過同名方法並沒也被消滅，只是優先順序上排到比較後面而已。  

剛剛提到的MRO，Python再搜尋屬性或方法的流程，除了物件本身，會先從物件的所屬類別開始找，如果找到就執行，找不到就往上層類別找。所以我們呼叫`kitty.walk()`的時候，Python會先找`Cat`類別有沒有`walk()`方法。

也就是說，並沒有覆蓋上層的`Animal`類別的方法，只是在MRO的優先順序找到對應的方法，原本上層的類別還是存在。

#### 執行上層類別的方法
```PY
class Animal:
    def walk(self):
        print("Animal is walking")

    def eat(self, food):
        print(f"{food} is yummy!")

class Cat(Animal):
    def walk(self):
        Animal.eat(self,"罐罐") #加上這一行會輸出，Cat is walking、 罐罐is yummy!
        print("Cat is walking")
```

以上程式碼可以改寫成：
```PY
class Animal:
    def walk(self):
        print("Animal is walking")

    def eat(self, food):
        print(f"{food} is yummy!")

class Cat(Animal):
    def walk(self):
        super().eat("罐罐")  #super會做出一個實體出來，會呼叫eat()
        print("Cat is walking")
```
不過為什麼要改寫成`super()` ?

1. **降低耦合度**
直接呼叫父類別的的方法(Animal.eat(self,"罐罐"))，會把父類別的名稱硬編到子類別中，如果日後要更改繼承結構或是父類別名稱，就要同步修改子類別的程式碼。  
而使用 `super()` 則不需要顯式指定父類別名稱，使得類別之間的耦合度降低，維護性更好。

2. **支援多重繼承**
在多重繼承下，使用`super()`可以依據方法解析順序(MRO，Method Resolution Order)正確地找到下一個應該被呼叫的方法，直接指定父類別會容易忽略多重繼承的層級跟順序，可能會導致錯誤的行為或重複呼叫同一方法。

3. **語意清楚直覺**
使用`super()`，可以更直觀的表達「呼叫父類別的方法」意圖，當閱讀程式碼的時候 `super().eat("罐罐")`
可以立刻理解這是在呼叫上一層(父層)的`eat`方法，而不必去追蹤硬編碼的父類別名稱。

4. **容易擴展與重構**
`super()` 的使用使得這種變化更容易處理，因為你不需要手動調整每個子類別中對父類別方法的調用。這對於維護大型系統非常重要。

#### 你是我的後代嗎 ?

```py
class Animal:
    pass
class Mammal(Animal):
    pass
class Cat(Mammal):
    pass
class Bird(Animal):
    pass
```
Python 有個內建函數`issubclass()`，是用來判斷是不是某個類別的衍生類別：
```py
>>> issubclass(Cat, Mammal)
True
>>> issubclass(Cat, Animal)
True
>>> issubclass(Cat, Bird)
False
>>> issubclass(Cat, object)
Trues
```
這裡的`issubclass()`函數可用來判斷「是一種（is kind of）」的關係，例如，`Cat` 是一種 `Mammal`，同時也是一種 `Animal`，不過 `Bird` 同樣都是一種 Animal 但就跟 `Cat `類別就沒有繼承關係。最後一個例子是 `object` 類別，前面提到只要沒特別標示上層類別的，例如 `Animal` 類別就是，Python 會讓它的上層類別自動變成 `object` 類別，所以 `issubclass(Cat, object)`會回傳 `True`，或者也可以廣義的說所有的類別都是 `object` 的衍生類別。


```py
kitty = Cat()
```

這時 `kitty` 物件跟 `Cat` 類別之間並不是「是一種」的關係，而是「是一個（is a）」的關係。

要判斷某個物件是不是某個類別的實體，有幾種方式，用`__class__`屬性或是內建函數`type()`都可以查到這顆物件是由哪一個類別所建立的。Python 有個內建函數 `isinstance()`也能做到類似的判斷，但範圍更廣一點。

```
>>> isinstance(kitty, Cat)
True
>>> isinstance(kitty, Bird)
False
>>> isinstance(kitty, Animal)
True
>>> isinstance(kitty, object)
True
```
跟`type()`函數比較明顯的差異在於`isinstance()`函數在判斷的時候，即便不是直接產生它的類別，例如 `Animal` 甚至是最上層的 `object` 類別，判斷的結果都會是 `True`。  

所以哪個比較好用？
如果只是要知道物件是不是由某個特定類別所建立的，使用`type()`函數判斷會比較精準。
如果只是想知道物件有沒有某種類別的特定行為，用`isinstance()`會比較簡單。

#### 多重繼承
 多重繼承（Multiple Inheritance），一個類別可以同時繼承多個類別，可以先來看看怎麼寫

 ```py
class Animal:
    def sleep(self):
        print("Zzzzz")

class Bird(Animal):
    def fly(self):
        print("I blieve I can fly ♫♪")

class Fish(Animal):
    def dive(self):
        print("Dive!!")

class Cat(Bird, Fish):
    pass
 ```
 `Cat` 類別可以同時繼承 `Bird` 以及` Fish` 類別，寫法就是在類別名稱後面加上要繼承的類別名稱，並使用逗號隔開。這樣一來，`Cat` 類別就同時擁有了 `Bird`、`Fish` 以及 `Animal` 這三個類別的所有方法：

```py
>>> kitty = Cat()

# 還是可以睡覺
>>> kitty.sleep()
Zzzzz

# 可以下海
>>> kitty.dive()
Dive!!

# 也可以飛天
>>> kitty.fly()
I blieve I can fly ♫♪
```

不過多重繼承會遇到幾個問題

#### 鑽石問題
舉例來說，`Animal` 類別本來就有實作了 `.sleep()` 方法，但 Bird 以及 Fish 也有自己的 `.sleep()` 方法：
```py
class Animal:
    def sleep(self):
        print("Zzzzz")

class Bird(Animal):
    def sleep(self):
        print("我可以站著睡覺")

class Fish(Animal):
    def sleep(self):
        print("我睡覺不用閉眼睛")

class Cat(Bird, Fish):
    pass
```
只看 .sleep() 就好。這時候的繼承狀態大概像這樣：
```
   A      Animal(A)
  / \
 B   F    Bird(B), Fish(F)
  \ /
   C      Cat(C)

```

這個專有名詞叫「鑽石問題（Diamond Problem）」，是指一個類別同時繼承兩個類別，而這兩個類別又同時繼承自同一個類別，這樣的繼承關係就會形成一個鑽石的形狀，但其實更像個菱形，所以有時候又稱之菱形繼承。

```py
kitty = Cat()
kiity.sleep()  # 會執行哪個 .sleep() 方法？
```

會執行哪一個類別的 `.sleep()` 方法？
答案是 `Bird` 類別的 `.sleep()` 方法會被執行。

來看一下MRO
```
>>> Cat.mro()
[<class '__main__.Cat'>,
 <class '__main__.Bird'>,
 <class '__main__.Fish'>,
 <class '__main__.Animal'>,
 <class 'object'>]
```

Python在處理多重繼承的時候，有自己一套演算法計算出MRO的順序，依上面的例子來說MRO的順序是由小括號內的類別順序決定的。
