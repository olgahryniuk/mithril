"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[1677],{3905:function(e,t,n){n.d(t,{Zo:function(){return g},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},g=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,g=a(e,["components","mdxType","originalType","parentName"]),p=l(n),m=i,d=p["".concat(c,".").concat(m)]||p[m]||u[m]||o;return n?r.createElement(d,s(s({ref:t},g),{},{components:n})):r.createElement(d,s({ref:t},g))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=p;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var l=2;l<o;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9159:function(e,t,n){n.r(t),n.d(t,{assets:function(){return g},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),s=["components"],a={},c="Signer",l={unversionedId:"mithril/topologies/signer",id:"mithril/topologies/signer",title:"Signer",description:"A Signer is a participant to a Mithril Multisignature. As such, a signer contributes to signing an expected genuine message. To do so, the signer computes the digest from the information stored on a Cardano node and signs it with his secret key. This signed message is sent to the Aggregator, along with the corresponding won lottery numbers. This way, the Aggregator can assess that the Signer is identified and has signed the same message.",source:"@site/root/mithril/topologies/signer.md",sourceDirName:"mithril/topologies",slug:"/mithril/topologies/signer",permalink:"/doc/mithril/topologies/signer",editUrl:"https://github.com/input-output-hk/mithril/tree/main/docs/root/root/mithril/topologies/signer.md",tags:[],version:"current",frontMatter:{},sidebar:"mithrilSideBar",previous:{title:"Client",permalink:"/doc/mithril/topologies/client"},next:{title:"Test Lab",permalink:"/doc/category/test-lab"}},g={},u=[{value:"Topology",id:"topology",level:2}],p={toc:u};function m(e){var t=e.components,a=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"signer"},"Signer"),(0,o.kt)("p",null," A Signer is a participant to a Mithril Multisignature. As such, a signer contributes to signing an expected genuine message. To do so, the signer computes the digest from the information stored on a Cardano node and signs it with his secret key. This signed message is sent to the Aggregator, along with the corresponding won lottery numbers. This way, the Aggregator can assess that the Signer is identified and has signed the same message."),(0,o.kt)("h2",{id:"topology"},"Topology"),(0,o.kt)("p",null,(0,o.kt)("img",{src:n(9118).Z,width:"960",height:"720"})))}m.isMDXComponent=!0},9118:function(e,t,n){t.Z=n.p+"assets/images/signer-ad85e11ab2ca6809ab872c5eb91cdace.png"}}]);