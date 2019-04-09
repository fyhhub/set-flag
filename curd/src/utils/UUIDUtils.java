package utils;

import java.util.UUID;

public class UUIDUtils {
	/**
	 * 随机生成一个id
	 * @return
	 */
	public static String getId() {
		return UUID.randomUUID().toString().toUpperCase().replace("-", "");
	}
	/**
	 * 生成随机码
	 * @return
	 */
	public static String getCode() {
		return getId();
	}

}
