package utils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class DataSourceUtil {
	private static ComboPooledDataSource ds = new ComboPooledDataSource();
	//获取DataSource数据源
	public static DataSource getDataSource() {
		return ds;
	}
	
	//获取连接
	public static Connection getConnection() throws SQLException {
		return ds.getConnection();
	}
	
	//关闭连接
		public static void close(Connection con,Statement stm,ResultSet rs) {
			if(con!=null) {
				try {
					con.close();
				}catch(Exception e) {}
			}
			
			if(stm!=null) {
				try {
					stm.close();
				}catch(Exception e) {}
			}
			if(rs!=null) {
				try {
					rs.close();
				}catch(Exception e) {}
			}
		}
		public static void close(Connection con,Statement stm) {
			if(con!=null) {
				try {
					con.close();
				}catch(Exception e) {}
			}
			
			if(stm!=null) {
				try {
					stm.close();
				}catch(Exception e) {}
			}
		}

}
