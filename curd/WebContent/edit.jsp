<%@page import="utils.UUIDUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>编辑商品</title>
</head>
<body>
	<form method="post" action="${pageContext.request.contextPath }/editProduct">
		<input type="hidden" name="pid" value="${bean.pid }">
		<table border="1" align="center" width="40%">
			<tr>
				<td>商品名称</td>
				<td><input type="text" name="pname" value="${bean.pname }"></td>
			</tr>
			<tr>
				<td>市场价</td>
				<td><input type="text" name="market_price" value="${bean.market_price }"></td>
			</tr>
			<tr>
				<td>商城价</td>
				<td><input type="text" name="shop_price" value="${bean.shop_price }"></td>
			</tr>
			<tr>
				<td>商品描述</td>
				<td><input type="text" name="pdesc" value="${bean.pdesc }"></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="保存"></td>
			</tr>
		</table>
	</form>
</body>
</html>