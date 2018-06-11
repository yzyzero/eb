Ext.define('eb.view.main.ContentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.content',

    config: {
    	currentPanel: null,
        control: {
            'submenutree': {
                selectionchange: 'onTreeNavSelectionChange'
            },
            'submenu breadcrumb': {
                selectionchange: 'onBreadcrumbNavSelectionChange'
            }
        }
    },
    applyState: function(state) {
        var refs = this.getReferences();

        if (state.hasTreeNav) {
            this.getView().moveBefore({
                region: 'west',
                reference: 'tree',
                xtype: 'submenutree'
            }, refs.contentPanel);

            refs.breadcrumb.hide();
            refs.contentPanel.header.hidden = false;
            this._hasTreeNav = true;
        } else {
            this._hasTreeNav = false;
        }
    },

    getState: function() {
        return {
            hasTreeNav: this._hasTreeNav
        };
    },

    showBreadcrumbNav: function() {
        var refs = this.getReferences(),
            breadcrumbNav = refs.breadcrumb,
            treeNav = refs.tree,
            selection = treeNav.getSelectionModel().getSelection()[0];

        if (breadcrumbNav) {
            breadcrumbNav.show();
        } else {
            refs.contentPanel.addDocked({
                xtype: 'submenu',
                selection: selection
            });
        }

        refs['breadcrumb.toolbar'].setSelection(selection || 'root');

        treeNav.hide();
        refs.contentPanel.getHeader().hide();

        this._hasTreeNav = false;
        this.getView().saveState();
    },

    showTreeNav: function() {
        var refs = this.getReferences(),
            treeNav = refs.tree,
            breadcrumbNav = refs.breadcrumb,
            selection = refs['breadcrumb.toolbar'].getSelection();

        if (treeNav) {
            treeNav.show();
        } else {
            treeNav = this.getView().moveBefore({
                xtype: 'submenutree',
                title: this.getView().getMenu().name,
                region: 'west',
                reference: 'tree',
                store: this.getView().subMenuStore
            }, refs.contentPanel);
        }
        
        treeNav.expandAll();

        if (selection) {
            treeNav.getSelectionModel().select([
                selection
            ]);

            breadcrumbNav.hide();
            //refs.contentPanel.getHeader().show();

            this._hasTreeNav = true;
            this.getView().saveState();
        }
    },
    onTreeNavSelectionChange: function(selModel, records) {
        var record = records[0];

        if (record) {
        	var title = record.get('name'),
        		b = this.openFunction(record.get('xtype'), title);
        	
        	if(!b && !record.hasChildNodes()){
        		Message.showInfo('提示', '该版本未提供"' + title + '"功能！请与供应商联系！');
        	}
        }
    },
    onBreadcrumbNavSelectionChange: function(breadcrumb, node) {
        if (node) {
        	var title = node.get('name'),
        		b = this.openFunction(node.get('xtype'), title);
        	
        	if(!b && !node.hasChildNodes()){
        		Message.showInfo('提示', '该版本未提供"' + title + '"功能！请与供应商联系！');
        	}
        }
    },
    onInitPanel: function(){
		var me = this, initPanel = me.currentPanel, contentPanel = me.getView().down('panel[region=center]');
		if(!Ext.isEmpty(me.currentPanel) && contentPanel.items.getCount() < 1) {
			me.currentPanel = null;
			me.openFunction(initPanel);
		}
    },
	openFunction: function(xtype){
		if(Ext.isEmpty(xtype) || Ext.isEmpty(Ext.ClassManager.getByAlias('widget.' + xtype))){
			return false;
		}
		
		var me = this, contentPanel = me.getView().down('panel[region=center]');
		
		if(me.currentPanel !== xtype) {
			me.getView().mask("载入中……");
        	
        	contentPanel.removeAll();
        	contentPanel.add({ xtype : xtype });
        	me.getView().unmask();
        	
			me.currentPanel = xtype
		}
		
		return true;
	}
});