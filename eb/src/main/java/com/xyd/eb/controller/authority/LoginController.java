package com.xyd.eb.controller.authority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
		Map<String, Object> map = testUserData();
    	response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("{\"success\" : true,\"user\":" + JSON.toJSONString(map) +"}");
	}
	
	public Map<String, Object> testUserData() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", 1);
		map.put("expiration", 332);
		map.put("name", "超级管理员");
		map.put("username", "admin");
		//organization
		Map<String, Object> map_org = new HashMap<String, Object>();
		map_org.put("id", 1);
		map_org.put("name", "成都市广播电台");
		map_org.put("region", "5101");
		map.put("organization", map_org);
		//region
		Map<String, Object> map_region = new HashMap<String, Object>();
		map_region.put("id", "5101");
		map_region.put("name", "成都市");
		map_region.put("level", 2);
		map_region.put("fullName", "四川省成都市");
		map_region.put("iconCls", "icon-region");
		map_region.put("leaf", false);
		map_region.put("valid", true);
		map_region.put("longitude", 103.929629646);
		map_region.put("latitude", 30.653560172);
		map_region.put("parentId", "51");
		map.put("region", map_region);
		//menus
		//Map<String, Object> menus = new HashMap<String, Object>();
		@SuppressWarnings("rawtypes")
		List<Map> list = new ArrayList<Map>();
		Map<String, Object> map_menu = new HashMap<String, Object>();
		map_menu.put("level", 1);
		map_menu.put("priority", 1);
		map_menu.put("id", 8);
		map_menu.put("name", "实时广播");
		map_menu.put("enabled", true);
		map_menu.put("iconName", "realtime");
		map_menu.put("iconCls", "menu-realtime-tree");
		map_menu.put("xtype", "broadcastRealtimePanel");
		map_menu.put("leaf", true);
		map_menu.put("children", new ArrayList<String>());
		list.add(map_menu);
		map.put("menus", list);
		return map;
	}
}
