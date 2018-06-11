Ext.define('eb.view.main.SubMenu', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'submenu',

    config: {
        selection: null,
        menus: null
    },
    initComponent: function() {
        this.items = [{
            xtype: 'tool',
            type: 'down',
            tooltip: '显示菜单树',
            listeners: {
                click: 'showTreeNav'
            }
        }, {
            xtype: 'breadcrumb',
            reference: 'toolbar',
            flex: 1,
            showIcons: false,
            displayField: 'name',
            defaults: {
            	scale: 'medium'
            },
            store:this.getMenus()
        }];

        this.callParent();

        this._breadcrumbBar = this.items.getAt(1);
    },
    // 控制初始显示树形菜单
    listeners:{
    	afterrender : 'showTreeNav'
    },  
    updateSelection: function(node) {
        if (this.rendered) {
            this._breadcrumbBar.setSelection(node);
        }
    }
});
