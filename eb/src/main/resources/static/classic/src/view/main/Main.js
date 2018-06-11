/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('eb.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'eb.view.main.MainController',
        'eb.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',

	layout: 'center',
	style: {background:'url(resources/images/bg.png)'},
    items: {
    	xtype: 'form',
    	layout: 'absolute',
	    width: 689,
	    height: 183,
        border: false,
        bodyStyle: 'background: url(resources/images/login_bg.png);',
	    items:[{
	    	xtype:'image',
	    	x: 156,
            y: 10,
    	    width: 103,
    	    height: 54,
	    	src: "resources/images/logo.png"
	    }, {
	    	xtype:'image',
	    	x: 276,
            y: 16,
    	    width: 280,
    	    height: 32,
	    	src: "resources/images/name.png"
	    }, {
	    	xtype:'image',
	    	x: 36,
            y: 124,
	    	src: "resources/images/user.png"
	    }, {
            xtype: 'textfield', 
            name:'username',
            x: 74,
            y: 126,
            width:214,
        	height: 34,
            blankText : '用户名不能为空', 
            allowBlank: false
        }, { 
	    	xtype:'image',
	    	x: 288,
            y: 124,
	    	src: "resources/images/pwd.png"
	    }, {
            xtype: 'textfield', 
            inputType : 'password',
            name:'password',
            x: 326,
            y: 126,
            width:214,
        	height: 34,
            blankText : '密码不能为空', 
            allowBlank: false
        }, {
        	xtype: 'button',
            x: 540,
            y: 125,
        	width: 111,
        	height: 36,
            border: false,
            handler: 'login',
	        style: {background: 'url(resources/images/login.png)'},
        }]
	}
});
