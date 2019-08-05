parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"zN+f":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t={name:"ActiveListComp",data:()=>({input_value:null,input_list_value:null,input_list_placeholder:"Update item",items:[],is_open:!1,current_edit_item:null,panel_style:"width: 0; height: 0; transition: all 3s; opacity: 0;"}),props:{input_size:{type:Number,default:20},title:{type:String,default:null},placeholder:{type:String,default:"Enter a value"},drop_panel_height:{type:String,default:"100px"},css_variables:{type:Object,default:()=>null}},methods:{input_focusout:function(t){t.editing=!1},compute_placeholder:function(t){return"Update "+t.value},add_item:function(){null!==this.input_value&&(this.items.push({value:this.input_value,editing:!1}),this.is_open||this.toggle_state()),this.emit_items()},turn_on_edit:function(t){this.current_edit_item=t,this.input_list_placeholder="Update "+t.value,t.editing=!0},update_item:function(){null!==this.input_list_value&&(this.current_edit_item.value=this.input_list_value,this.current_edit_item.editing=!1,this.emit_items(),this.current_edit_item=null)},trash_item:function(t){const e=this.items.indexOf(t);this.items.splice(e,1),this.input_value=null,0===this.items.length&&this.toggle_state(),this.emit_items()},arrow_clicked:function(){this.toggle_state()},toggle_state:function(){this.is_open?(this.is_open=!1,this.panel_style="height: 0;transition: all 3s; opacity: 0;",null!==this.current_edit_item&&(this.current_edit_item.editing=!1,this.current_edit_item=null)):(this.is_open=!0,this.panel_style="height: "+this.drop_panel_height+";transition: all 3s; opacity: 1.0;")},emit_items:function(){const t=[];for(let e of this.items)t.push(e.value);this.$emit("active_list_comp_items",t)}},mounted(){if(null!==this.css_variables)for(let t of Object.keys(this.css_variables))this.$el.style.setProperty(`--${t}`,this.css_variables[t])}};exports.default=t;
(function(){var t=exports.default||module.exports;"function"==typeof t&&(t=t.options),Object.assign(t,{render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"activeList"},[e("div",{staticClass:"activeList_title"},[t._v(t._s(t.title))]),t._v(" "),e("section",{staticClass:"activeList_inputSec"},[e("div",{class:[t.is_open?"activeList_arrowIcon__open":"activeList_arrowIcon__closed"],on:{click:t.arrow_clicked}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.input_value,expression:"input_value"}],staticClass:"activeList_input",attrs:{size:t.input_size,placeholder:t.placeholder},domProps:{value:t.input_value},on:{change:t.add_item,input:function(i){i.target.composing||(t.input_value=i.target.value)}}})]),t._v(" "),t.items.length>0?e("div",{staticClass:"activeList_listSec"},[e("ul",{staticClass:"activeList_list"},[e("div",{staticClass:"activeList_panel",style:t.panel_style},t._l(t.items,function(i,s){return e("li",{key:s},[i.editing?i.editing?e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.input_list_value,expression:"input_list_value"}],staticClass:"activeList_input",attrs:{size:t.input_size,placeholder:t.input_list_placeholder},domProps:{value:t.input_list_value},on:{change:t.update_item,focusout:function(e){return t.input_focusout(i)},input:function(i){i.target.composing||(t.input_list_value=i.target.value)}}})]):t._e():e("div",{staticClass:"activeList_noEditBox"},[e("span",[t._v(t._s(i.value))]),t._v(" "),e("div",{staticClass:"activeList_editIcon",on:{click:function(e){return t.turn_on_edit(i)}}}),t._v(" "),e("div",{staticClass:"activeList_trashIcon",on:{click:function(e){return t.trash_item(i)}}})])])}),0)])]):t._e()])},staticRenderFns:[],_compiled:!0,_scopeId:"data-v-cecd92",functional:void 0});})();
},{}],"6plK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("activelistcomp"));function t(e){return e&&e.__esModule?e:{default:e}}var i={name:"App",data:function(){return{input_size_fruit:24,input_size_hobby:40,css_variables_fruits:{active_list_items_panel_background:"lightgreen",active_list_panel_position:"absolute",active_list_panel_z_index:"100"},css_variables:{active_list_items_panel_background:"lightblue"}}},components:{ActiveListComp:e.default},methods:{show_fruit_items:function(e){console.log("Fruit Items: ".concat(e))},show_hobby_items:function(e){console.log("Hobby Items: ".concat(e))}}};exports.default=i;
(function(){var n=exports.default||module.exports;"function"==typeof n&&(n=n.options),Object.assign(n,{render:function(){var n=this,l=n.$createElement,s=n._self._c||l;return s("div",{staticClass:"demo_container"},[s("section",{staticClass:"components_box"},[s("active-list-comp",{attrs:{title:"My Favorite Fruits",placeholder:"Enter a fruit",input_size:n.input_size_fruit,css_variables:n.css_variables_fruits},on:{active_list_comp_items:n.show_fruit_items}}),n._v(" "),s("active-list-comp",{attrs:{title:"My Hobbies",placeholder:"Enter a hobby",input_size:n.input_size_hobby,css_variables:n.css_variables},on:{active_list_comp_items:n.show_hobby_items}})],1),n._v(" "),n._m(0)])},staticRenderFns:[function(){var n=this.$createElement,l=this._self._c||n;return l("section",{staticClass:"pbox"},[l("p",[this._v(" rownwnn andlle aljnd;3e; .akdnend qnfdslns alne. andl;; irjlsek sljdnel ewlnsl lsnkei s nelnsndl slhelnskdn lslsn; a;ke;;;0ekd lsnlsnel sllls 2nwlenkf lsmksnel; slasll slenen ls nellllsn 5nrlnelwn lsnl slnwnl rien wqnelnwlen tltnylnr lsnenl wqnsna slns yktnu iims wemr eeenelsn ssysnwl snn rlrnelwn lsnen rlnelwn alqnfkt ndlnwln eerlnw qnerndlsnl yytl alsn lkd5lr endsbx alnsnr uyntlrnl lln wndjf prpt wenrnf qwns duu tnrhdhh slnfldn wekr ")])])}],_compiled:!0,_scopeId:null,functional:void 0});})();
},{"activelistcomp":"zN+f"}],"vZyd":[function(require,module,exports) {
"use strict";var e=u(require("./App.vue"));function u(e){return e&&e.__esModule?e:{default:e}}new Vue({render:function(u){return u(e.default)}}).$mount("#app");
},{"./App.vue":"6plK"}]},{},["vZyd"], null)
//# sourceMappingURL=/app.c77cafdb.js.map