package setflag.domain;

public class User {
	private String user_id;
	private String username;
	private String password;
	private String user_sex;
	private String user_avatar;
	private String user_email;
	private int user_score=0;
	private String user_nickname;
	private String user_token;
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUser_sex() {
		return user_sex;
	}
	public void setUser_sex(String user_sex) {
		this.user_sex = user_sex;
	}
	public String getUser_avatar() {
		return user_avatar;
	}
	public void setUser_avatar(String user_avatar) {
		this.user_avatar = user_avatar;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public int getUser_score() {
		return user_score;
	}
	public void setUser_score(int user_score) {
		this.user_score = user_score;
	}
	public String getUser_nickname() {
		return user_nickname;
	}
	public void setUser_nickname(String user_nickname) {
		this.user_nickname = user_nickname;
	}
	public String getUser_token() {
		return user_token;
	}
	public void setUser_token(String user_token) {
		this.user_token = user_token;
	}
	public User(String user_id, String username, String password, String user_sex, String user_avatar, String user_email,
			int user_score, String user_nickname) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.password = password;
		this.user_sex = user_sex;
		this.user_avatar = user_avatar;
		this.user_email = user_email;
		this.user_score = user_score;
		this.user_nickname = user_nickname;
	}
	public User() {	}

}
