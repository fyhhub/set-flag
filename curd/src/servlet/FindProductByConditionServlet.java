package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import domain.Product;
import service.ProductService;

/**
 * 条件查询
 */
public class FindProductByConditionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//设置编码
		request.setCharacterEncoding("utf-8");
		//接收两个参数
		String name = request.getParameter("name");
		String kw = request.getParameter("kw");
		List<Product> list = null;
		
		//调用service完成查询操作 返回list
		try {
			list = new ProductService().findProductByCondition(name,kw);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		//将list放入request域中 请求转发
		request.setAttribute("list", list);
		request.getRequestDispatcher("/product_list.jsp").forward(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
