package servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import domain.PageBean;
import domain.Product;
import service.ProductService;

/**
 * 分页展示商品
 */
public class ShowProductByPageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//获取第几页
		Integer currPage = Integer.parseInt(request.getParameter("currPage"));
		int pageSize = 3;
		//调用service 完成查询操作 返回值 pagebean
		PageBean<Product> bean = null;
		try {
			bean = new ProductService().showProductByPage(currPage,pageSize);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//将pagebean放入request域中 请求转发product_page.jsp
		request.setAttribute("pb", bean);
		request.getRequestDispatcher("/product_page.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
