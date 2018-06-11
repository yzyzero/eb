package com.xyd.eb.controller;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Iterator;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.ParserConfig;
import com.alibaba.fastjson.util.TypeUtils;
import com.xyd.security.UserNotLoginException;

public class BaseController {
	Logger logger = LoggerFactory.getLogger(BaseController.class);
//    @Autowired
//	protected PasswordEncoder m_passwordEncoder;
	
	public void sendJson(HttpServletResponse response, String json)
			throws IOException {
		// 禁止缓存
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "No-cache");
		response.setDateHeader("Expires", 0);

		// 指定生成的响应是图片
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	// 异常处理
    @ExceptionHandler()
    public ResponseEntity<String> handleException(Throwable ex) {
    	BodyBuilder errorBody = null;
    	if(ex instanceof UserNotLoginException) {
        	errorBody = ResponseEntity.status(401);
    	} else {
        	errorBody = ResponseEntity.status(500);
    	}
    	errorBody.contentType(MediaType.parseMediaType("text/html;charset=UTF-8"));
    	return errorBody.body(ex.getMessage());
    }

	protected Integer objToInteger(Object value){
    	Integer id = null;
    	if(value instanceof Integer){
    		id = (Integer) value;
    	} else if(value instanceof String){
    		try {
    			id = Integer.parseInt((String) value);
    		} catch(NumberFormatException e) {
    			id = null;
    		}
    	}
    	
    	return id;
	}
	

	protected void injectValue(Object obj, JSONObject values){
    	Iterator<String> iterator = values.keySet().iterator();
    	while (iterator.hasNext()) {
    		String key = iterator.next();
    		Object val = values.get(key);
    		if(!(key.equalsIgnoreCase("id") || val instanceof JSON)){
				try {
					 //obj.getClass().getField(key);
					Field field = obj.getClass().getDeclaredField(key);
					if(field != null) {
						// 加密用户名
						//if(obj instanceof User && key.equalsIgnoreCase("password")){
						if(key.equalsIgnoreCase("password")){
							//obj.getClass().getMethod("set"+getMethodName(key), field.getType()).invoke(obj, m_passwordEncoder.encode((String)val));
						} else {
							Class<?> paramTpye = field.getType();
							if(val != null) {
								Class<?> valClass = val.getClass();
								if(valClass.equals(JSONObject.class) || valClass.equals(paramTpye)){ //判断类型是否合法
									Object paramVal = TypeUtils.cast(val, paramTpye, ParserConfig.getGlobalInstance());
									obj.getClass().getMethod("set"+getMethodName(key), paramTpye).invoke(obj, paramVal);
								}
							}
						}
					}
				} catch (SecurityException | NoSuchFieldException | NoSuchMethodException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
				}
    		}
		}
	}
	
	private static String getMethodName(String fieldName){
		byte[] items = fieldName.getBytes();
		items[0] = (byte)((char)items[0] - 'a' + 'A');
		return new String(items);
	}
}
