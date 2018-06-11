/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('eb.Application', {
    extend: 'Ext.app.Application',

    name: 'eb',
    
    User: null,
    regionsCombo : null,
    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {

    	// 经度
    	Ext.apply(Ext.form.field.VTypes, {
    		Longitude: function (value) {
				var abs = Math.abs(parseInt(value));
				if(abs>0 && abs <=180){
					return true;
				}
    	        return false;
    	    },
    	    LongitudeText: '请输入正确的经度值'
    	});

    	// 维度
    	Ext.apply(Ext.form.field.VTypes, {
    		Latitude: function (value) {
				var abs = Math.abs(parseInt(value));
				if(abs>0 && abs <=90){
					return true;
				}
    	        return false;
    	    },
    	    LatitudeText: '请输入正确的维度值'
    	});
    	
    	// 验证ip地址
    	Ext.apply(Ext.form.field.VTypes, {
    	    IPAddress: function (value) {
    	        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value);
    	    },
    	    IPAddressText: '请输入ip地址',
    	    IPAddressMask: /[\d\.]/i
    	});

    	// 修改密码校验密码
    	Ext.apply(Ext.form.VTypes, {
    		password: function(value,field){
    			if(field.initialPassField){
    				var pwd = field.previousSibling('textfield[name=' + field.initialPassField + ']');
    				return (value == pwd.getValue());
    			}
    			return true;
    		},
    		passwordText:'两次密码不一致'
    	});
    	
    	// 判断时间段格式
    	Ext.apply(Ext.form.VTypes, {
    		timequantum: function(value, field){
    			if(field.beginTimeField){
    				var beginTimeField = field.previousNode('[name=' + field.beginTimeField + ']');
    				var endTimeField = Ext.isDate(value) ? Ext.Date.format(value, 'H:i') : value;
    				return (endTimeField > beginTimeField.getRawValue());
    			}
    			return true;
    		},
    		timequantumText: '起始时间必须小于终止时间'
    	});
    	
        // 	清除页面加载动画
        var loadingDiv = Ext.select('div[class=sk-three-bounce]');
        if(!Ext.isEmpty(loadingDiv)){
        	loadingDiv.remove();
        }
        
        // 验证文件格式是否为音频，即验证文件后缀名是否为mp3
    	Ext.apply(Ext.form.field.VTypes, {
    		audioFile : function (value) {
    			return /(.mp3)$/.test(value);
    		},
    		audioFileText : '请选择MP3文件'
    	});
    	
    	// 验证文件格式是否为图片
    	Ext.apply(Ext.form.field.VTypes, {
    		picFile : function (value) {
    			return /(.bmp|.jpg|.jpeg|.png|.gif)$/.test(value);
    		},
    		picFileText : '请选择图片文件'
    	});
    	
    	// 验证url
    	Ext.apply(Ext.form.field.VTypes, {
    		urlValid : function (value) {
    			var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    				 + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
    				  + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
    				  + "|" // 允许IP和DOMAIN（域名）
    				  + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
    				  + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
    				  + "[a-z]{2,6})" // first level domain- .com or .museum 
    				  + "(:[0-9]{1,4})?" // 端口- :80 
    				  + "((/?)|" // a slash isn't required if there is no file name 
    				  + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
    			 var re=new RegExp(strRegex); 
    			 return re.test(value);
    		},
    		urlValidText : '请输入正确的url地址'
    	})
        
    	// 验证文件格式是否为Excel
    	Ext.apply(Ext.form.field.VTypes, {
    		excelFile : function (value) {
    			return /(.xls|.xlsx|.csv)$/.test(value);
    		},
    		excelFileText : '请选择Excel文件'
    	});
    	
    },
    	

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    getRegionForCombo: function(){
    	var me = this;
    	if(Ext.isEmpty(me.regionsCombo)){
    		Ext.Ajax.request({
    			async: false,
    			url: BASE_URL + 'sys/adregion' + URL_SUFFIX + '?method=queryforcombo',
        	    success: function(response) {
        	    	var result = Ext.decode(response.responseText, true);
        	    	if(result !== null && result.success != null && !result.success) {
        	    		Message.showError('错误', result.msg);
        	    		return true;
        	    	}
        	    	me.regionsCombo = result;
        	    },
        	    failure: function(response) {
    		    	Message.showResponseError(response);
        	    }
    		});
    	}
    	
    	return me.regionsCombo;
    }
});
