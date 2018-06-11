Ext.define('eb.view.main.ContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentPanel',
    requires: ['eb.view.main.ContentController',
    	'eb.view.main.SubMenuTree'],
    
    controller: 'content',

    config: {
        menu: null,
    	defaultPanel: null
    },
    
    layout: 'border',
    stateful: true,
    
    initComponent: function() {
    	var me= this, menu = me.getMenu();
    	
    	me.subMenuStore = Ext.create('Ext.data.TreeStore', {
            root: {
                id: 'all',
                expanded: true,
                name: menu.name,
                children: menu.children
            }
        });
    	
    	me.items = {
        	xtype:'panel',
        	reference: 'contentPanel',
            region: 'center',
            layout:'fit',
            scrollable: true,
            header: {
                hidden: true
            },
            dockedItems:[{
                xtype: 'submenu',
                reference: 'breadcrumb>',
        		menus: this.subMenuStore
            }]
        };
    	
    	me.getController().currentPanel = me.getDefaultPanel();
    	
        me.callParent();
    },
    onRender: function () {
		this.getController().onInitPanel();
		this.callParent(arguments);
    }
});
