package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import domain.Product;
import utils.DataSourceUtil;

public class ProductDao {

	public List<Product> findAll() throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "select * from product";
		return qr.query(sql, new BeanListHandler<>(Product.class));
	}

	public void addProduct(Product p) throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "insert into product(pid,pname,market_price,shop_price,pdate,pdesc) values(?,?,?,?,?,?)";
		qr.update(sql, p.getPid(),p.getPname(),p.getMarket_price(),p.getShop_price(),p.getPdate(),p.getPdesc());
	}

	public Product getProductById(String pid) throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "select * from product where pid = ?";
		return qr.query(sql, new BeanHandler<>(Product.class), pid);
	}

	public void updateProduct(Product p) throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "update product set pname=?,market_price=?,shop_price=?,pdesc=? where pid=?";
		qr.update(sql, p.getPname(),p.getMarket_price(),p.getShop_price(),p.getPdesc(),p.getPid());
	}

	public void delProduct(String pid) throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "delete from product where pid=?";
		qr.update(sql, pid);
		
	}

	public List<Product> findProductByCondition(String name, String kw) throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "select * from product where 1=1 ";
		//存放参数
		ArrayList<String> params = new ArrayList<String>();
		//判断参数是否为空  拼接字符串
		if(name!=null&&name.trim().length()>0) {
			sql+=(" and pname like ?");
			params.add("%"+name+"%");
		}
		if(kw!=null&&kw.trim().length()>0) {
			sql+=(" and pdesc like ?");
			params.add("%"+kw+"%");
		}
		return qr.query(sql, new BeanListHandler<>(Product.class),params.toArray());
	}

	/**
	 * 查询第几页数据
	 * @param currPage
	 * @param pageSize
	 * @return list
	 * @throws SQLException 
	 */
	public List<Product> findProductByPage(Integer currPage, int pageSize) throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "select * from product limit ?,?";
		return qr.query(sql, new BeanListHandler<>(Product.class), (currPage-1)*pageSize,pageSize);
	}

	/**
	 * 获取总条数
	 * @return 
	 * @throws SQLException 
	 */
	public int getCount() throws SQLException {
		QueryRunner qr = new QueryRunner(DataSourceUtil.getDataSource());
		String sql = "select count(*) from product";
		return ((Long)qr.query(sql, new ScalarHandler())).intValue();
	}

}
