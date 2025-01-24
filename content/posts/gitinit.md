+++
date = '2024-12-05'
draft = false
title = '關於Git'
show_reading_time=true
featured_image = '/images/S__20463625.jpg'
toc=true
+++

### git 優點

速度小、檔案小
同時支援本地及遠端操作 (不需要網路)

<!--more-->

```py
# 檢視目前設定
git config --list

# 設定username 及 email
git config --global user.name "elaine"
git config --global user.email "lioou.work@gmail.com"
```

### 終端指令

| **Windows 指令** | **Linux 指令** | **功能描述**       |
| ---------------- | -------------- | ------------------ |
| `cd`             | `cd`           | 切換目錄           |
| `cd`             | `pwd`          | 取得目前所在的位置 |
| `dir`            | `ls`           | 列出目前的檔案列表 |
| `mkdir`          | `mkdir`        | 建立新的目錄       |
| 無               | `touch`        | 建立檔案           |
| `copy`           | `cp`           | 複製檔案           |
| `move`           | `mv`           | 移動檔案           |
| `del`            | `rm`           | 刪除檔案           |
| `cls`            | 無             | 清除畫面           |

### git 執行流程

- 工作目錄 Working <br>
- 暫存區域 Staging <br>
- 儲存庫 Repository <br>

- staging area <br>
- commit -m "init commit" <br>
- git help<br>
- git status<br>

### git Command 指令

- git init 初始化
- git status
- git commit -m "init commit"
- git add .. (..代表上層)
- git add . (.代表這裡/這一層)
- git add --all
- git checkout . 把檔案或目錄都刪除 可以用這個指令救回，也可以切換分支(Head)
- git restore . 檔案或目錄刪除也可以用 restore 這個指令救回

- git branch 檢視分支
- git branch 名稱 建立分支
- git branch -d 分支 刪除分支 (把分支貼紙撕掉)
- git switch 檔案名稱 切換分支(Head)

- git blame 檔案名稱 找出檔案程式碼哪一行是誰寫的

- git merge 合併分支
- git rebase 合併分支
- git reflog 檢視 HEAD 紀錄表
- git fetch 把遠端節點拉下來 (貼紙為 origin/main)

- checkout 可以救回檔案也可以切換分支，避免混淆
  所以有了 restore 和 switch 更容易辨別

- git log 可以看到歷史紀錄
  git log --oneline
  建議裝外掛 git graph
  (vscode 也有 view --->source control )

### branch 分支

- 是 HEAD 上帝視角
- 分支只是一張貼在某個 Commit 上的貼紙
- 分支有 main master

#### merge 合併

- 合併分支，要先用 git switch 切換控制權，再 git merge 分支， 控制權會往前移
- 如果 git merge 控制權，終端機會顯示最新狀態
- merge，可以保留歷史紀錄，節點合併節點越多，越混亂
- Fast-forward 合併成功
  有分支交流道 `git merge xx --no-ff -m ""`

#### rebase 合併

假設 dog 分支要合併到 cat 分支，那就要先切換成 dog 分支，再進行 git rebase cat
要注意，末端支點沒有人管，就會暫時隱藏，會改變歷史紀錄，節點相對單純

#### 要用哪個合併

merge 會保留歷史紀錄  
rebase 不會改變歷史紀錄  
要用哪個合併，決定你要不要修改歷史紀錄

#### conflict 發生衝突

更改的檔案跟原本太相近，就會發生衝突，Git 會分辨不出來，
去要修改的檔案裡面選擇就好了。

#### 回到上一步

在 Git 裡面，沒有刪除 commit 的指令
reset = become 的概念  
reset 之後的參數  
--mixed 把東西丟回工作區域 (預設值)  
--soft 把東西丟回暫存區  
--hard 直接丟掉 (git reset head^ --hard)

#### ^(Caret)與 ~ (Tilde)

^ = Caret = 卡瑞特 回到上一步  
~ = Tilde = 提爾達 往回前兩步

SSH 要設定金鑰

#### Git pull

- `git fetch` 這個指令在做的事情，這個專案線上有的，但本地機沒有，就會拉回來
- `git fetch` 之後的遠端節點貼紙就是 origin/master
- `git pull` = git fetch + git merge
- `git pull` --rebase = git fetch+auto git rebase

<!-- learn git -->

#### 跳回當時的檔案

1.git checkout -b tem

2.get reset 號碼 --hard
