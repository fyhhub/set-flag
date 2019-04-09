package servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * 文件上传demo
 */
public class FileUpLoadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/*String username = request.getParameter("username");
		String file = request.getParameter("f");
		System.out.println(username); //null 不可用
		System.out.println(file); //null*/
		
		//创建磁盘文件项工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();
		//创建核心上传对象
		ServletFileUpload upload = new ServletFileUpload(factory);
		
		try {
			//解析请求
			List<FileItem> list = upload.parseRequest(request);
			//遍历list
			for (FileItem fi : list) {
				//判断是普通的上传组件还是文件上传组件
				if (fi.isFormField()) {
					//普通上传组件
					//获取name属性
					String name = fi.getName();
					//获取值
					String string = fi.getString("utf-8");
					System.out.println(name+":"+string);
				}else {
					//文件上传组件
					//获取name属性
					String name = fi.getFieldName();
					//获取文件名称
					String filename = fi.getName();
					//获取文件内容
					InputStream is = fi.getInputStream();
					System.out.println(name+"--"+filename+"--"+is);
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
