<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table border="1" align="center" width="88%">
		<tr>
			<th>pid</th>
			<th>商品图片</th>
			<th>商品名称</th>
			<th>市场价</th>
			<th>商城价</th>
			<th>商品描述</th>

		</tr>
		<c:forEach items="${pb.list }" var="p">
			<tr>
				<td width='8%'>${p.pid }</td>
				<td width='8%'><img alt=""
					src="${pageContext.request.contextPath }/${p.pimage}" width="80"></td>
				<td width='8%'>${p.pname }</td>
				<td width='8%'>${p.market_price }</td>
				<td width='8%'>${p.shop_price }</td>
				<td>${p.pdesc }</td>

			</tr>
		</c:forEach>
	</table>
	<center>
		<!-- 若是第一页 首页和上一页不展示 -->
		<c:if test="${pb.currPage!=1 }">
			<a href='${pageContext.request.contextPath}/showProductByPage?currPage=1'>[首页]  </a>
			<a href='${pageContext.request.contextPath}/showProductByPage?currPage=${pb.currPage-1}'>[上一页]</a>
		</c:if>
		
		<!-- 将所有的页码展示出来 -->
		<c:forEach begin="${pb.currPage-2>0?pb.currPage-2:1 }" end="${pb.currPage+2>pb.totalPage?pb.totalPage:pb.currPage+2 }" var="n">
			<!-- 若是当前页 不可点 -->
			<c:if test="${pb.currPage == n }">
				${n }
			</c:if>
			
			<!-- 若不是当前页 可点 -->
			<c:if test="${pb.currPage != n }">
				<a href="${pageContext.request.contextPath}/showProductByPage?currPage=${n}">${n }</a>
			</c:if>
		</c:forEach>
		
		<!-- 若是最后一页 尾页和下一页不展示 -->
		<c:if test="${pb.currPage!=pb.totalPage }">
			<a href='${pageContext.request.contextPath}/showProductByPage?currPage=${pb.currPage+1}'>[下一页]</a>
			<a href='${pageContext.request.contextPath}/showProductByPage?currPage=${pb.totalPage}'>[尾页]  </a>
		</c:if>
		第${pb.currPage }页/共${pb.totalPage }页
	</center>
</body>
</html>