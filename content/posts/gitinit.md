+++
date = '2024-11-24T11:00:37+08:00'
draft = false
title = '關於Git'
show_reading_time=true
featured_image = '/images/S__20463625.jpg'
+++

### git優點
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

要去為你自己學git 上面找 終端機常見指令

### git 執行流程
工作目錄 Working
暫存區域 Staging
儲存庫 Repository

staging area
commit -m "init commit" 
git help
git status

### git Command 指令
git init    初始化 
git status
git commit -m "init commit" 
git add .. (..代表上層)
git add .  (.代表這裡/這一層) 
git add --all  
git checkout .   把檔案或目錄都刪除 可以用這個指令救回，也可以切換分支(Head)
git restore  .   檔案或目錄刪除也可以用restore這個指令救回

git branch          檢視分支
git branch 名稱      建立分支
git branch -d 分支    刪除分支 (把分支貼紙撕掉)
git switch 檔案名稱  切換分支(Head)


git blame 檔案名稱   找出檔案程式碼哪一行是誰寫的

git merge         合併分支
git rebase        合併分支
git reflog        檢視HEAD紀錄表
git fetch         把遠端節點拉下來 (貼紙為 origin/main)

checkout可以救回檔案也可以切換分支，避免混淆
所以有了 restore 和switch 更容易辨別

git log 可以看到歷史紀錄
git log --oneline
建議裝外掛 git graph
(vscode也有 view --->source control )


### branch 分支
* 是HEAD 上帝視角
- 分支只是一張貼在某個Commit上的貼紙
- 分支有 main master

#### merge合併
- 合併分支，要先用git switch切換控制權，再git merge 分支， 控制權會往前移
- 如果 git merge 控制權，終端機會顯示最新狀態
- merge，可以保留歷史紀錄，節點合併節點越多，越混亂
- Fast-forward 合併成功
有分支交流道 ` git merge xx --no-ff -m "" `


#### rebase 合併
假設dog分支要合併到cat分支，那就要先切換成dog分支，再進行 git rebase cat
要注意，末端支點沒有人管，就會暫時隱藏，會改變歷史紀錄，節點相對單純

###要用哪個合併
merge會保留歷史紀錄、rebase不會改變歷史紀錄
要用哪個合併，決定你要不要修改歷史紀錄

####  conflict 發生衝突
更改的檔案跟原本太相近，就會發生衝突，Git會分辨不出來，
去要修改的檔案裡面選擇就好了。

#### 回到上一步
在Git裡面，沒有刪除commit的指令
rest  = become的概念
reset 之後的參數
 --mixed 把東西丟回工作區域  (預設值)
 --soft  把東西丟回暫存區
 --hard  直接丟掉

#### ^ 與 ~
^ = Caret =卡瑞特  回到上一步
~=Tilde=提爾達     往回前兩步

SSH要設定金鑰

使用Git clone後，要用cd切換

#### Git pull
` git fetch` 這個指令在做的事情，這個專案線上有的，但本地機沒有，就會拉回來
`git fetch` 之後的遠端節點貼紙就是origin/master
git pull = git fetch + git merge
git pull --rebase=git fetch+auto git rebase



<!-- learn git -->
git reset head^ --hard

