package setflag.dao.impl;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import setflag.dao.UserDao;
import setflag.domain.User;
import setflag.utils.DataSourceUtils;

public class UserDaoImpl implements UserDao {

	/**
	 * 获取用户头像
	 */
	@Override
	public String getAvatar(String data) throws Exception {
		QueryRunner qr = new QueryRunner(DataSourceUtils.getDataSource());
		String sql = "select user_avatar from user where username = ?";
		
		return (String) qr.query(sql, new ScalarHandler(), data);
	}

	/**
	 * 用户登录
	 */
	@Override
	public User login(String username, String password) throws Exception {
		QueryRunner qr = new QueryRunner(DataSourceUtils.getDataSource());
		String sql = "select * from user where username = ? and password = ?";
		return qr.query(sql, new BeanHandler<>(User.class), username,password);
	}

	/**
	 * 用户注册
	 */
	@Override
	public void regist(User user) throws Exception {
		QueryRunner qr = new QueryRunner(DataSourceUtils.getDataSource());
		String sql = "insert into user values(?,?,?,?,?,?,?,?,?)";
		qr.update(sql, user.getUser_id(),user.getUsername(),user.getPassword(),
				user.getUser_sex(),user.getUser_avatar(),user.getUser_email(),
				user.getUser_score(),user.getUser_nickname(),user.getUser_token());
	}

	/**
	 * 添加token
	 */
	@Override
	public void addToken(String user_token,String user_id) throws Exception {
		QueryRunner qr = new QueryRunner(DataSourceUtils.getDataSource());
		String sql = "update user set user_token = ? where user_id = ?";
		qr.update(sql, user_token,user_id);
	}

	/**
	 * 判断用户名是否存在
	 */
	@Override
	public User checkUsername(String username) throws Exception {
		QueryRunner qr = new QueryRunner(DataSourceUtils.getDataSource());
		String sql = "select * from user where username = ?";
		return qr.query(sql, new BeanHandler<>(User.class), username);
	}

	/**
	 * 检查token
	 */
	@Override
	public User checkToken(String token) throws Exception {
		QueryRunner qr = new QueryRunner(DataSourceUtils.getDataSource());
		String sql = "select * from user where user_token = ?";
		return qr.query(sql, new BeanHandler<>(User.class), token);
	}

}
