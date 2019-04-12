<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="${pageContext.request.contextPath }/test" method="post">
		用户名:<input type="text"  id="username" placeholder="请输入用户名" name="username"> <br>
		密   码:<input type="password" id="password" placeholder="请输入密码" name="password"> <br>
		<input type="submit" value="登录">
	</form>

</body>
</html>