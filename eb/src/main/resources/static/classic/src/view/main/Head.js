Ext.define('eb.view.main.Head', {
    extend: 'Ext.container.Container',
    xtype: 'mainHead',
    
    border:false,
    layout: {
        type: 'table',
        columns: 2,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },
    style: {
    	background: 'url(resources/images/head_bg.png)'
    },
	items: [{
		xtype:'container',
        width: 360,
		rowspan: 2,
        layout: {
            type: 'hbox',
            align: 'middle',
            pack: 'center'
        },
        items:[{
	    	xtype:'image',
	    	src: "resources/images/logo.png",
	    	margin: '0 10 0 10',
            width:80,
        	height: 40
	    }, {
	    	xtype:'image',
	    	src: "resources/images/name.png",
            width:200,
        	height: 24
	    }]
	}, {
		xtype:'container',
        margin: '2 5 0 0',
	    layout: {
	        type: 'hbox',
	        align: 'middle ',
	        pack: 'end'
	    },
		items:[{
			xtype: 'button',
			bind: {text:'{username}'},
			ui: 'head',
        	scale: 'small',
        	icon: 'resources/images/curruser.png',
        	style:{ padding: "2px" },
			handler : function(){
		    	Ext.create('eb.view.login.EditPassword').show();
			}
        }, {
			xtype: 'button',
			text:'退出',
			ui: 'head',
        	scale: 'small',
        	icon: 'resources/images/logout.png',
        	style:{ padding: "2px" },
			handler : 'logout'
        }]
	}, {
        xtype: 'segmentedbutton',
        border: false,
        allowToggle: true,
        defaults: {
        	ui: 'main-menu',
        	scale: 'medium',
            border: false,
            listeners: {
            	toggle: function(button, pressed){
            		if(!Ext.isEmpty(button.icon_name)){
                		if(pressed) {
                			button.setIconCls(button.icon_name);
                		} else {
                			button.setIconCls(button.icon_name + '-off');
                		}
            		}
            	}
            }
        },
        listeners: {
            toggle: 'onClickMenu'
        }
	}],
    listeners: {
    	resize: 'onShowMainMenu'
    }
});
