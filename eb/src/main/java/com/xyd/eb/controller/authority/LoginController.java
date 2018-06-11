package com.xyd.eb.controller.authority;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSON;
import com.xyd.eb.controller.BaseController;
import com.xyd.security.UserNotLoginException;

@Controller
public class LoginController extends BaseController {
	@RequestMapping(value="/login.do", method=RequestMethod.GET)
	public void loginGet(HttpServletRequest req) throws UserNotLoginException{
		throw new UserNotLoginException();
	}
	@RequestMapping(value="/login.do", method=RequestMethod.POST)
	public void loginPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", "超级管理员");
		map.put("username", "admin");
    	response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("{\"success\" : true,\"user\":" + JSON.toJSONString(map) +"}");
	}
}
