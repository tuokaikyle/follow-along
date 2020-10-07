# 重要心得

后端通过 url X 连接 db 发送到后端

后端定义自己的路径 url Y

前端通过 url Y 与后端联络

前端通过 url Z 让用户访问

# 流程

## setup, 1-3

## mongo, 4-6

## get, 7-17

## post, 18-24

## delete, 25

25 添加垃圾箱图标，需要 deleteOne function

26 建立 deleteOne function

28 建立 app.delete()

## toggle put, 32

32 toggle html 逻辑

33 toggle function

34 toogle app.put

## 问题：

req.params.id 怎么理解？ 答案：就是 url:后面的变量

一个 const xx = ()=>{} 函数，html 里面不带括号。js 需要带？
