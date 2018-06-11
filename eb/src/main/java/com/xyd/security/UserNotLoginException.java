package com.xyd.security;

public class UserNotLoginException extends Exception {
	private static final long serialVersionUID = 55006163594536784L;
	
	public UserNotLoginException(){
		super("用户未登录");
	}
}
