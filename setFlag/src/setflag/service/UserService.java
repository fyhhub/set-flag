package setflag.service;

import setflag.domain.User;

public interface UserService {

	String getAvatar(String data) throws Exception;

	User login(String username, String password) throws Exception;

	void regist(User user) throws Exception;

	void addToken(String user_token, String user_id) throws Exception;

	User checkUsername(String username) throws Exception;

	User checkToken(String token) throws Exception;

}
