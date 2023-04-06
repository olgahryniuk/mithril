"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[5458],{3905:(t,e,r)=>{r.d(e,{Zo:()=>d,kt:()=>g});var a=r(67294);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function o(t,e){if(null==t)return{};var r,a,n=function(t,e){if(null==t)return{};var r,a,n={},i=Object.keys(t);for(a=0;a<i.length;a++)r=i[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)r=i[a],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var p=a.createContext({}),u=function(t){var e=a.useContext(p),r=e;return t&&(r="function"==typeof t?t(e):l(l({},e),t)),r},d=function(t){var e=u(t.components);return a.createElement(p.Provider,{value:e},t.children)},m="mdxType",s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},k=a.forwardRef((function(t,e){var r=t.components,n=t.mdxType,i=t.originalType,p=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),m=u(r),k=n,g=m["".concat(p,".").concat(k)]||m[k]||s[k]||i;return r?a.createElement(g,l(l({ref:e},d),{},{components:r})):a.createElement(g,l({ref:e},d))}));function g(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var i=r.length,l=new Array(i);l[0]=k;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o[m]="string"==typeof t?t:n,l[1]=o;for(var u=2;u<i;u++)l[u]=r[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}k.displayName="MDXCreateElement"},85162:(t,e,r)=>{r.d(e,{Z:()=>l});var a=r(67294),n=r(86010);const i={tabItem:"tabItem_Ymn6"};function l(t){let{children:e,hidden:r,className:l}=t;return a.createElement("div",{role:"tabpanel",className:(0,n.Z)(i.tabItem,l),hidden:r},e)}},74866:(t,e,r)=>{r.d(e,{Z:()=>w});var a=r(87462),n=r(67294),i=r(86010),l=r(12466),o=r(16550),p=r(91980),u=r(67392),d=r(50012);function m(t){return function(t){return n.Children.map(t,(t=>{if(!t||(0,n.isValidElement)(t)&&function(t){const{props:e}=t;return!!e&&"object"==typeof e&&"value"in e}(t))return t;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof t.type?t.type:t.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(t).map((t=>{let{props:{value:e,label:r,attributes:a,default:n}}=t;return{value:e,label:r,attributes:a,default:n}}))}function s(t){const{values:e,children:r}=t;return(0,n.useMemo)((()=>{const t=e??m(r);return function(t){const e=(0,u.l)(t,((t,e)=>t.value===e.value));if(e.length>0)throw new Error(`Docusaurus error: Duplicate values "${e.map((t=>t.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(t),t}),[e,r])}function k(t){let{value:e,tabValues:r}=t;return r.some((t=>t.value===e))}function g(t){let{queryString:e=!1,groupId:r}=t;const a=(0,o.k6)(),i=function(t){let{queryString:e=!1,groupId:r}=t;if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:e,groupId:r});return[(0,p._X)(i),(0,n.useCallback)((t=>{if(!i)return;const e=new URLSearchParams(a.location.search);e.set(i,t),a.replace({...a.location,search:e.toString()})}),[i,a])]}function N(t){const{defaultValue:e,queryString:r=!1,groupId:a}=t,i=s(t),[l,o]=(0,n.useState)((()=>function(t){let{defaultValue:e,tabValues:r}=t;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!k({value:e,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${r.map((t=>t.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const a=r.find((t=>t.default))??r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:e,tabValues:i}))),[p,u]=g({queryString:r,groupId:a}),[m,N]=function(t){let{groupId:e}=t;const r=function(t){return t?`docusaurus.tab.${t}`:null}(e),[a,i]=(0,d.Nk)(r);return[a,(0,n.useCallback)((t=>{r&&i.set(t)}),[r,i])]}({groupId:a}),c=(()=>{const t=p??m;return k({value:t,tabValues:i})?t:null})();(0,n.useLayoutEffect)((()=>{c&&o(c)}),[c]);return{selectedValue:l,selectValue:(0,n.useCallback)((t=>{if(!k({value:t,tabValues:i}))throw new Error(`Can't select invalid tab value=${t}`);o(t),u(t),N(t)}),[u,N,i]),tabValues:i}}var c=r(72389);const h={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(t){let{className:e,block:r,selectedValue:o,selectValue:p,tabValues:u}=t;const d=[],{blockElementScrollPositionUntilNextRender:m}=(0,l.o5)(),s=t=>{const e=t.currentTarget,r=d.indexOf(e),a=u[r].value;a!==o&&(m(e),p(a))},k=t=>{let e=null;switch(t.key){case"Enter":s(t);break;case"ArrowRight":{const r=d.indexOf(t.currentTarget)+1;e=d[r]??d[0];break}case"ArrowLeft":{const r=d.indexOf(t.currentTarget)-1;e=d[r]??d[d.length-1];break}}e?.focus()};return n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":r},e)},u.map((t=>{let{value:e,label:r,attributes:l}=t;return n.createElement("li",(0,a.Z)({role:"tab",tabIndex:o===e?0:-1,"aria-selected":o===e,key:e,ref:t=>d.push(t),onKeyDown:k,onClick:s},l,{className:(0,i.Z)("tabs__item",h.tabItem,l?.className,{"tabs__item--active":o===e})}),r??e)})))}function f(t){let{lazy:e,children:r,selectedValue:a}=t;const i=(Array.isArray(r)?r:[r]).filter(Boolean);if(e){const t=i.find((t=>t.props.value===a));return t?(0,n.cloneElement)(t,{className:"margin-top--md"}):null}return n.createElement("div",{className:"margin-top--md"},i.map(((t,e)=>(0,n.cloneElement)(t,{key:e,hidden:t.props.value!==a}))))}function y(t){const e=N(t);return n.createElement("div",{className:(0,i.Z)("tabs-container",h.tabList)},n.createElement(b,(0,a.Z)({},t,e)),n.createElement(f,(0,a.Z)({},t,e)))}function w(t){const e=(0,c.Z)();return n.createElement(y,(0,a.Z)({key:String(e)},t))}},5892:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>d,contentTitle:()=>p,default:()=>g,frontMatter:()=>o,metadata:()=>u,toc:()=>m});var a=r(87462),n=(r(67294),r(3905)),i=r(74866),l=r(85162);const o={unlisted:!0,hide_title:!0,hide_table_of_contents:!0},p=void 0,u={unversionedId:"networks-matrix",id:"version-maintained/networks-matrix",title:"networks-matrix",description:"Here is an up to date list of all the Mithril Networks, their configurations and their status:",source:"@site/versioned_docs/version-maintained/networks-matrix.md",sourceDirName:".",slug:"/networks-matrix",permalink:"/doc/networks-matrix",draft:!1,editUrl:"https://github.com/input-output-hk/mithril/edit/main/docs/root/networks-matrix.md",tags:[],version:"maintained",frontMatter:{unlisted:!0,hide_title:!0,hide_table_of_contents:!0}},d={},m=[{value:"<code>pre-release-preview</code>",id:"pre-release-preview",level:2},{value:"<code>testing-preview</code>",id:"testing-preview",level:2},{value:"<code>release-preprod</code>",id:"release-preprod",level:2},{value:"<code>release-mainnet</code>",id:"release-mainnet",level:2}],s={toc:m},k="wrapper";function g(t){let{components:e,...r}=t;return(0,n.kt)(k,(0,a.Z)({},s,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Here is an up to date list of all the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Networks"),", their configurations and their status:"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"Last update: 02/28/2023")),(0,n.kt)(i.Z,{mdxType:"Tabs"},(0,n.kt)(l.Z,{value:"preview",label:"Preview",default:!0,mdxType:"TabItem"},(0,n.kt)("h2",{id:"pre-release-preview"},(0,n.kt)("inlineCode",{parentName:"h2"},"pre-release-preview")),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Information"),(0,n.kt)("th",{parentName:"tr",align:null},"-"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Mithril Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"pre-release-preview")," ",(0,n.kt)("a",{parentName:"td",href:"https://mithril.network/explorer?aggregator=https%3A%2F%2Faggregator.pre-release-preview.api.mithril.network%2Faggregator"},"\ud83d\udd0e"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"preview"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Magic Id")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"2"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Supported")),(0,n.kt)("td",{parentName:"tr",align:null},"Yes \u2714\ufe0f")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Status")),(0,n.kt)("td",{parentName:"tr",align:null},"Pre-Release \ud83d\udfe0")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Aggregator Endpoint")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://aggregator.pre-release-preview.api.mithril.network/aggregator")," ",(0,n.kt)("a",{parentName:"td",href:"https://aggregator.pre-release-preview.api.mithril.network/aggregator"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Genesis Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/pre-release-preview/genesis.vkey")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/pre-release-preview/genesis.vkey"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Adapter Type")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"cardano-chain"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Address")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/pre-release-preview/era.addr")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/pre-release-preview/era.addr"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/pre-release-preview/era.vkey")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/pre-release-preview/era.vkey"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Build From")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Latest Pre-Release")," ",(0,n.kt)("a",{parentName:"td",href:"https://github.com/input-output-hk/mithril/releases?q=pre-release"},"\u2197\ufe0f"))))),(0,n.kt)("br",null),(0,n.kt)("h2",{id:"testing-preview"},(0,n.kt)("inlineCode",{parentName:"h2"},"testing-preview")),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u26a0\ufe0f For devs only")),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Information"),(0,n.kt)("th",{parentName:"tr",align:null},"-"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Mithril Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"testing-preview")," ",(0,n.kt)("a",{parentName:"td",href:"https://mithril.network/explorer?aggregator=https%3A%2F%2Faggregator.testing-preview.api.mithril.network%2Faggregator"},"\ud83d\udd0e"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"preview"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Magic Id")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"2"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Supported")),(0,n.kt)("td",{parentName:"tr",align:null},"Yes \u2714\ufe0f")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Status")),(0,n.kt)("td",{parentName:"tr",align:null},"Unstable \ud83d\udd34")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Aggregator Endpoint")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://aggregator.testing-preview.api.mithril.network/aggregator")," ",(0,n.kt)("a",{parentName:"td",href:"https://aggregator.testing-preview.api.mithril.network/aggregator"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Genesis Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/genesis.vkey")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/genesis.vkey"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Adapter Type")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"cardano-chain"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Address")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/era.addr")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/era.addr"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/era.vkey")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/era.vkey"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Build From")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Main Branch")," ",(0,n.kt)("a",{parentName:"td",href:"https://github.com/input-output-hk/mithril/tree/main"},"\u2197\ufe0f")))))),(0,n.kt)(l.Z,{value:"preprod",label:"Preprod",mdxType:"TabItem"},(0,n.kt)("h2",{id:"release-preprod"},(0,n.kt)("inlineCode",{parentName:"h2"},"release-preprod")),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Information"),(0,n.kt)("th",{parentName:"tr",align:null},"-"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Mithril Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"release-preprod")," ",(0,n.kt)("a",{parentName:"td",href:"https://mithril.network/explorer?aggregator=https%3A%2F%2Faggregator.release-preprod.api.mithril.network%2Faggregator"},"\ud83d\udd0e"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"preprod"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Magic Id")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"1"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Supported")),(0,n.kt)("td",{parentName:"tr",align:null},"Yes \u2714\ufe0f")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Status")),(0,n.kt)("td",{parentName:"tr",align:null},"Release \ud83d\udfe2")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Aggregator Endpoint")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://aggregator.release-preprod.api.mithril.network/aggregator")," ",(0,n.kt)("a",{parentName:"td",href:"https://aggregator.release-preprod.api.mithril.network/aggregator"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Genesis Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/release-preprod/genesis.vkey")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/release-preprod/genesis.vkey"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Adapter Type")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"cardano-chain"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Address")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/release-preprod/era.addr")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/release-preprod/era.addr"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/release-preprod/era.vkey")," ",(0,n.kt)("a",{parentName:"td",href:"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/release-preprod/era.vkey"},"\u2197\ufe0f"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Build From")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Latest Release")," ",(0,n.kt)("a",{parentName:"td",href:"https://github.com/input-output-hk/mithril/releases/latest"},"\u2197\ufe0f")))))),(0,n.kt)(l.Z,{value:"mainnet",label:"Mainnet",mdxType:"TabItem"},(0,n.kt)("h2",{id:"release-mainnet"},(0,n.kt)("inlineCode",{parentName:"h2"},"release-mainnet")),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Information"),(0,n.kt)("th",{parentName:"tr",align:null},"-"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Mithril Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"release-mainnet"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Network")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"mainnet"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Cardano Magic Id")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"-"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Supported")),(0,n.kt)("td",{parentName:"tr",align:null},"No \u274c")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Status")),(0,n.kt)("td",{parentName:"tr",align:null},"-")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Aggregator Endpoint")),(0,n.kt)("td",{parentName:"tr",align:null},"-")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Genesis Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},"-")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Adapter Type")),(0,n.kt)("td",{parentName:"tr",align:null},"-")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Address")),(0,n.kt)("td",{parentName:"tr",align:null},"-")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Era Reader Verification Key")),(0,n.kt)("td",{parentName:"tr",align:null},"-")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("strong",{parentName:"td"},"Build From")),(0,n.kt)("td",{parentName:"tr",align:null},"-")))))),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"In this documentation, we use the generic:"),(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},"*",(0,n.kt)("strong",{parentName:"li"},"*YOUR_CARDANO_NETWORK**")," identifier, but you need to replace it with the name of the network that runs on your Cardano node (e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"preprod"),")"),(0,n.kt)("li",{parentName:"ul"},"*",(0,n.kt)("strong",{parentName:"li"},"*YOUR_AGGREGATOR_ENDPOINT**")," identifier, but you need to replace it with the endpoint of an aggregator that runs on the Cardano network you target (e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"https://aggregator.release-preprod.api.mithril.network/aggregator"),")"),(0,n.kt)("li",{parentName:"ul"},"*",(0,n.kt)("strong",{parentName:"li"},"*YOUR_GENESIS_VERIFICATION_KEY**")," identifier, but you need to replace it with the genesis verification key url that runs on the Cardano network you target (e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/release-preprod/genesis.vkey"),")"),(0,n.kt)("li",{parentName:"ul"},"*",(0,n.kt)("strong",{parentName:"li"},"*YOUR_ERA_READER_ADAPTER_TYPE**")," identifier, but you need to replace it with the era reader adapter type used by the Mithril network you target (e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"cardano-chain"),")"),(0,n.kt)("li",{parentName:"ul"},"*",(0,n.kt)("strong",{parentName:"li"},"*YOUR_ERA_READER_ADDRESS**")," identifier, but you need to replace it with the era reader address url used by the Mithril network you target (e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/address.addr"),")"),(0,n.kt)("li",{parentName:"ul"},"*",(0,n.kt)("strong",{parentName:"li"},"*YOUR_ERA_READER_VERIFICATION_KEY**")," identifier, but you need to replace it with the era reader verification key url used by the Mithril network you target (e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"https://raw.githubusercontent.com/input-output-hk/mithril/main/TEST_ONLY_era.vkey"),")"))))}g.isMDXComponent=!0}}]);