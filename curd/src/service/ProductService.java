package service;

import java.sql.SQLException;
import java.util.List;

import dao.ProductDao;
import domain.PageBean;
import domain.Product;

public class ProductService {

	public List<Product> findAll() throws SQLException {
		return new ProductDao().findAll();
	}

	public void addProduct(Product p) throws SQLException {
		new ProductDao().addProduct(p);
	}

	public Product getProductById(String pid) throws SQLException {
		return new ProductDao().getProductById(pid);
	}

	public void updateProduct(Product p) throws SQLException {
		new ProductDao().updateProduct(p);
	}
	/**
	 * 通过id删除商品
	 * @param pid
	 * @throws SQLException 
	 */
	public void delProduct(String pid) throws SQLException {
		new ProductDao().delProduct(pid);
	}
	/**
	 * 删除多个商品
	 * @param ids
	 * @throws SQLException 
	 */
	public void delCheckedProduct(String[] ids) throws SQLException {
		ProductDao pDao = new ProductDao();
		for (String pid : ids) {
			pDao.delProduct(pid);
		}
	}

	public List<Product> findProductByCondition(String name, String kw) throws SQLException {
		return new ProductDao().findProductByCondition(name,kw);
	}

	/**
	 * 分页查询
	 * @param currPage 	  第几页
	 * @param pageSize   每页展示条数
	 * @return pageBean
	 * @throws SQLException 
	 */
	public PageBean<Product> showProductByPage(Integer currPage, int pageSize) throws SQLException {
		//查询当前页数据 limit(当前页-1)*每页展示条数 和 每页展示条数
		ProductDao dao = new ProductDao();
		List<Product> list = dao.findProductByPage(currPage,pageSize);
		//查询总条数
		int totalCount = dao.getCount();
		return new PageBean<Product>(list,currPage,pageSize,totalCount);
	}

}
