Ext.define('Utilities', {
    statics: {
    	// 整形转十六进制
    	HexTable: ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
    	intToHex: function(ival){
    		return '0x' + this.intToHexValue(ival);
    	},
    	
    	intToHexValue: function(ival){
    		var a = Math.floor(ival / 16) , b=ival % 16;
    		var result = this.HexTable[b];
    		if(a > 0){
    			result = this.intToHexValue(a) + result;
    		}
    		
    		return result;
    	},
    	
    	trimChar: function (str, c) {
            for(var i = str.length-1; i > 0; i--) {
    	        if(str.charAt(i) !== c){   
    	            return str.substring(0, i+1);
    	        }
            }
            return '';
        },
        
        appendChar: function(str, c, length){
        	var result = str;
        	for(var i = str.length; i < length; i ++){
        		result = result + c;
        	}
        	
        	return result
        }
    }
})