+++
date = '2024-12-07'
draft = false
title = 'Stack & Queqe'
show_reading_time=true
featured_image = 'images/ribbon candle.jpg'

+++

### Stack(堆疊) 和 Queue(佇列)

#### Stack 堆疊(LIFO)

是電腦科學中的一種抽象資料型別，按照後進先出(LIFO，Last In First Out)的原理運作，堆疊常用一維陣列或連結串列來實現。常與另一種有序的線性資料及和佇列相提並論。

是一種資料結構，遵循著**後進先出**的原則，最晚放進堆疊的資料會被最先取出(LIFO Last-In-First-Out)，最早放入堆疊的資料會被最後取出

<!--more-->

#### 特性

只能從堆疊的**最頂端**存取資料  
只能從堆疊的**最頂端**新增或刪除資料

#### 堆疊的抽象資料型態

Create：可建立一個空的堆疊  
Push ：可在頂端**新增**資料，並得到一個新的堆疊  
Pop ：可**刪除**頂端資料，並得到一個新的堆疊
Peek ：回傳堆疊頂端的資料

#### Queue 佇列 (FIFO)

可以想像成排隊結帳的隊伍，根據排隊順序結帳，先結完帳的先離開，生意越好的隊伍陸續就有新的排隊人潮，先進先出(FIFO First-In-First-Out)。

#### 實際應用

- 資料反序輸出，例如將 **由小到大**的資料改成 **由大到小**
- 迴文判斷
- 河內塔問題
- 括號配對
