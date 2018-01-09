console.log("recentclosed");
sue.apps.recentclosed={
	cons:{
		recentclosed:null
	},
	initUI:function(){
		sue.apps.init();
		var _appname="recentclosed",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_box_head" style="">'
				+'<span class="su_box_title">'+sue.apps.i18n("recentclosed")+'</span>'
				+'<div class="su_box_btn_close">x</div>'
			+'</div>'
			+'<div class="su_box_main">'
				+'<div class="su_box_content"></div>'
				+'<div class="su_box_opt">'
					+'<label class="su_box_opt_labelname">'+sue.apps.i18n("app_recentbk_recentlength")+'</label>'+'<input class="su_box_opt_range" name="n_num" min="5" max="25" type="range"><span class="su_box_opt_rangebox"></span><br />'
					+'<input id="n_closebox_'+_time+'" class="su_box_opt_radio" name="n_closebox" type="checkbox"><label for="n_closebox_'+_time+'" class="su_box_opt_labeldes">'+sue.apps.i18n("n_closebox")+'</label><br />'
					+'<div class="su_box_opt_btnbox">'
						+'<input class="su_box_opt_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
						+'<input class="su_box_opt_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
					+'</div>'
				+'</div>'
			+'</div>'
			+'<div class="su_box_menu">'
				+'<img class="su_box_menu_btn su_box_menu_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
			+'</div>';
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;i<this.tabs.length;i++){
			var rctype=!this.tabs[i].window?this.tabs[i].tab:this.tabs[i].window;
			var list_li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_recentclosed_li"]},(!this.tabs[i].window?this.tabs[i].tab.title:this.tabs[i].window.tabs.length+" "+sue.apps.i18n("app_recentclosed_tabs")),"",{setName:["id"],setValue:[rctype.sessionId]},"");
			var rc_title;

			if(rctype.tabs){
				rc_title=rctype.tabs.length+" "+sue.apps.i18n("app_recentclosed_tabs")
				for(var ii=0;ii<rctype.tabs.length;ii++){
					rc_title+=" | "+rctype.tabs[ii].title;
				}
				list_li.classList.add("su_recentclosed_win");
				list_li.innerHTML=rc_title;
			}
			domUL.appendChild(list_li);
			list_li.removeEventListener("click",this,false);
			list_li.addEventListener("click",this,false);
		}
		//dom.querySelector(".su_box_content").style.cssText+="max-height:"+(window.innerHeight-150)+"px;";
		dom.querySelector(".su_box_content").appendChild(domUL);

		//sue.apps.initOpt(dom);
		//sue.apps.initZoom(dom);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_recentclosed_li")){
					chrome.runtime.sendMessage({type:"apps_action",apptype:"recentclosed",id:e.target.dataset.id},function(response){})
					if(sue.apps.recentclosed.config.n_closebox){
						sue.apps.boxClose(e)
					}
				}
				break;
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"recentclosed"},function(response){
	sue.apps.recentclosed.config=response.config;
	//sue.apps.recentclosed.zoom=response.value.zoom;
	sue.apps.recentclosed.tabs=response.value.tabs;
	sue.apps.recentclosed.initUI()
})
