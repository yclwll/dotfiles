var dy_tasktb={dataView:null,grid:null,cur_task_id:-1};
(function(){function K(a,b,c){var d=new Slick.RowMoveManager({cancelEditOnDrag:!0});d.onBeforeMoveRows.subscribe(function(a,b){for(var c=0;c<b.rows.length;c++)if(b.rows[c]==b.insertBefore||b.rows[c]==b.insertBefore-1)return a.stopPropagation(),!1;return!0});d.onMoveRows.subscribe(function(a,d){var k=[],g,h=[],m=0;for(g=d.rows.length;m<g;++m)h.push(b.getIdxById(b.getItem(d.rows[m]).id));var u=(m=b.getItem(d.insertBefore))?b.getIdxById(m.id):c.length+10;h.sort(function(a,b){return a-b});for(m=0;m<h.length;m++)k.push(c[h[m]]);
h.reverse();g=c.splice(u,c.length);for(m=0;m<h.length;m++){var l=h[m];l<u?c.splice(l,1):g.splice(l-u,1)}c.push.apply(c,k.concat(g));b.updateIdxById();b.refresh();dy_tasktb.update_free_order()});a.registerPlugin(d)}function v(a,b){var c=RegExp("^("+imgtag_formats+")$","i");if(b&&a.state==DyEnums.TaskState.FINISH&&a.full_path&&a.exists){var d=xtractFile(a.file_ext||file_from_url(a.url));if(d.fext&&c.test(d.fext))return"file:///"+a.full_path}return null}function A(a){return'<div class="radial-progress">        <svg>          <circle class="radial-progress-cover"></circle>\t\t  <circle class="radial-progress-bar" stroke-dasharray="'+
0.56*Math.PI*a.progress+',200"></circle>        </svg>      </div>'}function w(a){if(0>=a.size)return 0<a.finished_bytes?get_byte_string(a.finished_bytes):chrome.i18n.getMessage("phraseUnknownSize");var b=get_byte_string(a.size);return a.state==DyEnums.TaskState.FINISH||a.state==DyEnums.TaskState.INTERRUPTED?b:chrome.i18n.getMessage("statusDownloadedSize",[get_byte_string(a.finished_bytes),b])}function B(a){return get_byte_string_(a.speed,"/s")+" - "+w(a)+" | "+chrome.i18n.getMessage("statusTimeLeft",
[get_readable_duration(a.time_remained)])}function C(a){var b=a.state;a.state!=DyEnums.TaskState.FINISH||a.exists||(b=DyEnums.TaskState.FILEMISS);b='<div class="ditem_stat_line">'+('<span class="ditem_state"><img width=20 height=20 title="'+DyStrings.TaskState[b]+'" src="'+DyStrings.TaskStateIcon[b]+'"/></span>');if(a.state==DyEnums.TaskState.DOWNLOAD)a=B(a),b+='<span class="ditem_status">'+a+"</span>";else var c=a.error_str?DyStrings.Error[a.error_str]||a.error_str:w(a),b=b+('<span class="ditem_status'+
(a.error_str?" error_msg":"")+'">'+c+'</span><span class="ditem_adddate">'+get_readable_date(a.time_add)+"</span>");return b+"</div>"}function D(a,b){var c=b.state;b.state!=DyEnums.TaskState.FINISH||b.exists||(c=DyEnums.TaskState.FILEMISS);a.find(".ditem_state img").attr("title",DyStrings.TaskState[c]).attr("src",DyStrings.TaskStateIcon[c]);b.state==DyEnums.TaskState.DOWNLOAD?(c=B(b),a.find(".ditem_adddate").remove(),a.find(".ditem_status").text(c)):(c=b.error_str?DyStrings.Error[b.error_str]||b.error_str:
w(b),a.find(".ditem_status").text(c).toggleClass("error_msg",b.error_str),(c=a.find(".ditem_adddate"))&&c.length||(c=$('<span class="ditem_adddate">').appendTo(a)),c.text(get_readable_date(b.time_add)))}function E(a,b,c,d,e){return isNaN(c)||"time_remained"==d.field&&e.state!=DyEnums.TaskState.DOWNLOAD?"-":get_duration_string(c)}function F(a,b,c,d,e){return c?c.format("yyyy-MM-dd hh:mm:ss"):"-"}function x(a,b){return a[l]-b[l]||a.index-b.index}function G(a,b){return a.state==DyEnums.TaskState.DOWNLOAD?
b.state!=DyEnums.TaskState.DOWNLOAD?y?-1:1:a[l]-b[l]:b.state==DyEnums.TaskState.DOWNLOAD?y?1:-1:a.index-b.index}function H(a,b){return a[l]-b[l]||a.index-b.index}function r(a){if(dy_tasktb.grid&&dy_tasktb.dataView){void 0==a&&(a=(a=dy_tasktb.grid.getSelectedRows())?a.length:0);var b=dy_tasktb.dataView.getLength(),c="",c=1<a?chrome.i18n.getMessage("statusSelectedOf",[a,b]):chrome.i18n.getMessage("statusNumItems",[b]);dy_ui.restore_status_queue(c)}}function L(a,b){return-1!=(DYTask.render_UI_name(a)+
"\x00"+a.url+"\x00"+a.desc+"\x00"+a.referer).replace(/\s/g,"").toLocaleLowerCase().indexOf(b)}function M(){s={};dy_tasktb.colname2col={};for(var a=0;a<z.length;++a){var b=z[a];s[b.field]=b.id;dy_tasktb.colname2col[b.field]=b}for(var c=JSON.parse(dy_settings.get("tb_def_cols")),a=[],d=0;d<c.length;++d)b=dy_tasktb.colname2col[c[d]],void 0!=b&&a.push(b);b=!0==dy_settings.get("ui_grid_list");p.toggleClass("list_mode",b);var e=new Slick.Data.DataView({inlineFilters:!1,cacheFilters:!0}),f=new Slick.Grid("#dy_tb",
e,b?I:a,b?J:t);f._attips=new Slick.AutoTooltips({enableForHeaderCells:!0,enableForCells:!0,maxToolTipLength:256,tipHandle:b?".ditem_src_url":null});f.registerPlugin(f._attips);b=new Slick.Controls.ColumnPicker(z,f,t);b.onVisColumnsChanged.subscribe(function(a,b){for(var c=[],d=0;d<b.length;++d)c.push(b[d].field);dy_settings.set("tb_def_cols",JSON.stringify(c))});f.onColumnsReordered.subscribe(function(){for(var a=[],b=f.getColumns(),c=0;c<b.length;++c)a.push(b[c].field);dy_settings.set("tb_def_cols",
JSON.stringify(a))});b.onFitColumnsChanged.subscribe(function(a,b){t.forceFitColumns=b;dy_settings.set("tb_fit_cols",b)});b.onSyncResizeChanged.subscribe(function(a,b){dy_settings.set("tb_sync_resize",b)});var k=new Slick.RowSelectionModel;k.onSelectedRangesChanged.subscribe(function(a,b){var c=k.getSelectedRows(),d=0,f=!1;c&&0!=c.length?(d=c.length,1==c.length?(dy_tasktb.set_cur_task(e.getItem(c[0])),f=!0):dy_tasktb.set_cur_task(null),dy_ui.enable_toolbar(!0)):(dy_tasktb.set_cur_task(null),dy_ui.enable_toolbar(!1));
r(d);$(".details_open_toggler").toggleClass("hidden",!f);f||dy_ui.toggle_details_panel(!1);c&&1==c.length&&ui_notify.show_tip("tip_grid",8)});f.setSelectionModel(k);f.onClick.subscribe(function(a,b){var c=$(a.target);if(c.hasClass("ditem_more_toggler"))dy_settings.get("slide_details_panel")||dy_ui.toggle_details_panel(!0);else if(c.hasClass("ditem_title_openable"))c=dy_tasktb.dataView.getItem(b.row),a.stopImmediatePropagation(),a.preventDefault(),dy_engine.exec(c,function(a,b){a||alert(b)});else if(a.altKey&&
!a.ctrlKey&&!a.shiftKey||dy_settings.get("slide_details_panel")){var c=b.row,d=f.getSelectedRows();if(1==d.length&&d[0]==c||-1==d.indexOf(c))dy_ui.toggle_details_panel(!0),a.altKey||ui_notify.show_tip("tip_slide",4)}});f.onDblClick.subscribe(function(a,b){var c=dy_settings.get("dbclick_action");if(c!=DyEnums.DbclickAction.NOTHING){var d=dy_tasktb.dataView.getItem(b.row);if(c==DyEnums.DbclickAction.OPEN_FILE)d.state==DyEnums.TaskState.FINISH&&dy_engine.exec(d,function(a,b){a||alert(b)});else if(c==
DyEnums.DbclickAction.OPEN_FOLDER)dy_engine.explore(d,function(a,b){a||alert(b)});else if(c==DyEnums.DbclickAction.START_PAUSE){if(d.state==DyEnums.TaskState.FINISH)return;d.state==DyEnums.TaskState.DOWNLOAD||d.state==DyEnums.TaskState.QUEUE?dy_bkg.stop_tasks([d]):dy_bkg.start_tasks([d])}ui_notify.show_tip("tip_dblclick",3)}});f.onSort.subscribe(function(a,b){dy_tasktb.sort_by(b.sortCol.field,b.sortAsc);dy_ui.update_sortasc_button(b.sortCol.field,b.sortAsc)});0==dy_settings.get("tip_colfit")&&f.onColumnsResized.subscribe(function(){ui_notify.show_tip("tip_colfit",
1)});f.onScroll.subscribe(function(a,b){q?(clearTimeout(q),q=null):$(dy_tasktb.grid.getCanvasNode()).addClass("not-clickable");q=setTimeout(function(){$(dy_tasktb.grid.getCanvasNode()).removeClass("not-clickable");q=null},300)});e.onRowCountChanged.subscribe(function(a,b){f.updateRowCount();b.diff_rows&&b.diff_rows.length||f.render();0==(f.getSelectedRows()||[]).length&&r()});e.onRowsChanged.subscribe(function(a,b){f.invalidateRows(b.rows);f.render()});K(f,e,dy_bkg.getDatas());e.syncGridSelection(f,
!1);e.setSearchFunc(L);f.enableColumnFit();dy_tasktb.grid=f;dy_tasktb.dataView=e;p.find(".slick-viewport").click(function(a){"grid-canvas"!=a.target.className&&"slick-viewport"!=a.target.className||dy_tasktb.clear_selection()});$("#dy_lnav, #dy_tbar_wrap, .grid-inner-top-panel").click(function(a){a.target.id==this.id&&dy_tasktb.clear_selection()})}var p=null,l="",y=!0,N={state:function(a,b){return a.state-b.state||(a.error_str||"").localeCompare(b.error_str||"")||a.index-b.index},name:function(a,
b){return DYTask.render_UI_name(a).localeCompare(DYTask.render_UI_name(b))||a.index-b.index},progress:x,size:x,speed:G,url:function(a,b){return a[l].localeCompare(b[l])||a.index-b.index},time_remained:G,time_elapsed:x,time_add:H,time_finish:H},s={},n=0,I=[{id:n=0,name:"",field:"progress",_nofit:!0,formatter:function(a,b,c,d,e){a=chrome.i18n.getMessage("tipBtnOpenFile");a='<div class="ditem_ellipsisable ditem_title'+(e.state==DyEnums.TaskState.FINISH&&e.exists?' ditem_title_openable" title="'+a+'">':
'">')+DYTask.render_UI_name(e)+"</div>";b=e.state==DyEnums.TaskState.DOWNLOAD||e.state<=DyEnums.TaskState._active&&0<e.progress?A(e):"";c='<div class="centerme"><img src="'+(v(e,dy_bkg.file_access)||e.iconURL32||DyStrings.Icons.Unknown32)+'"/></div>';b+=c;c=C(e);return'<div class="ditem_wrap"><table width="100%" height="100%">        <tr><td class="ditem_icon" rowspan="3">'+b+"</td><td>"+a+'</td><td rowspan="3" class="ditem_more_toggler"></td></tr>        <tr><td><div class="ditem_ellipsisable ditem_src_url">'+
trimLen(e.url,256,"...")+'</div></td></tr>        <tr><td class="ditem_stat_wrap">'+c+"</td></tr>        </table></div>"},sortable:!0,behavior:"selectAndMove",width:500}],z=[{id:n=0,name:chrome.i18n.getMessage("fieldState"),field:"state",_notip:!0,formatter:function(a,b,c,d,e){return'<img width=20 height=20 src="'+DyStrings.TaskStateIcon[c]+'"/>'},sortable:!0,behavior:"selectAndMove",width:60},{id:++n,name:chrome.i18n.getMessage("fieldFileName"),field:"name",formatter:function(a,b,c,d,e){return'<span class="table-file-icon"><img src="'+
(e.iconURL16||DyStrings.Icons.Unknown16)+'"/></span><span class="table-file-name">'+DYTask.render_UI_name(e)+"</span>"},sortable:!0,behavior:"selectAndMove",width:150,cssClass:"slick-cell-left"},{id:++n,name:chrome.i18n.getMessage("fieldProgress"),field:"progress",_nofit:!0,_notip:!0,formatter:function(a,b,c,d,e){a="0";0<c&&(a=c.toFixed(1));c="progress-bar";e.state==DyEnums.TaskState.FINISH?c+=" finished":e.state==DyEnums.TaskState.INTERRUPTED&&(c+=" interrupted");return"<div class='"+c+"'>            <div class='label'>"+
a+"%</div><div class='fill' style='width:"+a+"%'></div></div>"},sortable:!0,behavior:"selectAndMove",width:150},{id:++n,name:chrome.i18n.getMessage("fieldFileSize"),field:"size",formatter:function(a,b,c,d,e){if(0>=c)return 0<e.finished_bytes?get_byte_string_nopad(e.finished_bytes):"-";a=get_byte_string_nopad(c);return e.state==DyEnums.TaskState.FINISH||e.state==DyEnums.TaskState.INTERRUPTED?a:get_byte_string_nopad(e.finished_bytes)+"/"+a},sortable:!0,behavior:"selectAndMove",width:120},{id:++n,name:chrome.i18n.getMessage("fieldSpeed"),
field:"speed",_notip:!0,formatter:function(a,b,c,d,e){return e.state==DyEnums.TaskState.DOWNLOAD?get_byte_string(c)+"/s":"-"},sortable:!0,behavior:"selectAndMove",width:115},{id:++n,name:chrome.i18n.getMessage("fieldRemainingTime"),field:"time_remained",_notip:!0,formatter:E,sortable:!0,behavior:"selectAndMove",width:115},{id:++n,name:chrome.i18n.getMessage("fieldElapsedTime"),field:"time_elapsed",_notip:!0,formatter:E,sortable:!0,behavior:"selectAndMove",width:105},{id:++n,name:chrome.i18n.getMessage("fieldURL"),
field:"url",formatter:function(a,b,c,d,e){return trimLen(""+c,256,"...")},sortable:!0,behavior:"selectAndMove",width:340,cssClass:"slick-cell-left"},{id:++n,name:chrome.i18n.getMessage("fieldAddTime"),field:"time_add",_notip:!0,formatter:F,sortable:!0,behavior:"selectAndMove",width:160},{id:++n,name:chrome.i18n.getMessage("fieldFinishTime"),field:"time_finish",_notip:!0,formatter:F,sortable:!0,behavior:"selectAndMove",width:160}],J={explicitInitialization:!0,enableColumnReorder:!1,forceFitColumns:!0,
showHeaderRow:!1,headerRowHeight:0,rowHeight:90,innerTopPanelHeight:110},t={explicitInitialization:!0,enableColumnReorder:!0,forceFitColumns:dy_settings.get("tb_fit_cols"),showHeaderRow:!1,rowHeight:25,headerRowHeight:25,innerTopPanelHeight:110};dy_tasktb.busyLoading=function(a){p.find(".inner-loading-overlay").remove();$('<div class="undraggable inner-loading-overlay '+(a||"")+'"><img src="../icons/loading.gif"/></div>').prependTo(p)};dy_tasktb.loadingDone=function(a,b){p.find(".inner-loading-overlay").fadeOut(a||
400,function(){$(this).remove();b&&b()})};dy_tasktb.set_custom_filter=function(a){dy_tasktb.dataView&&(dy_tasktb.busyLoading("overlay-transparent"),setTimeout(function(){dy_tasktb.dataView.setFilterArgs(a);dy_taskfilter.compileCache(a);dy_tasktb.dataView.setFilter(dy_taskfilter.compiledTest);dy_tasktb.loadingDone();r()},20))};dy_tasktb.set_recycled_filter=function(){dy_tasktb.busyLoading("overlay-transparent");dy_tasktb.dataView.setFilterArgs("Fd(recycled)");dy_tasktb.dataView.setFilter(function(a){return a.recycled});
dy_tasktb.loadingDone();r()};dy_tasktb.update_tasks=function(a){if(a&&a.length){dy_tasktb.grid.beginRender();for(var b=[],c=0;c<a.length;++c){var d=dy_tasktb.dataView.getRowById(a[c]);void 0!=d&&b.push(d)}dy_tasktb.grid.invalidateRows(b);dy_tasktb.dataView.invalidateFilterCache(a);dy_tasktb.isFreeOrder()?"true"!=dy_taskfilter.getCompiledFilter()&&dy_tasktb.dataView.refresh():dy_tasktb.dataView.reSortUpdate(a);dy_tasktb.grid.endRender()}};dy_tasktb.update_tasks_field=function(a,b){if(a&&a.length){for(var c=
[b],d=0;d<a.length;++d)dy_tasktb.update_fields(a[d],c,!0);dy_tasktb.dataView.invalidateFilterCache(a);b==l?dy_tasktb.dataView.reSortUpdate(a):-1!=dy_taskfilter.getCompiledFilter().indexOf("Fd('"+b+"')")&&dy_tasktb.dataView.refresh();"state"!=b&&"speed"!=b||dy_ui.update_status_downloading()}};dy_tasktb.update_fields=function(a,b,c){var d=dy_tasktb.dataView.getRowById(a),e=dy_tasktb.dataView.getItem(d);if(e&&e.id==a)if(!0==dy_settings.get("ui_grid_list")){var f=dy_tasktb.grid.getCellNode(d,0);if(f)for(var k=
$(f),f=0;f<b.length;++f){var d=k,g=e;switch(b[f]){case "naming":case "name":d.find(".ditem_title").text(DYTask.render_UI_name(g));break;case "url":d.find(".ditem_src_url").text(trimLen(g.url,256,"..."));break;case "iconURL32":d.find(".ditem_icon img").attr("src",v(g,dy_bkg.file_access)||g.iconURL32||DyStrings.Icons.Unknown32);break;case "size":D(d,g);break;case "state":var h=d.find(".radial-progress"),m=g.state==DyEnums.TaskState.DOWNLOAD||g.state<=DyEnums.TaskState._active&&0<g.progress;m&&!h.length?
d.find(".ditem_icon").prepend(A(g)):m||h.remove();h=chrome.i18n.getMessage("tipBtnOpenFile");g.state==DyEnums.TaskState.FINISH&&g.exists?d.find(".ditem_title").addClass(".ditem_title_openable").attr("title",h):d.find(".ditem_title").removeClass("ditem_title_openable").removeAttr("title");(h=v(g,!0))&&(dy_bkg.file_access?d.find(".ditem_icon img").attr("src",h):ui_notify.show_tip("tip_fileaccess",2));d.find(".ditem_stat_wrap").html(C(g));break;case "progress":h=0.56*Math.PI*g.progress,d.find(".radial-progress-bar").attr("stroke-dasharray",
h+",200"),D(d,g)}}}else for(g=!1,b&&1==b.length&&"state"==b[0]&&(b.push("size"),b.push("speed"),b.push("progress"),b.push("time_remained"),b.push("time_finish"),b.push("time_add"),g=!0),f=0;f<b.length;++f){k=b[f];if("naming"==k||"iconURL16"==k)k="name";h=dy_tasktb.grid.getColumnIndex(s[k]);void 0!=h&&("progress"!=k||g?dy_tasktb.grid.updateCell(d,h):(k=$(dy_tasktb.grid.getCellNode(d,h)),h="0%",0<e.progress&&(h=e.progress.toFixed(1)+"%"),k.find(".fill").css("width",h),k.find(".label").text(h)))}if(!c){e=
c=!1;d=dy_taskfilter.getCompiledFilter();g=!1;for(f=0;f<b.length;++f)k=b[f],k==l?c=!0:e||-1==d.indexOf("Fd('"+k+"')")||(e=!0),g||"state"!=k&&"speed"!=k||(g=!0);dy_tasktb.dataView.invalidateFilterCache([a]);c?dy_tasktb.dataView.reSortOne(a,e):e&&dy_tasktb.dataView.refresh();g&&dy_ui.update_status_downloading()}};dy_tasktb.update_progress=function(a){dy_tasktb.update_fields(a,["progress","speed","time_remained","time_elapsed","size"])};dy_tasktb.set_cur_task=function(a){a&&a.id==dy_tasktb.cur_task_id||
(dy_taskinfo.set_task(a),dy_tasktb.cur_task_id=a?a.id:-1)};dy_tasktb.blink_row=function(a){dy_tasktb.grid&&(a=dy_tasktb.grid.getRowNode(a))&&flash_element_bg($(a),"rgb(240, 240, 115)")};dy_tasktb.clear_selection=function(a){dy_tasktb.grid.setSelectedRows([]);dy_tasktb.grid.resetActiveCell()};dy_tasktb.isFreeOrder=function(){return!l};dy_tasktb.update_free_order=function(){l="";dy_settings.set("tb_sort_cols","[]");dy_tasktb.dataView.sort(null,!0);for(var a={},b=dy_bkg.bg_tasks,c=0,d=b.length;c<d;++c)a[b[c].id]=
c;dy_settings.set("tb_free_order",JSON.stringify(a));dy_ui.update_sortasc_button("",!1);dy_tasktb.update_sort_header("",!1)};dy_tasktb.sort_by=function(a,b){l=a;y=b;var c=N[a];c&&(dy_tasktb.busyLoading("overlay-transparent"),setTimeout(function(){dy_tasktb.dataView.sort(c,b);dy_tasktb.loadingDone()},20),dy_settings.set("tb_sort_cols",'[{"field":"'+a+'","sortAsc":'+b+"}]"),dy_settings.set("tb_free_order","{}"))};dy_tasktb.update_sort_header=function(a,b){var c=s[a];dy_tasktb.grid.setSortColumns(a?
[{columnId:c,sortAsc:b}]:[])};dy_tasktb.select_all=function(){for(var a=dy_tasktb.dataView.getLength(),b=Array(a),c=0;c<a;c++)b[c]=c;dy_tasktb.grid.setSelectedRows(b)};dy_tasktb.switch_ui=function(a){dy_tasktb.busyLoading();a="list"==a;p.toggleClass("list_mode",a);var b=!1;dy_tasktb.grid.beginRender();if(a)dy_tasktb.grid.setOptions(J),dy_tasktb.grid.setColumns(I),dy_tasktb.grid._attips.config("tipHandle",".ditem_src_url"),-1==["state","name","url","size","time_add"].indexOf(l)&&(b=!0);else{for(var c=
JSON.parse(dy_settings.get("tb_def_cols")),d=[],e=0;e<c.length;++e){var f=dy_tasktb.colname2col[c[e]];void 0!=f&&d.push(f)}dy_tasktb.grid.setOptions(t);dy_tasktb.grid.setColumns(d);dy_tasktb.grid._attips.config("tipHandle",null)}dy_settings.set("ui_grid_list",a);dy_tasktb.clear_selection();dy_tasktb.grid.endRender();b&&dy_tasktb.update_free_order();dy_tasktb.loadingDone(500)};var q=null;dy_tasktb.setup=function(){p=$("#dy_tb");M();dy_tasktb.dataView.beginUpdate();var a=dy_bkg.getDatas();dy_tasktb.dataView.setItems(a);
var b=JSON.parse(dy_settings.get("tb_sort_cols"));if(b&&b.length)a=b[0],dy_tasktb.sort_by(a.field,a.sortAsc),dy_tasktb.update_sort_header(a.field,a.sortAsc),dy_ui.update_sortasc_button(a.field,a.sortAsc);else if((b=JSON.parse(dy_settings.get("tb_free_order")))&&0<Object.getOwnPropertyNames(b).length){for(var c=0,d=a.length;c<d;++c)a[c].index=b[a[c].id];a.sort(function(a,b){return a.index-b.index});dy_tasktb.dataView.updateIdxById()}dy_ui.load_selected_filter();dy_tasktb.dataView.endUpdate();$('<div class="details_open_toggler hidden">').prependTo(p).click(function(){dy_ui.toggle_details_panel(!0)})}})();