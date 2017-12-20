console.log("base64")
sue.apps.base64={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		sue.apps.init();
		var _appname="base64";
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+parseInt((new Date().getTime())/1000),{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_box_head" style="">'
				+'<span class="su_box_title">'+sue.apps.i18n("base64")+'</span>'
				+'<div class="su_box_btn_close">x</div>'
			+'</div>'
			+'<div class="su_box_main">'
				+'<div class="su_box_content">'
					+'<div class="base64box">'
						+'<div class="base_str">'
							+'<textarea class="base_areastr">'+'dGVzdA=='+'</textarea><br />'
							+'<button class="base_btn_encode">'+sue.apps.i18n("btn_encode")+'</button><button class="base_btn_decode">'+sue.apps.i18n("btn_decode")+'</button>'
						+'</div>'
						+'<div class="base_code">'
							+'<textarea class="base_areacode"></textarea><br />'
							+'<button class="base_btn_back">'+sue.apps.i18n("btn_back")+'</button>'
						+'</div>'
					+'</div>'
					+'<div class="su_copyright">Based on <a href="https://github.com/dankogai/js-base64" target="_blank">js-base64@Github</a></div>'
				+'</div>'
			+'</div>';
		var domUL=sue.apps.domCreate("ul");
		//dom.querySelector(".su_box_content").style.cssText+="max-height:"+(window.innerHeight-150)+"px;";

        dom.querySelector(".base_btn_encode").addEventListener("click",this,false);
        dom.querySelector(".base_btn_decode").addEventListener("click",this,false);
        dom.querySelector(".base_btn_back").addEventListener("click",this,false);

		//sue.apps.initZoom(dom);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				var objstr=sue.apps.getAPPboxEle(e).querySelector(".base_str textarea"),
					objcode=sue.apps.getAPPboxEle(e).querySelector(".base_code textarea");
				objcode.value="";
				if(!objstr.value){return;}
				if(e.target.classList.contains("base_btn_encode")){
					sue.apps.base64.showPanel(e);
					objcode.value=Base64.toBase64(objstr.value);
				}else if(e.target.classList.contains("base_btn_decode")){
					sue.apps.base64.showPanel(e);
					objcode.value=Base64.fromBase64(objstr.value);
				}else if(e.target.classList.contains("base_btn_back")){
					sue.apps.base64.showPanel(e);
				}
				break;
		}
	},
	showPanel:function(e){
		var obj=sue.apps.getAPPboxEle(e).querySelector(".base_code");
		if(e.target.classList.contains("base_btn_back")){
			obj.style.cssText+="left:-500px;"
		}else{
			obj.style.cssText+="left:20px;"
		}
	}
}
sue.apps.base64.initUI();
// chrome.runtime.sendMessage({type:"apps_getvalue",typevalue:"appslist"},function(response){
// 	sue.apps.base64.cons.zoom=response.value.zoom;
// 	sue.apps.base64.initUI();
// })