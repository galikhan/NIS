/**
* SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2012 Grant Skinner
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* ver. 1.3.0-3 created from release_v0.2.0
**/

/**
 * SoundJS FlashPlugin also includes swfobject (http://code.google.com/p/swfobject/)
 */
 (function(i){function c(){this.init()}function n(a,e){this.init(a,e)}function B(a,e,m,u){this.init(a,e,m,u)}c.capabilities=null;c.BASE_PATH="src/soundjs";c.lastId=0;c.preloadId=0;c.isSupported=function(){if(i.location.host=="")return false;if(SoundJS.BrowserDetect.isIOS)return false;c.generateCapabilities();return swfobject==null?false:swfobject.hasFlashPlayerVersion("9.0.0")};c.generateCapabilities=function(){if(c.capabilities==null)c.capabilities={panning:true,volume:true,mp3:true,ogg:false,mpeg:true,
wav:true,channels:255}};c.prototype={CONTAINER_ID:"flashAudioContainer",capabilities:null,container:null,flash:null,flashReady:false,flashInstances:null,flashPreloadInstances:null,queuedInstances:null,init:function(){this.capabilities=c.capabilities;this.flashInstances={};this.flashPreloadInstances={};this.queuedInstances=[];if(document.getElementById("flashAudioContainer")==null){var a=this.container=document.createElement("div");a.id=this.CONTAINER_ID;document.body.appendChild(a)}swfobject.embedSWF(c.BASE_PATH+
"FlashAudioPlugin.swf",this.CONTAINER_ID,"1","1","9.0.0",null,null,null,null,SoundJS.proxy(this.handleSWFReady,this))},handleSWFReady:function(a){this.flash=a.ref;this.loadTimeout=setTimeout(function(){SoundJS.proxy(this.handleTimeout,this)},2E3)},handleFlashReady:function(){this.flashReady=true;for(var a=0,e=this.queuedInstances.length;a<e;a++)this.flash.register(this.queuedInstances[a]);this.queuedInstances=null;for(var m in this.flashPreloadInstances)this.flashPreloadInstances[m].initialize(this.flash);
for(m in this.flashInstances)this.flashInstances[m].initialize(this.flash)},handleTimeout:function(){},register:function(a){this.flashReady?this.flash.register(a):this.queuedInstances.push(a);var e="p"+c.preloadId++;return new B(a,this.flash,this,e)},create:function(a){try{var e=new n(a,this.flash);e.owner=this;return e}catch(m){}return null},registerPreloadInstance:function(a,e){this.flashPreloadInstances[a]=e},unregisterPreloadInstance:function(a){delete this.flashPreloadInstances[a]},registerSoundInstance:function(a,
e){this.flashInstances[a]=e},unregisterSoundInstance:function(a){delete this.flashInstances[a]},handleSoundEvent:function(a,e){var m=this.flashInstances[a];if(m!=null){for(var u=[],c=2,i=arguments.length;c<i;c++)u.push(arguments[c]);try{if(u.length==0)m[e]();else m[e].apply(m,u)}catch(n){}}},handlePreloadEvent:function(a,e){var m=this.flashPreloadInstances[a];if(m!=null){for(var c=[],i=2,w=arguments.length;i<w;i++)c.push(arguments[i]);try{if(c.length==0)m[e]();else m[e].apply(m,c)}catch(n){}}},handleEvent:function(a){switch(a){case "ready":clearTimeout(this.loadTimeout),
this.handleFlashReady()}},handleErrorEvent:function(){},toString:function(){return"[FlashPlugin]"}};i.SoundJS.FlashPlugin=c;n.prototype={src:null,uniqueId:-1,capabilities:null,flash:null,flashId:null,loop:0,volume:1,pan:0,muted:false,paused:false,onComplete:null,onLoop:null,onReady:null,onPlayFailed:null,onPlayInterrupted:null,init:function(a,e){this.uniqueId=c.lastId++;this.src=a;this.flash=e},initialize:function(a){this.flash=a},interrupt:function(){this.playState=SoundJS.PLAY_INTERRUPTED;if(this.onPlayInterrupted!=
null)this.onPlayInterrupted(this);this.flash.interrupt(this.flashId);this.cleanUp()},cleanUp:function(){this.owner.unregisterSoundInstance(this.flashId);SoundJS.playFinished(this)},play:function(a,e,c,i,n,w){SoundJS.playInstance(this,a,e,c,i,n,w)},beginPlaying:function(a,e,c,i){this.loop=e;this.paused=false;this.flashId=this.flash.playSound(this.src,a,e,c,i);if(this.flashId==null){if(this.onPlayFailed!=null)this.onPlayFailed(this);this.cleanUp();return false}this.playState=SoundJS.PLAY_SUCCEEDED;
this.owner.registerSoundInstance(this.flashId,this);return true},pause:function(){this.paused=true;return this.flash.pauseSound(this.flashId)},resume:function(){this.paused=false;return this.flash.resumeSound(this.flashId)},stop:function(){this.playState=SoundJS.PLAY_FINISHED;this.paused=false;var a=this.flash.stopSound(this.flashId);this.cleanUp();return a},setVolume:function(a){this.volume=a;return this.flash.setVolume(this.flashId,a)},getVolume:function(){return this.volume},mute:function(a){return(this.muted=
a)?this.flash.muteSound(this.flashId):this.flash.unmuteSound(this.flashId)},getPan:function(){return this.pan},setPan:function(a){this.pan=a;return this.flash.setPan(this.flashId,a)},getPosition:function(){return this.flash.getPosition(this.flashId)},setPosition:function(a){return this.flash.setPosition(this.flashId,a)},getDuration:function(){return this.flash.getDuration(this.flashId)},handleSoundFinished:function(){this.playState=SoundJS.PLAY_FINISHED;if(this.onComplete!=null)this.onComplete(this);
this.cleanUp()},handleLoop:function(){if(this.onLoop!=null)this.onLoop(this)},toString:function(){return"[FlashPlugin SoundInstance]"}};B.prototype={flash:null,src:null,tag:null,flashId:null,progress:-1,readyState:0,loading:false,preloadId:null,owner:null,onload:null,onprogress:null,onError:null,init:function(a,e,c,i){this.src=a;this.flash=e;this.owner=c;this.preloadId=i;this.tag=this},initialize:function(a){this.flash=a;this.loading&&this.load(this.src)},load:function(a){if(a==void 0)a=this.src;
return this.flash==null||this.flash.preload==void 0?(this.owner.registerPreloadInstance(this.preloadId,this),this.loading=true,false):(this.flash.preload(a,this.preloadId),true)},handleProgress:function(a,e){this.progress=a/e;if(this.onprogress!=null)this.onprogress({loaded:a,total:e,progress:this.progress})},handleComplete:function(){this.progress=1;this.readyState=4;if(this.onload!=null)this.onload()},handleError:function(a){if(this.onerror!=null)this.onerror(a)},toString:function(){return"[FlashPlugin SoundLoader]"}}})(window);var swfobject=function(){function i(){if(!x){try{var b=f.getElementsByTagName("body")[0].appendChild(f.createElement("span"));b.parentNode.removeChild(b)}catch(d){return}x=true;for(var b=C.length,j=0;j<b;j++)C[j]()}}function c(b){x?b():C[C.length]=b}function n(b){if(typeof o.addEventListener!=l)o.addEventListener("load",b,false);else if(typeof f.addEventListener!=l)f.addEventListener("load",b,false);else if(typeof o.attachEvent!=l)T(o,"onload",b);else if(typeof o.onload=="function"){var d=o.onload;
o.onload=function(){d();b()}}else o.onload=b}function B(){var b=f.getElementsByTagName("body")[0],d=f.createElement(v);d.setAttribute("type",D);var j=b.appendChild(d);if(j){var q=0;(function(){if(typeof j.GetVariable!=l){var h=j.GetVariable("$version");if(h)h=h.split(" ")[1].split(","),g.pv=[parseInt(h[0],10),parseInt(h[1],10),parseInt(h[2],10)]}else if(q<10){q++;setTimeout(arguments.callee,10);return}b.removeChild(d);j=null;a()})()}else a()}function a(){var b=s.length;if(b>0)for(var d=0;d<b;d++){var j=
s[d].id,a=s[d].callbackFn,h={success:false,id:j};if(g.pv[0]>0){var f=p(j);if(f)if(E(s[d].swfVersion)&&!(g.wk&&g.wk<312)){if(y(j,true),a)h.success=true,h.ref=e(j),a(h)}else if(s[d].expressInstall&&m()){h={};h.data=s[d].expressInstall;h.width=f.getAttribute("width")||"0";h.height=f.getAttribute("height")||"0";if(f.getAttribute("class"))h.styleclass=f.getAttribute("class");if(f.getAttribute("align"))h.align=f.getAttribute("align");for(var k={},f=f.getElementsByTagName("param"),c=f.length,i=0;i<c;i++)f[i].getAttribute("name").toLowerCase()!=
"movie"&&(k[f[i].getAttribute("name")]=f[i].getAttribute("value"));u(h,k,j,a)}else S(f),a&&a(h)}else if(y(j,true),a){if((j=e(j))&&typeof j.SetVariable!=l)h.success=true,h.ref=j;a(h)}}}function e(b){var d=null;if((b=p(b))&&b.nodeName=="OBJECT")typeof b.SetVariable!=l?d=b:(b=b.getElementsByTagName(v)[0])&&(d=b);return d}function m(){return!F&&E("6.0.65")&&(g.win||g.mac)&&!(g.wk&&g.wk<312)}function u(b,d,j,a){F=true;J=a||null;L={success:false,id:j};var h=p(j);if(h){h.nodeName=="OBJECT"?(A=w(h),G=null):
(A=h,G=j);b.id=M;if(typeof b.width==l||!/%$/.test(b.width)&&parseInt(b.width,10)<310)b.width="310";if(typeof b.height==l||!/%$/.test(b.height)&&parseInt(b.height,10)<137)b.height="137";f.title=f.title.slice(0,47)+" - Flash Player Installation";a=g.ie&&g.win?"ActiveX":"PlugIn";a="MMredirectURL="+encodeURI(window.location).toString().replace(/&/g,"%26")+"&MMplayerType="+a+"&MMdoctitle="+f.title;typeof d.flashvars!=l?d.flashvars+="&"+a:d.flashvars=a;if(g.ie&&g.win&&h.readyState!=4)a=f.createElement("div"),
j+="SWFObjectNew",a.setAttribute("id",j),h.parentNode.insertBefore(a,h),h.style.display="none",function(){h.readyState==4?h.parentNode.removeChild(h):setTimeout(arguments.callee,10)}();I(b,d,j)}}function S(b){if(g.ie&&g.win&&b.readyState!=4){var d=f.createElement("div");b.parentNode.insertBefore(d,b);d.parentNode.replaceChild(w(b),d);b.style.display="none";(function(){b.readyState==4?b.parentNode.removeChild(b):setTimeout(arguments.callee,10)})()}else b.parentNode.replaceChild(w(b),b)}function w(b){var d=
f.createElement("div");if(g.win&&g.ie)d.innerHTML=b.innerHTML;else if(b=b.getElementsByTagName(v)[0])if(b=b.childNodes)for(var a=b.length,q=0;q<a;q++)!(b[q].nodeType==1&&b[q].nodeName=="PARAM")&&b[q].nodeType!=8&&d.appendChild(b[q].cloneNode(true));return d}function I(b,d,a){var q,h=p(a);if(g.wk&&g.wk<312)return q;if(h){if(typeof b.id==l)b.id=a;if(g.ie&&g.win){var e="",k;for(k in b)if(b[k]!=Object.prototype[k])k.toLowerCase()=="data"?d.movie=b[k]:k.toLowerCase()=="styleclass"?e+=' class="'+b[k]+'"':
k.toLowerCase()!="classid"&&(e+=" "+k+'="'+b[k]+'"');k="";for(var c in d)d[c]!=Object.prototype[c]&&(k+='<param name="'+c+'" value="'+d[c]+'" />');h.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+e+">"+k+"</object>";H[H.length]=b.id;q=p(b.id)}else{c=f.createElement(v);c.setAttribute("type",D);for(var i in b)b[i]!=Object.prototype[i]&&(i.toLowerCase()=="styleclass"?c.setAttribute("class",b[i]):i.toLowerCase()!="classid"&&c.setAttribute(i,b[i]));for(e in d)d[e]!=Object.prototype[e]&&
e.toLowerCase()!="movie"&&(b=c,k=e,i=d[e],a=f.createElement("param"),a.setAttribute("name",k),a.setAttribute("value",i),b.appendChild(a));h.parentNode.replaceChild(c,h);q=c}}return q}function N(b){var d=p(b);if(d&&d.nodeName=="OBJECT")g.ie&&g.win?(d.style.display="none",function(){if(d.readyState==4){var a=p(b);if(a){for(var f in a)typeof a[f]=="function"&&(a[f]=null);a.parentNode.removeChild(a)}}else setTimeout(arguments.callee,10)}()):d.parentNode.removeChild(d)}function p(b){var d=null;try{d=f.getElementById(b)}catch(a){}return d}
function T(b,d,a){b.attachEvent(d,a);z[z.length]=[b,d,a]}function E(b){var d=g.pv,b=b.split(".");b[0]=parseInt(b[0],10);b[1]=parseInt(b[1],10)||0;b[2]=parseInt(b[2],10)||0;return d[0]>b[0]||d[0]==b[0]&&d[1]>b[1]||d[0]==b[0]&&d[1]==b[1]&&d[2]>=b[2]?true:false}function O(b,d,a,c){if(!g.ie||!g.mac){var h=f.getElementsByTagName("head")[0];if(h){a=a&&typeof a=="string"?a:"screen";c&&(K=r=null);if(!r||K!=a)c=f.createElement("style"),c.setAttribute("type","text/css"),c.setAttribute("media",a),r=h.appendChild(c),
g.ie&&g.win&&typeof f.styleSheets!=l&&f.styleSheets.length>0&&(r=f.styleSheets[f.styleSheets.length-1]),K=a;g.ie&&g.win?r&&typeof r.addRule==v&&r.addRule(b,d):r&&typeof f.createTextNode!=l&&r.appendChild(f.createTextNode(b+" {"+d+"}"))}}}function y(b,a){if(P){var f=a?"visible":"hidden";x&&p(b)?p(b).style.visibility=f:O("#"+b,"visibility:"+f)}}function Q(b){return/[\\\"<>\.;]/.exec(b)!=null&&typeof encodeURIComponent!=l?encodeURIComponent(b):b}var l="undefined",v="object",D="application/x-shockwave-flash",
M="SWFObjectExprInst",o=window,f=document,t=navigator,R=false,C=[function(){R?B():a()}],s=[],H=[],z=[],A,G,J,L,x=false,F=false,r,K,P=true,g=function(){var b=typeof f.getElementById!=l&&typeof f.getElementsByTagName!=l&&typeof f.createElement!=l,a=t.userAgent.toLowerCase(),j=t.platform.toLowerCase(),g=j?/win/.test(j):/win/.test(a),j=j?/mac/.test(j):/mac/.test(a),a=/webkit/.test(a)?parseFloat(a.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,h=!+"\u000b1",c=[0,0,0],e=null;if(typeof t.plugins!=l&&
typeof t.plugins["Shockwave Flash"]==v){if((e=t.plugins["Shockwave Flash"].description)&&!(typeof t.mimeTypes!=l&&t.mimeTypes[D]&&!t.mimeTypes[D].enabledPlugin))R=true,h=false,e=e.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),c[0]=parseInt(e.replace(/^(.*)\..*$/,"$1"),10),c[1]=parseInt(e.replace(/^.*\.(.*)\s.*$/,"$1"),10),c[2]=/[a-zA-Z]/.test(e)?parseInt(e.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}else if(typeof o.ActiveXObject!=l)try{var i=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(i&&(e=i.GetVariable("$version")))h=
true,e=e.split(" ")[1].split(","),c=[parseInt(e[0],10),parseInt(e[1],10),parseInt(e[2],10)]}catch(m){}return{w3:b,pv:c,wk:a,ie:h,win:g,mac:j}}();(function(){g.w3&&((typeof f.readyState!=l&&f.readyState=="complete"||typeof f.readyState==l&&(f.getElementsByTagName("body")[0]||f.body))&&i(),x||(typeof f.addEventListener!=l&&f.addEventListener("DOMContentLoaded",i,false),g.ie&&g.win&&(f.attachEvent("onreadystatechange",function(){f.readyState=="complete"&&(f.detachEvent("onreadystatechange",arguments.callee),
i())}),o==top&&function(){if(!x){try{f.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,0);return}i()}}()),g.wk&&function(){x||(/loaded|complete/.test(f.readyState)?i():setTimeout(arguments.callee,0))}(),n(i)))})();(function(){g.ie&&g.win&&window.attachEvent("onunload",function(){for(var b=z.length,a=0;a<b;a++)z[a][0].detachEvent(z[a][1],z[a][2]);b=H.length;for(a=0;a<b;a++)N(H[a]);for(var f in g)g[f]=null;g=null;for(var e in swfobject)swfobject[e]=null;swfobject=null})})();return{registerObject:function(b,
a,f,e){if(g.w3&&b&&a){var c={};c.id=b;c.swfVersion=a;c.expressInstall=f;c.callbackFn=e;s[s.length]=c;y(b,false)}else e&&e({success:false,id:b})},getObjectById:function(b){if(g.w3)return e(b)},embedSWF:function(b,a,e,f,h,i,k,o,p,n){var r={success:false,id:a};g.w3&&!(g.wk&&g.wk<312)&&b&&a&&e&&f&&h?(y(a,false),c(function(){e+="";f+="";var c={};if(p&&typeof p===v)for(var g in p)c[g]=p[g];c.data=b;c.width=e;c.height=f;g={};if(o&&typeof o===v)for(var s in o)g[s]=o[s];if(k&&typeof k===v)for(var t in k)typeof g.flashvars!=
l?g.flashvars+="&"+t+"="+k[t]:g.flashvars=t+"="+k[t];if(E(h))s=I(c,g,a),c.id==a&&y(a,true),r.success=true,r.ref=s;else if(i&&m()){c.data=i;u(c,g,a,n);return}else y(a,true);n&&n(r)})):n&&n(r)},switchOffAutoHideShow:function(){P=false},ua:g,getFlashPlayerVersion:function(){return{major:g.pv[0],minor:g.pv[1],release:g.pv[2]}},hasFlashPlayerVersion:E,createSWF:function(a,d,c){if(g.w3)return I(a,d,c)},showExpressInstall:function(a,d,c,e){g.w3&&m()&&u(a,d,c,e)},removeSWF:function(a){g.w3&&N(a)},createCSS:function(a,
d,c,e){g.w3&&O(a,d,c,e)},addDomLoadEvent:c,addLoadEvent:n,getQueryParamValue:function(a){var d=f.location.search||f.location.hash;if(d){/\?/.test(d)&&(d=d.split("?")[1]);if(a==null)return Q(d);for(var d=d.split("&"),c=0;c<d.length;c++)if(d[c].substring(0,d[c].indexOf("="))==a)return Q(d[c].substring(d[c].indexOf("=")+1))}return""},expressInstallCallback:function(){if(F){var a=p(M);if(a&&A){a.parentNode.replaceChild(A,a);if(G&&(y(G,true),g.ie&&g.win))A.style.display="block";J&&J(L)}F=false}}}}();