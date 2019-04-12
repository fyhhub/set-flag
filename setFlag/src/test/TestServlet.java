package test;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;


import net.sf.json.JSONArray;
import setflag.service.TestService;
import setflag.utils.BeanFactory;

public class TestServlet extends HttpServlet {
	public static final Logger log = Logger.getLogger(TestServlet.class);
	  
	 /**
	 * 
	 */
	 private static final long serialVersionUID = 1L;
	 private static TestService service;
	 static{
	 service = (TestService) BeanFactory.getBean("TestService"); 
	 }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		InputStream is= null;
		is = req.getInputStream();
		String bodyInfo = IOUtils.toString(is, "utf-8");
		log.info("入参信息："+bodyInfo);
		System.out.println(bodyInfo);
		 List<Object> list = new ArrayList<Object>();
		 list.add("abc");
		 list.add("123");
		//将list封装成json
		JSONArray json = JSONArray.fromObject(list);
		//将得到的数据写回浏览器
		res.setContentType("text/html;charset=utf-8");
		res.getWriter().print(json);
		System.out.println(json);
		 res.getWriter().print("123");
	}

}
