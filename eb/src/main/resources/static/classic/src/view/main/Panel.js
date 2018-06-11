Ext.define('eb.view.main.Panel', {
    extend: 'Ext.container.Container',
    xtype: 'mainPanel',
    
    requires: ['eb.view.main.Head',
    	'eb.view.main.ContentPanel'
    ],
    
	layout:'border',
    items: [{
    	region: 'north',
    	xtype:'mainHead'
    }, {
        xtype: 'container',
        region: 'center',
        layout:'fit'
    }, {
        xtype: 'box',
        region: 'south',
        html: copyright,
        style:{
        	background: '#F3F3F3',
        	textAlign: 'right',
        	margin: '5px'
        }
    }]
});
