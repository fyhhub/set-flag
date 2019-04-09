package servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.ProductService;

/**
 * 删除选中商品
 */
public class DelCheckedProductServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//获取选中的id
		String[] ids = request.getParameterValues("pid");
		//调用service，完成删除选中商品
		try {
			new ProductService().delCheckedProduct(ids);
		} catch (SQLException e) {
			e.printStackTrace();
			request.setAttribute("msg", "删除失败");
			request.getRequestDispatcher("/msg.jsp").forward(request, response);
		}
		//重定向
		response.sendRedirect(request.getContextPath()+"/findAll");
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
