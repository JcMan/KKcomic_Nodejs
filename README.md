# KKcomic_Nodejs
使用Node.js编写爬虫获取漫画资源
# 端口号
**3001**
# 接口介绍

下面就介绍一下实现的一些接口

 1、获取一周内更新的情况
	 
```
http://localhost:3001/update/0
```
该接口的参数主要是update后面的数字，从0到6，表示一周之内的更新情况，但是并不是说0代表的是第一天，具体需要看快看漫画网站

 2、获取搜索漫画结果
 
```
http://localhost:3001/search/?keyword=神
```
该接口是获取搜索漫画内容的，输入关键字就可以得到搜索的内容。

3、 获取漫画分类列表
 

```
http://localhost:3001/categorylist
```
该接口返回的是漫画的所有分类名称和对应的id。

4、获取某一分类下的漫画
```
http://localhost:3001/getComics/?tag=22&page=1
```
该接口根据上一个接口返回的分类的id得到该分类下的漫画，提供不同的tag的值和page的值即可。

5、获取某一本漫画的详情和目录
```
http://localhost:3001/getcomicsdetails/?id=147
```
该接口是根据漫画的id获取该漫画的详情，简介，作者和章节目录的信息。

6、获取某一漫画章节下的所有图片
```
http://localhost:3001/getpics/?id=9079
```
该接口根据漫画章节的id获取该章节的所有漫画图片。

