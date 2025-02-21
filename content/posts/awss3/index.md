+++
date = '2025-02-20'
draft = false
title = '利用django開發-實現AWSS3上傳圖片'
show_reading_time=true
featured_image = 'images/dj.png'
categories = ["後端","python"]
tags = ["後端","python","django","AWS"]
toc=true
+++

本文教你從註冊 AWS 到可以利用 django 開發，實現 AWSS3 上傳圖片功能!

<!--more-->

以下連結為詳細 AWS 註冊步驟、申請 S3，請先按照影片完成步驟。
{{< youtube y12KO8XM6jw >}}

### AWS S3（Amazon Simple Storage Service）

由 AWS 提供的物件儲存服務，在現代應用程式架構中，S3 常常扮演著儲存與分發靜態資源（如圖片、影片、文件等）的角色

### 為什麼要使用 AWS S3 服務?

在 server 端如果有靜態檔案(css、圖片、影片)，如果直接傳給 client 端，是會非常消耗 Server 資源，所以我們通常會避免這樣做，這時後就會選擇雲端服務，雲端服務有很多選項，本文著重介紹 AWS S3。
Server 端會把靜態檔，傳給 AWS S3。或者從 S3 擷取需要的資料，進行後續處理後再回應 client 端。

**安全與存取控制**  
🫗client 端不會直接存取 S3（除非是公開資源或使用預簽名 URL），而是透過 Server 端來控制權限和認證流程

🫗Server 端可以生成預簽名 URL（Presigned URL），讓 client 端能在受控的時間內直接上傳或下載 S3 資料，這樣既能保護 S3 的存取安全，又能減少 Server 的負擔。

🫗S3 提供高擴展性，無論是資料量或存取次數都可以輕鬆應對。Server 端可以依賴 S3 來存放用戶資料、備份或其他應用程式資源，而不必擔心儲存空間不足或維護複雜性。

🫗 將大量靜態資源儲存於 S3，可以降低 server 端的負載，並利用 CDN（例如 Amazon CloudFront）快速地將資源分發到全球用戶。

### IAM

**身份驗證與授權管理：**
IAM 允許你建立和管理 AWS 帳號中的使用者、群組及角色，並賦予他們對 AWS 資源（例如 S3）的存取權限。這意味著每個使用者或服務都必須經過 IAM 認證，才能存取 S3 資源，從而確保只有授權的實體可以進行操作。

**IAM 政策與 S3 存取控制：**
IAM 政策是一個基於 JSON 格式的文件，你可以使用這些政策來定義允許或拒絕某個使用者、群組或角色對 S3 進行具體操作（例如：讀取、寫入、刪除）的權限。這些身份層級的政策與 S3 自身的資源層級策略（Bucket Policies、ACLs）共同作用，決定了最終的存取權限。  
**跨服務和跨帳號存取委派：**
當你使用 EC2 或 Lambda 等服務時，可以透過 IAM 角色安全地授權這些服務訪問 S3，而無需在應用程式中硬編碼存取金鑰。  
或是可以設計 IAM 策略和 S3 Bucket Policies，以允許來自其他 AWS 帳號的使用者或角色存取特定 S3 資源，實現跨帳號的安全資源共享。

### AWS 申請步驟

首先先去 AWS 官網點擊服務 ⇀ 打上 IAM⇀ 到儀錶板上點選人員，創立人員 ⇀ 填寫使用者資訊 ⇀ 許可選項填直接連接政策 ⇀ 搜尋 S3⇀ 勾選 AmazonS3FullAccess，按下下一步。

選擇你剛剛的使用者 ⇀ 進入畫面之後有一個存取金鑰 ⇀ 建立存取金鑰 ⇀ 選擇本機代碼 ⇀ 下一步 ⇀ 要把金鑰資訊自己保存起來 ⇀ 完成。

首先先去 AWS 官網點擊服務 ⇀ 打上 S3 ⇀ 建立 bucket(建立儲存貯體) ⇀ 輸入存儲體名稱、AWS 區域(預設雪梨) ⇀ 儲存

這時如果把檔案放在 bucket 會有 access deny 的問題，這是因為我們還沒調整 bucket 的權限

S3 ⇀ 儲存貯體 ⇀ 你建立的儲存貯體 ⇀ 許可 ⇀ 封鎖公有存取權 ⇀ 編輯 ⇀ 取消勾選封鎖所有公開存取權 ⇀
勾選封鎖透過新的存取控制清單(ACL)授予的對儲存貯體和物件的公開存取權 ⇀ 勾選封鎖透過任何存取控制清單授予的儲存主體和物件公開存取權 ⇀ 按下儲存變更。

往下有個儲存貯體政策 ⇀ 貼上政策程式碼

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::resudobucket/*"
            <!-- 這裡填自己的儲存貯體名稱 -->
        }
    ]
}
```

#### django 實現 aws 圖片上傳

首先下載這兩個套件，這裡使用 poetry 虛擬環境

```
poetry add django-storages boto3
```

`django-storages`  
django 的擴充套件，提供統一的介面讓你可以輕鬆使用多種後端儲存服務例如 AWS S3、Google Cloud Storage、Azure Storage 等。

`boto3`  
是 AWS 的官方 Python SDK，提供了操作 AWS 各項服務(例如 S3、EC2、DynamoDB 等的)API
提供低階且靈活的操作介面，可用於建立、配置及管理 AWS 資源。
在使用 AWS S3 時，django-storages 往往會依賴 boto3 來進行實際的連線和操作。

🐞 補充介紹 AWS SDK：  
是一套由 Amazon 提供的軟體開發工具包，幫助開發者輕鬆整合和操作 AWS 提供的各種服務，以下是主要特點和用途。

**多語言操作：**  
AWS SDK 提供了針對多種程式語言的庫，讓使用者可以根據所使用的語言，快速上手 AWS 的 API

**簡化 API 呼叫：**  
SDK 封裝了許多底層細節，包括認證、請求簽署、錯誤處理和重試機制，開發者可以透過簡單的方法呼叫 AWS 服務，無需處理 HTTP 請求。

**支援多項 AWS 服務：**  
無論是儲存服務（S3）、計算服務（EC2、Lambda）、資料庫（DynamoDB）或其他 AWS 服務，SDK 都提供了相應的接口，讓應用程式能夠無縫對接 AWS 生態系統。

**安全性與最佳實踐：**  
AWS SDK 內建與 AWS IAM 等服務整合，方便設定安全性與存取權限，並遵循最佳實踐來確保應用程式的安全運行。

```PY
#settings.py


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "users",
    "storages",  #加上這個
    "profiles",
    "resumes",
    "drf_yasg",
]


STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
        "OPTIONS": {
            "access_key": os.getenv("AWS_ACCESS_KEY_ID"),
            "secret_key": os.getenv("AWS_SECRET_ACCESS_KEY"),
            "bucket_name": os.getenv("AWS_STORAGE_BUCKET_NAME"),
            "region_name": os.getenv("AWS_S3_REGION_NAME"), #利用環境變數包起來，建立.env檔案，把這些敏感資訊放進去
        },
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}
MEDIA_URL = os.getenv("MEDIA_URL")

AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"

```

在對應的 views.py，寫上`from rest_framework.parsers import MultiPartParser, FormParser`  
在 Django REST framework 中，解析器(Parser)負責把 HTTP 請求中的原始資料轉為 Python 原生資料結構，以便後續在程式中使用，這裡介紹兩個常用的解析器：

`MultiPartParser：`  
用途：用來處理 `multipart/form-data` 格式的請求，這種格式常見於表單中包含檔案上傳的情況  
功能：解析請求中的檔案與其他欄位資料，將檔案儲存在一個特殊的檔案物件中（通常是 UploadedFile），而其他表單資料則放入一個類似字典的結構中。使你能夠同時接收文件和文字資料，適用於例如圖片上傳、附件上傳等場景。

`FormParser：`  
用來處理 `application/x-www-form-urlencoded` 格式的請求，這是一般 HTML 表單提交時的預設格式（不包含檔案上傳）。將 URL 編碼的表單資料解析為一個字典或 QueryDict。只針對純文字表單資料進行解析，不處理檔案上傳。

```PY
# views.py
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Resume
from .serializers import ResumeSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def index(request):
    resumes = Resume.objects.all()
    serializer = ResumeSerializer(resumes, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def new(request):
    serializer = ResumeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def show(request, id):
    resume = get_object_or_404(Resume, id=id)
    serializer = ResumeSerializer(resume)
    return Response(serializer.data)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def edit(request, id):
    resume = get_object_or_404(Resume, id=id)
    partial = request.method == "PATCH"
    serializer = ResumeSerializer(resume, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

```

接著在前端把標籤寫好，就完成了！
