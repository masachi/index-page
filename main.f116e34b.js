(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();function de(){let t={weekday:"long",year:"numeric",month:"long",day:"numeric"};setInterval(()=>{let e=new Date,s=e.toLocaleDateString("zh-CN",t);const r=e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1});document.getElementById("header_date").innerHTML=`<span class="date">${s}</span><span class="time">${r}</span>`},1e3)}function fe(){let t=new Date;switch(Math.floor(t.getHours()/6)){case 0:document.getElementById("header_greet").innerHTML="\u665A\u5B89 :)";break;case 1:document.getElementById("header_greet").innerHTML="\u65E9\u4E0A\u597D :)";break;case 2:document.getElementById("header_greet").innerHTML="\u4E0B\u5348\u597D :)";break;case 3:document.getElementById("header_greet").innerHTML="\u665A\u4E0A\u597D :)";break}}const ge=(t,e)=>{if(e){document.documentElement.style.setProperty(`--${t}`,e);const s=document.querySelector(`#${t}`);s&&(e=e.replace("px",""),s.value=e)}},j=t=>{let e=localStorage.getItem(t);ge(t,e)};function pe(){j("color-background"),j("color-text-pri"),j("color-text-acc")}function w(t){return Array.isArray?Array.isArray(t):re(t)==="[object Array]"}const me=1/0;function ye(t){if(typeof t=="string")return t;let e=t+"";return e=="0"&&1/t==-me?"-0":e}function Me(t){return t==null?"":ye(t)}function I(t){return typeof t=="string"}function se(t){return typeof t=="number"}function Ee(t){return t===!0||t===!1||xe(t)&&re(t)=="[object Boolean]"}function ne(t){return typeof t=="object"}function xe(t){return ne(t)&&t!==null}function y(t){return t!=null}function D(t){return!t.trim().length}function re(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const Ie="Incorrect 'index' type",_e=t=>`Invalid value for key ${t}`,we=t=>`Pattern length exceeds max of ${t}.`,Le=t=>`Missing ${t} property in key`,Se=t=>`Property 'weight' in key '${t}' must be a positive integer`,X=Object.prototype.hasOwnProperty;class Ae{constructor(e){this._keys=[],this._keyMap={};let s=0;e.forEach(r=>{let n=ie(r);s+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,s+=n.weight}),this._keys.forEach(r=>{r.weight/=s})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function ie(t){let e=null,s=null,r=null,n=1,i=null;if(I(t)||w(t))r=t,e=J(t),s=H(t);else{if(!X.call(t,"name"))throw new Error(Le("name"));const c=t.name;if(r=c,X.call(t,"weight")&&(n=t.weight,n<=0))throw new Error(Se(c));e=J(c),s=H(c),i=t.getFn}return{path:e,id:s,weight:n,src:r,getFn:i}}function J(t){return w(t)?t:t.split(".")}function H(t){return w(t)?t.join("."):t}function ke(t,e){let s=[],r=!1;const n=(i,c,o)=>{if(!!y(i))if(!c[o])s.push(i);else{let a=c[o];const h=i[a];if(!y(h))return;if(o===c.length-1&&(I(h)||se(h)||Ee(h)))s.push(Me(h));else if(w(h)){r=!0;for(let l=0,d=h.length;l<d;l+=1)n(h[l],c,o+1)}else c.length&&n(h,c,o+1)}};return n(t,I(e)?e.split("."):e,0),r?s:s[0]}const be={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},$e={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1},Re={location:0,threshold:.6,distance:100},Oe={useExtendedSearch:!1,getFn:ke,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var u={...$e,...be,...Re,...Oe};const Ce=/[^ ]+/g;function Ne(t=1,e=3){const s=new Map,r=Math.pow(10,e);return{get(n){const i=n.match(Ce).length;if(s.has(i))return s.get(i);const c=1/Math.pow(i,.5*t),o=parseFloat(Math.round(c*r)/r);return s.set(i,o),o},clear(){s.clear()}}}class G{constructor({getFn:e=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){this.norm=Ne(s,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((s,r)=>{this._keysMap[s.id]=r})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,I(this.docs[0])?this.docs.forEach((e,s)=>{this._addString(e,s)}):this.docs.forEach((e,s)=>{this._addObject(e,s)}),this.norm.clear())}add(e){const s=this.size();I(e)?this._addString(e,s):this._addObject(e,s)}removeAt(e){this.records.splice(e,1);for(let s=e,r=this.size();s<r;s+=1)this.records[s].i-=1}getValueForItemAtKeyId(e,s){return e[this._keysMap[s]]}size(){return this.records.length}_addString(e,s){if(!y(e)||D(e))return;let r={v:e,i:s,n:this.norm.get(e)};this.records.push(r)}_addObject(e,s){let r={i:s,$:{}};this.keys.forEach((n,i)=>{let c=n.getFn?n.getFn(e):this.getFn(e,n.path);if(!!y(c)){if(w(c)){let o=[];const a=[{nestedArrIndex:-1,value:c}];for(;a.length;){const{nestedArrIndex:h,value:l}=a.pop();if(!!y(l))if(I(l)&&!D(l)){let d={v:l,i:h,n:this.norm.get(l)};o.push(d)}else w(l)&&l.forEach((d,f)=>{a.push({nestedArrIndex:f,value:d})})}r.$[i]=o}else if(I(c)&&!D(c)){let o={v:c,n:this.norm.get(c)};r.$[i]=o}}}),this.records.push(r)}toJSON(){return{keys:this.keys,records:this.records}}}function ce(t,e,{getFn:s=u.getFn,fieldNormWeight:r=u.fieldNormWeight}={}){const n=new G({getFn:s,fieldNormWeight:r});return n.setKeys(t.map(ie)),n.setSources(e),n.create(),n}function Te(t,{getFn:e=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){const{keys:r,records:n}=t,i=new G({getFn:e,fieldNormWeight:s});return i.setKeys(r),i.setIndexRecords(n),i}function v(t,{errors:e=0,currentLocation:s=0,expectedLocation:r=0,distance:n=u.distance,ignoreLocation:i=u.ignoreLocation}={}){const c=e/t.length;if(i)return c;const o=Math.abs(r-s);return n?c+o/n:o?1:c}function ve(t=[],e=u.minMatchCharLength){let s=[],r=-1,n=-1,i=0;for(let c=t.length;i<c;i+=1){let o=t[i];o&&r===-1?r=i:!o&&r!==-1&&(n=i-1,n-r+1>=e&&s.push([r,n]),r=-1)}return t[i-1]&&i-r>=e&&s.push([r,i-1]),s}const $=32;function Fe(t,e,s,{location:r=u.location,distance:n=u.distance,threshold:i=u.threshold,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,includeMatches:a=u.includeMatches,ignoreLocation:h=u.ignoreLocation}={}){if(e.length>$)throw new Error(we($));const l=e.length,d=t.length,f=Math.max(0,Math.min(r,d));let g=i,p=f;const M=o>1||a,k=M?Array(d):[];let _;for(;(_=t.indexOf(e,p))>-1;){let E=v(e,{currentLocation:_,expectedLocation:f,distance:n,ignoreLocation:h});if(g=Math.min(E,g),p=_+l,M){let L=0;for(;L<l;)k[_+L]=1,L+=1}}p=-1;let R=[],b=1,N=l+d;const ue=1<<l-1;for(let E=0;E<l;E+=1){let L=0,S=N;for(;L<S;)v(e,{errors:E,currentLocation:f+S,expectedLocation:f,distance:n,ignoreLocation:h})<=g?L=S:N=S,S=Math.floor((N-L)/2+L);N=S;let U=Math.max(1,f-S+1),K=c?d:Math.min(f+S,d)+l,O=Array(K+2);O[K+1]=(1<<E)-1;for(let x=K;x>=U;x-=1){let T=x-1,Q=s[t.charAt(T)];if(M&&(k[T]=+!!Q),O[x]=(O[x+1]<<1|1)&Q,E&&(O[x]|=(R[x+1]|R[x])<<1|1|R[x+1]),O[x]&ue&&(b=v(e,{errors:E,currentLocation:T,expectedLocation:f,distance:n,ignoreLocation:h}),b<=g)){if(g=b,p=T,p<=f)break;U=Math.max(1,2*f-p)}}if(v(e,{errors:E+1,currentLocation:f,expectedLocation:f,distance:n,ignoreLocation:h})>g)break;R=O}const P={isMatch:p>=0,score:Math.max(.001,b)};if(M){const E=ve(k,o);E.length?a&&(P.indices=E):P.isMatch=!1}return P}function Pe(t){let e={};for(let s=0,r=t.length;s<r;s+=1){const n=t.charAt(s);e[n]=(e[n]||0)|1<<r-s-1}return e}class oe{constructor(e,{location:s=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:a=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){if(this.options={location:s,threshold:r,distance:n,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:h},this.pattern=a?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(f,g)=>{this.chunks.push({pattern:f,alphabet:Pe(f),startIndex:g})},d=this.pattern.length;if(d>$){let f=0;const g=d%$,p=d-g;for(;f<p;)l(this.pattern.substr(f,$),f),f+=$;if(g){const M=d-$;l(this.pattern.substr(M),M)}}else l(this.pattern,0)}searchIn(e){const{isCaseSensitive:s,includeMatches:r}=this.options;if(s||(e=e.toLowerCase()),this.pattern===e){let p={isMatch:!0,score:0};return r&&(p.indices=[[0,e.length-1]]),p}const{location:n,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:a,ignoreLocation:h}=this.options;let l=[],d=0,f=!1;this.chunks.forEach(({pattern:p,alphabet:M,startIndex:k})=>{const{isMatch:_,score:R,indices:b}=Fe(e,p,M,{location:n+k,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:a,includeMatches:r,ignoreLocation:h});_&&(f=!0),d+=R,_&&b&&(l=[...l,...b])});let g={isMatch:f,score:f?d/this.chunks.length:1};return f&&r&&(g.indices=l),g}}class A{constructor(e){this.pattern=e}static isMultiMatch(e){return Z(e,this.multiRegex)}static isSingleMatch(e){return Z(e,this.singleRegex)}search(){}}function Z(t,e){const s=t.match(e);return s?s[1]:null}class Ke extends A{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const s=e===this.pattern;return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class je extends A{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const r=e.indexOf(this.pattern)===-1;return{isMatch:r,score:r?0:1,indices:[0,e.length-1]}}}class De extends A{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const s=e.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class He extends A{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const s=!e.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,e.length-1]}}}class Be extends A{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const s=e.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[e.length-this.pattern.length,e.length-1]}}}class We extends A{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const s=!e.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,e.length-1]}}}class ae extends A{constructor(e,{location:s=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:a=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){super(e),this._bitapSearch=new oe(e,{location:s,threshold:r,distance:n,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:h})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class he extends A{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let s=0,r;const n=[],i=this.pattern.length;for(;(r=e.indexOf(this.pattern,s))>-1;)s=r+i,n.push([r,s-1]);const c=!!n.length;return{isMatch:c,score:c?0:1,indices:n}}}const B=[Ke,he,De,He,We,Be,je,ae],q=B.length,ze=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,Ve="|";function Ye(t,e={}){return t.split(Ve).map(s=>{let r=s.trim().split(ze).filter(i=>i&&!!i.trim()),n=[];for(let i=0,c=r.length;i<c;i+=1){const o=r[i];let a=!1,h=-1;for(;!a&&++h<q;){const l=B[h];let d=l.isMultiMatch(o);d&&(n.push(new l(d,e)),a=!0)}if(!a)for(h=-1;++h<q;){const l=B[h];let d=l.isSingleMatch(o);if(d){n.push(new l(d,e));break}}}return n})}const Ge=new Set([ae.type,he.type]);class Ue{constructor(e,{isCaseSensitive:s=u.isCaseSensitive,includeMatches:r=u.includeMatches,minMatchCharLength:n=u.minMatchCharLength,ignoreLocation:i=u.ignoreLocation,findAllMatches:c=u.findAllMatches,location:o=u.location,threshold:a=u.threshold,distance:h=u.distance}={}){this.query=null,this.options={isCaseSensitive:s,includeMatches:r,minMatchCharLength:n,findAllMatches:c,ignoreLocation:i,location:o,threshold:a,distance:h},this.pattern=s?e:e.toLowerCase(),this.query=Ye(this.pattern,this.options)}static condition(e,s){return s.useExtendedSearch}searchIn(e){const s=this.query;if(!s)return{isMatch:!1,score:1};const{includeMatches:r,isCaseSensitive:n}=this.options;e=n?e:e.toLowerCase();let i=0,c=[],o=0;for(let a=0,h=s.length;a<h;a+=1){const l=s[a];c.length=0,i=0;for(let d=0,f=l.length;d<f;d+=1){const g=l[d],{isMatch:p,indices:M,score:k}=g.search(e);if(p){if(i+=1,o+=k,r){const _=g.constructor.type;Ge.has(_)?c=[...c,...M]:c.push(M)}}else{o=0,i=0,c.length=0;break}}if(i){let d={isMatch:!0,score:o/i};return r&&(d.indices=c),d}}return{isMatch:!1,score:1}}}const W=[];function Qe(...t){W.push(...t)}function z(t,e){for(let s=0,r=W.length;s<r;s+=1){let n=W[s];if(n.condition(t,e))return new n(t,e)}return new oe(t,e)}const F={AND:"$and",OR:"$or"},V={PATH:"$path",PATTERN:"$val"},Y=t=>!!(t[F.AND]||t[F.OR]),Xe=t=>!!t[V.PATH],Je=t=>!w(t)&&ne(t)&&!Y(t),ee=t=>({[F.AND]:Object.keys(t).map(e=>({[e]:t[e]}))});function le(t,e,{auto:s=!0}={}){const r=n=>{let i=Object.keys(n);const c=Xe(n);if(!c&&i.length>1&&!Y(n))return r(ee(n));if(Je(n)){const a=c?n[V.PATH]:i[0],h=c?n[V.PATTERN]:n[a];if(!I(h))throw new Error(_e(a));const l={keyId:H(a),pattern:h};return s&&(l.searcher=z(h,e)),l}let o={children:[],operator:i[0]};return i.forEach(a=>{const h=n[a];w(h)&&h.forEach(l=>{o.children.push(r(l))})}),o};return Y(t)||(t=ee(t)),r(t)}function Ze(t,{ignoreFieldNorm:e=u.ignoreFieldNorm}){t.forEach(s=>{let r=1;s.matches.forEach(({key:n,norm:i,score:c})=>{const o=n?n.weight:null;r*=Math.pow(c===0&&o?Number.EPSILON:c,(o||1)*(e?1:i))}),s.score=r})}function qe(t,e){const s=t.matches;e.matches=[],y(s)&&s.forEach(r=>{if(!y(r.indices)||!r.indices.length)return;const{indices:n,value:i}=r;let c={indices:n,value:i};r.key&&(c.key=r.key.src),r.idx>-1&&(c.refIndex=r.idx),e.matches.push(c)})}function et(t,e){e.score=t.score}function tt(t,e,{includeMatches:s=u.includeMatches,includeScore:r=u.includeScore}={}){const n=[];return s&&n.push(qe),r&&n.push(et),t.map(i=>{const{idx:c}=i,o={item:e[c],refIndex:c};return n.length&&n.forEach(a=>{a(i,o)}),o})}class C{constructor(e,s={},r){this.options={...u,...s},this.options.useExtendedSearch,this._keyStore=new Ae(this.options.keys),this.setCollection(e,r)}setCollection(e,s){if(this._docs=e,s&&!(s instanceof G))throw new Error(Ie);this._myIndex=s||ce(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){!y(e)||(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){const s=[];for(let r=0,n=this._docs.length;r<n;r+=1){const i=this._docs[r];e(i,r)&&(this.removeAt(r),r-=1,n-=1,s.push(i))}return s}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:s=-1}={}){const{includeMatches:r,includeScore:n,shouldSort:i,sortFn:c,ignoreFieldNorm:o}=this.options;let a=I(e)?I(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return Ze(a,{ignoreFieldNorm:o}),i&&a.sort(c),se(s)&&s>-1&&(a=a.slice(0,s)),tt(a,this._docs,{includeMatches:r,includeScore:n})}_searchStringList(e){const s=z(e,this.options),{records:r}=this._myIndex,n=[];return r.forEach(({v:i,i:c,n:o})=>{if(!y(i))return;const{isMatch:a,score:h,indices:l}=s.searchIn(i);a&&n.push({item:i,idx:c,matches:[{score:h,value:i,norm:o,indices:l}]})}),n}_searchLogical(e){const s=le(e,this.options),r=(o,a,h)=>{if(!o.children){const{keyId:d,searcher:f}=o,g=this._findMatches({key:this._keyStore.get(d),value:this._myIndex.getValueForItemAtKeyId(a,d),searcher:f});return g&&g.length?[{idx:h,item:a,matches:g}]:[]}const l=[];for(let d=0,f=o.children.length;d<f;d+=1){const g=o.children[d],p=r(g,a,h);if(p.length)l.push(...p);else if(o.operator===F.AND)return[]}return l},n=this._myIndex.records,i={},c=[];return n.forEach(({$:o,i:a})=>{if(y(o)){let h=r(s,o,a);h.length&&(i[a]||(i[a]={idx:a,item:o,matches:[]},c.push(i[a])),h.forEach(({matches:l})=>{i[a].matches.push(...l)}))}}),c}_searchObjectList(e){const s=z(e,this.options),{keys:r,records:n}=this._myIndex,i=[];return n.forEach(({$:c,i:o})=>{if(!y(c))return;let a=[];r.forEach((h,l)=>{a.push(...this._findMatches({key:h,value:c[l],searcher:s}))}),a.length&&i.push({idx:o,item:c,matches:a})}),i}_findMatches({key:e,value:s,searcher:r}){if(!y(s))return[];let n=[];if(w(s))s.forEach(({v:i,i:c,n:o})=>{if(!y(i))return;const{isMatch:a,score:h,indices:l}=r.searchIn(i);a&&n.push({score:h,key:e,value:i,idx:c,norm:o,indices:l})});else{const{v:i,n:c}=s,{isMatch:o,score:a,indices:h}=r.searchIn(i);o&&n.push({score:a,key:e,value:i,norm:c,indices:h})}return n}}C.version="6.6.2";C.createIndex=ce;C.parseIndex=Te;C.config=u;C.parseQuery=le;Qe(Ue);const m={keyword:"",searchItems:null,fuse:null};function st(){const t=[];document.querySelectorAll(".apps_item").forEach(e=>{const s=e.querySelector(".name");t.push({name:s.textContent,el:e,nameEl:s,clsss:"apps_item"})}),document.querySelectorAll(".links_item").forEach(e=>{const s=e;t.push({name:s.textContent,el:e,nameEl:s,clsss:"links_item"})}),m.searchItems=t,m.fuse=new C(t,{keys:["name"],includeScore:!0,includeMatches:!0,minMatchCharLength:1,threshold:.2})}const te=document.getElementById("keyword"),nt=/\w/;function rt(t){if(t==8)m.keyword.length>0&&(m.keyword=m.keyword.slice(0,m.keyword.length-1));else if(t==27)m.keyword="";else{let e=String.fromCharCode(96<=t&&t<=105?t-48:t);nt.test(e)||(e=""),e&&(m.keyword=m.keyword+e)}return m.keyword?te.innerHTML=`<span>${m.keyword}</span>`:te.innerHTML="",m.keyword}function it(t){var e=t.keyCode||t.which;if(!(t.ctrlKey||t.metaKey)&&!(e==9||e==13)){const s=m.keyword,r=rt(e);if(s===r&&r==="")return;if(r!==s){const n=m.fuse.search(r);console.log("searched",r,n),ct(n)}}}function ct(t){document.activeElement.blur();const e="matched";m.searchItems.forEach(s=>{s.el.setAttribute("tabindex",0),s.nameEl.innerHTML=s.name,s.el.classList.remove(e)}),t.forEach((s,r)=>{const n=s.item;r===0&&n.el.focus();const i=r+1;n.el.setAttribute("tabindex",i),n.el.classList.add(e),ot(n.nameEl,s.matches[0])})}function ot(t,e){e.indices.sort((c,o)=>o[1]-o[0]-(c[1]-c[0]));const s=e.indices[0],r=s[0],n=s[1]+1,i=e.value;t.innerHTML=`${i.slice(0,r)}<em>${i.slice(r,n)}</em>${i.slice(n,i.length)}`}function at(){st(),document.addEventListener("keydown",it)}const ht=new Date;document.addEventListener("DOMContentLoaded",async()=>{pe(),de(),fe(),at(),console.log("done DOMContentLoaded",`${new Date-ht}ms`)});
