const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-CaM13K6h.js","assets/vendor-Cg3t72uT.js","assets/firebase-DOVT3bkn.js","assets/logo-BWROdrKM.js","assets/utils-CrM1Z76V.js","assets/Admin-Bj9XX_i9.js","assets/Leaderboard-WI6iSbs2.js","assets/HeroOrZero-FEwWa30I.js"])))=>i.map(i=>d[i]);
import{r as e,a as t,R as n,L as r,b as s,d as i,B as o}from"./vendor-Cg3t72uT.js";import{p as a}from"./utils-CrM1Z76V.js";import{L as c,g as l,i as u,a as d,_ as h,C as p,r as f,b as m,S as g,E as y,c as w,d as v,e as b,f as _,h as k,F as E,j as T,q as I,k as S,l as x,m as R,n as O,o as N,p as P,u as C,s as A,t as j,v as L,w as D,x as U,y as M,z as F,A as B,B as V,D as H,G as $,H as z,I as W,J as q,K,M as J,N as G}from"./firebase-DOVT3bkn.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var X={exports:{}},Y={},Q=e,Z=Symbol.for("react.element"),ee=Symbol.for("react.fragment"),te=Object.prototype.hasOwnProperty,ne=Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,re={key:!0,ref:!0,__self:!0,__source:!0};function se(e,t,n){var r,s={},i=null,o=null;for(r in void 0!==n&&(i=""+n),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(o=t.ref),t)te.call(t,r)&&!re.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===s[r]&&(s[r]=t[r]);return{$$typeof:Z,type:e,key:i,ref:o,props:s,_owner:ne.current}}Y.Fragment=ee,Y.jsx=se,Y.jsxs=se,X.exports=Y;var ie=X.exports,oe={},ae=t;oe.createRoot=ae.createRoot,oe.hydrateRoot=ae.hydrateRoot;const ce={},le=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),n=(null==e?void 0:e.nonce)||(null==e?void 0:e.getAttribute("nonce"));r=Promise.allSettled(t.map(e=>{if((e=function(e){return"/"+e}(e))in ce)return;ce[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":"modulepreload",t||(s.as="script"),s.crossOrigin="",s.href=e,n&&s.setAttribute("nonce",n),document.head.appendChild(s),t?new Promise((t,n)=>{s.addEventListener("load",t),s.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}function s(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(const e of t||[])"rejected"===e.status&&s(e.reason);return e().catch(s)})};var ue,de={},he={exports:{}};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
ue=he,function(){var e={}.hasOwnProperty;function t(){for(var e="",t=0;t<arguments.length;t++){var s=arguments[t];s&&(e=r(e,n(s)))}return e}function n(n){if("string"==typeof n||"number"==typeof n)return n;if("object"!=typeof n)return"";if(Array.isArray(n))return t.apply(null,n);if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]"))return n.toString();var s="";for(var i in n)e.call(n,i)&&n[i]&&(s=r(s,i));return s}function r(e,t){return t?e?e+" "+t:e+t:e}ue.exports?(t.default=t,ue.exports=t):window.classNames=t}();var pe=he.exports,fe={};Object.defineProperty(fe,"__esModule",{value:!0});var me,ge=(me=e)&&me.__esModule?me:{default:me};fe.default=function(){return ge.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},ge.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))};var ye={};Object.defineProperty(ye,"__esModule",{value:!0});var we=function(e){return e&&e.__esModule?e:{default:e}}(e);ye.default=function(){return we.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},we.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))};var ve={};Object.defineProperty(ve,"__esModule",{value:!0}),ve.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var n=t[0];return{x:n.clientX,y:n.clientY}}var r=e.pageX;if(void 0!==r)return{x:r,y:e.pageY}}return{x:0,y:0}},Object.defineProperty(de,"__esModule",{value:!0});var be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),ke=e,Ee=Oe(ke),Te=Oe(pe),Ie=Oe(a),Se=Oe(fe),xe=Oe(ye),Re=ve;function Oe(e){return e&&e.__esModule?e:{default:e}}var Ne=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.handleClick=n.handleClick.bind(n),n.handleTouchStart=n.handleTouchStart.bind(n),n.handleTouchMove=n.handleTouchMove.bind(n),n.handleTouchEnd=n.handleTouchEnd.bind(n),n.handleFocus=n.handleFocus.bind(n),n.handleBlur=n.handleBlur.bind(n),n.previouslyChecked=!(!t.checked&&!t.defaultChecked),n.state={checked:!(!t.checked&&!t.defaultChecked),hasFocus:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(e,ke.PureComponent),_e(e,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){if(!this.props.disabled){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var n=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:n})}}},{key:"handleTouchStart",value:function(e){this.props.disabled||(this.startX=(0,Re.pointerCoord)(e).x,this.activated=!0)}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,Re.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var n=(0,Re.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>n?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<n&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(t){var n=this.props.icons;return n?void 0===n[t]?e.defaultProps.icons[t]:n[t]:null}},{key:"render",value:function(){var e=this,t=this.props,n=t.className;t.icons;var r=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["className","icons"]),s=(0,Te.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},n);return Ee.default.createElement("div",{className:s,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},Ee.default.createElement("div",{className:"react-toggle-track"},Ee.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),Ee.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),Ee.default.createElement("div",{className:"react-toggle-thumb"}),Ee.default.createElement("input",be({},r,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),e}(),Pe=de.default=Ne;Ne.displayName="Toggle",Ne.defaultProps={icons:{checked:Ee.default.createElement(Se.default,null),unchecked:Ee.default.createElement(xe.default,null)}},Ne.propTypes={checked:Ie.default.bool,disabled:Ie.default.bool,defaultChecked:Ie.default.bool,onChange:Ie.default.func,onFocus:Ie.default.func,onBlur:Ie.default.func,className:Ie.default.string,name:Ie.default.string,value:Ie.default.string,id:Ie.default.string,"aria-labelledby":Ie.default.string,"aria-label":Ie.default.string,icons:Ie.default.oneOfType([Ie.default.bool,Ie.default.shape({checked:Ie.default.node,unchecked:Ie.default.node})])};const Ce=()=>{const[t,n]=e.useState(()=>{if("undefined"!=typeof window){return"light"!==localStorage.getItem("theme")}return!0});return e.useEffect(()=>{t?(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"))},[t]),ie.jsxs("label",{className:"flex items-center cursor-pointer",children:[ie.jsx("span",{className:"mr-2",children:t?ie.jsx("svg",{className:"w-5 h-5 text-gray-300",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:ie.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"})}):ie.jsx("svg",{className:"w-5 h-5 text-yellow-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:ie.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"})})}),ie.jsx(Pe,{className:"react-toggle",checked:t,onChange:()=>n(!t),icons:!1})]})},Ae=()=>(e.useEffect(()=>{const e=["/memes/beanzie_this_is_fine.webp","/memes/drake_wiggles.webp","/memes/other_women.webp","/memes/ivanova_squint_template.webp"].map(e=>new Promise((t,n)=>{const r=new Image;r.onload=t,r.onerror=n,r.src=e}));if(Promise.allSettled(e).then(e=>{e.filter(e=>"fulfilled"===e.status).length}),!window.fabric){const e=document.createElement("script");e.src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js",e.async=!0,e.onload=()=>{},document.head.appendChild(e)}},[]),null);function je(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(e);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(n[r[s]]=e[r[s]])}return n}function Le(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}"function"==typeof SuppressedError&&SuppressedError;const De=Le,Ue=new y("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),Me=new c("@firebase/auth");function Fe(e,...t){Me.logLevel<=k.ERROR&&Me.error(`Auth (${g}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(e,...t){throw ze(e,...t)}function Ve(e,...t){return ze(e,...t)}function He(e,t,n){const r=Object.assign(Object.assign({},De()),{[t]:n});return new y("auth","Firebase",r).create(t,{appName:e.name})}function $e(e){return He(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ze(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return Ue.create(e,...t)}function We(e,t,...n){if(!e)throw ze(t,...n)}function qe(e){const t="INTERNAL ASSERTION FAILED: "+e;throw Fe(t),new Error(t)}function Ke(e,t){e||qe(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function Ge(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==Ge()&&"https:"!==Ge()&&!m()&&!("connection"in navigator)||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ye{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ke(t>e,"Short delay should be less than long delay!"),this.isMobile=u()||d()}get(){return Xe()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(e,t){Ke(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void qe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void qe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void qe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},tt=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],nt=new Ye(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function st(e,t,n,r,s={}){return it(e,s,async()=>{let s={},i={};r&&("GET"===t?i=r:s={body:JSON.stringify(r)});const o=I(Object.assign({key:e.config.apiKey},i)).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c=Object.assign({method:t,headers:a},s);return U()||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&S(e.emulatorConfig.host)&&(c.credentials="include"),Ze.fetch()(await at(e,e.config.apiHost,n,o),c)})}async function it(e,t,n){e._canInitEmulator=!1;const r=Object.assign(Object.assign({},et),t);try{const t=new lt(e),s=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const i=await s.json();if("needConfirmation"in i)throw ut(e,"account-exists-with-different-credential",i);if(s.ok&&!("errorMessage"in i))return i;{const t=s.ok?i.errorMessage:i.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw ut(e,"credential-already-in-use",i);if("EMAIL_EXISTS"===n)throw ut(e,"email-already-in-use",i);if("USER_DISABLED"===n)throw ut(e,"user-disabled",i);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw He(e,a,o);Be(e,a)}}catch(s){if(s instanceof E)throw s;Be(e,"network-request-failed",{message:String(s)})}}async function ot(e,t,n,r,s={}){const i=await st(e,t,n,r,s);return"mfaPendingCredential"in i&&Be(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function at(e,t,n,r){const s=`${t}${n}?${r}`,i=e,o=i.config.emulator?Qe(e.config,s):`${e.config.apiScheme}://${s}`;if(tt.includes(n)&&(await i._persistenceManagerAvailable,"COOKIE"===i._getPersistenceType())){return i._getPersistence()._getFinalTarget(o).toString()}return o}function ct(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class lt{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(Ve(this.auth,"network-request-failed")),nt.get())})}}function ut(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Ve(e,t,r);return s.customData._tokenResponse=n,s}function dt(e){return void 0!==e&&void 0!==e.enterprise}class ht{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ct(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function pt(e,t){return st(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function mt(e){return 1e3*Number(e)}function gt(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return Fe("JWT malformed, contained fewer than 3 sections"),null;try{const e=T(n);return e?JSON.parse(e):(Fe("Failed to decode base64 JWT payload"),null)}catch(s){return Fe("Caught error parsing JWT payload as JSON",null==s?void 0:s.toString()),null}}function yt(e){const t=gt(e);return We(t,"internal-error"),We(void 0!==t.exp,"internal-error"),We(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wt(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof E&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}class vt{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ft(this.lastLoginAt),this.creationTime=ft(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _t(e){var t;const n=e.auth,r=await e.getIdToken(),s=await wt(e,pt(n,{idToken:r}));We(null==s?void 0:s.users.length,n,"internal-error");const i=s.users[0];e._notifyReloadListener(i);const o=(null===(t=i.providerUserInfo)||void 0===t?void 0:t.length)?kt(i.providerUserInfo):[],a=(c=e.providerData,l=o,[...c.filter(e=>!l.some(t=>t.providerId===e.providerId)),...l]);var c,l;const u=e.isAnonymous,d=!(e.email&&i.passwordHash||(null==a?void 0:a.length)),h=!!u&&d,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new bt(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(e,p)}function kt(e){return e.map(e=>{var{providerId:t}=e,n=je(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Et{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){We(e.idToken,"internal-error"),We(void 0!==e.idToken,"internal-error"),We(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):yt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){We(0!==e.length,"internal-error");const t=yt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(We(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:s}=await async function(e,t){const n=await it(e,{},async()=>{const n=I({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,i=await at(e,r,"/v1/token",`key=${s}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&S(e.emulatorConfig.host)&&(a.credentials="include"),Ze.fetch()(i,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:s}=t,i=new Et;return n&&(We("string"==typeof n,"internal-error",{appName:e}),i.refreshToken=n),r&&(We("string"==typeof r,"internal-error",{appName:e}),i.accessToken=r),s&&(We("number"==typeof s,"internal-error",{appName:e}),i.expirationTime=s),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Et,this.toJSON())}_performRefresh(){return qe("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(e,t){We("string"==typeof e||void 0===e,"internal-error",{appName:t})}class It{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,s=je(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new bt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await wt(this,this.stsTokenManager.getToken(this.auth,e));return We(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=v(e),r=await n.getIdToken(t),s=gt(r);We(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i="object"==typeof s.firebase?s.firebase:void 0,o=null==i?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ft(mt(s.auth_time)),issuedAtTime:ft(mt(s.iat)),expirationTime:ft(mt(s.exp)),signInProvider:o||null,signInSecondFactor:(null==i?void 0:i.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=v(e);await _t(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(We(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new It(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){We(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await _t(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(w(this.auth.app))return Promise.reject($e(this.auth));const e=await this.getIdToken();return await wt(this,
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){return st(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,s,i,o,a,c,l;const u=null!==(n=t.displayName)&&void 0!==n?n:void 0,d=null!==(r=t.email)&&void 0!==r?r:void 0,h=null!==(s=t.phoneNumber)&&void 0!==s?s:void 0,p=null!==(i=t.photoURL)&&void 0!==i?i:void 0,f=null!==(o=t.tenantId)&&void 0!==o?o:void 0,m=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,g=null!==(c=t.createdAt)&&void 0!==c?c:void 0,y=null!==(l=t.lastLoginAt)&&void 0!==l?l:void 0,{uid:w,emailVerified:v,isAnonymous:b,providerData:_,stsTokenManager:k}=t;We(w&&k,e,"internal-error");const E=Et.fromJSON(this.name,k);We("string"==typeof w,e,"internal-error"),Tt(u,e.name),Tt(d,e.name),We("boolean"==typeof v,e,"internal-error"),We("boolean"==typeof b,e,"internal-error"),Tt(h,e.name),Tt(p,e.name),Tt(f,e.name),Tt(m,e.name),Tt(g,e.name),Tt(y,e.name);const T=new It({uid:w,auth:e,email:d,emailVerified:v,displayName:u,isAnonymous:b,photoURL:p,phoneNumber:h,tenantId:f,stsTokenManager:E,createdAt:g,lastLoginAt:y});return _&&Array.isArray(_)&&(T.providerData=_.map(e=>Object.assign({},e))),m&&(T._redirectEventId=m),T}static async _fromIdTokenResponse(e,t,n=!1){const r=new Et;r.updateFromServerResponse(t);const s=new It({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await _t(s),s}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];We(void 0!==r.localId,"internal-error");const s=void 0!==r.providerUserInfo?kt(r.providerUserInfo):[],i=!(r.email&&r.passwordHash||(null==s?void 0:s.length)),o=new Et;o.updateFromIdToken(n);const a=new It({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:i}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new bt(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||(null==s?void 0:s.length))};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=new Map;function xt(e){Ke(e instanceof Function,"Expected a class definition");let t=St.get(e);return t?(Ke(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,St.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Rt.type="NONE";const Ot=Rt;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(e,t,n){return`firebase:${e}:${t}:${n}`}class Pt{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:s}=this.auth;this.fullUserKey=Nt(this.userKey,r.apiKey,s),this.fullPersistenceKey=Nt("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await pt(this.auth,{idToken:e}).catch(()=>{});return t?It._fromGetAccountInfoResponse(this.auth,t,e):null}return It._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Pt(xt(Ot),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let s=r[0]||xt(Ot);const i=Nt(n,e.config.apiKey,e.name);let o=null;for(const l of t)try{const t=await l._get(i);if(t){let n;if("string"==typeof t){const r=await pt(e,{idToken:t}).catch(()=>{});if(!r)break;n=await It._fromGetAccountInfoResponse(e,r,t)}else n=It._fromJSON(e,t);l!==s&&(o=n),s=l;break}}catch(c){}const a=r.filter(e=>e._shouldAllowMigration);return s._shouldAllowMigration&&a.length?(s=a[0],o&&await s._set(i,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==s)try{await e._remove(i)}catch(c){}})),new Pt(s,e,n)):new Pt(s,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Dt(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(At(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Mt(t))return"Blackberry";if(Ft(t))return"Webos";if(jt(t))return"Safari";if((t.includes("chrome/")||Lt(t))&&!t.includes("edge/"))return"Chrome";if(Ut(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function At(e=b()){return/firefox\//i.test(e)}function jt(e=b()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Lt(e=b()){return/crios\//i.test(e)}function Dt(e=b()){return/iemobile/i.test(e)}function Ut(e=b()){return/android/i.test(e)}function Mt(e=b()){return/blackberry/i.test(e)}function Ft(e=b()){return/webos/i.test(e)}function Bt(e=b()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Vt(e=b()){return Bt(e)||Ut(e)||Ft(e)||Mt(e)||/windows phone/i.test(e)||Dt(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(e,t=[]){let n;switch(e){case"Browser":n=Ct(b());break;case"Worker":n=`${Ct(b())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${g}/${r}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(s){r(s)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==n?void 0:n.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){var t,n,r,s;const i=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=i.minPasswordLength)&&void 0!==t?t:6,i.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=i.maxPasswordLength),void 0!==i.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=i.containsLowercaseCharacter),void 0!==i.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=i.containsUppercaseCharacter),void 0!==i.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=i.containsNumericCharacter),void 0!==i.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=i.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(r=null===(n=e.allowedNonAlphanumericCharacters)||void 0===n?void 0:n.join(""))&&void 0!==r?r:"",this.forceUpgradeOnSignin=null!==(s=e.forceUpgradeOnSignin)&&void 0!==s&&s,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,r,s,i,o;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=null===(t=a.meetsMinPasswordLength)||void 0===t||t),a.isValid&&(a.isValid=null===(n=a.meetsMaxPasswordLength)||void 0===n||n),a.isValid&&(a.isValid=null===(r=a.containsLowercaseLetter)||void 0===r||r),a.isValid&&(a.isValid=null===(s=a.containsUppercaseLetter)||void 0===s||s),a.isValid&&(a.isValid=null===(i=a.containsNumericCharacter)||void 0===i||i),a.isValid&&(a.isValid=null===(o=a.containsNonAlphanumericCharacter)||void 0===o||o),a}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kt(this),this.idTokenSubscription=new Kt(this),this.beforeStateQueue=new $t(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ue,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=xt(t)),this._initializationPromise=this.queue(async()=>{var n,r,s;if(!this._deleted&&(this.persistenceManager=await Pt.create(this,e),null===(n=this._resolvePersistenceManagerAvailable)||void 0===n||n.call(this),!this._deleted)){if(null===(r=this._popupRedirectResolver)||void 0===r?void 0:r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(i){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(s=this.currentUser)||void 0===s?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await pt(this,{idToken:e}),n=await It._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(w(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,i=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==i||!(null==o?void 0:o.user)||(r=o.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return We(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await _t(e)}catch(t){if("auth/network-request-failed"!==(null==t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(w(this.app))return Promise.reject($e(this));const t=e?v(e):null;return t&&We(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&We(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return w(this.app)?Promise.reject($e(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return w(this.app)?Promise.reject($e(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(xt(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return st(e,"GET","/v2/passwordPolicy",rt(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this),t=new zt(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new y("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return st(e,"POST","/v2/accounts:revokeToken",rt(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&xt(e)||this._popupRedirectResolver;We(t,this,"argument-error"),this.redirectPersistenceManager=await Pt.create(this,[xt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const s="function"==typeof t?t:t.next.bind(t);let i=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(We(o,this,"internal-error"),o.then(()=>{i||s(this.currentUser)}),"function"==typeof t){const s=e.addObserver(t,n,r);return()=>{i=!0,s()}}{const n=e.addObserver(t);return()=>{i=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return We(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ht(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(w(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await(null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){Me.logLevel<=k.WARN&&Me.warn(`Auth (${g}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function qt(e){return v(e)}class Kt{constructor(e){this.auth=e,this.observer=null,this.addObserver=_(e=>this.observer=e)}get next(){return We(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jt={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Gt(e){return Jt.loadJS(e)}class Xt{constructor(){this.enterprise=new Yt}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Yt{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Qt="NO_RECAPTCHA";class Zt{constructor(e){this.type="recaptcha-enterprise",this.auth=qt(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{(async function(e,t){return st(e,"GET","/v2/recaptchaConfig",rt(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new ht(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const s=window.grecaptcha;dt(s)?s.enterprise.ready(()=>{s.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(Qt)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new Xt).execute("siteKey",{action:"verify"})}return new Promise((e,s)=>{n(this.auth).then(n=>{if(!t&&dt(window.grecaptcha))r(n,e,s);else{if("undefined"==typeof window)return void s(new Error("RecaptchaVerifier is only supported in browser"));let t=Jt.recaptchaEnterpriseScript;0!==t.length&&(t+=n),Gt(t).then(()=>{r(n,e,s)}).catch(e=>{s(e)})}}).catch(e=>{s(e)})})}}async function en(e,t,n,r=!1,s=!1){const i=new Zt(e);let o;if(s)o=Qt;else try{o=await i.verify(n)}catch(c){o=await i.verify(n,!0)}const a=Object.assign({},t);if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function tn(e,t,n,r,s){var i;if(null===(i=e._getRecaptchaConfig())||void 0===i?void 0:i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await en(e,t,n,"getOobCode"===n);return r(e,s)}return r(e,t).catch(async s=>{if("auth/missing-recaptcha-token"===s.code){const s=await en(e,t,n,"getOobCode"===n);return r(e,s)}return Promise.reject(s)})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(e,t,n){const r=qt(e);We(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=rn(t),{host:i,port:o}=function(e){const t=rn(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const e=s[1];return{host:e,port:sn(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:sn(t)}}}(t),a=null===o?"":`:${o}`,c={url:`${s}//${i}${a}/`},l=Object.freeze({host:i,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!r._canInitEmulator)return We(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void We(N(c,r.config.emulator)&&N(l,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=c,r.emulatorConfig=l,r.settings.appVerificationDisabledForTesting=!0,S(i)?(P(`${s}//${i}${a}`),C("Auth",!0)):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&console.info;"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function rn(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function sn(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class on{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return qe("not implemented")}_getIdTokenResponse(e){return qe("not implemented")}_linkToIdToken(e,t){return qe("not implemented")}_getReauthenticationResolver(e){return qe("not implemented")}}async function an(e,t){return st(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cn(e,t){return ot(e,"POST","/v1/accounts:signInWithPassword",rt(e,t))}async function ln(e,t){return async function(e,t){return st(e,"POST","/v1/accounts:sendOobCode",rt(e,t))}(e,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class un extends on{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new un(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new un(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return tn(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",cn);case"emailLink":return async function(e,t){return ot(e,"POST","/v1/accounts:signInWithEmailLink",rt(e,t))}(e,{email:this._email,oobCode:this._password});default:Be(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return tn(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",an);case"emailLink":return async function(e,t){return ot(e,"POST","/v1/accounts:signInWithEmailLink",rt(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:Be(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dn(e,t){return ot(e,"POST","/v1/accounts:signInWithIdp",rt(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends on{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new hn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Be("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,s=je(t,["providerId","signInMethod"]);if(!n||!r)return null;const i=new hn(n,r);return i.idToken=s.idToken||void 0,i.accessToken=s.accessToken||void 0,i.secret=s.secret,i.nonce=s.nonce,i.pendingToken=s.pendingToken||null,i}_getIdTokenResponse(e){return dn(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,dn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,dn(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=I(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e){var t,n,r,s,i,o;const a=L(D(e)),c=null!==(t=a.apiKey)&&void 0!==t?t:null,l=null!==(n=a.oobCode)&&void 0!==n?n:null,u=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=a.mode)&&void 0!==r?r:null);We(c&&l&&u,"argument-error"),this.apiKey=c,this.operation=u,this.code=l,this.continueUrl=null!==(s=a.continueUrl)&&void 0!==s?s:null,this.languageCode=null!==(i=a.lang)&&void 0!==i?i:null,this.tenantId=null!==(o=a.tenantId)&&void 0!==o?o:null}static parseLink(e){const t=function(e){const t=L(D(e)).link,n=t?L(D(t)).deep_link_id:null,r=L(D(e)).deep_link_id;return(r?L(D(r)).link:null)||r||n||t||e}(e);try{return new pn(t)}catch(n){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(){this.providerId=fn.PROVIDER_ID}static credential(e,t){return un._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=pn.parseLink(t);return We(n,"argument-error"),un._fromEmailAndCode(e,n.code,n.tenantId)}}fn.PROVIDER_ID="password",fn.EMAIL_PASSWORD_SIGN_IN_METHOD="password",fn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends mn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn extends gn{constructor(){super("facebook.com")}static credential(e){return hn._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return yn.credential(e.oauthAccessToken)}catch(t){return null}}}yn.FACEBOOK_SIGN_IN_METHOD="facebook.com",yn.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wn extends gn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return hn._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return wn.credential(t,n)}catch(r){return null}}}wn.GOOGLE_SIGN_IN_METHOD="google.com",wn.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vn extends gn{constructor(){super("github.com")}static credential(e){return hn._fromParams({providerId:vn.PROVIDER_ID,signInMethod:vn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vn.credentialFromTaggedObject(e)}static credentialFromError(e){return vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return vn.credential(e.oauthAccessToken)}catch(t){return null}}}vn.GITHUB_SIGN_IN_METHOD="github.com",vn.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bn extends gn{constructor(){super("twitter.com")}static credential(e,t){return hn._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return bn.credential(t,n)}catch(r){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _n(e,t){return ot(e,"POST","/v1/accounts:signUp",rt(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bn.TWITTER_SIGN_IN_METHOD="twitter.com",bn.PROVIDER_ID="twitter.com";class kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const s=await It._fromIdTokenResponse(e,n,r),i=En(n);return new kn({user:s,providerId:i,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=En(n);return new kn({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function En(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends E{constructor(e,t,n,r){var s;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Tn.prototype),this.customData={appName:e.name,tenantId:null!==(s=e.tenantId)&&void 0!==s?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Tn(e,t,n,r)}}function In(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Tn._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Sn(e,t,n=!1){if(w(e.app))return Promise.reject($e(e));const r="signIn",s=await In(e,r,t),i=await kn._fromIdTokenResponse(e,r,s);return n||await e._updateCurrentUser(i.user),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function xn(e){const t=qt(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}function Rn(e,t,n){return w(e.app)?Promise.reject($e(e)):async function(e,t){return Sn(qt(e),t)}(v(e),fn.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&xn(e),t})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function On(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const r=v(e),s={idToken:await r.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},i=await wt(r,async function(e,t){return st(e,"POST","/v1/accounts:update",t)}(r.auth,s));r.displayName=i.displayName||null,r.photoURL=i.photoUrl||null;const o=r.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=r.displayName,o.photoURL=r.photoURL),await r._updateTokensIfNecessary(i)}function Nn(e,t,n,r){return v(e).onAuthStateChanged(t,n,r)}function Pn(e){return v(e).signOut()}const Cn="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Cn,"1"),this.storage.removeItem(Cn),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn extends An{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Vt(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);A()&&10===document.documentMode&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}jn.type="LOCAL";const Ln=jn;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends An{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Dn.type="SESSION";const Un=Dn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new Mn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:s}=t.data,i=this.handlersMap[r];if(!(null==i?void 0:i.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(i).map(async e=>e(t.origin,s)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Fn(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mn.receivers=[];class Bn{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,i;return new Promise((o,a)=>{const c=Fn("",20);r.port1.start();const l=setTimeout(()=>{a(new Error("unsupported_event"))},n);i={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(l),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),o(t.data.response);break;default:clearTimeout(l),clearTimeout(s),a(new Error("invalid_response"))}}},this.handlers.add(i),r.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Hn(){return void 0!==Vn().WorkerGlobalScope&&"function"==typeof Vn().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $n="firebaseLocalStorageDb",zn="firebaseLocalStorage",Wn="fbase_key";class qn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Kn(e,t){return e.transaction([zn],t?"readwrite":"readonly").objectStore(zn)}function Jn(){const e=indexedDB.open($n,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(zn,{keyPath:Wn})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(zn)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase($n);return new qn(e).toPromise()}(),t(await Jn()))})})}async function Gn(e,t,n){const r=Kn(e,!0).put({[Wn]:t,value:n});return new qn(r).toPromise()}function Xn(e,t){const n=Kn(e,!0).delete(t);return new qn(n).toPromise()}class Yn{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await Jn()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Hn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Mn._getInstance(Hn()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new Bn(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Jn();return await Gn(e,Cn,"1"),await Xn(e,Cn),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Gn(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=Kn(e,!1).get(t),r=await new qn(n).toPromise();return void 0===r?null:r.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Xn(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=Kn(e,!1).getAll();return new qn(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:s}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Yn.type="LOCAL";const Qn=Yn;
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Zn(e,t){return t?xt(t):(We(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Ye(3e4,6e4);class er extends on{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return dn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return dn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return dn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tr(e){return Sn(e.auth,new er(e),e.bypassAuthState)}function nr(e){const{auth:t,user:n}=e;return We(n,t,"internal-error"),
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t,n=!1){const{auth:r}=e;if(w(r.app))return Promise.reject($e(r));const s="reauthenticate";try{const i=await wt(e,In(r,s,t,e),n);We(i.idToken,r,"internal-error");const o=gt(i.idToken);We(o,r,"internal-error");const{sub:a}=o;return We(e.uid===a,r,"user-mismatch"),kn._forOperation(e,s,i)}catch(i){throw"auth/user-not-found"===(null==i?void 0:i.code)&&Be(r,"user-mismatch"),i}}(n,new er(e),e.bypassAuthState)}async function rr(e){const{auth:t,user:n}=e;return We(n,t,"internal-error"),async function(e,t,n=!1){const r=await wt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return kn._forOperation(e,"link",r)}(n,new er(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e,t,n,r,s=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:s,error:i,type:o}=e;if(i)return void this.reject(i);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tr;case"linkViaPopup":case"linkViaRedirect":return rr;case"reauthViaPopup":case"reauthViaRedirect":return nr;default:Be(this.auth,"internal-error")}}resolve(e){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=new Ye(2e3,1e4);async function or(e,t,n){if(w(e.app))return Promise.reject(Ve(e,"operation-not-supported-in-this-environment"));const r=qt(e);!function(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&Be(e,"argument-error"),He(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,mn);const s=Zn(r,n);return new ar(r,"signInViaPopup",t,s).executeNotNull()}class ar extends sr{constructor(e,t,n,r,s){super(e,t,r,s),this.provider=n,this.authWindow=null,this.pollId=null,ar.currentPopupAction&&ar.currentPopupAction.cancel(),ar.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return We(e,this.auth,"internal-error"),e}async onExecution(){Ke(1===this.filter.length,"Popup operations only handle one event");const e=Fn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(Ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ar.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ve(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,ir.get())};e()}}ar.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cr="pendingRedirect",lr=new Map;class ur extends sr{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=lr.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return Nt(cr,e.config.apiKey,e.name)}(t),r=function(e){return xt(e._redirectPersistence)}(e);if(!(await r._isAvailable()))return!1;const s="true"===await r._get(n);return await r._remove(n),s}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}lr.set(this.auth._key(),e)}return this.bypassAuthState||lr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function dr(e,t){lr.set(e._key(),t)}async function hr(e,t,n=!1){if(w(e.app))return Promise.reject($e(e));const r=qt(e),s=Zn(r,t),i=new ur(r,s,n),o=await i.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return mr(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!mr(e)){const r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(Ve(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(fr(e))}saveEventToCache(e){this.cachedEventUids.add(fr(e)),this.lastProcessedEventTime=Date.now()}}function fr(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function mr({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yr=/^https?/;async function wr(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return st(e,"GET","/v1/projects",t)}(e);for(const r of t)try{if(vr(r))return}catch(n){}Be(e,"unauthorized-domain")}function vr(e){const t=Je(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return""===s.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&s.hostname===r}if(!yr.test(n))return!1;if(gr.test(e))return r===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const br=new Ye(3e4,6e4);function _r(){const e=Vn().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function kr(e){return new Promise((t,n)=>{var r,s,i;function o(){_r(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{_r(),n(Ve(e,"network-request-failed"))},timeout:br.get()})}if(null===(s=null===(r=Vn().gapi)||void 0===r?void 0:r.iframes)||void 0===s?void 0:s.Iframe)t(gapi.iframes.getContext());else{if(!(null===(i=Vn().gapi)||void 0===i?void 0:i.load)){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return Vn()[t]=()=>{gapi.load?o():n(Ve(e,"network-request-failed"))},Gt(`${Jt.gapiScript}?onload=${t}`).catch(e=>n(e))}o()}}).catch(e=>{throw Er=null,e})}let Er=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Tr=new Ye(5e3,15e3),Ir={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Sr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xr(e){const t=e.config;We(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Qe(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:g},s=Sr.get(e.config.apiHost);s&&(r.eid=s);const i=e._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${I(r).slice(1)}`}async function Rr(e){const t=await function(e){return Er=Er||kr(e),Er}(e),n=Vn().gapi;return We(n,e,"internal-error"),t.open({where:document.body,url:xr(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ir,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const s=Ve(e,"network-request-failed"),i=Vn().setTimeout(()=>{r(s)},Tr.get());function o(){Vn().clearTimeout(i),n(t)}t.ping(o).then(o,()=>{r(s)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Nr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Pr(e,t,n,r=500,s=600){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Or),{width:r.toString(),height:s.toString(),top:i,left:o}),l=b().toLowerCase();n&&(a=Lt(l)?"_blank":n),At(l)&&(t=t||"http://localhost",c.scrollbars="yes");const u=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=b()){var t;return Bt(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(l)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new Nr(null);const d=window.open(t||"",a,u);We(d,e,"popup-blocked");try{d.focus()}catch(h){}return new Nr(d)}const Cr="__/auth/handler",Ar="emulator/auth/handler",jr=encodeURIComponent("fac");async function Lr(e,t,n,r,s,i){We(e.config.authDomain,e,"auth-domain-config-required"),We(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:g,eventId:s};if(t instanceof mn){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",j(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof gn){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const u of Object.keys(a))void 0===a[u]&&delete a[u];const c=await e._getAppCheckToken(),l=c?`#${jr}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${Cr}`;return Qe(e,Ar)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${I(a).slice(1)}${l}`}const Dr="webStorageSupport";const Ur=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Un,this._completeRedirectFn=hr,this._overrideRedirectResult=dr}async _openPopup(e,t,n,r){var s;Ke(null===(s=this.eventManagers[e._key()])||void 0===s?void 0:s.manager,"_initialize() not called before _openPopup()");return Pr(e,await Lr(e,t,n,Je(),r),Fn())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){Vn().location.href=e}(await Lr(e,t,n,Je(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Ke(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Rr(e),n=new pr(e);return t.register("authEvent",t=>{We(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Dr,{type:Dr},n=>{var r;const s=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[Dr];void 0!==s&&t(!!s),Be(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=wr(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Vt()||jt()||Bt()}};var Mr="@firebase/auth",Fr="1.10.8";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Br{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){We(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Vr=l("authIdTokenMaxAge")||300;let Hr=null;var $r;Jt={loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");var s,i;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=Ve("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",(null!==(i=null===(s=document.getElementsByTagName("head"))||void 0===s?void 0:s[0])&&void 0!==i?i:document).appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},$r="Browser",h(new p("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:i,authDomain:o}=n.options;We(i&&!i.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:i,authDomain:o,clientPlatform:$r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ht($r)},c=new Wt(n,r,s,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(xt);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),h(new p("auth-internal",e=>{const t=qt(e.getProvider("auth").getImmediate());return new Br(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),f(Mr,Fr,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}($r)),f(Mr,Fr,"esm2017");const zr=M({apiKey:"AIzaSyBOYKit2mQOY_nKyvJ2Tg84QLJIJCXYOTA",authDomain:"pv-memes.firebaseapp.com",databaseURL:"https://pv-memes-default-rtdb.firebaseio.com",projectId:"pv-memes",storageBucket:"pv-memes.appspot.com",messagingSenderId:"461698747525",appId:"1:461698747525:web:c0fada2ad051fcfd60adec",measurementId:"G-5WJDS0019Z"}),Wr=F(zr),qr=function(e=x()){const t=R(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=R(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if(N(r,null!=t?t:{}))return e;Be(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:Ur,persistence:[Qn,Ln,Un]}),r=l("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(s=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Vr)return;const r=null==t?void 0:t.token;Hr!==r&&(Hr=r,await fetch(s,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(e,t,n){v(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,r){v(e).onIdTokenChanged(t,n,r)}(n,e=>t(e))}}var s;const i=O("auth");return i&&nn(n,`http://${i}`),n}(zr),Kr=["zT1ASMe797fhHDDajlLVffsl1r52"],Jr=async e=>{if(!e)return!1;if(Kr.includes(e.uid))return!0;try{const t=`admins/${e.uid}`,n=B(Wr,t),r=await V(n);return r.exists()&&!0===r.val()}catch(t){return!1}},Gr=e.createContext();function Xr(){return e.useContext(Gr)}function Yr({children:t}){const[n,r]=e.useState(null),[s,i]=e.useState(!0),[o,a]=e.useState(!1);e.useEffect(()=>Nn(qr,async e=>{if(r(e),e)try{const t=await Jr(e);a(t)}catch(t){a(!1)}else a(!1);i(!1)}),[]);const c={currentUser:n,signup:function(e,t){return async function(e,t,n){if(w(e.app))return Promise.reject($e(e));const r=qt(e),s=tn(r,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",_n),i=await s.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&xn(e),t}),o=await kn._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(o.user),o}(qr,e,t)},login:function(e,t){return Rn(qr,e,t)},loginWithGoogle:function(){const e=new wn;return or(qr,e)},logout:function(){return Pn(qr)},resetPassword:function(e){return async function(e,t){const n=qt(e),r={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};await tn(n,r,"getOobCode",ln)}(qr,e)},updateUserProfile:function(e,t){return On(qr.currentUser,{displayName:e||qr.currentUser.displayName,photoURL:t||qr.currentUser.photoURL})},isAdminUser:o};return ie.jsx(Gr.Provider,{value:c,children:!s&&t})}const Qr=({isOpen:t,onClose:n})=>{const[r,s]=e.useState(!0),[i,o]=e.useState(""),[a,c]=e.useState(""),[l,u]=e.useState(""),[d,h]=e.useState(""),[p,f]=e.useState(""),[m,g]=e.useState(!1),[y,w]=e.useState(!1),[v,b]=e.useState(""),{login:_,signup:k,loginWithGoogle:E,resetPassword:T}=Xr(),I=()=>{s(!r),f(""),w(!1),b("")},S=()=>{w(!y),f(""),b("")};return t?ie.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:ie.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative",children:[ie.jsx("button",{onClick:n,className:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",children:ie.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:ie.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),ie.jsx("h2",{className:"text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white",children:y?"Reset Password":r?"Login to Your Account":"Create an Account"}),p&&ie.jsx("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",children:p}),v&&ie.jsx("div",{className:"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4",children:v}),ie.jsxs("form",{onSubmit:async e=>{e.preventDefault(),f(""),b(""),g(!0);try{if(y)return await T(i),b("Check your email for password reset instructions"),void g(!1);if(r)await _(i,a),n();else{if(a!==l)return f("Passwords do not match"),void g(!1);const e=await k(i,a);d&&await e.user.updateProfile({displayName:d}),n()}}catch(t){f(t.message.replace("Firebase: ","").replace(/\(auth.*\)\.?/,""))}g(!1)},className:"space-y-4",children:[ie.jsxs("div",{children:[ie.jsx("label",{className:"block text-gray-700 dark:text-gray-300 mb-1",children:"Email"}),ie.jsx("input",{type:"email",value:i,onChange:e=>o(e.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:!0})]}),!y&&ie.jsxs("div",{children:[ie.jsx("label",{className:"block text-gray-700 dark:text-gray-300 mb-1",children:"Password"}),ie.jsx("input",{type:"password",value:a,onChange:e=>c(e.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:!0})]}),!r&&!y&&ie.jsxs(ie.Fragment,{children:[ie.jsxs("div",{children:[ie.jsx("label",{className:"block text-gray-700 dark:text-gray-300 mb-1",children:"Confirm Password"}),ie.jsx("input",{type:"password",value:l,onChange:e=>u(e.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:!0})]}),ie.jsxs("div",{children:[ie.jsx("label",{className:"block text-gray-700 dark:text-gray-300 mb-1",children:"Display Name (Optional)"}),ie.jsx("input",{type:"text",value:d,onChange:e=>h(e.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"})]})]}),ie.jsx("button",{type:"submit",disabled:m,className:"w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50",children:m?ie.jsxs("span",{className:"flex items-center justify-center",children:[ie.jsxs("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[ie.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),ie.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Processing..."]}):y?"Send Reset Link":r?"Login":"Sign Up"})]}),!y&&ie.jsxs("div",{className:"mt-4",children:[ie.jsxs("div",{className:"relative flex items-center justify-center",children:[ie.jsx("div",{className:"border-t border-gray-300 dark:border-gray-600 w-full"}),ie.jsx("div",{className:"px-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800",children:"or"}),ie.jsx("div",{className:"border-t border-gray-300 dark:border-gray-600 w-full"})]}),ie.jsxs("button",{onClick:async()=>{f(""),g(!0);try{await E(),n()}catch(e){f(e.message.replace("Firebase: ","").replace(/\(auth.*\)\.?/,"")),g(!1)}},disabled:m,className:"w-full mt-4 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition duration-200 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600",children:[ie.jsxs("svg",{className:"h-5 w-5 mr-2",viewBox:"0 0 24 24",children:[ie.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),ie.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),ie.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),ie.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]}),"Continue with Google"]})]}),ie.jsx("div",{className:"mt-4 text-center",children:y?ie.jsx("button",{onClick:S,className:"text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",children:"Back to login"}):r?ie.jsxs(ie.Fragment,{children:[ie.jsx("button",{onClick:S,className:"text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",children:"Forgot password?"}),ie.jsxs("div",{className:"mt-2",children:["Don't have an account?"," ",ie.jsx("button",{onClick:I,className:"text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",children:"Sign up"})]})]}):ie.jsxs("div",{children:["Already have an account?"," ",ie.jsx("button",{onClick:I,className:"text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",children:"Login"})]})})]})}):null};function Zr(e,t){return function(){return e.apply(t,arguments)}}const{toString:es}=Object.prototype,{getPrototypeOf:ts}=Object,{iterator:ns,toStringTag:rs}=Symbol,ss=(e=>t=>{const n=es.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),is=e=>(e=e.toLowerCase(),t=>ss(t)===e),os=e=>t=>typeof t===e,{isArray:as}=Array,cs=os("undefined");function ls(e){return null!==e&&!cs(e)&&null!==e.constructor&&!cs(e.constructor)&&hs(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const us=is("ArrayBuffer");const ds=os("string"),hs=os("function"),ps=os("number"),fs=e=>null!==e&&"object"==typeof e,ms=e=>{if("object"!==ss(e))return!1;const t=ts(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||rs in e||ns in e)},gs=is("Date"),ys=is("File"),ws=is("Blob"),vs=is("FileList"),bs=is("URLSearchParams"),[_s,ks,Es,Ts]=["ReadableStream","Request","Response","Headers"].map(is);function Is(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,s;if("object"!=typeof e&&(e=[e]),as(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(ls(e))return;const s=n?Object.getOwnPropertyNames(e):Object.keys(e),i=s.length;let o;for(r=0;r<i;r++)o=s[r],t.call(null,e[o],o,e)}}function Ss(e,t){if(ls(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r,s=n.length;for(;s-- >0;)if(r=n[s],t===r.toLowerCase())return r;return null}const xs="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,Rs=e=>!cs(e)&&e!==xs;const Os=(e=>t=>e&&t instanceof e)("undefined"!=typeof Uint8Array&&ts(Uint8Array)),Ns=is("HTMLFormElement"),Ps=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Cs=is("RegExp"),As=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Is(n,(n,s)=>{let i;!1!==(i=t(n,s,e))&&(r[s]=i||n)}),Object.defineProperties(e,r)};const js=is("AsyncFunction"),Ls=(Ds="function"==typeof setImmediate,Us=hs(xs.postMessage),Ds?setImmediate:Us?(Ms=`axios@${Math.random()}`,Fs=[],xs.addEventListener("message",({source:e,data:t})=>{e===xs&&t===Ms&&Fs.length&&Fs.shift()()},!1),e=>{Fs.push(e),xs.postMessage(Ms,"*")}):e=>setTimeout(e));var Ds,Us,Ms,Fs;const Bs="undefined"!=typeof queueMicrotask?queueMicrotask.bind(xs):"undefined"!=typeof process&&process.nextTick||Ls,Vs={isArray:as,isArrayBuffer:us,isBuffer:ls,isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||hs(e.append)&&("formdata"===(t=ss(e))||"object"===t&&hs(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&us(e.buffer),t},isString:ds,isNumber:ps,isBoolean:e=>!0===e||!1===e,isObject:fs,isPlainObject:ms,isEmptyObject:e=>{if(!fs(e)||ls(e))return!1;try{return 0===Object.keys(e).length&&Object.getPrototypeOf(e)===Object.prototype}catch(t){return!1}},isReadableStream:_s,isRequest:ks,isResponse:Es,isHeaders:Ts,isUndefined:cs,isDate:gs,isFile:ys,isBlob:ws,isRegExp:Cs,isFunction:hs,isStream:e=>fs(e)&&hs(e.pipe),isURLSearchParams:bs,isTypedArray:Os,isFileList:vs,forEach:Is,merge:function e(){const{caseless:t}=Rs(this)&&this||{},n={},r=(r,s)=>{const i=t&&Ss(n,s)||s;ms(n[i])&&ms(r)?n[i]=e(n[i],r):ms(r)?n[i]=e({},r):as(r)?n[i]=r.slice():n[i]=r};for(let s=0,i=arguments.length;s<i;s++)arguments[s]&&Is(arguments[s],r);return n},extend:(e,t,n,{allOwnKeys:r}={})=>(Is(t,(t,r)=>{n&&hs(t)?e[r]=Zr(t,n):e[r]=t},{allOwnKeys:r}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let s,i,o;const a={};if(t=t||{},null==e)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)o=s[i],r&&!r(o,e,t)||a[o]||(t[o]=e[o],a[o]=!0);e=!1!==n&&ts(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:ss,kindOfTest:is,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(as(e))return e;let t=e.length;if(!ps(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[ns]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:Ns,hasOwnProperty:Ps,hasOwnProp:Ps,reduceDescriptors:As,freezeMethods:e=>{As(e,(t,n)=>{if(hs(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];hs(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))})},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach(e=>{n[e]=!0})};return as(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,n){return t.toUpperCase()+n}),noop:()=>{},toFiniteNumber:(e,t)=>null!=e&&Number.isFinite(e=+e)?e:t,findKey:Ss,global:xs,isContextDefined:Rs,isSpecCompliantForm:function(e){return!!(e&&hs(e.append)&&"FormData"===e[rs]&&e[ns])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(fs(e)){if(t.indexOf(e)>=0)return;if(ls(e))return e;if(!("toJSON"in e)){t[r]=e;const s=as(e)?[]:{};return Is(e,(e,t)=>{const i=n(e,r+1);!cs(i)&&(s[t]=i)}),t[r]=void 0,s}}return e};return n(e,0)},isAsyncFn:js,isThenable:e=>e&&(fs(e)||hs(e))&&hs(e.then)&&hs(e.catch),setImmediate:Ls,asap:Bs,isIterable:e=>null!=e&&hs(e[ns])};function Hs(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}Vs.inherits(Hs,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:Vs.toJSONObject(this.config),code:this.code,status:this.status}}});const $s=Hs.prototype,zs={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{zs[e]={value:e}}),Object.defineProperties(Hs,zs),Object.defineProperty($s,"isAxiosError",{value:!0}),Hs.from=(e,t,n,r,s,i)=>{const o=Object.create($s);return Vs.toFlatObject(e,o,function(e){return e!==Error.prototype},e=>"isAxiosError"!==e),Hs.call(o,e.message,t,n,r,s),o.cause=e,o.name=e.name,i&&Object.assign(o,i),o};function Ws(e){return Vs.isPlainObject(e)||Vs.isArray(e)}function qs(e){return Vs.endsWith(e,"[]")?e.slice(0,-2):e}function Ks(e,t,n){return e?e.concat(t).map(function(e,t){return e=qs(e),!n&&t?"["+e+"]":e}).join(n?".":""):t}const Js=Vs.toFlatObject(Vs,{},null,function(e){return/^is[A-Z]/.test(e)});function Gs(e,t,n){if(!Vs.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=Vs.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!Vs.isUndefined(t[e])})).metaTokens,s=n.visitor||l,i=n.dots,o=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&Vs.isSpecCompliantForm(t);if(!Vs.isFunction(s))throw new TypeError("visitor must be a function");function c(e){if(null===e)return"";if(Vs.isDate(e))return e.toISOString();if(Vs.isBoolean(e))return e.toString();if(!a&&Vs.isBlob(e))throw new Hs("Blob is not supported. Use a Buffer instead.");return Vs.isArrayBuffer(e)||Vs.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function l(e,n,s){let a=e;if(e&&!s&&"object"==typeof e)if(Vs.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(Vs.isArray(e)&&function(e){return Vs.isArray(e)&&!e.some(Ws)}(e)||(Vs.isFileList(e)||Vs.endsWith(n,"[]"))&&(a=Vs.toArray(e)))return n=qs(n),a.forEach(function(e,r){!Vs.isUndefined(e)&&null!==e&&t.append(!0===o?Ks([n],r,i):null===o?n:n+"[]",c(e))}),!1;return!!Ws(e)||(t.append(Ks(s,n,i),c(e)),!1)}const u=[],d=Object.assign(Js,{defaultVisitor:l,convertValue:c,isVisitable:Ws});if(!Vs.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!Vs.isUndefined(n)){if(-1!==u.indexOf(n))throw Error("Circular reference detected in "+r.join("."));u.push(n),Vs.forEach(n,function(n,i){!0===(!(Vs.isUndefined(n)||null===n)&&s.call(t,n,Vs.isString(i)?i.trim():i,r,d))&&e(n,r?r.concat(i):[i])}),u.pop()}}(e),t}function Xs(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(e){return t[e]})}function Ys(e,t){this._pairs=[],e&&Gs(e,this,t)}const Qs=Ys.prototype;function Zs(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ei(e,t,n){if(!t)return e;const r=n&&n.encode||Zs;Vs.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let i;if(i=s?s(t,n):Vs.isURLSearchParams(t)?t.toString():new Ys(t,n).toString(r),i){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}Qs.append=function(e,t){this._pairs.push([e,t])},Qs.toString=function(e){const t=e?function(t){return e.call(this,t,Xs)}:Xs;return this._pairs.map(function(e){return t(e[0])+"="+t(e[1])},"").join("&")};class ti{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){Vs.forEach(this.handlers,function(t){null!==t&&e(t)})}}const ni={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},ri={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:Ys,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},si="undefined"!=typeof window&&"undefined"!=typeof document,ii="object"==typeof navigator&&navigator||void 0,oi=si&&(!ii||["ReactNative","NativeScript","NS"].indexOf(ii.product)<0),ai="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,ci=si&&window.location.href||"http://localhost",li={...Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:si,hasStandardBrowserEnv:oi,hasStandardBrowserWebWorkerEnv:ai,navigator:ii,origin:ci},Symbol.toStringTag,{value:"Module"})),...ri};function ui(e){function t(e,n,r,s){let i=e[s++];if("__proto__"===i)return!0;const o=Number.isFinite(+i),a=s>=e.length;if(i=!i&&Vs.isArray(r)?r.length:i,a)return Vs.hasOwnProp(r,i)?r[i]=[r[i],n]:r[i]=n,!o;r[i]&&Vs.isObject(r[i])||(r[i]=[]);return t(e,n,r[i],s)&&Vs.isArray(r[i])&&(r[i]=function(e){const t={},n=Object.keys(e);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],t[i]=e[i];return t}(r[i])),!o}if(Vs.isFormData(e)&&Vs.isFunction(e.entries)){const n={};return Vs.forEachEntry(e,(e,r)=>{t(function(e){return Vs.matchAll(/\w+|\[(\w*)]/g,e).map(e=>"[]"===e[0]?"":e[1]||e[0])}(e),r,n,0)}),n}return null}const di={transitional:ni,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,s=Vs.isObject(e);s&&Vs.isHTMLForm(e)&&(e=new FormData(e));if(Vs.isFormData(e))return r?JSON.stringify(ui(e)):e;if(Vs.isArrayBuffer(e)||Vs.isBuffer(e)||Vs.isStream(e)||Vs.isFile(e)||Vs.isBlob(e)||Vs.isReadableStream(e))return e;if(Vs.isArrayBufferView(e))return e.buffer;if(Vs.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(s){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return Gs(e,new li.classes.URLSearchParams,{visitor:function(e,t,n,r){return li.isNode&&Vs.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}(e,this.formSerializer).toString();if((i=Vs.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return Gs(i?{"files[]":e}:e,t&&new t,this.formSerializer)}}return s||r?(t.setContentType("application/json",!1),function(e,t,n){if(Vs.isString(e))try{return(t||JSON.parse)(e),Vs.trim(e)}catch(r){if("SyntaxError"!==r.name)throw r}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||di.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(Vs.isResponse(e)||Vs.isReadableStream(e))return e;if(e&&Vs.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(s){if(n){if("SyntaxError"===s.name)throw Hs.from(s,Hs.ERR_BAD_RESPONSE,this,null,this.response);throw s}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:li.classes.FormData,Blob:li.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};Vs.forEach(["delete","get","head","post","put","patch"],e=>{di.headers[e]={}});const hi=Vs.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),pi=Symbol("internals");function fi(e){return e&&String(e).trim().toLowerCase()}function mi(e){return!1===e||null==e?e:Vs.isArray(e)?e.map(mi):String(e)}function gi(e,t,n,r,s){return Vs.isFunction(r)?r.call(this,t,n):(s&&(t=n),Vs.isString(t)?Vs.isString(r)?-1!==t.indexOf(r):Vs.isRegExp(r)?r.test(t):void 0:void 0)}let yi=class{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function s(e,t,n){const s=fi(t);if(!s)throw new Error("header name must be a non-empty string");const i=Vs.findKey(r,s);(!i||void 0===r[i]||!0===n||void 0===n&&!1!==r[i])&&(r[i||t]=mi(e))}const i=(e,t)=>Vs.forEach(e,(e,n)=>s(e,n,t));if(Vs.isPlainObject(e)||e instanceof this.constructor)i(e,t);else if(Vs.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))i((e=>{const t={};let n,r,s;return e&&e.split("\n").forEach(function(e){s=e.indexOf(":"),n=e.substring(0,s).trim().toLowerCase(),r=e.substring(s+1).trim(),!n||t[n]&&hi[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t})(e),t);else if(Vs.isObject(e)&&Vs.isIterable(e)){let n,r,s={};for(const t of e){if(!Vs.isArray(t))throw TypeError("Object iterator must return a key-value pair");s[r=t[0]]=(n=s[r])?Vs.isArray(n)?[...n,t[1]]:[n,t[1]]:t[1]}i(s,t)}else null!=e&&s(t,e,n);return this}get(e,t){if(e=fi(e)){const n=Vs.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(Vs.isFunction(t))return t.call(this,e,n);if(Vs.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=fi(e)){const n=Vs.findKey(this,e);return!(!n||void 0===this[n]||t&&!gi(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function s(e){if(e=fi(e)){const s=Vs.findKey(n,e);!s||t&&!gi(0,n[s],s,t)||(delete n[s],r=!0)}}return Vs.isArray(e)?e.forEach(s):s(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const s=t[n];e&&!gi(0,this[s],s,e,!0)||(delete this[s],r=!0)}return r}normalize(e){const t=this,n={};return Vs.forEach(this,(r,s)=>{const i=Vs.findKey(n,s);if(i)return t[i]=mi(r),void delete t[s];const o=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}(s):String(s).trim();o!==s&&delete t[s],t[o]=mi(r),n[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return Vs.forEach(this,(n,r)=>{null!=n&&!1!==n&&(t[r]=e&&Vs.isArray(n)?n.join(", "):n)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join("\n")}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach(e=>n.set(e)),n}static accessor(e){const t=(this[pi]=this[pi]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=fi(e);t[r]||(!function(e,t){const n=Vs.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(e,n,s){return this[r].call(this,t,e,n,s)},configurable:!0})})}(n,e),t[r]=!0)}return Vs.isArray(e)?e.forEach(r):r(e),this}};function wi(e,t){const n=this||di,r=t||n,s=yi.from(r.headers);let i=r.data;return Vs.forEach(e,function(e){i=e.call(n,i,s.normalize(),t?t.status:void 0)}),s.normalize(),i}function vi(e){return!(!e||!e.__CANCEL__)}function bi(e,t,n){Hs.call(this,null==e?"canceled":e,Hs.ERR_CANCELED,t,n),this.name="CanceledError"}function _i(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new Hs("Request failed with status code "+n.status,[Hs.ERR_BAD_REQUEST,Hs.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}yi.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),Vs.reduceDescriptors(yi.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}}),Vs.freezeMethods(yi),Vs.inherits(bi,Hs,{__CANCEL__:!0});const ki=(e,t,n=3)=>{let r=0;const s=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s,i=0,o=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),l=r[o];s||(s=c),n[i]=a,r[i]=c;let u=o,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===o&&(o=(o+1)%e),c-s<t)return;const h=l&&c-l;return h?Math.round(1e3*d/h):void 0}}(50,250);return function(e,t){let n,r,s=0,i=1e3/t;const o=(t,i=Date.now())=>{s=i,n=null,r&&(clearTimeout(r),r=null),e(...t)};return[(...e)=>{const t=Date.now(),a=t-s;a>=i?o(e,t):(n=e,r||(r=setTimeout(()=>{r=null,o(n)},i-a)))},()=>n&&o(n)]}(n=>{const i=n.loaded,o=n.lengthComputable?n.total:void 0,a=i-r,c=s(a);r=i;e({loaded:i,total:o,progress:o?i/o:void 0,bytes:a,rate:c||void 0,estimated:c&&o&&i<=o?(o-i)/c:void 0,event:n,lengthComputable:null!=o,[t?"download":"upload"]:!0})},n)},Ei=(e,t)=>{const n=null!=e;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Ti=e=>(...t)=>Vs.asap(()=>e(...t)),Ii=li.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,li.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(li.origin),li.navigator&&/(msie|trident)/i.test(li.navigator.userAgent)):()=>!0,Si=li.hasStandardBrowserEnv?{write(e,t,n,r,s,i){const o=[e+"="+encodeURIComponent(t)];Vs.isNumber(n)&&o.push("expires="+new Date(n).toGMTString()),Vs.isString(r)&&o.push("path="+r),Vs.isString(s)&&o.push("domain="+s),!0===i&&o.push("secure"),document.cookie=o.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};function xi(e,t,n){let r=!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);return e&&(r||0==n)?function(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const Ri=e=>e instanceof yi?{...e}:e;function Oi(e,t){t=t||{};const n={};function r(e,t,n,r){return Vs.isPlainObject(e)&&Vs.isPlainObject(t)?Vs.merge.call({caseless:r},e,t):Vs.isPlainObject(t)?Vs.merge({},t):Vs.isArray(t)?t.slice():t}function s(e,t,n,s){return Vs.isUndefined(t)?Vs.isUndefined(e)?void 0:r(void 0,e,0,s):r(e,t,0,s)}function i(e,t){if(!Vs.isUndefined(t))return r(void 0,t)}function o(e,t){return Vs.isUndefined(t)?Vs.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,s,i){return i in t?r(n,s):i in e?r(void 0,n):void 0}const c={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(e,t,n)=>s(Ri(e),Ri(t),0,!0)};return Vs.forEach(Object.keys({...e,...t}),function(r){const i=c[r]||s,o=i(e[r],t[r],r);Vs.isUndefined(o)&&i!==a||(n[r]=o)}),n}const Ni=e=>{const t=Oi({},e);let n,{data:r,withXSRFToken:s,xsrfHeaderName:i,xsrfCookieName:o,headers:a,auth:c}=t;if(t.headers=a=yi.from(a),t.url=ei(xi(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),c&&a.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):""))),Vs.isFormData(r))if(li.hasStandardBrowserEnv||li.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(!1!==(n=a.getContentType())){const[e,...t]=n?n.split(";").map(e=>e.trim()).filter(Boolean):[];a.setContentType([e||"multipart/form-data",...t].join("; "))}if(li.hasStandardBrowserEnv&&(s&&Vs.isFunction(s)&&(s=s(t)),s||!1!==s&&Ii(t.url))){const e=i&&o&&Si.read(o);e&&a.set(i,e)}return t},Pi="undefined"!=typeof XMLHttpRequest&&function(e){return new Promise(function(t,n){const r=Ni(e);let s=r.data;const i=yi.from(r.headers).normalize();let o,a,c,l,u,{responseType:d,onUploadProgress:h,onDownloadProgress:p}=r;function f(){l&&l(),u&&u(),r.cancelToken&&r.cancelToken.unsubscribe(o),r.signal&&r.signal.removeEventListener("abort",o)}let m=new XMLHttpRequest;function g(){if(!m)return;const r=yi.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders());_i(function(e){t(e),f()},function(e){n(e),f()},{data:d&&"text"!==d&&"json"!==d?m.response:m.responseText,status:m.status,statusText:m.statusText,headers:r,config:e,request:m}),m=null}m.open(r.method.toUpperCase(),r.url,!0),m.timeout=r.timeout,"onloadend"in m?m.onloadend=g:m.onreadystatechange=function(){m&&4===m.readyState&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))&&setTimeout(g)},m.onabort=function(){m&&(n(new Hs("Request aborted",Hs.ECONNABORTED,e,m)),m=null)},m.onerror=function(){n(new Hs("Network Error",Hs.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let t=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const s=r.transitional||ni;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new Hs(t,s.clarifyTimeoutError?Hs.ETIMEDOUT:Hs.ECONNABORTED,e,m)),m=null},void 0===s&&i.setContentType(null),"setRequestHeader"in m&&Vs.forEach(i.toJSON(),function(e,t){m.setRequestHeader(t,e)}),Vs.isUndefined(r.withCredentials)||(m.withCredentials=!!r.withCredentials),d&&"json"!==d&&(m.responseType=r.responseType),p&&([c,u]=ki(p,!0),m.addEventListener("progress",c)),h&&m.upload&&([a,l]=ki(h),m.upload.addEventListener("progress",a),m.upload.addEventListener("loadend",l)),(r.cancelToken||r.signal)&&(o=t=>{m&&(n(!t||t.type?new bi(null,e,m):t),m.abort(),m=null)},r.cancelToken&&r.cancelToken.subscribe(o),r.signal&&(r.signal.aborted?o():r.signal.addEventListener("abort",o)));const y=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(r.url);y&&-1===li.protocols.indexOf(y)?n(new Hs("Unsupported protocol "+y+":",Hs.ERR_BAD_REQUEST,e)):m.send(s||null)})},Ci=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let n,r=new AbortController;const s=function(e){if(!n){n=!0,o();const t=e instanceof Error?e:this.reason;r.abort(t instanceof Hs?t:new bi(t instanceof Error?t.message:t))}};let i=t&&setTimeout(()=>{i=null,s(new Hs(`timeout ${t} of ms exceeded`,Hs.ETIMEDOUT))},t);const o=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(s):e.removeEventListener("abort",s)}),e=null)};e.forEach(e=>e.addEventListener("abort",s));const{signal:a}=r;return a.unsubscribe=()=>Vs.asap(o),a}},Ai=function*(e,t){let n=e.byteLength;if(n<t)return void(yield e);let r,s=0;for(;s<n;)r=s+t,yield e.slice(s,r),s=r},ji=async function*(e){if(e[Symbol.asyncIterator])return void(yield*e);const t=e.getReader();try{for(;;){const{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},Li=(e,t,n,r)=>{const s=async function*(e,t){for await(const n of ji(e))yield*Ai(n,t)}(e,t);let i,o=0,a=e=>{i||(i=!0,r&&r(e))};return new ReadableStream({async pull(e){try{const{done:t,value:r}=await s.next();if(t)return a(),void e.close();let i=r.byteLength;if(n){let e=o+=i;n(e)}e.enqueue(new Uint8Array(r))}catch(t){throw a(t),t}},cancel:e=>(a(e),s.return())},{highWaterMark:2})},Di="function"==typeof fetch&&"function"==typeof Request&&"function"==typeof Response,Ui=Di&&"function"==typeof ReadableStream,Mi=Di&&("function"==typeof TextEncoder?(e=>t=>e.encode(t))(new TextEncoder):async e=>new Uint8Array(await new Response(e).arrayBuffer())),Fi=(e,...t)=>{try{return!!e(...t)}catch(n){return!1}},Bi=Ui&&Fi(()=>{let e=!1;const t=new Request(li.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t}),Vi=Ui&&Fi(()=>Vs.isReadableStream(new Response("").body)),Hi={stream:Vi&&(e=>e.body)};var $i;Di&&($i=new Response,["text","arrayBuffer","blob","formData","stream"].forEach(e=>{!Hi[e]&&(Hi[e]=Vs.isFunction($i[e])?t=>t[e]():(t,n)=>{throw new Hs(`Response type '${e}' is not supported`,Hs.ERR_NOT_SUPPORT,n)})}));const zi=async(e,t)=>{const n=Vs.toFiniteNumber(e.getContentLength());return null==n?(async e=>{if(null==e)return 0;if(Vs.isBlob(e))return e.size;if(Vs.isSpecCompliantForm(e)){const t=new Request(li.origin,{method:"POST",body:e});return(await t.arrayBuffer()).byteLength}return Vs.isArrayBufferView(e)||Vs.isArrayBuffer(e)?e.byteLength:(Vs.isURLSearchParams(e)&&(e+=""),Vs.isString(e)?(await Mi(e)).byteLength:void 0)})(t):n},Wi={http:null,xhr:Pi,fetch:Di&&(async e=>{let{url:t,method:n,data:r,signal:s,cancelToken:i,timeout:o,onDownloadProgress:a,onUploadProgress:c,responseType:l,headers:u,withCredentials:d="same-origin",fetchOptions:h}=Ni(e);l=l?(l+"").toLowerCase():"text";let p,f=Ci([s,i&&i.toAbortSignal()],o);const m=f&&f.unsubscribe&&(()=>{f.unsubscribe()});let g;try{if(c&&Bi&&"get"!==n&&"head"!==n&&0!==(g=await zi(u,r))){let e,n=new Request(t,{method:"POST",body:r,duplex:"half"});if(Vs.isFormData(r)&&(e=n.headers.get("content-type"))&&u.setContentType(e),n.body){const[e,t]=Ei(g,ki(Ti(c)));r=Li(n.body,65536,e,t)}}Vs.isString(d)||(d=d?"include":"omit");const s="credentials"in Request.prototype;p=new Request(t,{...h,signal:f,method:n.toUpperCase(),headers:u.normalize().toJSON(),body:r,duplex:"half",credentials:s?d:void 0});let i=await fetch(p,h);const o=Vi&&("stream"===l||"response"===l);if(Vi&&(a||o&&m)){const e={};["status","statusText","headers"].forEach(t=>{e[t]=i[t]});const t=Vs.toFiniteNumber(i.headers.get("content-length")),[n,r]=a&&Ei(t,ki(Ti(a),!0))||[];i=new Response(Li(i.body,65536,n,()=>{r&&r(),m&&m()}),e)}l=l||"text";let y=await Hi[Vs.findKey(Hi,l)||"text"](i,e);return!o&&m&&m(),await new Promise((t,n)=>{_i(t,n,{data:y,headers:yi.from(i.headers),status:i.status,statusText:i.statusText,config:e,request:p})})}catch(y){if(m&&m(),y&&"TypeError"===y.name&&/Load failed|fetch/i.test(y.message))throw Object.assign(new Hs("Network Error",Hs.ERR_NETWORK,e,p),{cause:y.cause||y});throw Hs.from(y,y&&y.code,e,p)}})};Vs.forEach(Wi,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(n){}Object.defineProperty(e,"adapterName",{value:t})}});const qi=e=>`- ${e}`,Ki=e=>Vs.isFunction(e)||null===e||!1===e,Ji=e=>{e=Vs.isArray(e)?e:[e];const{length:t}=e;let n,r;const s={};for(let i=0;i<t;i++){let t;if(n=e[i],r=n,!Ki(n)&&(r=Wi[(t=String(n)).toLowerCase()],void 0===r))throw new Hs(`Unknown adapter '${t}'`);if(r)break;s[t||"#"+i]=r}if(!r){const e=Object.entries(s).map(([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build"));throw new Hs("There is no suitable adapter to dispatch the request "+(t?e.length>1?"since :\n"+e.map(qi).join("\n"):" "+qi(e[0]):"as no adapter specified"),"ERR_NOT_SUPPORT")}return r};function Gi(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new bi(null,e)}function Xi(e){Gi(e),e.headers=yi.from(e.headers),e.data=wi.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return Ji(e.adapter||di.adapter)(e).then(function(t){return Gi(e),t.data=wi.call(e,e.transformResponse,t),t.headers=yi.from(t.headers),t},function(t){return vi(t)||(Gi(e),t&&t.response&&(t.response.data=wi.call(e,e.transformResponse,t.response),t.response.headers=yi.from(t.response.headers))),Promise.reject(t)})}const Yi="1.11.0",Qi={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Qi[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const Zi={};Qi.transitional=function(e,t,n){return(r,s,i)=>{if(!1===e)throw new Hs(function(e,t){return"[Axios v"+Yi+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}(s," has been removed"+(t?" in "+t:"")),Hs.ERR_DEPRECATED);return t&&!Zi[s]&&(Zi[s]=!0),!e||e(r,s,i)}},Qi.spelling=function(e){return(e,t)=>!0};const eo={assertOptions:function(e,t,n){if("object"!=typeof e)throw new Hs("options must be an object",Hs.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const i=r[s],o=t[i];if(o){const t=e[i],n=void 0===t||o(t,i,e);if(!0!==n)throw new Hs("option "+i+" must be "+n,Hs.ERR_BAD_OPTION_VALUE);continue}if(!0!==n)throw new Hs("Unknown option "+i,Hs.ERR_BAD_OPTION)}},validators:Qi},to=eo.validators;let no=class{constructor(e){this.defaults=e||{},this.interceptors={request:new ti,response:new ti}}async request(e,t){try{return await this._request(e,t)}catch(n){if(n instanceof Error){let e={};Error.captureStackTrace?Error.captureStackTrace(e):e=new Error;const t=e.stack?e.stack.replace(/^.+\n/,""):"";try{n.stack?t&&!String(n.stack).endsWith(t.replace(/^.+\n.+\n/,""))&&(n.stack+="\n"+t):n.stack=t}catch(r){}}throw n}}_request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=Oi(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:s}=t;void 0!==n&&eo.assertOptions(n,{silentJSONParsing:to.transitional(to.boolean),forcedJSONParsing:to.transitional(to.boolean),clarifyTimeoutError:to.transitional(to.boolean)},!1),null!=r&&(Vs.isFunction(r)?t.paramsSerializer={serialize:r}:eo.assertOptions(r,{encode:to.function,serialize:to.function},!0)),void 0!==t.allowAbsoluteUrls||(void 0!==this.defaults.allowAbsoluteUrls?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),eo.assertOptions(t,{baseUrl:to.spelling("baseURL"),withXsrfToken:to.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let i=s&&Vs.merge(s.common,s[t.method]);s&&Vs.forEach(["delete","get","head","post","put","patch","common"],e=>{delete s[e]}),t.headers=yi.concat(i,s);const o=[];let a=!0;this.interceptors.request.forEach(function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,o.unshift(e.fulfilled,e.rejected))});const c=[];let l;this.interceptors.response.forEach(function(e){c.push(e.fulfilled,e.rejected)});let u,d=0;if(!a){const e=[Xi.bind(this),void 0];for(e.unshift(...o),e.push(...c),u=e.length,l=Promise.resolve(t);d<u;)l=l.then(e[d++],e[d++]);return l}u=o.length;let h=t;for(d=0;d<u;){const e=o[d++],t=o[d++];try{h=e(h)}catch(p){t.call(this,p);break}}try{l=Xi.call(this,h)}catch(p){return Promise.reject(p)}for(d=0,u=c.length;d<u;)l=l.then(c[d++],c[d++]);return l}getUri(e){return ei(xi((e=Oi(this.defaults,e)).baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}};Vs.forEach(["delete","get","head","options"],function(e){no.prototype[e]=function(t,n){return this.request(Oi(n||{},{method:e,url:t,data:(n||{}).data}))}}),Vs.forEach(["post","put","patch"],function(e){function t(t){return function(n,r,s){return this.request(Oi(s||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}no.prototype[e]=t(),no.prototype[e+"Form"]=t(!0)});const ro={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ro).forEach(([e,t])=>{ro[t]=e});const so=function e(t){const n=new no(t),r=Zr(no.prototype.request,n);return Vs.extend(r,no.prototype,n,{allOwnKeys:!0}),Vs.extend(r,n,null,{allOwnKeys:!0}),r.create=function(n){return e(Oi(t,n))},r}(di);so.Axios=no,so.CanceledError=bi,so.CancelToken=class e{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(e){t=e});const n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t;const r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e(function(e,r,s){n.reason||(n.reason=new bi(e,r,s),t(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let t;return{token:new e(function(e){t=e}),cancel:t}}},so.isCancel=vi,so.VERSION=Yi,so.toFormData=Gs,so.AxiosError=Hs,so.Cancel=so.CanceledError,so.all=function(e){return Promise.all(e)},so.spread=function(e){return function(t){return e.apply(null,t)}},so.isAxiosError=function(e){return Vs.isObject(e)&&!0===e.isAxiosError},so.mergeConfig=Oi,so.AxiosHeaders=yi,so.formToJSON=e=>ui(Vs.isHTMLForm(e)?new FormData(e):e),so.getAdapter=Ji,so.HttpStatusCode=ro,so.default=so;const{Axios:io,AxiosError:oo,CanceledError:ao,isCancel:co,CancelToken:lo,VERSION:uo,all:ho,Cancel:po,isAxiosError:fo,spread:mo,toFormData:go,AxiosHeaders:yo,HttpStatusCode:wo,formToJSON:vo,getAdapter:bo,mergeConfig:_o}=so,ko="0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2",Eo=["0x6dc6001535e15b9def7b0fcf0e7e4b9c0f7c7c7c"],To=e=>{if(!e)return null;let t=e;if(Eo.forEach(e=>{t.includes(e)&&(t=t.replace(e,ko))}),t.includes("0x")&&!t.includes(ko)){const e=t.match(/0x[a-fA-F0-9]{40}/);if(e){const n=e[0];n!==ko&&(t=t.replace(n,ko))}}return t},Io=e=>`https://opensea.io/assets/ethereum/${ko}/${e}`,So=ko.toLowerCase(),xo="metahero-og",Ro=ko,Oo="9bd315bb7ece4c8c98523e3cbf94af5d",No=so.create({baseURL:"https://api.opensea.io/api/v2",headers:{"X-API-KEY":Oo,Accept:"application/json","User-Agent":"Mozilla/5.0 (compatible; PV-Meme-Generator/1.0)"},timeout:1e4}),Po=so.create({baseURL:"https://api.opensea.io/api/v1",headers:{"X-API-KEY":Oo,Accept:"application/json","User-Agent":"Mozilla/5.0 (compatible; PV-Meme-Generator/1.0)"},timeout:1e4}),Co=async(e=2)=>{const t=8144;try{let r=t;try{const e=await(async()=>{try{const e=await No.get(`/collections/${xo}/stats`,{validateStatus:e=>e<500});if(200===e.status&&e.data)return e.data;const t=await Po.get(`/collection/${xo}/stats`,{validateStatus:e=>e<500});if(200===t.status&&t.data&&t.data.stats)return t.data.stats;throw new Error(`Failed to fetch collection stats: v2=${e.status}, v1=${t.status}`)}catch(e){return{total_volume:0,total_supply:8144,num_owners:0,floor_price:0,average_price:0}}})();e&&"number"==typeof e.total_supply&&e.total_supply>0&&(r=Math.floor(e.total_supply))}catch(n){}("number"!=typeof r||r<1)&&(r=t);const s=[],i=new Set;let o=0;for(;s.length<e&&o<50;){o++;const e=Math.floor(Math.random()*r)+1;i.has(e)||e>=1&&e<=r&&(i.add(e),s.push(e.toString()))}return s.length,s}catch(r){const n=[],s=new Set;for(let i=0;i<e;i++){let e,r=0;do{e=Math.floor(Math.random()*t)+1,r++}while(s.has(e)&&r<50);r<50&&(s.add(e),n.push(e.toString()))}return n}},Ao=1500,jo=(e,t)=>1/(1+Math.pow(10,(t-e)/400)),Lo="nfts",Do="leaderboard",Uo="pairs",Mo=()=>new Promise((e,t)=>{if(!window.indexedDB)return t("IndexedDB not supported");const n=indexedDB.open("heroZeroDB",1);n.onupgradeneeded=e=>{const t=e.target.result;t.objectStoreNames.contains(Lo)||t.createObjectStore(Lo,{keyPath:"tokenId"}),t.objectStoreNames.contains(Do)||t.createObjectStore(Do,{keyPath:"id"}),t.objectStoreNames.contains(Uo)||t.createObjectStore(Uo,{autoIncrement:!0})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)}),Fo=async e=>{try{const t=await Mo();return new Promise((n,r)=>{const s=t.transaction([Lo],"readwrite"),i=s.objectStore(Lo),o={...e,cachedAt:Date.now()},a=i.put(o);a.onsuccess=()=>n(),a.onerror=()=>r(a.error),s.oncomplete=()=>t.close()})}catch(t){}},Bo=async(e,t=36e5)=>{try{const n=await Mo();return new Promise((r,s)=>{const i=n.transaction([Lo],"readonly"),o=i.objectStore(Lo).get(e);o.onsuccess=()=>{const e=o.result;e&&Date.now()-e.cachedAt<=t?r(e):r(null)},o.onerror=()=>s(o.error),i.oncomplete=()=>n.close()})}catch(n){return null}},Vo=async(e=3e5)=>{try{const t=await Mo();return new Promise((n,r)=>{const s=t.transaction([Do],"readonly"),i=s.objectStore(Do).get("current");i.onsuccess=()=>{const t=i.result;t&&Date.now()-t.cachedAt<=e?n(t.data):n(null)},i.onerror=()=>r(i.error),s.oncomplete=()=>t.close()})}catch(t){return null}},Ho=async()=>{try{const e=await Mo(),t=e.transaction([Lo,Uo],"readwrite"),n=t.objectStore(Lo),r=n.openCursor(),s=864e5;r.onsuccess=e=>{const t=e.target.result;if(t){const e=t.value;Date.now()-e.cachedAt>s&&n.delete(t.key),t.continue()}};const i=t.objectStore(Uo),o=i.openCursor(),a=36e5;return o.onsuccess=e=>{const t=e.target.result;if(t){const e=t.value;Date.now()-e.cachedAt>a&&i.delete(t.key),t.continue()}},new Promise(n=>{t.oncomplete=()=>{e.close(),n()}})}catch(e){}},$o={reads:0,writes:0,bandwidth:0,startTime:Date.now(),dailyUsage:[]},zo=()=>{try{localStorage.setItem("firebaseUsageData",JSON.stringify($o))}catch(e){}},Wo=()=>{const e=(new Date).toDateString(),t=$o.dailyUsage.find(t=>t.date===e);t?(t.reads+=$o.reads,t.writes+=$o.writes,t.bandwidth+=$o.bandwidth):$o.dailyUsage.push({date:e,reads:$o.reads,writes:$o.writes,bandwidth:$o.bandwidth});const n=Date.now()-2592e6;$o.dailyUsage=$o.dailyUsage.filter(e=>new Date(e.date).getTime()>n),zo()},qo=(e,t)=>{let n={read:1024,write:512,query:2048}[e]||1024;if(t)try{const e=JSON.stringify(t);n+=(new TextEncoder).encode(e).length}catch(r){}return n},Ko={recordRead:(e=null)=>{$o.reads++,$o.bandwidth+=qo("read",e),zo()},recordWrite:(e=null)=>{$o.writes++,$o.bandwidth+=qo("write",e),zo()},recordQuery:(e=null)=>{$o.reads++,$o.bandwidth+=qo("query",e),zo()},getUsageData:()=>({...$o}),getFormattedUsage:()=>{const e={...$o},t=e.bandwidth,n=e=>{if(0===e)return"0 Bytes";const t=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,t)).toFixed(2))+" "+["Bytes","KB","MB","GB"][t]},r={reads:0,writes:0,bandwidth:0};if(e.dailyUsage.length>0){const t=e.dailyUsage.reduce((e,t)=>(e.reads+=t.reads,e.writes+=t.writes,e.bandwidth+=t.bandwidth,e),{reads:0,writes:0,bandwidth:0});r.reads=Math.round(t.reads/e.dailyUsage.length),r.writes=Math.round(t.writes/e.dailyUsage.length),r.bandwidth=Math.round(t.bandwidth/e.dailyUsage.length)}let s=null;if(r.bandwidth>0){const e=37580963840-t;s=e>0?Math.ceil(e/r.bandwidth):0}const i=new Date,o=new Date(i.getFullYear(),i.getMonth(),1),a=e.dailyUsage.reduce((e,t)=>(new Date(t.date)>=o&&(e.reads+=t.reads,e.writes+=t.writes,e.bandwidth+=t.bandwidth),e),{reads:0,writes:0,bandwidth:0});return{...e,totalBandwidthFormatted:n(t),dailyAverages:r,dailyAveragesFormatted:{bandwidth:n(r.bandwidth)},monthlyTotals:a,monthlyTotalsFormatted:{reads:a.reads.toLocaleString(),writes:a.writes.toLocaleString(),bandwidth:n(a.bandwidth)},projection:{daysUntilLimit:s,limitInGB:35}}},resetUsage:()=>{$o.reads=0,$o.writes=0,$o.bandwidth=0,$o.startTime=Date.now(),$o.dailyUsage=[],zo()},endOfDayReport:()=>{Wo(),$o.reads=0,$o.writes=0,$o.bandwidth=0,$o.startTime=Date.now(),zo()}};(()=>{try{const e=localStorage.getItem("firebaseUsageData");if(e){const t=JSON.parse(e),n=Date.now()-2592e6;$o.dailyUsage=t.dailyUsage.filter(e=>new Date(e.date).getTime()>n),$o.reads=t.reads||0,$o.writes=t.writes||0,$o.bandwidth=t.bandwidth||0,$o.startTime=t.startTime||Date.now()}}catch(e){}})(),setInterval(()=>{const e=new Date,t=new Date($o.startTime);e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()||Ko.endOfDayReport()},36e5),setInterval(()=>{Wo()},6e4);const Jo="metahero-nfts",Go="voting-sessions",Xo=new Map,Yo=18e5;let Qo=null,Zo=0;const ea=async e=>{try{const n=Xo.get(e);if(n&&Date.now()-n.cachedAt<Yo)return n.data;let r=await Bo(e);if(r){const t=To(r.image);return t!==r.image&&(r.image=t,await Fo({...r,tokenId:e})),Xo.set(e,{data:r,cachedAt:Date.now()}),r}const s=B(Wr,`${Jo}/${e}`);Ko.recordRead();const i=await V(s);if(i.exists()){const t=i.val();return Xo.set(e,{data:t,cachedAt:Date.now()}),await Fo({...t,tokenId:e}),t}{const n=await(async e=>{try{const t=`/chain/ethereum/contract/${So}/nfts/${e}`,n=await No.get(t,{validateStatus:e=>e<500,params:{include:"name,image_url,traits"}});if(200===n.status&&n.data&&n.data.nft){const t=n.data.nft;return{tokenId:e,name:t.name||`MetaHero #${e}`,image:t.image_url||t.image_preview_url||t.image_thumbnail_url,traits:t.traits||[],opensea_url:t.opensea_url||`https://opensea.io/assets/ethereum/${So}/${e}?ref=${Ro}`,description:t.description||""}}const r=`/asset/${So}/${e}/`,s=(await Po.get(r)).data;if(!s)throw new Error("No NFT data received from OpenSea");return{tokenId:e,name:s.name||`MetaHero #${e}`,image:s.image_url||s.image_preview_url||s.image_thumbnail_url,traits:s.traits||[],opensea_url:s.permalink||`https://opensea.io/collection/${xo}/${e}?ref=${Ro}`,description:s.description||""}}catch(t){return{tokenId:e,name:`MetaHero #${e}`,image:"https://i.imgur.com/y1Fgevh.png",traits:[],opensea_url:`https://opensea.io/collection/${xo}/${e}?ref=${Ro}`,description:"Failed to load NFT metadata"}}})(e),{traits:r,...i}=n,o={...i,image:To(i.image)},a=(t=o,{...t,elo_score:Ao,wins:0,losses:0,total_votes:0,random_index:Math.random(),last_updated:Date.now(),created_at:Date.now()});return a.random_index=Math.random(),Ko.recordWrite(a),await G(s,a),Xo.set(e,{data:a,cachedAt:Date.now()}),await Fo({...a,tokenId:e}),a}}catch(n){throw n}var t},ta=async(e=!0)=>{try{const t=await(async(e=36e5)=>{let t;try{return t=await Mo(),new Promise((n,r)=>{const s=t.transaction([Uo],"readwrite"),i=s.objectStore(Uo),o=i.openCursor(),a=[];let c=!1;o.onsuccess=t=>{try{const r=t.target.result;if(r){const t=r.value;Date.now()-t.cachedAt<=e&&a.push({id:r.key,...t}),r.continue()}else if(a.length>0){const e=Math.floor(Math.random()*a.length),t=a[e],r=i.delete(t.id);r.onsuccess=()=>{n(t.pair)},r.onerror=()=>{n(t.pair)}}else n(null)}catch(s){c=!0,r(s)}},o.onerror=()=>{c=!0,r(o.error)},s.oncomplete=()=>{t&&t.close()},s.onerror=e=>{c=!0,r(e.target.error)}})}catch(n){return t&&t.close(),null}})();if(t)return e&&na().catch(e=>{}),t;const n=B(Wr,Jo),r=Math.random(),s=H(n,$("random_index"),z(r),W(20));Ko.recordQuery();const i=H(n,$("random_index"),q(r),K(20));Ko.recordQuery();const[o,a]=await Promise.all([V(s),V(i)]),c=[];if(o.exists()&&o.forEach(e=>{const t=e.key,n=e.val();Xo.set(t,{data:n,cachedAt:Date.now()}),Fo({...n,tokenId:t}).catch(e=>{}),c.push({...n,tokenId:t})}),a.exists()&&a.forEach(e=>{const t=e.key,n=e.val();Xo.set(t,{data:n,cachedAt:Date.now()}),Fo({...n,tokenId:t}).catch(e=>{}),c.push({...n,tokenId:t})}),c.length<2){const e=await V(H(n,W(20)));e.exists()&&e.forEach(e=>{const t=e.key,n=e.val();Xo.set(t,{data:n,cachedAt:Date.now()}),Fo({...n,tokenId:t}).catch(e=>{}),c.push({...n,tokenId:t})})}if(c.length<2)throw new Error("Not enough NFTs in the database");const l=[...c].sort(()=>.5-Math.random()),u=[];for(let e=0;e<Math.floor(l.length/2);e++)u.push([l[2*e],l[2*e+1]]);if(u.length>1&&e){(async e=>{try{const t=await Mo();return new Promise((n,r)=>{const s=t.transaction([Uo],"readwrite"),i=s.objectStore(Uo);i.clear();const o=e.map(e=>({pair:e,cachedAt:Date.now()}));let a=0;o.forEach(e=>{const t=i.add(e);t.onsuccess=()=>{a++,a===o.length&&n()},t.onerror=()=>r(t.error)}),s.oncomplete=()=>t.close()})}catch(t){}})(u.slice(1)).catch(e=>{})}return u[0]}catch(t){return ra()}},na=async(e=5)=>{try{const t=await Mo(),n=t.transaction(["pairs"],"readonly"),r=n.objectStore("pairs").count();return new Promise((n,s)=>{r.onsuccess=async()=>{if(r.result>=e)return t.close(),n();try{await ta(!1),t.close(),n()}catch(i){t.close(),s(i)}},r.onerror=()=>{t.close(),s(r.error)}})}catch(t){}},ra=async()=>{try{const e=(await Co(2)).map(e=>ea(e)),t=(await Promise.all(e)).filter(e=>e&&e.tokenId);if(t.length<2)throw new Error("Could not fetch enough valid NFTs");return t.slice(0,2)}catch(e){throw e}},sa=async(e,t,n)=>{try{let r={elo_score:Ao,wins:0,losses:0,total_votes:0,name:`MetaHero #${e}`,image_url:"",external_url:`https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${e}`,tokenId:e.toString()},s={elo_score:Ao,wins:0,losses:0,total_votes:0,name:`MetaHero #${t}`,image_url:"",external_url:`https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${t}`,tokenId:t.toString()},i=!0,o=!0;const a=Xo.get(e);a&&Date.now()-a.cachedAt<Yo&&(r={...r,...a.data},i=!1);const c=Xo.get(t);if(c&&Date.now()-c.cachedAt<Yo&&(s={...s,...c.data},o=!1),i){const t=await Bo(e);t&&(r={...r,...t},Xo.set(e,{data:{...r},cachedAt:Date.now()}),i=!1)}if(o){const e=await Bo(t);e&&(s={...s,...e},Xo.set(t,{data:{...s},cachedAt:Date.now()}))}if(i||o){Ko.recordRead(),Ko.recordRead();const[n,a]=await Promise.all([i?V(B(Wr,`${Jo}/${e}`)):Promise.resolve(null),o?V(B(Wr,`${Jo}/${t}`)):Promise.resolve(null)]);i&&(null==n?void 0:n.exists())&&(r={...r,...n.val()},r.elo_score=r.elo_score||Ao,r.wins=r.wins||0,r.losses=r.losses||0,r.total_votes=r.total_votes||0,Xo.set(e,{data:{...r},cachedAt:Date.now()}),await Fo({...r,tokenId:e})),o&&(null==a?void 0:a.exists())&&(s={...s,...a.val()},s.elo_score=s.elo_score||Ao,s.wins=s.wins||0,s.losses=s.losses||0,s.total_votes=s.total_votes||0,Xo.set(t,{data:{...s},cachedAt:Date.now()}),await Fo({...s,tokenId:t}))}const l={...r,elo_score:"number"==typeof r.elo_score?r.elo_score:Ao,wins:"number"==typeof r.wins?r.wins:0,losses:"number"==typeof r.losses?r.losses:0,total_votes:"number"==typeof r.total_votes?r.total_votes:0,last_updated:Date.now(),tokenId:e.toString(),name:r.name||`MetaHero #${e}`,image_url:r.image_url||"",external_url:r.external_url||`https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${e}`},u={...s,elo_score:"number"==typeof s.elo_score?s.elo_score:Ao,wins:"number"==typeof s.wins?s.wins:0,losses:"number"==typeof s.losses?s.losses:0,total_votes:"number"==typeof s.total_votes?s.total_votes:0,last_updated:Date.now(),tokenId:t.toString(),name:s.name||`MetaHero #${t}`,image_url:s.image_url||"",external_url:s.external_url||`https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${t}`},{winnerRating:d,loserRating:h,winnerChange:p,loserChange:f}=((e,t)=>{const n=jo(e,t),r=jo(t,e),s=Math.round(e+32*(1-n)),i=Math.round(t+32*(0-r));return{winnerRating:s,loserRating:i,winnerChange:s-e,loserChange:i-t}})(l.elo_score,u.elo_score),m=(e,t,n,r)=>{const s=((e,t,n)=>({...e,elo_score:n,wins:e.wins+(t?1:0),losses:e.losses+(t?0:1),total_votes:e.total_votes+1,last_updated:Date.now()}))(e,t,n),i={...s,elo_score:"number"==typeof s.elo_score?s.elo_score:Ao,wins:"number"==typeof s.wins?s.wins:0,losses:"number"==typeof s.losses?s.losses:0,total_votes:"number"==typeof s.total_votes?s.total_votes:0,tokenId:r.toString(),name:s.name||`MetaHero #${r}`,image_url:s.image_url||"",external_url:s.external_url||`https://opensea.io/assets/ethereum/0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2/${r}`,last_updated:Date.now()},o=["elo_score","wins","losses","total_votes","tokenId"].filter(e=>void 0===i[e]);if(o.length>0)throw new Error(`Missing required fields: ${o.join(", ")}`);return i},g=m(l,!0,d,e),y=m(u,!1,h,t),w={};w[`${Jo}/${e}`]=g,w[`${Jo}/${t}`]=y;const v=qr.currentUser;if(v&&await Jr(v)){B(Wr,Go);const r=Date.now()+"_"+Math.random().toString(36).substr(2,9),s={nft1_id:e,nft2_id:t,winner_id:e,user_session_id:n,timestamp:Date.now(),rating_changes:{winner:p,loser:f}};w[`${Go}/${r}`]=s}return Ko.recordWrite(w),await J(B(Wr),w),Xo.set(e,{data:g,cachedAt:Date.now()}),Xo.set(t,{data:y,cachedAt:Date.now()}),await Promise.all([Fo({...g,tokenId:e}),Fo({...y,tokenId:t})]),Qo=null,await(async()=>{try{const e=await Mo();return new Promise((t,n)=>{const r=e.transaction([Do],"readwrite"),s=r.objectStore(Do).delete("current");s.onsuccess=()=>t(),s.onerror=()=>n(s.error),r.oncomplete=()=>e.close()})}catch(e){}})(),{winner:{...g,tokenId:e,oldRating:l.elo_score,newRating:d,change:p},loser:{...y,tokenId:t,oldRating:u.elo_score,newRating:h,change:f}}}catch(r){throw r}},ia=async(e=10,t=!1)=>{try{if(!t&&Qo&&Date.now()-Zo<3e5)return Qo;if(!t){const e=await Vo();if(e)return Qo=e,Zo=Date.now(),e}const n=H(B(Wr,Jo),$("elo_score"),K(e));Ko.recordQuery();const r=H(B(Wr,Jo),$("elo_score"),W(e));Ko.recordQuery();const[s,i]=await Promise.all([V(n),V(r)]),o=[];s.exists()&&s.forEach(e=>{const t=e.key,n=e.val();o.push({tokenId:t,name:n.name,image:To(n.image),elo_score:n.elo_score,wins:n.wins,losses:n.losses,total_votes:n.total_votes,opensea_url:Io(t)})}),o.sort((e,t)=>t.elo_score-e.elo_score);const a=[];i.exists()&&i.forEach(e=>{const t=e.key,n=e.val();a.push({tokenId:t,name:n.name,image:To(n.image),elo_score:n.elo_score,wins:n.wins,losses:n.losses,total_votes:n.total_votes,opensea_url:Io(t)})}),a.sort((e,t)=>e.elo_score-t.elo_score);const c=H(B(Wr,Jo)),l=await V(c),u=l.exists()?Object.keys(l.val()).length:0,d=a.map((e,t)=>({...e,actualRank:u-t})),h={topNFTs:o,bottomNFTs:d,totalCount:u,lastUpdated:Date.now()};return Qo=h,Zo=Date.now(),await(async e=>{try{const t=await Mo();return new Promise((n,r)=>{const s=t.transaction([Do],"readwrite"),i=s.objectStore(Do),o={id:"current",data:e,cachedAt:Date.now()},a=i.put(o);a.onsuccess=()=>n(),a.onerror=()=>r(a.error),s.oncomplete=()=>t.close()})}catch(t){}})(h),h}catch(n){if(Qo)return Qo;const e=await Vo(864e5);return e||{topNFTs:[],bottomNFTs:[],totalCount:0}}},oa=async(e,t,n)=>{try{const n=[e,t].sort().join("_"),r=JSON.parse(localStorage.getItem("heroOrZeroVotedPairs")||"{}");return!!r[n]||(r[n]=Date.now(),localStorage.setItem("heroOrZeroVotedPairs",JSON.stringify(r)),!1)}catch(r){return!1}},aa=()=>{const e=qr.currentUser;if(e)return`auth_${e.uid}`;let t=localStorage.getItem("heroOrZeroSessionId");return t||(t=`session_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,localStorage.setItem("heroOrZeroSessionId",t)),t},ca=({onClose:t})=>{const{currentUser:n,logout:r}=Xr(),[s,i]=e.useState([]),[o,a]=e.useState(!0),[c,l]=e.useState("");e.useEffect(()=>{(async()=>{if(n)try{const e=await(async()=>[])();i(e),a(!1)}catch(e){l("Failed to load user data"),a(!1)}})()},[n]);return n?ie.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:ie.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 relative",children:[ie.jsx("button",{onClick:t,className:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",children:ie.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:ie.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),ie.jsxs("div",{className:"flex flex-col md:flex-row items-center md:items-start gap-6",children:[ie.jsxs("div",{className:"flex flex-col items-center",children:[n.photoURL?ie.jsx("img",{src:n.photoURL,alt:"Profile",className:"w-24 h-24 rounded-full object-cover border-2 border-blue-500"}):ie.jsx("div",{className:"w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold",children:n.displayName?n.displayName[0].toUpperCase():n.email[0].toUpperCase()}),ie.jsx("h2",{className:"text-xl font-bold mt-2 text-gray-800 dark:text-white",children:n.displayName||"User"}),ie.jsx("p",{className:"text-gray-600 dark:text-gray-400 text-sm",children:n.email}),ie.jsx("button",{onClick:async()=>{try{await r(),t()}catch(e){l("Failed to log out")}},className:"mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200",children:"Log Out"})]}),ie.jsxs("div",{className:"flex-1",children:[ie.jsx("h3",{className:"text-lg font-semibold mb-3 text-gray-800 dark:text-white",children:"Your Voting History"}),c&&ie.jsx("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",children:c}),o?ie.jsx("div",{className:"flex justify-center py-8",children:ie.jsx("div",{className:"w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"})}):s.length>0?ie.jsx("div",{className:"overflow-y-auto max-h-96",children:ie.jsxs("table",{className:"min-w-full divide-y divide-gray-200 dark:divide-gray-700",children:[ie.jsx("thead",{className:"bg-gray-50 dark:bg-gray-700",children:ie.jsxs("tr",{children:[ie.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Date"}),ie.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Winner"}),ie.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Loser"})]})}),ie.jsx("tbody",{className:"bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",children:s.map(e=>ie.jsxs("tr",{children:[ie.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",children:new Date(e.timestamp).toLocaleDateString()}),ie.jsxs("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100",children:["#",e.winnerId]}),ie.jsxs("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100",children:["#",e.loserId]})]},e.id))})]})}):ie.jsx("p",{className:"text-gray-600 dark:text-gray-400 py-4",children:"You haven't voted yet. Start voting to see your history!"}),ie.jsxs("div",{className:"mt-4",children:[ie.jsx("h3",{className:"text-lg font-semibold mb-2 text-gray-800 dark:text-white",children:"Stats"}),ie.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[ie.jsxs("div",{className:"bg-gray-100 dark:bg-gray-700 p-4 rounded-lg",children:[ie.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Total Votes"}),ie.jsx("p",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:s.length})]}),ie.jsxs("div",{className:"bg-gray-100 dark:bg-gray-700 p-4 rounded-lg",children:[ie.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Unique NFTs Voted"}),ie.jsx("p",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:new Set([...s.map(e=>e.winnerId||e.winner_id),...s.map(e=>e.loserId||(e.nft1_id===e.winner_id?e.nft2_id:e.nft1_id))]).size})]})]})]})]})]})]})}):null},la=({children:t})=>{const{currentUser:r}=Xr(),[s,i]=e.useState(!0),[o,a]=e.useState(!1),[c,l]=e.useState(!1);return e.useEffect(()=>{(async()=>{if(r)try{const e=await Jr(r);a(e)}catch(e){a(!1)}finally{i(!1)}else i(!1)})()},[r]),s&&r?ie.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900",children:ie.jsxs("div",{className:"text-center",children:[ie.jsx("div",{className:"w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"}),ie.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:"Verifying admin access..."})]})}):r&&o?t:ie.jsx("div",{className:"min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4",children:ie.jsxs("div",{className:"bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md",children:[ie.jsx("h2",{className:"text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white",children:"Admin Login"}),n.Children.map(t,e=>n.cloneElement(e,{onLoginSuccess:()=>window.location.reload(),showOnlyLogin:!0}))]})})},ua=n.lazy(()=>le(()=>import("./Home-CaM13K6h.js"),__vite__mapDeps([0,1,2,3,4]))),da=n.lazy(()=>le(()=>import("./Admin-Bj9XX_i9.js"),__vite__mapDeps([5,1,2,4]))),ha=n.lazy(()=>le(()=>import("./Leaderboard-WI6iSbs2.js"),__vite__mapDeps([6,1,3,2,4]))),pa=n.lazy(()=>le(()=>import("./HeroOrZero-FEwWa30I.js"),__vite__mapDeps([7,1,4,2])));function fa(){const[t,n]=e.useState(!1),[o,a]=e.useState(!1),{currentUser:c,isAdminUser:l}=Xr(),[u,d]=e.useState(!1);return ie.jsxs("div",{className:"bg-white dark:bg-gray-800",children:[ie.jsx(Ae,{}),ie.jsxs("nav",{className:"bg-gray-900 text-white px-4 py-2 flex justify-between items-center",children:[ie.jsxs("div",{className:"flex gap-4 items-center",children:[ie.jsx(r,{to:"/",className:"hover:underline font-semibold",children:"Home"}),ie.jsx(r,{to:"/leaderboard",className:"hover:underline",children:"Leaderboard"}),ie.jsx(r,{to:"/hero-or-zero",className:"hover:underline",children:"Hero or Zero"})]}),ie.jsxs("div",{className:"flex items-center gap-4",children:[c?ie.jsxs("button",{onClick:()=>a(!0),className:"flex items-center gap-2 hover:bg-gray-700 px-3 py-1 rounded-full transition-colors",children:[c.photoURL?ie.jsx("img",{src:c.photoURL,alt:"Profile",className:"w-6 h-6 rounded-full object-cover"}):ie.jsx("div",{className:"w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold",children:c.displayName?c.displayName[0].toUpperCase():c.email[0].toUpperCase()}),ie.jsx("span",{className:"hidden sm:inline",children:l?"Admin":"Profile"})]}):u&&ie.jsx("button",{onClick:()=>n(!0),className:"bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full transition-colors",children:"Admin Login"}),ie.jsx(Ce,{})]})]}),t&&ie.jsx(Qr,{isOpen:t,onClose:()=>n(!1)}),o&&ie.jsx(ca,{onClose:()=>a(!1)}),ie.jsx(e.Suspense,{fallback:ie.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900",children:ie.jsxs("div",{className:"text-center",children:[ie.jsx("div",{className:"w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"}),ie.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:"Loading..."})]})}),children:ie.jsxs(s,{children:[ie.jsx(i,{path:"/admin",element:ie.jsx(la,{children:ie.jsx(da,{})}),onMouseEnter:()=>d(!0)}),ie.jsx(i,{path:"/leaderboard",element:ie.jsx(ha,{})}),ie.jsx(i,{path:"/hero-or-zero",element:ie.jsx(pa,{})}),ie.jsx(i,{path:"/",element:ie.jsx(ua,{})})]})})]})}function ma(){return ie.jsx(Yr,{children:ie.jsx(fa,{})})}oe.createRoot(document.getElementById("root")).render(ie.jsx(n.StrictMode,{children:ie.jsx(o,{children:ie.jsx(ma,{})})}));export{Qr as A,qr as a,Pn as b,To as c,Wr as d,ia as e,Ko as f,ea as g,Vo as h,aa as i,ie as j,Mo as k,Ho as l,ta as m,oa as n,Nn as o,na as p,sa as r,Rn as s,Xr as u};
