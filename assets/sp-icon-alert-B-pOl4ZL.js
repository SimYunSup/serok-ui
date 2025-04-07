import{I as n,x as h,d as o}from"./index-CaKc-WKx.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},A=t=>(...e)=>({_$litDirective$:t,values:e});class w{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,i){this._$Ct=e,this._$AM=r,this._$Ci=i}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}}function f(){return Array.from(crypto.getRandomValues(new Uint8Array(4)),t=>`0${(t&255).toString(16)}`.slice(-2)).join("")}let l;const a=function(t,...e){return l?l(t,...e):e.reduce((r,i,s)=>r+i+t[s+1],t[0])},c=t=>{l=t},d=({width:t=24,height:e=24,hidden:r=!1,title:i="Alert"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${i}"
  >
    <path
      d="M17.127 2.579.4 32.512A1 1 0 0 0 1.272 34h33.456a1 1 0 0 0 .872-1.488L18.873 2.579a1 1 0 0 0-1.746 0ZM20 29.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5Zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5Z"
    />
  </svg>`,u=({width:t=24,height:e=24,hidden:r=!1,title:i="Alert Triangle"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${i}"
  >
    <path
      d="m9.99936,15.12334c-.23065.00812-.45538-.07378-.62661-.22835-.33033-.36462-.33033-.91993,0-1.28455.16935-.15832.39483-.24279.62664-.23476.23635-.00947.46589.08026.63302.24745.16207.1677.24916.39386.24137.62681.01238.23469-.06959.4646-.2277.63864-.17358.16455-.40786.24959-.64671.23475Z"
      fill="currentColor"
    />
    <path
      d="m10,11.75c-.41406,0-.75-.33594-.75-.75v-4c0-.41406.33594-.75.75-.75s.75.33594.75.75v4c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m16.7334,18H3.2666c-.80029,0-1.52295-.41016-1.93262-1.09766s-.42725-1.51855-.04639-2.22266L8.021,2.23242c.39355-.72754,1.15186-1.17969,1.979-1.17969s1.58545.45215,1.979,1.17969l6.7334,12.44727c.38086.7041.36328,1.53516-.04639,2.22266s-1.13232,1.09766-1.93262,1.09766ZM10,2.55273c-.13428,0-.46777.03809-.65967.39258L2.60693,15.39258c-.18311.33887-.05029.63184.01562.74121.06543.11035.25928.36621.64404.36621h13.4668c.38477,0,.57861-.25586.64404-.36621.06592-.10938.19873-.40234.01562-.74121L10.65967,2.94531c-.19189-.35449-.52539-.39258-.65967-.39258Z"
      fill="currentColor"
    />
  </svg>`;class g extends n{render(){return c(h),this.spectrumVersion===1?d({hidden:!this.label,title:this.label}):u({hidden:!this.label,title:this.label})}}o("sp-icon-alert",g);export{A as e,w as i,f as r,m as t};
