!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=30)}([function(e,t,n){e.exports=n(12)},function(e,t,n){"use strict";var r=n(2),s=n(13),o=Object.prototype.toString;function a(e){return"[object Array]"===o.call(e)}function i(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===o.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:s,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:i,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return i(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:u,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,s=arguments.length;r<s;r++)u(arguments[r],n);return t},deepMerge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]="object"==typeof n?e({},n):n}for(var r=0,s=arguments.length;r<s;r++)u(arguments[r],n);return t},extend:function(e,t,n){return u(t,(function(t,s){e[s]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(1);function s(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var o;if(n)o=n(t);else if(r.isURLSearchParams(t))o=t.toString();else{var a=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(s(t)+"="+s(e))})))})),o=a.join("&")}if(o){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";(function(t){var r=n(1),s=n(19),o={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var i,c={adapter:(void 0!==t&&"[object process]"===Object.prototype.toString.call(t)?i=n(6):"undefined"!=typeof XMLHttpRequest&&(i=n(6)),i),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(o)})),e.exports=c}).call(this,n(18))},function(e,t,n){"use strict";var r=n(1),s=n(20),o=n(3),a=n(22),i=n(23),c=n(7);e.exports=function(e){return new Promise((function(t,u){var l=e.data,d=e.headers;r.isFormData(l)&&delete d["Content-Type"];var f=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",h=e.auth.password||"";d.Authorization="Basic "+btoa(p+":"+h)}if(f.open(e.method.toUpperCase(),o(e.url,e.params,e.paramsSerializer),!0),f.timeout=e.timeout,f.onreadystatechange=function(){if(f&&4===f.readyState&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in f?a(f.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?f.response:f.responseText,status:f.status,statusText:f.statusText,headers:n,config:e,request:f};s(t,u,r),f=null}},f.onabort=function(){f&&(u(c("Request aborted",e,"ECONNABORTED",f)),f=null)},f.onerror=function(){u(c("Network Error",e,null,f)),f=null},f.ontimeout=function(){u(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",f)),f=null},r.isStandardBrowserEnv()){var m=n(24),v=(e.withCredentials||i(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v)}if("setRequestHeader"in f&&r.forEach(d,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete d[t]:f.setRequestHeader(t,e)})),e.withCredentials&&(f.withCredentials=!0),e.responseType)try{f.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&f.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){f&&(f.abort(),u(e),f=null)})),void 0===l&&(l=null),f.send(l)}))}},function(e,t,n){"use strict";var r=n(21);e.exports=function(e,t,n,s,o){var a=new Error(e);return r(a,t,n,s,o)}},function(e,t,n){"use strict";var r=n(1);e.exports=function(e,t){t=t||{};var n={};return r.forEach(["url","method","params","data"],(function(e){void 0!==t[e]&&(n[e]=t[e])})),r.forEach(["headers","auth","proxy"],(function(s){r.isObject(t[s])?n[s]=r.deepMerge(e[s],t[s]):void 0!==t[s]?n[s]=t[s]:r.isObject(e[s])?n[s]=r.deepMerge(e[s]):void 0!==e[s]&&(n[s]=e[s])})),r.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],(function(r){void 0!==t[r]?n[r]=t[r]:void 0!==e[r]&&(n[r]=e[r])})),n}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t){const n=document.querySelector(".allusers");t.renderusers=e=>{let t,r=0;e.forEach(e=>{if(r%2!=0){const r=`\n   <div class="card allusersss"  style="width: 40rem;">\n   \n   <img src="http://localhost:3000/images/logim-pic.png" style="height:10rem;width:10rem" class="card-img-top c1" alt="..." />\n   <div class="card-body">\n     <h5 class="card-title c1">User's Bio</h5>\n     <p class="card-text c1">\n       Some quick example text to build on the card title and make up the\n       bulk of the card's content.\n     </p>\n   </div>\n   <ul class="list-group list-group-flush">\n     <li class="list-group-item b1" >${e.name}</li>\n     <li class="list-group-item b1">${e.email}</li>\n     <li class="list-group-item b1">${e.usertype}</li>\n   </ul>\n   <div class="card-body">\n   <a href="#sendmsg" class="btn button-success c1">send message</a>\n     <a href="#" class="card-link c1">view user's profile</a>\n   </div>\n  \n </div>\n <div class="card allusersss"  style="width: 40rem;">\n   \n   <img src="http://localhost:3000/images/logim-pic.png" style="height:10rem;width:10rem" class="card-img-top c1" alt="..." />\n   <div class="card-body">\n     <h5 class="card-title c1">User's Bio</h5>\n     <p class="card-text c1">\n       Some quick example text to build on the card title and make up the\n       bulk of the card's content.\n     </p>\n   </div>\n   <ul class="list-group list-group-flush">\n     <li class="list-group-item b1" >${t.name}</li>\n     <li class="list-group-item b1">${t.email}</li>\n     <li class="list-group-item b1">${t.usertype}</li>\n   </ul>\n   <div class="card-body">\n   <a href="#sendmsg" class="btn button-success c1">send message</a>\n   <a href="#" class="card-link c1">view user's profile</a>\n   </div>\n   \n </div>\n\n <div class="clearfix"></div>\n    `;n.insertAdjacentHTML("beforeend",r)}else t=e;r+=1})}},function(e,t){const n=document.querySelector(".profile");t.renderuser=e=>{const t=`\n      <div class="card mb-3" style="max-width: 540px;">\n      <div class="row no-gutters">\n        <div class="col-md-4">\n          <img src="http://localhost:3000/images/logim-pic.png" class="card-img" alt="...">\n        </div>\n        <div class="col-md-8">\n          <div class="card-body ">\n            <h5 class="card-title t1">${e.name}</h5>\n            <p class="card-text t1">${e.about}</p>\n            <p class="card-text t1">${e.year}</p>\n            <p class="card-text t1">${e.branch}</p>\n          </div>\n        </div>\n      </div>\n    \n    </div>\n    `;n.insertAdjacentHTML("beforeend",t)}},function(e,t,n){"use strict";var r=n(1),s=n(2),o=n(14),a=n(8);function i(e){var t=new o(e),n=s(o.prototype.request,t);return r.extend(n,o.prototype,t),r.extend(n,t),n}var c=i(n(5));c.Axios=o,c.create=function(e){return i(a(c.defaults,e))},c.Cancel=n(9),c.CancelToken=n(27),c.isCancel=n(4),c.all=function(e){return Promise.all(e)},c.spread=n(28),e.exports=c,e.exports.default=c},function(e,t){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,t,n){"use strict";var r=n(1),s=n(3),o=n(15),a=n(16),i=n(8);function c(e){this.defaults=e,this.interceptors={request:new o,response:new o}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=i(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=i(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(r.merge(n||{},{method:e,url:t}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,s){return this.request(r.merge(s||{},{method:e,url:t,data:n}))}})),e.exports=c},function(e,t,n){"use strict";var r=n(1);function s(){this.handlers=[]}s.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},s.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},s.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=s},function(e,t,n){"use strict";var r=n(1),s=n(17),o=n(4),a=n(5),i=n(25),c=n(26);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!i(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return u(e),t.data=s(t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(u(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var r=n(1);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},function(e,t){var n,r,s=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function i(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(e){n=o}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,u=[],l=!1,d=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):d=-1,u.length&&p())}function p(){if(!l){var e=i(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++d<t;)c&&c[d].run();d=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new h(e,t)),1!==u.length||l||i(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=m,s.addListener=m,s.once=m,s.off=m,s.removeListener=m,s.removeAllListeners=m,s.emit=m,s.prependListener=m,s.prependOnceListener=m,s.listeners=function(e){return[]},s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(1);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){"use strict";var r=n(7);e.exports=function(e,t,n){var s=n.config.validateStatus;!s||s(n.status)?e(n):t(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,s){return e.config=t,n&&(e.code=n),e.request=r,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(1),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,o,a={};return e?(r.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t){if(a[t]&&s.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}})),a):a}},function(e,t,n){"use strict";var r=n(1);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function s(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=s(window.location.href),function(t){var n=r.isString(t)?s(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(1);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,s,o,a){var i=[];i.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),r.isString(s)&&i.push("path="+s),r.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(9);function s(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}s.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},s.source=function(){var e;return{token:new s((function(t){e=t})),cancel:e}},e.exports=s},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t){const n=e=>(t,n,r)=>{e(t,n,r).catch(r)};t.home=n(async(e,t,n)=>{t.status(200).render("home.pug",{title:"justcode"})}),t.login=n(async(e,t,n)=>{t.status(200).render("login",{title:"justcode  | login"})}),t.signup=n(async(e,t,n)=>{t.status(200).render("signup",{title:"justcode | signup"})}),t.users=n(async(e,t,n)=>{t.status(200).render("users.html",{title:"justcode | users"})}),t.updateuser=n(async(e,t,n)=>{t.status(200).render("user.html",{title:"justcode | user"})})},function(e,t,n){"use strict";n.r(t);var r=n(0),s=n.n(r);const o=document.querySelector(".head1"),a=(e,t,n)=>{((e,t,n)=>{const r=`\n    <div class="row">\n    <div class="col-1-of-3">\n            <div class="card">\n                <div class="card__side card__side-front card__side-front-1">\n                    <div class="card__heading">\n                        <span class="card__heading-span card__heading-span-1">\n                        ${e.data.title}\n                        </span>\n                    </div>\n                <div class="card__details">\n                    <ul>\n                        <li>${e.data.type}</li>\n                        <li>${e.data.by}</li>\n                    </ul>\n                </div>\n            </div>\n                <div class="card__side card__side-back card__side-back-1">\n                    <div class="card__cta">\n                        <div class="card__price-box">\n                            <a href="${e.data.url}" class="btn btn--white">see full article</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n    </div>\n    <div class="col-1-of-3">\n            <div class="card">\n                <div class="card__side card__side-front card__side-front-2">\n                    <div class="card__heading">\n                        <span class="card__heading-span card__heading-span-1">\n                        ${t.data.title}\n                        </span>\n                    </div>\n                <div class="card__details">\n                    <ul>\n                        <li>${t.data.type}</li>\n                        <li>${t.data.by}</li>\n                    </ul>\n                </div>\n            </div>\n                <div class="card__side card__side-back card__side-back-2">\n                    <div class="card__cta">\n                        <div class="card__price-box">\n                            <a href="${t.data.url}" class="btn btn--white">see full article</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n    </div>\n    <div class="col-1-of-3">\n            <div class="card">\n                <div class="card__side card__side-front card__side-front-3">\n                    <div class="card__heading">\n                        <span class="card__heading-span card__heading-span-1">\n                        ${n.data.title}\n                        </span>\n                    </div>\n                <div class="card__details">\n                    <ul>\n                        <li>${n.data.type}</li>\n                        <li>${n.data.by}</li>\n                    </ul>\n                </div>\n            </div>\n                <div class="card__side card__side-back card__side-back-3">\n                    <div class="card__cta">\n                        <div class="card__price-box">\n                            <a href="${n.data.url}" class="btn btn--white">see full article</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n    </div>\n    </div>\n    `;o.insertAdjacentHTML("beforeend",r)})(e,t,n)};var i=n(10),c=n(11);class u{constructor(){}async getblogs(){try{const e=await s()("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");console.log(e.data),this.result=e.data}catch(e){console.log(e)}}}class l{constructor(){}async getusers(){try{const e=await s()({method:"GET",url:"https://cors-anywhere.herokuapp.com/http://localhost:3000/api/v1/users/allusers"});this.result=e.data}catch(e){console.log("error")}}}class d{constructor(){}async getuser(){try{const e=await s()({method:"GET",url:"http://localhost:3000/api/v1/users/viewuser"});this.result=e.data}catch(e){console.log("error")}}}n(29);const f=document.querySelector(".login-form"),p=document.querySelector(".allusers"),h=document.querySelector(".profile"),m=document.querySelector(".signup-form"),v=document.querySelector(".head1");f&&f.addEventListener("submit",e=>{e.preventDefault(),(async(e,t)=>{try{if("success"===(await s()({method:"POST",url:"http://localhost:3000/api/v1/users/signin",data:{email:e,password:t}})).data.status)io().emit("join",{mail:e}),alert("you are logged in")}catch(e){console.log("error")}})(document.getElementById("email").value,document.getElementById("password").value)}),m&&m.addEventListener("submit",e=>{e.preventDefault(),(async(e,t,n,r)=>{try{"success"===(await s()({method:"POST",url:"http://localhost:3000/api/v1/users/signup",data:{name:e,email:t,password:n,passmatch:r}})).data.status&&alert("you are signed up")}catch(e){console.log("error")}})(document.getElementById("name").value,document.getElementById("email").value,document.getElementById("password").value,document.getElementById("passwordmatch").value)});if(v){(async e=>{await e.getblogs();try{const e=await s()("https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/22175019.json?print=pretty"),t=await s()("https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/21260214.json?print=pretty"),n=await s()("https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/21260364.json?print=pretty");console.log(e),console.log(t),console.log(n),console.log("test"),a(e,t,n)}catch(e){console.log(e)}})(new u)}if(p){(async e=>{try{await e.getusers(),console.log(e.result.data),i.renderusers(e.result.data.users)}catch(e){console.log(e)}})(new l)}if(h){console.log("kbh"),(async e=>{try{await e.getuser(),console.log(e.result.data),c.renderuser(e.result.data.user)}catch(e){console.log(e)}})(new d)}}]);