Ext.define('GeoLoad', {
    statics: {
		registerMap: function(region, load){
			if(Ext.isEmpty(echarts.getMap(region))) {
		        Ext.Ajax.request({
		            url: BASE_URL + 'geo' + URL_SUFFIX + '?method=region&code=' + region,
		            success: function(response, opts) {
		                var obj = Ext.decode(response.responseText);
		                echarts.registerMap(region, response.responseText);
		                if(Ext.isFunction(load)) {
		                	load(region);
		                }
		            },
		            failure: function(response, opts) {
		            	Message.showResponseError(response);
		                console.log('获取数据失败' + response.status);
		            }
		        });
			} else {
                if(Ext.isFunction(load)) {
                	load(region);
                }
			}
		}
    }
});