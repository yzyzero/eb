var app_name = '应急广播管理平台';
var login_background = 'login_bg.png';
var company = '成都西亿达电子科技有限公司';
var copyright = app_name + '&nbsp;&nbsp;<a href="#">版权所有</a> &copy; 2014-2017 <a href="#">'+company+'</a>';

var BASE_URL= window.location.pathname.split("index.htm")[0];
var URL_SUFFIX= '.do';

// 离线地图
/*var GIS_SERVER={
		opacity:'0.6',
		extent:[103.581515,30.888671, 104.485282,30.389536],
		view:{
			projection:'EPSG:3857',
			minZoom: 4,
			maxZoom: 16
		},
		mapSource:[{
			xtype:'sourceXYZ',
			url:'http://localhost:9001/_VECTOR_RASTER/map/{z}/{x}/{y}.png'
		}]
};*/

// 天地图
var GIS_SERVER={
		opacity:'1.0',
		extent:[103.581515,30.888671, 104.485282,30.389536],
		view:{
			projection:'EPSG:3857',
			minZoom: 4,
			maxZoom: 18
		},
		mapSource:[{
			xtype:'sourceXYZ',
			url:'http://t{0-7}.tianditu.com/DataServer?T=vec_w&amp;x={x}&amp;y={y}&amp;l={z}',
			leaflet:{
				url:'http://t{s}.tianditu.com/DataServer?T=vec_w&amp;x={x}&amp;y={y}&amp;l={z}',
				subdomains: [0, 1, 2, 3, 4, 5 , 6, 7]
			}
		}, {
			xtype: 'sourceXYZ',
			url:'http://t{0-7}.tianditu.com/DataServer?T=cva_w&amp;x={x}&amp;y={y}&amp;l={z}',
			leaflet:{
				url:'http://t{s}.tianditu.com/DataServer?T=cva_w&amp;x={x}&amp;y={y}&amp;l={z}',
				subdomains: [0, 1, 2, 3, 4, 5 , 6, 7]
			}
		}]
};

// 高德地图
/*var GIS_SERVER={
		opacity:'0.6',
		extent:[103.581515,30.888671, 104.485282,30.389536],
		view:{
			projection:'EPSG:3857',
			minZoom: 4,
			maxZoom: 18
		},
		mapSource:[{
			xtype:'sourceXYZ',
			url:'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
		}]
};*/

//高德地图影像
/*var GIS_SERVER={
		opacity:'0.6',
		extent:[103.581515,30.888671, 104.485282,30.389536],
		view:{
			projection:'EPSG:3857',
			minZoom: 4,
			maxZoom: 18
		},
		mapSource:[{
			xtype:'sourceXYZ',
			url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
		}]
};*/


// 百度地图 http://online1.map.bdimg.com/tile/?qt=tile&x=742&y=248&z=12
/*var GIS_SERVER={
		opacity:'0.6',
		extent:[97.351936,26.049446, 108.54301,34.31633],
		view:{
			projection:'EPSG:3857',
			minZoom: 5,
			maxZoom: 18
		},
		mapSource:[{
			xtype:'sourceXYZ',
			url: 'http://online0.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl'
		}]
};*/

/*
<!-- GeoServer 地图 -->
<!-- 
<gis-server use="true">
	<view projection="EPSG:4326" minZoom="5" maxZoom="18" />
	<extent>97.351936,26.049446, 108.54301,34.31633</extent>
	<map-source xtype="sourceTilewms" url="http://192.168.0.233:8980/geoserver/xyd_map/wms" layers="xyd_map:china_map"/>
</gis-server>
-->
*/