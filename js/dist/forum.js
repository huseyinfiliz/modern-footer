(()=>{var t={n:o=>{var r=o&&o.__esModule?()=>o.default:()=>o;return t.d(r,{a:r}),r},d:(o,r)=>{for(var e in r)t.o(r,e)&&!t.o(o,e)&&Object.defineProperty(o,e,{enumerable:!0,get:r[e]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o)};(()=>{"use strict";const o=flarum.core.compat["forum/app"];var r=t.n(o);const e=flarum.core.compat["common/extend"],n=flarum.core.compat["forum/ForumApplication"];var i=t.n(n);function a(t,o){return a=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t},a(t,o)}const u=flarum.core.compat["common/Component"];var l=function(t){var o,e;function n(){return t.apply(this,arguments)||this}e=t,(o=n).prototype=Object.create(e.prototype),o.prototype.constructor=o,a(o,e);var i=n.prototype;return i.oninit=function(o){t.prototype.oninit.call(this,o);var e=r().forum.attribute("modern-footer.js");if(e){var n=e.trim(),i=n.replace(/<!--[\s\S]*?-->/g,"").replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/[^\n\r]*/g,"").trim();i.startsWith("<script")&&i.endsWith("<\/script>")?$("body").append(n):$("body").append("<script>"+i+"<\/script>")}},i.view=function(){var t="1"===r().forum.attribute("modern-footer.info-enabled"),o="1"===r().forum.attribute("modern-footer.links-1-enabled"),e="1"===r().forum.attribute("modern-footer.links-2-enabled"),n="1"===r().forum.attribute("modern-footer.links-3-enabled"),i="1"===r().forum.attribute("modern-footer.links-4-enabled"),a="1"===r().forum.attribute("modern-footer.bottom-enabled");return m("div",null,m("div",{class:"row"},t&&this.renderInfoBlock(),o&&this.renderLinksBlock(r().forum.attribute("modern-footer.title-2"),1,6,r().forum.attribute("modern-footer.title-fa-2")),e&&this.renderLinksBlock(r().forum.attribute("modern-footer.title-3"),7,12,r().forum.attribute("modern-footer.title-fa-3")),n&&this.renderLinksBlock(r().forum.attribute("modern-footer.title-4"),13,18,r().forum.attribute("modern-footer.title-fa-4")),i&&this.renderLinksBlock(r().forum.attribute("modern-footer.title-5"),19,24,r().forum.attribute("modern-footer.title-fa-5"))),a&&m("div",{class:"foo-bottom"},m("p",null,r().forum.attribute("modern-footer.copyright")||"")))},i.renderInfoBlock=function(){var t,o=null==(t=r().forum.attribute("modern-footer.title-1"))?void 0:t.trim(),e=r().forum.attribute("modern-footer.right-text")||"";return m("div",{class:"foo-left"},m("div",null,o?o.startsWith("http")?m("h3",null,m("img",{src:o,alt:"Footer Logo"})):m("h3",null,m.trust(o)):null,e&&m("p",null,e),this.renderSocialButtons()))},i.renderLinksBlock=function(t,o,r,e){return m("div",{class:"foo-mid"},m("div",null,m("h3",null,m("i",{class:e})," ",t),m("ul",null,this.renderLinks(o,r))))},i.renderSocialButtons=function(){var t=this;return[{icon:r().forum.attribute("modern-footer.contact"),link:r().forum.attribute("modern-footer.contact-link")},{icon:r().forum.attribute("modern-footer.contact-2"),link:r().forum.attribute("modern-footer.contact-link-2")},{icon:r().forum.attribute("modern-footer.contact-3"),link:r().forum.attribute("modern-footer.contact-link-3")},{icon:r().forum.attribute("modern-footer.contact-4"),link:r().forum.attribute("modern-footer.contact-link-4")}].map((function(o){if(!o.icon&&!o.link)return null;o.icon&&o.icon.startsWith("fa")||(o.icon="fas fa-link");var r=o.link||"#";return m("button",{class:"Button Button Social"},m("span",{class:"Button-label"},m("a",{href:r,target:t.isExternalLink(r)?"_blank":void 0},m("i",{class:o.icon}))))}))},i.renderLinks=function(t,o){for(var e=[],n=t;n<=o;n++){var i=r().forum.attribute("modern-footer.link-"+n),a=r().forum.attribute("modern-footer.text-"+n);i&&a&&e.push(m("li",null,m("a",{href:i,target:this.isExternalLink(i)?"_blank":void 0},a)))}return e},i.isExternalLink=function(t){try{var o=new URL(t,window.location.origin);return this.normalizeHostname(window.location.hostname)!==this.normalizeHostname(o.hostname)}catch(t){return!1}},i.normalizeHostname=function(t){return t.replace(/^www\./,"")},n}(t.n(u)());r().initializers.add("huseyinfiliz-modern-footer",(function(){(0,e.extend)(i().prototype,"mount",(function(){var t=document.createElement("footer"),o=r().forum.attribute("modern-footer.mobile-tab")||"0px",e=document.createElement("style");e.innerHTML="\n      @media (max-width: 768px) {\n        footer {\n          padding-bottom: "+o+";\n        }\n      }\n    ",document.head.appendChild(e),m.mount(document.body.appendChild(t),l)}))}))})(),module.exports={}})();
//# sourceMappingURL=forum.js.map
