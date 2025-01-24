+++
date = '2024-12-11'
draft = false
title = '資料庫'
show_reading_time=true
featured_image = '/images/S__20463625.jpg'
categories = ["database"]
tags = ["database","後端"]
toc=true
+++

<!--more-->

建立資料庫: create database "ccc"
刪除資料庫：drop database "ccc" 整個拔掉資料庫

資料型態：
CHAR/VARCHAR/TEXT
INTEGER/DECIMAL
DATE/DATETIMME
BOBO

建立資料表
CREATE table heros(
u_id= int not null auto_increment,
name varchar(30)
gender char(10)
)

PG 資料庫，可以有座標型態

新增資料

```SQL
INSERT INTO heroes
(name, hero_level, description)
VALUES
("小狗狗", "SSR", "哈哈哈");
```

查詢資料

```SQL
SELECT *
FROM heroes
```

```SQL
SELECT id,name
FROM heroes
```

過濾資料

```SQL
SELECT *
FROM heroes
WHERE hero_level ="S"
```

```SQL
SELECT *
FROM heroes
WHERE hero_level ="S"AND gender ="F"
```

```SQL
SELECT *
FROM heroes
WHERE age ISNULL
```

```SQL
SELECT *
FROM heroes
WHERE name like "背心%"  --背心開頭
```

```SQL
SELECT *
FROM heroes
WHERE age like age>=10 AND age<=25
```

```SQL
SELECT *
FROM heroes
WHERE hero_level = "S" OR hero_level = "A"
```

```SQL
SELECT *
FROM heroes
WHERE hero_level IN ("S","A")
```

```SQL
SELECT *
FROM heroes
WHERE hero_level NOT IN ("S") --  !=、is NOT、<>
```

```SQL
SELECT name ,age
FROM heroes
WHERE age ="M" AND  hero_level = ("A")
```

更新資料

```SQL
UPDATE heroes
SET age=10
Where id=25
```

刪除資料

```SQL
DELETE FROM heroes
WHERE hero_level="C"
```

計算總數

```SQL
SELECT COUNT(*)
FROM heroes
WHERE hero_level="A"
```

```SQL
加總
SELECT SUM(age)
FROM heroes
WHERE hero_level="A" AND sge IS NOT NULL
```

```SQL
SELECT AVG(age)
FROM heroes
WHERE hero_level="A" AND sge IS NOT NULL
```

```SQL
SELECT MAX(age)
FROM heroes
```

分組

```SQL
SELECT *
FROM heroes
WHERE hero_level="S"
ORDER BY=hero_rank
```

換頁

```SQL
SELECT *
FROM heroes
LIMIT 10
OFFSET 10
```

更多表格的查詢

```sql
SELECT *
FROM monsters
WHERE  kill_by =(
	SELECT id
	FROM heroes
	WHERE  name ="龍卷"

)  --subquery

```

主鍵 Pk

- 某個資料表的欄位
- 獨一無二的值
- 不能是 NULL

外部鍵 FK

- 其實是某個資料表的一個欄位
- 參照到另一個資料表的主鍵(pk)
- 用來確認資料表的紀錄跟被對照到的表格的資料是對得起來的
- 跟 PK 不同，FK 不需要獨一無二

交集(join)
有好幾種交集(inner/left/right)

```sql
--inner join
SELECT *
FROM t1
JOIN t2
ON t1.username =t2.name   --做比較
```

```SQL
SELECT *
FROM t1
LEFT JOIN t2   --左邊有的全部做出來，右邊沒有的就空掉
ON t1.username =t2.name
```

```sql
SELECT h.name ,m.name
FROM  battle_histories bh
JOIN heroes h,monsters m
ON bh.hero_id=h.id AND bh.monster_id =m.id
```

資料庫正規化
