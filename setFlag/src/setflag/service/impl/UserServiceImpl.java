package setflag.service.impl;

import org.omg.CORBA.UserException;

import setflag.dao.UserDao;
import setflag.domain.User;
import setflag.service.UserService;
import setflag.utils.BeanFactory;

public class UserServiceImpl implements UserService {

	/**
	 * »ñÈ¡Í·Ïñ
	 */
	@Override
	public String getAvatar(String data) throws Exception {
		UserDao dao = (UserDao) BeanFactory.getBean("UserDao");
		return dao.getAvatar(data);
	}

	/**
	 * µÇÂ¼
	 */
	@Override
	public User login(String username, String password) throws Exception {
		UserDao dao = (UserDao) BeanFactory.getBean("UserDao");
		return dao.login(username,password);
	}

	/**
	 * ×¢²á
	 */
	@Override
	public void regist(User user) throws Exception {
		UserDao dao = (UserDao) BeanFactory.getBean("UserDao");
		dao.regist(user);
	}

	@Override
	public void addToken(String user_token,String user_id) throws Exception {
		UserDao dao = (UserDao) BeanFactory.getBean("UserDao");
		dao.addToken(user_token,user_id);
	}

	@Override
	public User checkUsername(String username) throws Exception {
		UserDao dao = (UserDao) BeanFactory.getBean("UserDao");
		return dao.checkUsername(username);
	}

	@Override
	public User checkToken(String token) throws Exception {
		UserDao dao = (UserDao) BeanFactory.getBean("UserDao");
		return dao.checkToken(token);
	}

}
