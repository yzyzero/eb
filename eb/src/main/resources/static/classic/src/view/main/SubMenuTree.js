Ext.define('eb.view.main.SubMenuTree', {
    extend: 'Ext.tree.Panel',

    xtype: 'submenutree',

    rootVisible: false,
    lines: false,

    useArrows: true,
    hideHeaders: true,
    collapseFirst: false,
    //hideHeaders: true,
    width: 250,
    minWidth: 100,
    height: 200,
    split: true,
    stateful: true,
    stateId: 'mainnav.west',
    collapsible: true,
    enableColumnResize: false,
    enableColumnMove: false,

    tools: [{
        type: 'up',
        tooltip: '下拉菜单视图',
        listeners: {
            click: 'showBreadcrumbNav'
        }
    }],

    initComponent: function() {
        var me = this,
            lastFilterValue;

        me.columns = [{
            xtype: 'treecolumn',
            flex: 1,
            dataIndex: 'name',
            scope: me,
            renderer: function(value) {
                var searchString = this.searchField.getValue();
                if (searchString.length > 0) {
                    return this.strMarkRedPlus(searchString, value);
                }

                return value;
            }
        }];

        Ext.apply(me, {
            dockedItems : [
                {
                    xtype: 'textfield',
                    dock: 'top',
                    emptyText: '搜索',
                    enableKeyEvents: true,

                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            handler: 'onClearTriggerClick',
                            hidden: true,
                            scope: 'this'
                        },
                        search: {
                            cls: 'x-form-search-trigger',
                            weight: 1,
                            handler: 'onSearchTriggerClick',
                            scope: 'this'

                        }
                    },

                    onClearTriggerClick: function() {
                        this.setValue();
                        me.store.clearFilter();
                        this.getTrigger('clear').hide();
                    },

                    onSearchTriggerClick: function() {
                        me.filterStore(this.getValue());
                    },

                    listeners: {
                        keyup: {
                            fn: function(field, event, eOpts) {
                                var value = field.getValue();

                                if (value && value !== lastFilterValue) {
                                    field.getTrigger('clear')[(value.length > 0) ? 'show' : 'hide']();
                                    me.filterStore(value);
                                    lastFilterValue = value;
                                }
                            },
                            buffer: 300
                        },

                        render: function(field) {
                            this.searchField = field;
                        },

                        scope: me
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    filterStore: function(value) {
        var me = this,
            store = me.store,
            searchString = value.toLowerCase(),
            filterFn = function(node) {
                var children = node.childNodes,
                    len      = children && children.length,
                    visible  = v.test(node.get('name')),
                    i;

                if ( !visible ) {
                    for (i = 0; i < len; i++) {
                        if ( children[i].isLeaf() ) {
                            visible = children[i].get('visible');
                        }
                        else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }

                } else {
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true );
                    }

                }

                return visible;
            }, v;

        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            v = new RegExp(searchString, 'i');
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }
    },

    strMarkRedPlus: function (search, subject) {
        return subject.replace(
            new RegExp( '('+search+')', "gi" ),
            "<span style='color: red;'><b>$1</b></span>"
        );
    }
});
