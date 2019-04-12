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
import setflag.service.UserService;
import setflag.utils.BeanFactory;

/**
 * 获取头像
 */
public class Login_getAvatorServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static final Logger log = Logger.getLogger(Login_getAvatorServlet.class);

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			InputStream is= null;
			is = request.getInputStream();
			String bodyInfo = IOUtils.toString(is, "utf-8");
			log.info("入参信息："+bodyInfo);
			System.out.println(bodyInfo);
			JSONObject json = JSONObject.fromObject(bodyInfo);
			String data = json.getString("username");
			System.out.println(data);
			UserService us = (UserService) BeanFactory.getBean("UserService");
			String avatar="";
			avatar = us.getAvatar(data);
			System.out.println(avatar);
			Map<String, Object> map = new HashMap<String, Object>();
			Map<String, Object> map2 = new HashMap<String, Object>();
			if(avatar==null||avatar.length()==0) {
					map.put("code", 1);
					map.put("msg", "");
					map.put("data", "");
			}else {
					map2.put("avatar", "http://172.20.10.9:8080/setFlag/"+avatar);
					map.put("code", 0);
					map.put("msg", "");
					map.put("data", map2);
			}
			System.out.println(avatar);
			
			JSONObject res = JSONObject.fromObject(map);
			System.out.println(res.toString());
			response.setCharacterEncoding("utf-8");
			response.getWriter().print(res);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
