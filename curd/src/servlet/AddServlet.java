package servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import domain.Product;
import service.ProductService;
import utils.UUIDUtils;

/**
 * 添加商品
 */
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//设置编码
		request.setCharacterEncoding("utf-8");
		//拓展 令牌机制
		//1 获取浏览器令牌
		String r_lingpai = request.getParameter("r_lingpai");
		String s_lingpai = (String) request.getSession().getAttribute("s_lingpai");
		//2 移除session中的令牌
		request.getSession().removeAttribute("s_lingpai");
		//3 比较这两个令牌
		if(s_lingpai==null||!s_lingpai.equals(r_lingpai)) {
			//已经提交过了，将错误信息传入request域中 跳转到msg.jsp
			request.setAttribute("msg", "商品已提交");
			request.getRequestDispatcher("/msg.jsp").forward(request, response);
			return;
		}
		//封装数据
		Product p = new Product();
		try {
			BeanUtils.populate(p, request.getParameterMap());
			//设置pid和时间
			p.setPid(UUIDUtils.getId());
			p.setPdate(new Date());
			//调用service完成添加操作
			new ProductService().addProduct(p);
			//页面跳转
			request.getRequestDispatcher("/findAll").forward(request, response);
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("msg", "添加失败");
			request.getRequestDispatcher("/msg.jsp").forward(request, response);
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
