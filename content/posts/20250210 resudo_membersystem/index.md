+++
date = '2025-02-09'
draft = false
title = '打造會員系統(前後端分離)'
show_reading_time=true
featured_image = 'images/sunnyday.png'
categories = ["前端","後端"]
tags = ["python","vite+React","API","DRF"]
toc=true
+++

這次專案使用的工具  
前端：`vite+React`  
後端：`django`  
資料庫：`MySQL`

<!--more-->

### 後端建立 API

首先建立一個應用程式 app `users`

```
python manage.py startapp users

```

```py
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "users",  #加入"users"到這個INSTALLED_APPS
    "profiles",
    'drf_yasg',
]

CORS_ALLOW_CREDENTIALS = True
```

在這裡介紹一下，序列器。  
可以把資料在不同格式轉換格式，在 API 開發和數據存儲時很常見。

序列化是把物件(Object)轉換為 JSON、XML、二進位格式，方便傳輸和儲存，在後端開發時，通常需要把 Python 物件(Django)模型轉換為 JSON 格式，讓前端讀取。

下一步我們就開始來編寫序列器：

```PY
from django.contrib.auth.models import User #匯入Django內建模型，管理使用者帳號
from rest_framework import serializers #serializers 來自 Django REST Framework。提供了`ModelSerializer`來簡化Model到Json之間的轉換

class UserSerializer(serializers.ModelSerializer):
    #定義UserSerializer，這個序列化器繼承於serializers.ModleSerializer，表示它是基於Django Model 自動生成的序列化器
    class Meta:
        model = User
        #序列化器對應的Django User模型
        fields = ("username", "email", "password")
        #序列化時要包含的欄位
        extra_kwargs = {'password': {'write_only': True},
        'email': {'required': True}}
        #額外參數設定，密碼欄位只能寫入，不能讀取，這樣在API RESPONSE中不會顯示密碼。 email是必填
    def create(self, validated_data):
        #create()負責反序列化JSON並創立User實例
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        #使用User.objects.create_user()，create_user()會自動加密密碼，如果是用   ser.objects.create()，不會加密，密碼只會用純文字，這樣不安全。

        #validate_data表示已驗證的資料


        return user
```

再來，到 users/urls.py 去定義路由

```py
from django.urls import path
form .views import user_register,user_login,user_logout

app_names="users"

urlpatterns=[
    path("register/",user_register,name="user_register"),
    path("login/",user_login,name="user_login"),
    path("logout/",user_logout,name="user_logout"),
]

```

到 views.py 去控制判斷請求回應

```py
from django.shortcuts import render
from rest_framework.decroators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate,login,logout
from .serializers import UserSerializer

@api_view([POST])
def user_register(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"註冊成功"},status=status.HTTP_201_CREATED)
    return Response({"message":"註冊失敗"},status=status.HTTP_400_BAD_REQUEST)

@api_view([POST])
def user_login(request):
    username=request.data.get("username")
    password=request.data.get("password")
    email=request.data.get("email")

    user=authenticate(request,username=username,passowrd=password)

    if user is None:
        login(request,user)
        return Response({"message":"登入成功"},status=status.HTTP_200_OK)

    return Response({"message":"登入失敗"},status=status.HTTP_400_BAD_REQUEST)

@api_view([POST])
def user_logout(request):
    logout(request)
    return Response({message:"登出成功"},status=status.HTTP_200_OK)
```

### 前端串接 API

```jsx
// src/App.jsx
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import ProfileIndex from './components/profiles/ProfileIndex'
import ProfileShow from './components/profiles/ProfileShow'
import ProfileNew from './components/profiles/ProfileNew'
import ProfileEdit from './components/profiles/ProfileEdit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import './App.css'
function App() {
  return (
    <div>
      <nav>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<ProfileIndex />} />
        <Route path="/profiles/:id" element={<ProfileShow />} />
        <Route path="/profiles/new" element={<ProfileNew />} />
        <Route path="/profiles/edit/:id" element={<ProfileEdit />} />
      </Routes>
    </div>
  )
}
```

```jsx
// src/components/Home.jsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [message, setMessage] = useState('')
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
      } else {
        setMessage(data.error || '登出失敗')
      }
    } catch (error) {
      setMessage('發生錯誤')
    }
  }
  return (
    <div>
      <h2>歡迎來到首頁</h2>
          <Link to="/profiles/new">建立新 Profile</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>登出</button>
      {message && <p>{message}</p>}
    </div>
  );
}
```

```jsx
// auth/Login.jsx
import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok) {
        setTimeout(() => {
          window.location.href = '/'
        }, 800)
        setMessage(data.message)
      } else {
        setMessage(JSON.stringify(data))
      }
    } catch (error) {
      setMessage('發生錯誤')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
```

```jsx
// src/components/auth/Register.jsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    const payload = {
      username,
      email,
      password,
    }
    try {
      const response = await fetch(
        'http://localhost:8000/api/users/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )
      const data = await response.json()
      if (response.ok) {
        setMessage('註冊成功')
        setTimeout(() => {
          window.location.href = '/'
        }, 800)
      } else {
        setMessage('註冊失敗', JSON.stringify(data))
      }
    } catch (error) {
      setMessage('發生錯誤')
    }
  }

  return (
    <div>
      <h2>註冊</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>使用者名稱</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密碼</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">註冊</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Register
```

### 增加 JWT 認證

```PY
from pathlib import Path
import os
import environ
from datetime import timedelta # 匯入這個模組
from dotenv import load_dotenv


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",  #加上這個
    "users",
    "profiles",
    'drf_yasg',
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),  #API端點身分驗證方是用simplejwt套件
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        #所有端點都要登入才能存取
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30), #存取權杖的時間
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1), #刷新權杖，有效是一天
    'AUTH_HEADER_TYPES': ('Bearer',), #授權標頭，請求API時要加上的標頭，用"Bearer"作為前綴
}

#每次請求API，都要提供Access Token，Access Token 過期後，會使用Refresh Token來換取Access Token，如此一來使用者可以用Refresh Token 取得最新的Access Token，而不需要重新登入，可以減少頻繁輸入密碼的需求。
```

在主程式的 urls.py 添加 token 路由

```py
# core/urls.py
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework import permissions


path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair')
path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh')
```

```py
# users/views.py
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated

@api_view(["POST"])
def user_register(request):
  serializer=UserSerializer(data=request.data)
  if serializer.is_valid(){
    user=serializer.save()
    refresh=RefreshToken.for_user(user)
    return Response({"message":"註冊成功","access":str(refresh.access_token),"refresh":str(refresh).status=status.HTTP_201_CREATED})
  }
  return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def user_login(request):
  username=request.data.get("username")
  password=request.data.get("password")
  user=authenticate(request,username=username,password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user) #創建JWT Token
        return Response({"message":"登入成功","access":str(refresh.access_token),"refresh":str(refresh)},status=status.HTTP_200_OK)
    return Response({"message":"登入失敗"},status=status.HTTP_400_BAD_REQUEST)
  # refresh.access_token:取得AccessToken(30分內)
  #refresh:取得Refresh Token

@api_view(["POST"])
@permission_classes([AllowAny])
def user_logout(request):
    return Response({"message":"登出成功"},status=status.HTTP_200_OK)
```

### 前端 token 設置

```jsx
// components>auth>Register.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    const payload = {
      username,
      email,
      password,
    }
    try {
      const response = await fetch(
        'http://localhost:8000/api/users/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )
      const data = await response.json()
      if (response.ok) {
        setMessage('註冊成功')

        localStorage.setItem('accessToken', data.access) //這是一個 瀏覽器的 Web API，用來儲存資料在 localStorage，即使使用者刷新頁面，資料也不會消失。data.access：這是從後端 API 回應中取得的 Access Token。
        localStorage.setItem('refreshToken', data.refresh) //data.refresh：這是從後端 API 回應中取得的 Refresh Token。
        setTimeout(() => {
          window.location.href = '/'
        }, 800)
      } else {
        setMessage('註冊失敗' + JSON.stringify(data))
      }
    } catch (error) {
      setMessage('發生錯誤')
    }
  }
}

export default Register
```

```jsx
//components>auth>Login.jsx
import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('accessToken', data.access) //設定這個
        localStorage.setItem('refreshToken', data.refresh) //設定這個
        setMessage('登入成功!')
        setTimeout(() => {
          window.location.href = '/'
        }, 800)
        setMessage(data.message)
      } else {
        setMessage(JSON.stringify(data))
      }
    } catch (error) {
      setMessage('發生錯誤')
    }
  }
}

export default Login
```

```jsx
//components>Home.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [message, setMessage] = useState('')
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken') //從 localStorage 取出 JWT Access Token，用來進行 API 請求時的身份驗證。
      const response = await fetch('http://localhost:8000/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //指定請求的內容類型是 JSON 格式。
          Authorization: `Bearer ${token}`, // 使用 JWT Token 來驗證身份。Bearer 是 HTTP 授權標頭 (Authorization Header) 的標準格式：
        },
      })
      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
        localStorage.removeItem('accessToken') //從 localStorage移除 accessToken,確保用戶登出後，前端不會再自動帶上 Token。
        localStorage.removeItem('refreshToken') //從 localStorage移除 refreshToken，，避免用戶可以繼續使用 refreshToken 來換取新的 accessToken
        setMessage('登出成功')
        window.location.href = '/login'
      } else {
        setMessage(data.error || '登出失敗')
      }
    } catch (error) {
      setMessage('發生錯誤')
    }
  }
}

export default Home
```

### 受保護的 api

```jsx
// ProfilesIndex.jsx、ProfilesNew.jsx、ProfilesEdit.jsx、ProfilesShow.jsx
// 省略
// 加入程式碼有註解的地方

useEffect(() => {
  const fetchProfiles = async () => {
    const token = localStorage.getItem('accessToken') // 從 localStorage 取出 accessToken，accessToken 是用戶登入時後端發送的驗證憑證，會在請求時提供給後端來確認用戶身份。
    try {
      const response = await fetch('/api/profiles/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', //Content-Type': 'application/json'告訴伺服器 我們預期回傳 JSON 資料。
          Authorization: `Bearer ${token}`, //這是身份驗證標頭（Authorization Header），用來告訴伺服器 Authorization: Bearer <你的 accessToken>。這樣伺服器就能識別請求來自哪個使用者，並確保這個使用者有權限存取 /api/profiles/。
        },
      })
      if (!response.ok) {
        throw new Error('取得 Profiles 失敗')
      }
      const data = await response.json()
      setProfiles(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchProfiles()
}, [])

if (loading) return <div>載入中...</div>
if (error) return <div>Error: {error}</div>
if (profiles.length === 0) return <div>目前沒有任何 Profile 資料</div>

export default ProfileIndex
```
