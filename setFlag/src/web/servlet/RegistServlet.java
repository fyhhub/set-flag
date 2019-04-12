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
import setflag.constant.Constant;
import setflag.domain.User;
import setflag.service.UserService;
import setflag.utils.BeanFactory;
import setflag.utils.JwtToken;
import setflag.utils.MD5Utils;
import setflag.utils.UUIDUtils;

/**
 * 用户注册
 */
public class RegistServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static final Logger log = Logger.getLogger(RegistServlet.class);

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			
			InputStream post_is= null;
			post_is = request.getInputStream();
			String bodyInfo = IOUtils.toString(post_is, "utf-8");
			log.info("入参信息："+bodyInfo);
			System.out.println(bodyInfo);
			JSONObject json = JSONObject.fromObject(bodyInfo);
			String username = json.getString("userName");
			String password = json.getString("password");
			password = MD5Utils.md5(password);
			String user_sex = json.getString("sex");
			String user_email = json.getString("email");
			String user_nickname = json.getString("nickname");
			String user_id =UUIDUtils.getId();
			User u = null;
			if(user_sex=="man") {
				u = new User(user_id, username, password, user_sex, Constant.USER_BOY_AVATAR, user_email, 0, user_nickname);
			}else {
				u = new User(user_id, username, password, user_sex, Constant.USER_GILR_AVATAR, user_email, 0, user_nickname);
			}
			u.setUser_token(JwtToken.createToken(user_id));
			UserService us = (UserService) BeanFactory.getBean("UserService");
			us.regist(u);
			//将信息写入map data写入map2中
			Map<String, Object> map = new HashMap<String, Object>();
			Map<String, Object> map2 = new HashMap<String, Object>();
			u.setUser_token(JwtToken.createToken(u.getUser_id()));
			map2.put("token", u.getUser_token());
			map2.put("username", u.getUsername());
			map2.put("sex", u.getUser_sex());
			map2.put("avatar", u.getUser_avatar());
			map2.put("email", u.getUser_email());
			map2.put("score", u.getUser_score());
			map2.put("nickname", u.getUser_nickname());
			map.put("code", 0);
			map.put("isShow", true);
			map.put("msg", "注册成功");
			map.put("data", map2);
			JSONObject res = JSONObject.fromObject(map);
			System.out.println(res.toString());
			response.setCharacterEncoding("utf-8");
			response.getWriter().print(res);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

}
