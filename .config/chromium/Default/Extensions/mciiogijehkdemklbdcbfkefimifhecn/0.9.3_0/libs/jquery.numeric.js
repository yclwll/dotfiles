(function(c){c.fn.numeric=function(a,d){"boolean"===typeof a&&(a={decimal:a});a=a||{};"undefined"==typeof a.negative&&(a.negative=!0);var f=!1===a.decimal?"":a.decimal||".",b=!0===a.negative?!0:!1;d="function"==typeof d?d:function(){};return this.data("numeric.decimal",f).data("numeric.negative",b).data("numeric.callback",d).keypress(c.fn.numeric.keypress).keyup(c.fn.numeric.keyup).blur(c.fn.numeric.blur)};c.fn.numeric.keypress=function(a){var d=c.data(this,"numeric.decimal"),f=c.data(this,"numeric.negative"),
b=a.charCode?a.charCode:a.keyCode?a.keyCode:0;if(13==b&&"input"==this.nodeName.toLowerCase())return!0;if(13==b)return!1;var g=!1;if(a.ctrlKey&&97==b||a.ctrlKey&&65==b||a.ctrlKey&&120==b||a.ctrlKey&&88==b||a.ctrlKey&&99==b||a.ctrlKey&&67==b||a.ctrlKey&&122==b||a.ctrlKey&&90==b||a.ctrlKey&&118==b||a.ctrlKey&&86==b||a.shiftKey&&45==b)return!0;if(48>b||57<b){var e=c(this).val();if(0!==e.indexOf("-")&&f&&45==b&&(0===e.length||0===parseInt(c.fn.getSelectionStart(this),10)))return!0;d&&b==d.charCodeAt(0)&&
-1!=e.indexOf(d)&&(g=!1);8!=b&&9!=b&&13!=b&&35!=b&&36!=b&&37!=b&&39!=b&&46!=b?g=!1:"undefined"!=typeof a.charCode&&(a.keyCode==a.which&&0!==a.which?(g=!0,46==a.which&&(g=!1)):0!==a.keyCode&&0===a.charCode&&0===a.which&&(g=!0));d&&b==d.charCodeAt(0)&&(g=-1==e.indexOf(d)?!0:!1)}else g=!0;return g};c.fn.numeric.keyup=function(a){if((a=c(this).val())&&0<a.length){var d=c.data(this,"numeric.decimal"),f=c.data(this,"numeric.negative");if(""!==d&&null!==d){var b=a.indexOf(d);0===b&&(this.value="0"+a);1==
b&&"-"==a.charAt(0)&&(this.value="-0"+a.substring(1));a=this.value}for(var g=[0,1,2,3,4,5,6,7,8,9,"-",d],b=a.length,e=b-1;0<=e;e--){var h=a.charAt(e);0!==e&&"-"==h?a=a.substring(0,e)+a.substring(e+1):0!==e||f||"-"!=h||(a=a.substring(1));for(var l=!1,k=0;k<g.length;k++)if(h==g[k]){l=!0;break}l&&" "!=h||(a=a.substring(0,e)+a.substring(e+1))}f=a.indexOf(d);if(0<f)for(b-=1;b>f;b--)a.charAt(b)==d&&(a=a.substring(0,b)+a.substring(b+1));this.value=a}};c.fn.numeric.blur=function(){function a(a){if(a.max&&
parseInt(a.value)>parseInt(a.max))a.value=a.max;else if(a.min)a.value=a.min;else return;c(a).change()}var d=c.data(this,"numeric.decimal"),f=c.data(this,"numeric.callback"),b=this.value;""!==b?RegExp("^\\d+$|^\\d*"+d+"\\d+$").exec(b)&&this.validity.valid||(a(this),f.apply(this)):(a(this),f.apply(this))};c.fn.removeNumeric=function(){return this.data("numeric.decimal",null).data("numeric.negative",null).data("numeric.callback",null).unbind("keypress",c.fn.numeric.keypress).unbind("blur",c.fn.numeric.blur)}})(jQuery);