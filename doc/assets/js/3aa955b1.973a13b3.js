"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[6320],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>c});var i=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=i.createContext({}),h=function(e){var t=i.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=h(e.components);return i.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},g=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=h(r),g=n,c=m["".concat(s,".").concat(g)]||m[g]||u[g]||a;return r?i.createElement(c,o(o({ref:t},p),{},{components:r})):i.createElement(c,o({ref:t},p))}));function c(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:n,o[1]=l;for(var h=2;h<a;h++)o[h]=r[h];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}g.displayName="MDXCreateElement"},12838:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>h});var i=r(87462),n=(r(67294),r(3905));const a={sidebar_position:3,sidebar_label:"Mithril Signer"},o="Mithril Signer Node",l={unversionedId:"mithril/mithril-network/signer",id:"mithril/mithril-network/signer",title:"Mithril Signer Node",description:"Welcome to the Mithril Signer Node guide!",source:"@site/root/mithril/mithril-network/signer.md",sourceDirName:"mithril/mithril-network",slug:"/mithril/mithril-network/signer",permalink:"/doc/next/mithril/mithril-network/signer",draft:!1,editUrl:"https://github.com/input-output-hk/mithril/edit/main/docs/root/mithril/mithril-network/signer.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"Mithril Signer"},sidebar:"mithrilSideBar",previous:{title:"Mithril Aggregator",permalink:"/doc/next/mithril/mithril-network/aggregator"},next:{title:"Mithril Client",permalink:"/doc/next/mithril/mithril-network/client"}},s={},h=[{value:"Introduction",id:"introduction",level:2},{value:"Individual Signatures Production",id:"individual-signatures-production",level:2},{value:"Interaction with the Mithril Aggregator",id:"interaction-with-the-mithril-aggregator",level:2},{value:"Under the hood",id:"under-the-hood",level:2}],p={toc:h},m="wrapper";function u(e){let{components:t,...a}=e;return(0,n.kt)(m,(0,i.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"mithril-signer-node"},"Mithril Signer Node"),(0,n.kt)("p",null,"Welcome to the Mithril Signer Node guide!"),(0,n.kt)("h2",{id:"introduction"},"Introduction"),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"The ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer")," is a node that works transparently on top of the ",(0,n.kt)("strong",{parentName:"p"},"Stake Pool Operator")," Cardano nodes and which individually signs the ledger state.")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"For more information about the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Protocol"),", please refer to the ",(0,n.kt)("a",{parentName:"p",href:"/doc/next/mithril/mithril-protocol/protocol"},"Protocol in depth")," page.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"For more information about the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer"),", please refer to the ",(0,n.kt)("a",{parentName:"p",href:"/doc/next/manual/developer-docs/nodes/mithril-signer"},"Developer Documentation")," page.")))),(0,n.kt)("h2",{id:"individual-signatures-production"},"Individual Signatures Production"),(0,n.kt)("p",null,"The ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer")," is a node that represents a share of the total stake of the ",(0,n.kt)("strong",{parentName:"p"},"Cardano Network")," which entitles it to participate in the ",(0,n.kt)("strong",{parentName:"p"},"Mithril multi signature")," creation (with respect to its share of total stakes). The rule is simple, the more stake shares, the more contribution to the production of the multi signatures."),(0,n.kt)("p",null,"In order to produce an ",(0,n.kt)("strong",{parentName:"p"},"Individual Signature")," a ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer")," must also be aware of all the other ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signers")," that may contribute."),(0,n.kt)("p",null,"For the protocol to be secure, the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer")," must also be in charge of computing by itself the messages (or digest) that are signed. To do so, they heavily rely on the ",(0,n.kt)("strong",{parentName:"p"},"Consensus")," mechanism of the ",(0,n.kt)("strong",{parentName:"p"},"Cardano Network")," that guarantees that all nodes of the network will store the same data locally (after a certain delay)."),(0,n.kt)("p",null,"If some nodes are not fully synchronized or if they have adversarial behavior they will simple not be able to contribute:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Either because they don't sign the same message (given they don't use the same data as those agreed by the rest of the network)")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Or they are not entitled to sign (because they are not true holders of the stake share they used to sign)"))),(0,n.kt)("h2",{id:"interaction-with-the-mithril-aggregator"},"Interaction with the Mithril Aggregator"),(0,n.kt)("p",null,"In its first version, the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer")," works with other ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signers")," through one ",(0,n.kt)("strong",{parentName:"p"},"Mithril Aggregator")," which acts as a facilitator and avoids direct signer to signer communications."),(0,n.kt)("p",null,"In the long run, any signer will also have the ability to be a ",(0,n.kt)("strong",{parentName:"p"},"Mithril Aggregator")," as well in order to achieve a higher level of decentralization in the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Network"),"."),(0,n.kt)("p",null,"The ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer")," connects to the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Aggregator"),":"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"To know when to sign a new snapshot (by using the advertised ",(0,n.kt)("strong",{parentName:"li"},"Beacon")," of the ",(0,n.kt)("strong",{parentName:"li"},"Pending Certificate"),")."),(0,n.kt)("li",{parentName:"ul"},"To retrieve the currently used ",(0,n.kt)("strong",{parentName:"li"},"Protocol Parameters"),"."),(0,n.kt)("li",{parentName:"ul"},"To register its ",(0,n.kt)("strong",{parentName:"li"},"Verification Keys")," (public keys)."),(0,n.kt)("li",{parentName:"ul"},"To receive the ",(0,n.kt)("strong",{parentName:"li"},"Verification Keys")," of all the other declared signers available for the next message to sign."),(0,n.kt)("li",{parentName:"ul"},"To send the ",(0,n.kt)("strong",{parentName:"li"},"Single Signatures")," of the locally computed messages (that will hopefuly be combined into ",(0,n.kt)("strong",{parentName:"li"},"Multi signatures")," by the aggregator).")),(0,n.kt)("p",null,"This process is summarized in the following diagram:"),(0,n.kt)("img",{src:r(72852).Z,style:{background:"white"},alt:"signer workflow"}),(0,n.kt)("h2",{id:"under-the-hood"},"Under the hood"),(0,n.kt)("p",null,"In its first version, the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signer")," is composed of a main component:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"A runtime that is powered by a state machine:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"The runtime is synchronous and is scheduled to execute at regular intervals."),(0,n.kt)("li",{parentName:"ul"},"There are three possible states: ",(0,n.kt)("strong",{parentName:"li"},"UNREGISTERED"),", ",(0,n.kt)("strong",{parentName:"li"},"REGISTERED")," and ",(0,n.kt)("strong",{parentName:"li"},"SIGNED"),"."),(0,n.kt)("li",{parentName:"ul"},"The runtime handles state transitions."),(0,n.kt)("li",{parentName:"ul"},"The runtime is summarized in the diagram below:")))),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Signer Runtime",src:r(70426).Z,width:"601",height:"1661"})))}u.isMDXComponent=!0},72852:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/signer-workflow-0099dc5e6cbaa76fca1cf084b510003e.png"},70426:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/signer-runtime-360c1fb03b3b666ef2ac4b7c6d3eed94.jpg"}}]);