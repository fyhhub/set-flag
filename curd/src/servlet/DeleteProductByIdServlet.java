package servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.ProductService;

/**
 * 删除
 */
public class DeleteProductByIdServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//获取pid的值
		String pid = request.getParameter("pid");
		//调用service 完成删除操作
		try {
			new ProductService().delProduct(pid);
		} catch (SQLException e) {
			e.printStackTrace();
			request.setAttribute("msg", "删除失败");
			request.getRequestDispatcher("/msg.jsp").forward(request, response);
		}
		//重定向到findAll
		response.sendRedirect(request.getContextPath()+"/findAll");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
