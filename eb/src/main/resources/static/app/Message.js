/*
http错误代码含义：
"100" : Continue
"101" : witching Protocols
"200" : OK
"201" : Created
"202" : Accepted
"203" : Non-Authoritative Information
"204" : No Content
"205" : Reset Content
"206" : Partial Content
"300" : Multiple Choices
"301" : Moved Permanently
"302" : Found
"303" : See Other
"304" : Not Modified
"305" : Use Proxy
"307" : Temporary Redirect
"400" : Bad Request
"401" : Unauthorized
"402" : Payment Required
"403" : Forbidden
"404" : Not Found
"405" : Method Not Allowed
"406" : Not Acceptable
"407" : Proxy Authentication Required
"408" : Request Time-out
"409" : Conflict
"410" : Gone
"411" : Length Required
"412" : Precondition Failed
"413" : Request Entity Too Large
"414" : Request-URI Too Large
"415" : Unsupported Media Type
"416" : Requested range not satisfiable
"417" : Expectation Failed
"500" : Internal Server Error
"501" : Not Implemented
"502" : Bad Gateway
"503" : Service Unavailable
"504" : Gateway Time-out
"505" : HTTP Version not supported

HTTP 400 - 请求无效
HTTP 401.1 - 未授权：登录失败
HTTP 401.2 - 未授权：服务器配置问题导致登录失败
HTTP 401.3 - ACL 禁止访问资源
HTTP 401.4 - 未授权：授权被筛选器拒绝
HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败

HTTP 403 - 禁止访问
HTTP 403 - 对 Internet 服务管理器 (HTML) 的访问仅限于 Localhost
HTTP 403.1 禁止访问：禁止可执行访问
HTTP 403.2 - 禁止访问：禁止读访问
HTTP 403.3 - 禁止访问：禁止写访问
HTTP 403.4 - 禁止访问：要求 SSL
HTTP 403.5 - 禁止访问：要求 SSL 128
HTTP 403.6 - 禁止访问：IP 地址被拒绝
HTTP 403.7 - 禁止访问：要求客户证书
HTTP 403.8 - 禁止访问：禁止站点访问
HTTP 403.9 - 禁止访问：连接的用户过多
HTTP 403.10 - 禁止访问：配置无效
HTTP 403.11 - 禁止访问：密码更改
HTTP 403.12 - 禁止访问：映射器拒绝访问
HTTP 403.13 - 禁止访问：客户证书已被吊销
HTTP 403.15 - 禁止访问：客户访问许可过多
HTTP 403.16 - 禁止访问：客户证书不可信或者无效
HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效
HTTP 404.1 - 无法找到 Web 站点
HTTP 404 - 无法找到文件
HTTP 405 - 资源被禁止
HTTP 406 - 无法接受
HTTP 407 - 要求代理身份验证
HTTP 410 - 永远不可用
HTTP 412 - 先决条件失败
HTTP 414 - 请求 - URI 太长
HTTP 500 - 内部服务器错误
HTTP 500.100 - 内部服务器错误 - ASP 错误
HTTP 500-11 服务器关闭
HTTP 500-12 应用程序重新启动
HTTP 500-13 - 服务器太忙
HTTP 500-14 - 应用程序无效
HTTP 500-15 - 不允许请求 global.asa
Error 501 - 未实现
HTTP 502 - 网关错误

0: 请求未初始化
 1: 服务器连接已建立
 2: 请求已接收
 3: 请求处理中
 4: 请求已完成，且响应已就绪
 */
Ext.define('Message', {
	statics: {
	    showStoreException: function(response, operation) {
	    	this.showResponseError(response, operation.getError());
	    },
	    showFormException: function(action){
	        switch (action.failureType) {
	            case Ext.form.action.Action.CLIENT_INVALID:
	            	this.showError('错误', '表单字段不得提交无效值');
	                break;
	            case Ext.form.action.Action.CONNECT_FAILURE:
	            	this.showResponseError(action.response, action.response.responseText);
	                break;
	            case Ext.form.action.Action.SERVER_INVALID:
	            	this.showError('错误', action.result.msg);
	                break;
	            default:
	            	var resultText = action.response.responseText;
	            	if(resultText === 'false' || resultText === ''){
		            	this.showError('错误', '错做失败');
	            	} else {
		            	this.showError('错误', '信息：' + resultText);
	            	}
	                break;
	       }
	    },
	    showResponseError: function(response, errMsg){
			var title = '错误';
			switch (response.status) {
				case 0:
					title = '请求未初始化';
					break;
				case 1:
					title = '服务器连接已建立';
					break;
				case 2:
					title = '请求已接收';
					break;
				case 3:
					title = '请求处理中';
					break;
				case 4:
					title = '请求已完成，响应已就绪';
					break;
				case 400:
					title = '请求无效';
					break;
				case 401:
					title = '用户未登录';
					break;
				case 403:
					title = '禁止访问';
					break;
				case 404:
					title = '功能不存在';
					break;
				case 405:
					title = '资源被禁止';
					break;
				case 406:
					title = '无法接受';
					break;
				case 407:
					title = '要求代理身份验证';
					break;
				case 410:
					title = '永远不可用';
					break;
				case 412:
					title = '先决条件失败';
					break;
				case 414:
					title = '请求URI 太长';
					break;
				case 500:
					title = '内部服务器错误';
					break;
				case 501:
					title = '未实现';
					break;
				case 502:
					title = '网关错误';
					break;
				default:
					title = '错误';
					break;
			}
			
			
			if(response.status === 401) {
				// eb.view.login.LoginWin.show();
				window.location.href = BASE_URL + 'index.html';
			} else if (response.status === 0) {
				if(response.timedout){
					this.showError(title, "客户端连接超时", response.statusText);
				} else {
					this.showError(title, "客户端连接失败", response.statusText);
					window.location.href = BASE_URL + 'index.html';
				}
			} else {
				this.showError(title, response.status === 200 && !Ext.isEmpty(errMsg) ? errMsg : response.responseText);
			}
	    },
	    showError: function(title, errMsg, errCause, animateTarget){
	    	var errContext = '';
	    	
	    	if(!Ext.isEmpty(errMsg)){
	    		errContext = errMsg;
	    	}
	    	
	    	if(Ext.isEmpty(errCause)){
	    		errContext = errContext;
	    	} else {
	    		errContext = errContext + '，原因：' + errCause;
	    	}
	    	
		    Ext.Msg.show({
		    	animateTarget: animateTarget,
		        title: title,
		        icon: Ext.Msg.ERROR,
		        buttons: Ext.Msg.OK,
		        msg: errContext
		    });
	    },
	    showWarning: function(title, msg){
		    Ext.Msg.show({
		        title: title,
		        icon: Ext.Msg.WARNING,
		        buttons: Ext.Msg.OK,
		        msg: msg
		    });
	    },
	    showInfo: function(title, msg){
		    Ext.Msg.show({
		        title: title,
		        icon: Ext.Msg.INFO,
		        buttons: Ext.Msg.OK,
		        msg: msg
		    });
	    }
	}
});