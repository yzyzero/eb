/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('eb.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    login: function(){
    	var me = this, form = me.getView().down('form');
        if(form.isValid()){
        	form.submit({
                clientValidation: true, 
                waitMsg:'请稍后', 
                waitTitle:'正在验证登录', 
                url: BASE_URL + 'login' + URL_SUFFIX,
                success: function(form, action) {
                	var app = eb.getApplication(), mainView = app.getMainView();
                	
                	app.User = action.result.user;
    				mainView.mask('请耐心等待，正在加载主界面……');
    	    		mainView.removeAll();
    	    		mainView.setLayout('fit');
    		    	mainView.add({ xtype: 'mainPanel' });
    		    	mainView.unmask();
    		    	me.getViewModel().set('username', app.User.name);
                }, 
                failure: function(form, action) {
                    Ext.MessageBox.show({ 
                        width: 150, 
                        title: "登录失败",
                        buttons: Ext.MessageBox.OK, 
                        msg: action.result.msg 
                    });
                }
            });
        }
    },
    logout: function(){
		Ext.Msg.show({
		    title: '提示',
		    message: '确定退出当前用户吗？',
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		    	  Ext.Ajax.request({
		    		  url: BASE_URL + 'logout' + URL_SUFFIX,
		    		  method : 'POST', //方法
		    		  callback : function(response) {
		    			  window.location.href = BASE_URL + 'index.html';
		    		  }
		    	   });
		        }
		    }
		});
    },
    onExitApplication: function(){
    	this.getView().down('form').reset();
    },
    onClickMenu: function(container, button, pressed) {
    	if(!pressed) return;
    	
		if(Ext.isEmpty(Ext.ClassManager.getByAlias('widget.' + button.cxtype))){
			Message.showInfo('提示', '该版本未提供"' + button.text + '"功能！请与供应商联系！');
			return true;
		} else {
	    	var mainPanel = this.getView().down('container[region=center]');
	    	
	    	mainPanel.removeAll();
			var panel = {xtype: button.cxtype};
			if(button.cmenu) {
				panel.xtype = 'contentPanel';
				panel.defaultPanel = button.cxtype;
				panel.menu = button.cmenu;
			}
			mainPanel.add(panel);
		}
    },
    onShowMainMenu: function(head, width, height, oldWidth, oldHeight) {
    	if(width == oldWidth) return true;
    	
    	var buttons = head.down('segmentedbutton'), 
    		menus = eb.getApplication().User.menus,
    		showText = (head.getWidth() - 340) > buttons.getWidth();
    		
    	buttons.removeAll();
    	for(var i = 0; i < menus.length; i++) {
    		var menu = menus[i], button = {};
    		
    		if(showText) {
    			button.text = menu.name;
    		} else {
    			button.tooltip = menu.name;
    		}
    		
    		if(!Ext.isEmpty(menu.iconName)){
    			button.icon_name = 'menu-' + menu.iconName;
    			button.iconCls = 'menu-' + menu.iconName + '-off'
    		};

			button.cxtype = menu.xtype;
    		if(!Ext.isEmpty(menu.children)) {
    			button.cmenu = menu;
    		}
    		
    		if(i === 0) {
    			button.pressed = true;
    			button.iconCls = 'menu-' + menu.iconName;
    			this.currButton = button.cxtype;
    			this.onClickMenu(null, button, true);
    		}
    		
    		buttons.add(button);
    	}
    } 
});
