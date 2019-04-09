<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="/curd/fileUpLoad"  enctype="multipart/form-data" method="post">
	用户名：<input type="text" name="username">
	文件：<input type="file"  name="f">
	<input type="submit">
</form>

</body>
</html>