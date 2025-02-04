+++
date = '2025-02-03'
draft = false
title = '資料庫正規化'
show_reading_time=true
featured_image = 'images/hellokitty.png'
categories = ["Database"]
tags = ["Database","後端"]
toc=true
+++

### 資料庫正規化 (Database Normalization)
資料庫正規化是一套設計原則和技術，目標在於通過合理拆分資料表和定義適當的關係，來消除冗餘的資料(重複的資料)，避免資料在插入、更新、刪除異常，從而提高資料一致性和維護性。
<!--more-->
### 為什麼需要正規化？
如果沒有正規化的資料表，資料會有以下問題：  
📎**冗餘**：相同資訊出現多次，造成資料庫儲存資源浪費。  
📎**更新異常**：修改某一筆資料時，如果資料在多處重複出現，會導致部分資料未同步更新，造成不一致。  
📎**插入異常**：某些欄位必須填入資料才能插入記錄，但該資料對某些實際情況可能並不適用。  
📎**刪除異常**：刪除一筆記錄時，可能會同時刪除其他相關但又不該刪除的資訊。  

正規化的目的就在於避免這些問題，使得資料庫結構更合理，維護起來也更容易。

### 正規化的各階段
正規化通常分為多個層次，最常見的有第一正規化（1NF）、第二正規化（2NF）、第三正規化（3NF），以及更嚴格的BCNF（Boyce-Codd Normal Form）。下面依次介紹：

**第一正規化(1NF)**
要求資料表中的每一個欄位都必須是不可再分的「原子值」（atomic value），也就是說，每個欄位只能存放單一資訊，而不能存放多重值或陣列。

舉個例子：
| Student ID | Student Name | Courses                   |
|------------|------------- |-------------------------- |
| S001       | John Doe     | Math, Physics, Chemistry  |

問題：
`Courses` 欄位存放了多個課程名稱（以逗號分隔），違反了**原子性**原則，因為一個欄位不應該包含多個值。

改進寫法：
將重複的資訊拆成多條紀錄，或拆成獨立的資料表，使每個欄位只存放單一的值。調整後可變成：
| Student ID | Student Name | Courses   |
|------------|-------------|------------|
| S001       | John Doe    | Math　　　　|
| S001       | John Doe    | Physics　　|
| S001       | John Doe    | Chemistry |

現在，每一行中 Course 欄位都是原子值，資料表滿足 1NF。

**第二正規化(2NF)**
在滿足 1NF 的基礎上，要求資料表中的非主鍵欄位必須完全依賴於整個主鍵，也就是說，不允許部分依賴（partial dependency），避免出現只有主鍵的一部分決定其他欄位的情況。


假設有一個學生選課資料表，主鍵由 `StudentID` 與 `Course` 共同組成：

| Student ID | Student Name | Courses   |  Instructor  |
|------------|-------------|------------|--------------|
| S001       | John Doe    | Math　　　　|   Prof. A    |
| S001       | John Doe    | Physics　　|	Prof. B     |
| S001       | John Doe    | Chemistry |    Prof. C     |

問題：
這個表中 `StudentName` 只依賴於 `StudentID`，而不是整個複合主鍵（`StudentID` + `Course`）。這種部分依賴會導致資料冗餘與更新異常（若學生姓名改變，需更新多條記錄）。

改進方法：  
把資料拆成兩個表：  
1.學生資料表
| Student ID | Student Name|
|------------|-------------|
| S001       | John Doe    |

2.學生選課關係表：
| Student ID | Student Name| Instructor|
|------------|-------------| ------------|
| S001       | John Doe    |   Prof. A   |
| S001       | Physics    |   Prof.  B  |
| S001       | Chemistry   |   Prof. C   |

這樣一來，學生姓名只儲存在 `學生基本資料表` 中，每個非主鍵欄位都完整依賴於相應表的主鍵，滿足 2NF。

**第三正規化(3NF)**
在滿足 2NF 的基礎上，要求資料表中的非主鍵欄位不能相互依賴，也就是不能存在傳遞依賴（transitive dependency）。簡單來說，每個非主鍵欄位應該直接依賴於主鍵，而非依賴於其他非主鍵欄位。

舉例：
假設有一個員工資料表，設計如下：
| Employee ID | Employee Name | Department ID | Department Name |
|------------|---------------|---------------|-----------------|
| E001       | Alice         | D01           | Sales          |
| E002       | Bob           | D02           | Marketing      |

問題：
在這個表中，`DepartmentName` 是依賴於 `DepartmentID` 而存在的，而 `DepartmentID` 又依賴於 `EmployeeID`。也就是說，`EmployeeID` → `DepartmentID` → `DepartmentName`，這形成了傳遞依賴。這種依賴關係意味著如果部門資訊發生變化，可能需要在多個記錄中進行修改。

改進方法：
拆分成兩個資料表

1.員工基本資料表：
| Employee ID | Employee Name | Department ID |
|------------|---------------|---------------|
| E001       | Alice         | D01           |
| E002       | Bob           | D02           |

2.部門資料表
|  Department ID |  Department Name | 
|------------|---------------    |
| D01       | Sales              |
| D02      | Marketing           |


這樣，每個表中的非主鍵欄位都直接依賴於該表的主鍵，消除了傳遞依賴，達到 3NF 的要求

4.BCNF（Boyce-Codd Normal Form）
BCNF 是對 3NF 的加強，要求資料表中每個決定因素（determinant）必須是候選鍵。也就是說，若某個欄位能決定其他欄位，那麼這個欄位必須屬於候選鍵。

應用情境：
在某些情況下，即使資料表滿足 3NF，仍可能存在因複雜依賴關係引起的異常。透過 BCNF 可以進一步拆分資料表，以消除這類依賴。BCNF 的拆分通常較為複雜，僅在特定需求下採用。


### 綜合舉例：學生選課資料庫設計

記錄學生基本資料及其選修的課程，並且每門課程有對應的授課教師。原始設計可能是這樣的（未正規化版本）：

| Student ID | Student Name | Courses                  | Instructor                |
|------------|-------------|--------------------------|---------------------------|
| S001       | John Doe    | Math, Physics, Chemistry | Prof. A, Prof. B, Prof. C|

這個設計有幾個問題：
違反1NF`Courses`和`Instructor`欄位中存放了多個值
潛在部分依賴問題：如果我們嘗試將所有資料放在同一表中，某些欄位只依賴於學生（例如學生姓名），而其他欄位依賴於課程。

正規化步驟：  
1.拆分為原子值（達到1NF）：
將每個學生與每門課程對應成單獨一行：
| Student ID | Course    | Instructor |
|------------|-----------|------------|
| S001       | Math      | Prof. A    |
| S001       | Physics   | Prof. B    |
| S001       | Chemistry | Prof. C    |

2.消除部分依賴(達到2NF)：
將學生的基本資訊和選課關係分為兩個表格，因為`StudentName`僅依賴於`StudentID`

| Student ID | Student Name |
|------------|-------------|
| S001       | John Doe    |

| Student ID | Course    | Instructor |
|------------|-----------|------------|
| S001       | Math      | Prof. A    |
| S001       | Physics   | Prof. B    |
| S001       | Chemistry | Prof. C    |

3.消除傳遞依賴(達到3NF)：
假設情況進一步複雜化：每門課程除了授課教師外，還有其他資訊（例如課程時數、上課地點），並且這些資訊只依賴於 `Course`。此時，`Instructor` 與其他課程相關資料實際上是依賴於 `Course` 而非學生。因此可以再拆分一個課程資料表：

課程資料表：
| Course    | Instructor | Credit Hours | Location |
|-----------|------------|--------------|----------|
| Math      | Prof. A    | 3            | Room 101 |
| Physics   | Prof. B    | 4            | Room 102 |
| Chemistry | Prof. C    | 3            | Room 103 |

學生選課關係表（僅保留學生與課程之間的關聯）：

| Student ID | Course    |
|------------|-----------|
| S001       | Math      |
| S001       | Physics   |
| S001       | Chemistry　|

#### 正規化的優點與考量

優點：  
**資料一致性**：減少冗餘資料，避免資料不一致的情形  
**易於維護**：當資料需要更新時，只需要修改一處  
**結構清晰**：各資料表職責明確，利於理解與管理。  

考量：  
**查詢效能**：過度正規化可能會導致大量的`JOIN`操作，影響查詢效能，在一些以查詢效率為主的系統中，可能會採取部分反正規化（Denormalization）的策略。  
**設計複雜度**：對於複雜業務邏輯，拆分過多的表可能增加設計與維護難度，需要在正規化與效能之間取得平衡。  

小結：資料庫正規化是一項重要的資料庫設計技術，通過將資料拆分到多個相互關聯的表中，可以有效消除冗餘和依賴異常，提升資料的一致性和維護性。在實際應用中，設計者往往需要根據具體業務需求與效能要求，在正規化和反正規化之間做出取捨。



### Django ORM如何跟資料庫正規化應用呢 ?　　
在Django開發過程中，設計模型就要遵守資料庫正規化的原則，從而得到一個結構合理、易於維護的資料庫，舉個學生選課的例子：

1.**拆分實體：**
將「學生」、「課程」以及「選課」定義為三個獨立的模型。學生模型存放學生的基本資訊；課程模型存放課程詳細資料；選課模型則以 ForeignKey 建立學生與課程之間的關聯。這樣可以確保學生資訊只存在學生模型中，避免重複出現。

2.**建立正確的關聯：**
Django ORM 利用`ForeignKey`、 `ManyToManyField`、`OneToOneField`，可以很方便在模型之間建立關聯，以下示範用`ForeignKey`
```py
class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    # 其他欄位

class Course(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    # 其他欄位

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrollment_date = models.DateField(auto_now_add=True)
```

這樣設計後，資料在學生、課程和選課三個表中各自存放，既符合正規化的原則，又方便 Django ORM 進行資料操作。

### ForeignKey模型建立額外小補充

`related_name`用於模型的關聯欄位，(例如`ForeignKey`、`ManyToManyField`，用來指定反向關聯的名稱)

```py
class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
```

這樣，每個 `Student` 對象就可以通過 `student.enrollments.all()` 來取得該學生所有的選課記錄。

為什麼要這樣寫？
這樣可以讓反向關聯更加語意，也便於理解與使用。當有多個外鍵指向同一模型時，指定 `related_name` 也可以避免命名衝突。

#### 容易搞混的`select_related`、`prefetch_related`、`related_name`

`select_related`(適用於ForeignKey)和 `prefetch_related`(適用於多對多)則是查詢優化的方法，用來提前抓取外鍵關聯的數據，降低查詢次數，提升效能。

`related_name` 是在模型定義中用來設定反向關聯名稱，並且使程式碼更易讀、易管理。



