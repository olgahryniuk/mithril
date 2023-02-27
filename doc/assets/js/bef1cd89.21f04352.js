"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[8587],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(r),d=o,f=p["".concat(s,".").concat(d)]||p[d]||m[d]||a;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},24956:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(87462),o=(r(67294),r(3905));const a={slug:2,title:"2. Use simple structured logging\n",authors:[{name:"Mithril Team"}],tags:["Draft"],date:new Date("2022-04-24T00:00:00.000Z")},i=void 0,l={permalink:"/doc/adr/2",source:"@site/adr/002-use-structured-logging.md",title:"2. Use simple structured logging\n",description:"Status",date:"2022-04-24T00:00:00.000Z",formattedDate:"April 24, 2022",tags:[{label:"Draft",permalink:"/doc/adr/tags/draft"}],readingTime:.665,hasTruncateMarker:!1,authors:[{name:"Mithril Team"}],frontMatter:{slug:"2",title:"2. Use simple structured logging\n",authors:[{name:"Mithril Team"}],tags:["Draft"],date:"2022-04-24T00:00:00.000Z"},prevItem:{title:"3. Release process and versioning\n",permalink:"/doc/adr/3"},nextItem:{title:"1. Record Architecture Decisions\n",permalink:"/doc/adr/1"}},s={authorsImageUrls:[void 0]},c=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2}],u={toc:c},p="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"status"},"Status"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Draft")),(0,o.kt)("h2",{id:"context"},"Context"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Logs are a critical tool for operating any software system, enabling ",(0,o.kt)("a",{parentName:"li",href:"https://cloud.google.com/architecture/devops/devops-measurement-monitoring-and-observability"},"observability")," of the system."),(0,o.kt)("li",{parentName:"ul"},"Following ",(0,o.kt)("a",{parentName:"li",href:"https://12factor.net/logs"},"12 Factor Apps")," principles, providing the needed components and tools to be able to configure logging and monitoring should not be the responsibility of the software components")),(0,o.kt)("h2",{id:"decision"},"Decision"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Therefore")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Each component of the system use ",(0,o.kt)("a",{parentName:"li",href:"https://www.sumologic.com/glossary/structured-logging/"},"Structured logging")," using documented and standardised JSON format for its logs"),(0,o.kt)("li",{parentName:"ul"},"Logs are always emitted to ",(0,o.kt)("inlineCode",{parentName:"li"},"stdout")," of the process the component is part of")),(0,o.kt)("h2",{id:"consequences"},"Consequences"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The schema of the logged items should be properly documented in a JSON schema"),(0,o.kt)("li",{parentName:"ul"},"It is the responsibility of the node operator to consume the logs and process them"),(0,o.kt)("li",{parentName:"ul"},"We use existing libraries to provide needed log infrastructure, like ",(0,o.kt)("a",{parentName:"li",href:"https://zsiciarz.github.io/24daysofrust/book/vol2/day4.html"},"slog")," for Rust")))}m.isMDXComponent=!0}}]);