(()=>{var t={n:o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return t.d(e,{a:e}),e},d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};(()=>{"use strict";t.r(o);const e=flarum.core.compat["forum/app"];var r=t.n(e);const n=flarum.core.compat["common/extend"],i=flarum.core.compat["forum/ForumApplication"];var c=t.n(i);function a(t,o){return a=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t},a(t,o)}const u=flarum.core.compat["common/Component"];var p=function(t){var o,e;function n(){return t.apply(this,arguments)||this}e=t,(o=n).prototype=Object.create(e.prototype),o.prototype.constructor=o,a(o,e);var i=n.prototype;return i.oninit=function(o){t.prototype.oninit.call(this,o),this.open=!1;var e=r().forum.attribute("fof-custom-footer.js");e&&$("body").append("<script>"+e.trim()+"<\/script>")},i.view=function(){var t=this;return m("div",{id:"CustomFooter",className:this.open&&"showing"},m("div",{className:"container"},m("div",{className:"Footer--Content",style:"height: "+(this.open?r().forum.attribute("fof-custom-footer.height")||50:0)+"px;"},m.trust(r().forum.attribute("fof-custom-footer.text")||"")),m("div",{className:"Footer--Icons"},m("i",{className:"Footer--Show fa fa-info-circle "+(this.open&&"hidden"),onclick:function(){return t.open=!0}}),m("i",{className:"Footer--Hide fa fa-caret-down "+(!this.open&&"hidden"),onclick:function(){return t.open=!1}}))))},n}(t.n(u)());r().initializers.add("fof-custom-footer",(function(){(0,n.extend)(c().prototype,"mount",(function(){var t=document.createElement("div");m.mount(document.body.appendChild(t),p)}))}))})(),module.exports=o})();
//# sourceMappingURL=forum.js.map