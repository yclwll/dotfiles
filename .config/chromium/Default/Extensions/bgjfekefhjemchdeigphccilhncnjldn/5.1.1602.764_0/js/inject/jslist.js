console.log("jslist");
sue.apps.jslist={
	cons:{},
	initUI:function(){
		sue.apps.init();
		var _appname="jslist",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_box_head" style="">'
				+'<span class="su_box_title">'+sue.apps.i18n("jslist")+'</span>'
				+'<div class="su_box_btn_close">x</div>'
			+'</div>'
			+'<div class="su_box_main">'
				+'<div class="su_box_content">'
					+'<div class="su_jslist_box"></div>'
				+'</div>'
				+'<div class="su_box_opt">'
					+'<input id="n_closebox" class="su_box_opt_radio" name="n_closebox" type="checkbox"><label for="n_closebox" class="su_box_opt_labeldes">'+sue.apps.i18n("n_closebox")+'</label><br />'
					+'<input id="n_jq" class="su_box_opt_radio" name="n_jq" type="checkbox"><label for="n_jq" class="su_box_opt_labeldes">'+sue.apps.i18n("n_jq")+'</label>'
					+'<div class="su_box_opt_btnbox">'
						+'<input class="su_box_opt_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
						+'<input class="su_box_opt_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
					+'</div>'
				+'</div>'
			+'</div>'
			+'<div class="su_box_menu">'
				+'<img class="su_box_menu_btn su_box_menu_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
			+'</div>';
		dom.style.cssText+="border-color:#e91e63;";
		dom.querySelector(".su_box_head").style.cssText+="background-color:#e91e63;";
		//dom.querySelector(".su_box_content").style.cssText+="max-height:"+(window.innerHeight-150)+"px;";

		var domBox=dom.querySelector(".su_jslist_box");
		var domUL=sue.apps.domCreate("ul");
		var theobj=sue.apps.jslist.js; //sue.cons.jslist.value.apps; //SU_apps_jslist.cons.apps;
		for(var i=0;i<theobj.length;i++){
			var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_jslist_li"]},theobj[i],null,{setName:["id"],setValue:[i]});
			domUL.appendChild(domli);
			//domli.removeEventListener("click",this,false);
			//domli.addEventListener("click",this,false);
		}
		domBox.appendChild(domUL);
		//alert(domBox)
		dom.addEventListener("click",this.handleEvent,false)
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				console.log(e.target.dataset.id)
				if(e.target.classList.contains("su_jslist_li")){
					chrome.runtime.sendMessage({type:"apps_action",apptype:"jslist",id:e.target.dataset.id},function(response){})
					//if(SU_apps_jslist.cons.config.n_closebox){
					//if(sue.cons.jslist.config.n_closebox){
					if(sue.apps.jslist.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"jslist"},function(response){
	sue.apps.jslist.config=response.config;
	sue.apps.jslist.js=response.value.js;
	sue.apps.jslist.initUI();
})
