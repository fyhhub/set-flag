package web.filter;

import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class EncodingFilter implements Filter {

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		//强转
		HttpServletRequest request=(HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		
		//创建proxy
		HttpServletRequest requestProxy = (HttpServletRequest) Proxy.newProxyInstance(HttpServletRequest.class.getClassLoader(), request.getClass().getInterfaces(), new InvocationHandler() {
			
			@Override
			public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
				if("getParameter".equals(method.getName())) {
					//获取请求方式
					String m = request.getMethod();
					if("get".equalsIgnoreCase(m)) {
						String s = (String) method.invoke(request, args); //相当于request.getParameter(args);
						return new String(s.getBytes("iso-8859-1"), "utf-8");
					}else if("post".equalsIgnoreCase(m)) {
						request.setCharacterEncoding("utf-8");
						return method.invoke(request, args);
					}
					
				}
				return method.invoke(request, args);
			}
		});
		//放行
		chain.doFilter(requestProxy, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
