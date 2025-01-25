+++
date = '2025-01-24'
draft = false
title = '函數是一等公民'
show_reading_time=true
featured_image = "images/retro_n+1.png"
categories = ["python"]
tags = ["python","django","後端"]
toc=true
+++

### Python函數是一等公民(First-Class Citizen)
在Python中，函數是一等公民，有時也稱為一級物件(First-Class Object)，意思是函數、數字、字串、串列等資料型態，都是相同的地位。
<!--more-->
1.變數指定

 ```python
def add(a,b):
    return a + b
    
    # 變數指定
    a=123
    b=add
 ```

 2.像一般的值放在一起

 ```python
 def add(a,b):
    return a + b

    data=[1,2,3,4,add,"hello kitty"]
 ```

 3.當作其他函數的參數
  ```python
 def add(a,b):
    return a + b

print(123)
print(add)
 ```

 4.被當作回傳值(因為函數就跟一般物件一樣)
  ```python
def create_adder(n):        # n = 3 被存在閉包中
    def adder(m):           # 內部函數可以訪問外部的 n
        return n + m        # 使用存在閉包中的 n=3 加上傳入的 m
    return adder

add3 = create_adder(3)      # add3 是一個新函數,預設加3
print(add3(4))   # 3 + 4 = 7
print(add3(10))  # 3 + 10 = 13

#create_adder(3) 呼叫時傳入了 3 作為參數 n，所以閉包保存了 n=3。當後續呼叫 add3(4) 時，就會用保存的 3 加上傳入的 4。閉包讓內部函數能記住並訪問創建時的外部變數值。
 ```