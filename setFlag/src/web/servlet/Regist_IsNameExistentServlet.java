package web.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import net.sf.json.JSONObject;
import setflag.domain.User;
import setflag.service.UserService;
import setflag.utils.BeanFactory;

/**
 * 注册时判断用户名是否存在
 */
public class Regist_IsNameExistentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static final Logger log = Logger.getLogger(Regist_IsNameExistentServlet.class);
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			InputStream is= null;
			is = request.getInputStream();
			String bodyInfo = IOUtils.toString(is, "utf-8");
			log.info("入参信息："+bodyInfo);
			System.out.println(bodyInfo);
			JSONObject json = JSONObject.fromObject(bodyInfo);
			String username = json.getString("userName");
			UserService us = (UserService) BeanFactory.getBean("UserService");
			User u = us.checkUsername(username);
			Map<String, Object> map = new HashMap<String, Object>();
			if(u==null) {
				map.put("code", 0);
				map.put("msg", "");
				map.put("data", "");
			}else {
				map.put("code", 1);
				map.put("msg", "");
				map.put("data", "");
			}
			JSONObject res = JSONObject.fromObject(map);
			System.out.println(res.toString());
			response.setCharacterEncoding("utf-8");
			response.getWriter().print(res);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
