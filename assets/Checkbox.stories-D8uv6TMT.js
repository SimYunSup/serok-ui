import{j as k}from"./jsx-runtime-D_zvdyIk.js";import{f as $}from"./index-D_Ss_HUe.js";import{a as C}from"./index-D4lIrffr.js";import{n,e as y,o as D,x as r,i as x,t as a,I as l,s as d,d as s,S as B,a as z,b as U,P as E}from"./index-2pm6fcGl.js";var M=Object.defineProperty,p=(e,o,c,t)=>{for(var i=void 0,u=e.length-1,m;u>=0;u--)(m=e[u])&&(i=m(o,c,i)||i);return i&&M(o,c,i),i};function j(e){class o extends e{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}handleChange(){if(this.readonly){this.inputElement.checked=this.checked;return}this.checked=this.inputElement.checked;const t=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(t)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return r`
                <input
                    id="input"
                    name=${D(this.name||void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `}}return p([n({type:Boolean,reflect:!0})],o.prototype,"checked"),p([n({type:String,reflect:!0})],o.prototype,"name"),p([n({type:Boolean,reflect:!0})],o.prototype,"readonly"),p([y("#input")],o.prototype,"inputElement"),o}const T=x`
    :host{--spectrum-checkbox-content-color-default:var(--spectrum-neutral-content-color-default);--spectrum-checkbox-content-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-checkbox-content-color-down:var(--spectrum-neutral-content-color-down);--spectrum-checkbox-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--spectrum-checkbox-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-checkbox-content-color-disabled:var(--spectrum-disabled-content-color);--spectrum-checkbox-control-color-disabled:var(--spectrum-disabled-content-color);--spectrum-checkbox-invalid-color-default:var(--spectrum-negative-color-900);--spectrum-checkbox-invalid-color-hover:var(--spectrum-negative-color-1000);--spectrum-checkbox-invalid-color-down:var(--spectrum-negative-color-1100);--spectrum-checkbox-invalid-color-focus:var(--spectrum-negative-color-1000);--spectrum-checkbox-emphasized-color-default:var(--spectrum-accent-color-900);--spectrum-checkbox-emphasized-color-hover:var(--spectrum-accent-color-1000);--spectrum-checkbox-emphasized-color-down:var(--spectrum-accent-color-1100);--spectrum-checkbox-emphasized-color-focus:var(--spectrum-accent-color-1000);--spectrum-checkbox-control-selected-color-default:var(--spectrum-neutral-background-color-selected-default);--spectrum-checkbox-control-selected-color-hover:var(--spectrum-neutral-background-color-selected-hover);--spectrum-checkbox-control-selected-color-down:var(--spectrum-neutral-background-color-selected-down);--spectrum-checkbox-control-selected-color-focus:var(--spectrum-neutral-background-color-selected-key-focus);--spectrum-checkbox-line-height:var(--spectrum-line-height-100);--spectrum-checkbox-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-checkbox-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-checkbox-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-checkbox-border-width:var(--spectrum-border-width-200);--spectrum-checkbox-selected-border-width:calc(var(--spectrum-checkbox-control-size)/2);--spectrum-checkbox-animation-duration:var(--spectrum-animation-duration-100)}:host,:host{--spectrum-checkbox-font-size:var(--spectrum-font-size-100);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-medium);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100)}:host([size=s]){--spectrum-checkbox-font-size:var(--spectrum-font-size-75);--spectrum-checkbox-height:var(--spectrum-component-height-75);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-small);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-75)}:host([size=l]){--spectrum-checkbox-font-size:var(--spectrum-font-size-200);--spectrum-checkbox-height:var(--spectrum-component-height-200);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-large);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-200)}:host([size=xl]){--spectrum-checkbox-font-size:var(--spectrum-font-size-300);--spectrum-checkbox-height:var(--spectrum-component-height-300);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-extra-large);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-300);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-300)}:host{color:var(--highcontrast-checkbox-content-color-default,var(--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)));min-block-size:var(--mod-checkbox-height,var(--spectrum-checkbox-height));max-inline-size:100%;vertical-align:top;align-items:flex-start;display:inline-flex;position:relative}:host(:is(:active,[active])) #box:before{border-color:var(--highcontrast-checkbox-highlight-color-down,var(--mod-checkbox-control-color-down,var(--spectrum-checkbox-control-color-down)))}:host(:is(:active,[active])) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-down,var(--mod-checkbox-control-selected-color-down,var(--spectrum-checkbox-control-selected-color-down)))}:host(:is(:active,[active])) #label{color:var(--highcontrast-checkbox-content-color-down,var(--mod-checkbox-content-color-down,var(--spectrum-checkbox-content-color-down)))}:host([invalid][invalid]) #box:before,:host([invalid][invalid]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)))}:host([invalid][invalid]) #input:focus-visible+#box:before,:host([invalid][invalid][indeterminate]) #input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-color-hover,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([readonly]) #input{cursor:default}:host([readonly]) #input:checked:disabled+#box:before,:host([readonly]) #input:disabled+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)));background-color:var(--highcontrast-checkbox-background-color-default,var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)))}:host([readonly]) #input:checked:disabled~#label,:host([readonly]) #input:disabled~#label{color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)))}:host([indeterminate]) #box:before,:host([indeterminate]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)));border-width:var(--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width))}:host([indeterminate]) #box #checkmark,:host([indeterminate]) #input:checked+#box #checkmark{display:none}:host([indeterminate]) #box #partialCheckmark,:host([indeterminate]) #input:checked+#box #partialCheckmark{opacity:1;display:block;transform:scale(1)}:host([indeterminate]) #input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-focus,var(--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)))}:host([invalid][invalid][indeterminate]) #box:before,:host([invalid][invalid][indeterminate]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)));border-width:var(--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width))}:host([emphasized]) #input:checked+#box:before,:host([emphasized][indeterminate]) #box:before,:host([emphasized][indeterminate]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-emphasized-color-default,var(--spectrum-checkbox-emphasized-color-default)))}:host([emphasized]) #input:focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-focus,var(--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)))}:host([emphasized][invalid][invalid]) #input:focus-visible:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)))}@media (hover:hover){:host(:hover) #box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-control-color-hover,var(--spectrum-checkbox-control-color-hover)))}:host(:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)))}:host(:hover) #label{color:var(--highcontrast-checkbox-content-color-hover,var(--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)))}:host([invalid][invalid]:hover) #box:before,:host([invalid][invalid]:hover) #input:checked+#box{border-color:var(--highcontrast-checkbox-color-hover,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([indeterminate]:hover) #box:before,:host([indeterminate]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)))}:host([invalid][invalid][indeterminate]:hover) #box:before,:host([invalid][invalid][indeterminate]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([invalid][invalid][indeterminate]:hover) #label{color:var(--highcontrast-checkbox-content-color-hover,var(--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)))}:host([emphasized][indeterminate]:hover) #box:before,:host([emphasized][indeterminate]:hover) #input:checked+#box:before,:host([emphasized]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-hover,var(--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)))}:host([emphasized][invalid][invalid][indeterminate]:hover) #box:before,:host([emphasized][invalid][invalid][indeterminate]:hover) #input:checked+#box:before,:host([emphasized][invalid][invalid]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-hover,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([emphasized][indeterminate]:hover) #box:before,:host([emphasized][indeterminate]:hover) #input:checked+#box:before,:host([emphasized]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)))}}:host([emphasized][indeterminate]:is(:active,[active])) #box:before,:host([emphasized][indeterminate]:is(:active,[active])) #input:checked+#box:before,:host([emphasized]:is(:active,[active])) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-emphasized-color-down,var(--spectrum-checkbox-emphasized-color-down)))}:host([emphasized][invalid][invalid]:is(:active,[active])) #box:before,:host([emphasized][invalid][invalid]:is(:active,[active])) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-control-invalid-color-down,var(--spectrum-checkbox-invalid-color-down)))}:host([emphasized]:focus-visible) #box:before,:host([emphasized]:focus-visible) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-focus,var(--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)))}#label{text-align:start;font-size:var(--mod-checkbox-font-size,var(--spectrum-checkbox-font-size));transition:color var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out;line-height:var(--mod-checkbox-line-height,var(--spectrum-checkbox-line-height));margin-block-start:var(--mod-checkbox-top-to-text,var(--spectrum-checkbox-top-to-text));margin-inline-start:var(--mod-checkbox-text-to-control,var(--spectrum-checkbox-text-to-control))}#label:lang(ja),#label:lang(ko),#label:lang(zh){line-height:var(--mod-checkbox-line-height-cjk,var(--spectrum-checkbox-line-height-cjk))}#input{color:var(--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default));box-sizing:border-box;inline-size:100%;block-size:100%;opacity:0;z-index:1;cursor:pointer;margin:0;padding:0;font-family:inherit;font-size:100%;line-height:1.15;position:absolute;overflow:visible}#input:disabled{cursor:default}#input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)));background-color:var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color));border-width:var(--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width))}#input:checked+#box #checkmark{opacity:1;transform:scale(1)}#input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-color-focus,var(--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)))}#input:focus-visible+#box:after{forced-color-adjust:none;box-shadow:0 0 0 var(--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness))var(--highcontrast-checkbox-focus-indicator-color,var(--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)));margin:calc(var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap))*-1)}#input:focus-visible+#label{color:var(--highcontrast-checkbox-content-color-focus,var(--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)))}#input:focus-visible:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-focus,var(--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)))}#box{--spectrum-checkbox-spacing:calc(var(--mod-checkbox-height,var(--spectrum-checkbox-height)) - var(--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)));margin:calc(var(--mod-checkbox-spacing,var(--spectrum-checkbox-spacing))/2)0;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;display:flex;position:relative}#box,#box:before{box-sizing:border-box;inline-size:var(--mod-checkbox-control-size,var(--spectrum-checkbox-control-size));block-size:var(--mod-checkbox-control-size,var(--spectrum-checkbox-control-size))}#box:before{forced-color-adjust:none;border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)));z-index:0;content:"";border-radius:var(--mod-checkbox-control-corner-radius,var(--spectrum-checkbox-control-corner-radius));border-width:var(--mod-checkbox-border-width,var(--spectrum-checkbox-border-width));transition:border var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out,box-shadow var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out;border-style:solid;display:block;position:absolute}#box:after{border-radius:calc(var(--mod-checkbox-control-corner-radius,var(--spectrum-checkbox-control-corner-radius)) + var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)));content:"";margin:var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap));transition:box-shadow var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-out,margin var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-out;display:block;position:absolute;inset-block:0;inset-inline:0;transform:translate(0)}#checkmark,#partialCheckmark{color:var(--highcontrast-checkbox-background-color-default,var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)));opacity:0;transition:opacity var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out,transform var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out;transform:scale(0)}#partialCheckmark{display:none}#input:checked:disabled+#box:before,#input:disabled+#box:before{border-color:var(--highcontrast-checkbox-disabled-color-default,var(--mod-checkbox-control-color-disabled,var(--spectrum-checkbox-control-color-disabled)));background-color:var(--highcontrast-checkbox-background-color-default,var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)))}#input:checked:disabled~#label,#input:disabled~#label{forced-color-adjust:none;color:var(--highcontrast-checkbox-disabled-color-default,var(--mod-checkbox-content-color-disabled,var(--spectrum-checkbox-content-color-disabled)))}@media (forced-colors:active){#input:focus-visible+#box{forced-color-adjust:none;outline-color:var(--highcontrast-checkbox-focus-indicator-color,var(--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)));outline-offset:var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap));outline-style:auto;outline-width:var(--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness))}#input:focus-visible+#box:after{box-shadow:0 0 0 0 var(--highcontrast-checkbox-focus-indicator-color,var(--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)))}:host{--highcontrast-checkbox-content-color-default:CanvasText;--highcontrast-checkbox-content-color-hover:CanvasText;--highcontrast-checkbox-content-color-down:CanvasText;--highcontrast-checkbox-content-color-focus:CanvasText;--highcontrast-checkbox-background-color-default:Canvas;--highcontrast-checkbox-color-default:ButtonText;--highcontrast-checkbox-color-hover:ButtonText;--highcontrast-checkbox-color-focus:Highlight;--highcontrast-checkbox-highlight-color-default:Highlight;--highcontrast-checkbox-highlight-color-hover:Highlight;--highcontrast-checkbox-highlight-color-down:Highlight;--highcontrast-checkbox-highlight-color-focus:Highlight;--highcontrast-checkbox-disabled-color-default:GrayText;--highcontrast-checkbox-focus-indicator-color:CanvasText}}:host{--spectrum-checkbox-control-color-default:var(--system-checkbox-control-color-default);--spectrum-checkbox-control-color-hover:var(--system-checkbox-control-color-hover);--spectrum-checkbox-control-color-down:var(--system-checkbox-control-color-down);--spectrum-checkbox-control-color-focus:var(--system-checkbox-control-color-focus);--spectrum-checkbox-checkmark-color:var(--system-checkbox-checkmark-color);--spectrum-checkbox-control-corner-radius:var(--system-checkbox-control-corner-radius)}:host{vertical-align:top;display:inline-flex}:host(:focus){outline:none}:host([disabled]){pointer-events:none}:host(:empty) label{display:none}
`,H=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark75"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M3.667 9.07a.96.96 0 0 1-.737-.344L.753 6.114a.96.96 0 1 1 1.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 0 1 1.51 1.186L4.422 8.704a.96.96 0 0 1-.741.367z"
    />
  </svg>`,L=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark75"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M3.667 9.07a.96.96 0 0 1-.737-.344L.753 6.114a.96.96 0 1 1 1.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 0 1 1.51 1.186L4.422 8.704a.96.96 0 0 1-.741.367z"
    />
  </svg>`;class A extends l{render(){return d(r),this.spectrumVersion===2?H({hidden:!this.label,title:this.label}):L({hidden:!this.label,title:this.label})}}s("sp-icon-checkmark75",A);const V=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark100"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M3.5 9.5a1 1 0 0 1-.774-.368l-2.45-3a1 1 0 1 1 1.548-1.264l1.657 2.028 4.68-6.01A1 1 0 0 1 9.74 2.114l-5.45 7a1 1 0 0 1-.777.386z"
    />
  </svg>`,S=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark100"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M3.5 9.5a1 1 0 0 1-.774-.368l-2.45-3a1 1 0 1 1 1.548-1.264l1.657 2.028 4.68-6.01A1 1 0 0 1 9.74 2.114l-5.45 7a1 1 0 0 1-.777.386z"
    />
  </svg>`;class O extends l{render(){return d(r),this.spectrumVersion===2?V({hidden:!this.label,title:this.label}):S({hidden:!this.label,title:this.label})}}s("sp-icon-checkmark100",O);const N=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark200"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M4.313 10.98a1.04 1.04 0 0 1-.8-.375L.647 7.165a1.042 1.042 0 0 1 1.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 0 1 1.64 1.287l-6.24 7.94a1.04 1.04 0 0 1-.804.399z"
    />
  </svg>`,P=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark200"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M4.313 10.98a1.04 1.04 0 0 1-.8-.375L.647 7.165a1.042 1.042 0 0 1 1.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 0 1 1.64 1.287l-6.24 7.94a1.04 1.04 0 0 1-.804.399z"
    />
  </svg>`;class R extends l{render(){return d(r),this.spectrumVersion===2?N({hidden:!this.label,title:this.label}):P({hidden:!this.label,title:this.label})}}s("sp-icon-checkmark200",R);const _=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark300"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M5.102 12.514a1.09 1.09 0 0 1-.834-.39L.988 8.19A1.085 1.085 0 0 1 2.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 0 1 1.707 1.34L5.955 12.1a1.09 1.09 0 0 1-.838.415z"
    />
  </svg>`,q=({width:e=24,height:o=24,hidden:c=!1,title:t="Checkmark300"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path
      d="M5.102 12.514a1.09 1.09 0 0 1-.834-.39L.988 8.19A1.085 1.085 0 0 1 2.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 0 1 1.707 1.34L5.955 12.1a1.09 1.09 0 0 1-.838.415z"
    />
  </svg>`;class F extends l{render(){return d(r),this.spectrumVersion===2?_({hidden:!this.label,title:this.label}):q({hidden:!this.label,title:this.label})}}s("sp-icon-checkmark300",F);const G=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash75"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M6.99 4.96H1.01a.96.96 0 0 1 0-1.92h5.98a.96.96 0 0 1 0 1.92" />
  </svg>`,J=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash75"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M6.99 4.96H1.01a.96.96 0 0 1 0-1.92h5.98a.96.96 0 0 1 0 1.92" />
  </svg>`;class K extends l{render(){return d(r),this.spectrumVersion===2?G({hidden:!this.label,title:this.label}):J({hidden:!this.label,title:this.label})}}s("sp-icon-dash75",K);const Q=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash100"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M8.5 6h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2" />
  </svg>`,W=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash100"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M8.5 6h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2" />
  </svg>`;class X extends l{render(){return d(r),this.spectrumVersion===2?Q({hidden:!this.label,title:this.label}):W({hidden:!this.label,title:this.label})}}s("sp-icon-dash100",X);const Y=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash200"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M10.021 7.042H1.98a1.042 1.042 0 1 1 0-2.083h8.043a1.042 1.042 0 0 1 0 2.083z" />
  </svg>`,Z=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash200"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M10.021 7.042H1.98a1.042 1.042 0 1 1 0-2.083h8.043a1.042 1.042 0 0 1 0 2.083z" />
  </svg>`;class ee extends l{render(){return d(r),this.spectrumVersion===2?Y({hidden:!this.label,title:this.label}):Z({hidden:!this.label,title:this.label})}}s("sp-icon-dash200",ee);const oe=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash300"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M10.61 7.085H1.39a1.085 1.085 0 0 1 0-2.17h9.22a1.085 1.085 0 0 1 0 2.17" />
  </svg>`,ce=({width:e=24,height:o=24,hidden:c=!1,title:t="Dash300"}={})=>a`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${c?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
    width="${e}"
    height="${o}"
  >
    <path d="M10.61 7.085H1.39a1.085 1.085 0 0 1 0-2.17h9.22a1.085 1.085 0 0 1 0 2.17" />
  </svg>`;class te extends l{render(){return d(r),this.spectrumVersion===2?oe({hidden:!this.label,title:this.label}):ce({hidden:!this.label,title:this.label})}}s("sp-icon-dash300",te);const re=x`
    .spectrum-UIIcon-Checkmark50{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-50)}.spectrum-UIIcon-Checkmark75{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-75)}.spectrum-UIIcon-Checkmark100{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-100)}.spectrum-UIIcon-Checkmark200{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-200)}.spectrum-UIIcon-Checkmark300{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-300)}.spectrum-UIIcon-Checkmark400{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-400)}.spectrum-UIIcon-Checkmark500{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-500)}.spectrum-UIIcon-Checkmark600{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-600)}
`,ae=x`
    .spectrum-UIIcon-Dash50{--spectrum-icon-size:var(--spectrum-dash-icon-size-50)}.spectrum-UIIcon-Dash75{--spectrum-icon-size:var(--spectrum-dash-icon-size-75)}.spectrum-UIIcon-Dash100{--spectrum-icon-size:var(--spectrum-dash-icon-size-100)}.spectrum-UIIcon-Dash200{--spectrum-icon-size:var(--spectrum-dash-icon-size-200)}.spectrum-UIIcon-Dash300{--spectrum-icon-size:var(--spectrum-dash-icon-size-300)}.spectrum-UIIcon-Dash400{--spectrum-icon-size:var(--spectrum-dash-icon-size-400)}.spectrum-UIIcon-Dash500{--spectrum-icon-size:var(--spectrum-dash-icon-size-500)}.spectrum-UIIcon-Dash600{--spectrum-icon-size:var(--spectrum-dash-icon-size-600)}
`;var ie=Object.defineProperty,b=(e,o,c,t)=>{for(var i=void 0,u=e.length-1,m;u>=0;u--)(m=e[u])&&(i=m(o,c,i)||i);return i&&ie(o,c,i),i};const se={s:()=>r`
            <sp-icon-checkmark75
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark75"
            ></sp-icon-checkmark75>
        `,m:()=>r`
            <sp-icon-checkmark100
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark100"
            ></sp-icon-checkmark100>
        `,l:()=>r`
            <sp-icon-checkmark200
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark200"
            ></sp-icon-checkmark200>
        `,xl:()=>r`
            <sp-icon-checkmark300
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark300"
            ></sp-icon-checkmark300>
        `},he={s:()=>r`
            <sp-icon-dash75
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash75"
            ></sp-icon-dash75>
        `,m:()=>r`
            <sp-icon-dash100
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash100"
            ></sp-icon-dash100>
        `,l:()=>r`
            <sp-icon-dash200
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash200"
            ></sp-icon-dash200>
        `,xl:()=>r`
            <sp-icon-dash300
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash300"
            ></sp-icon-dash300>
        `};let h=class extends B(j(z),{noDefaultSize:!0}){constructor(){super(...arguments),this.disabled=!1,this.indeterminate=!1,this.invalid=!1,this.emphasized=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.hasAttribute("autofocus")&&this.updateComplete.then(()=>{this.focus()})}static get styles(){return[T,re,ae]}click(){var o;this.disabled||(o=this.inputElement)==null||o.click()}handleChange(){this.indeterminate=!1,super.handleChange()}render(){return r`
            ${super.render()}
            <span id="box">
                ${this.checked?se[this.size]():r``}
                ${this.indeterminate?he[this.size]():r``}
            </span>
            <label id="label" for="input"><slot></slot></label>
        `}updated(o){super.updated(o),o.has("disabled")&&(typeof o.get("disabled")<"u"||this.disabled)&&(this.disabled?(this.inputElement.tabIndex=this.tabIndex,this.tabIndex=-1):(this.tabIndex=this.inputElement.tabIndex,this.inputElement.removeAttribute("tabindex")),this.inputElement.disabled=this.disabled),o.has("indeterminate")&&(this.inputElement.indeterminate=this.indeterminate),o.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid"))}};h.shadowRootOptions={...z.shadowRootOptions,delegatesFocus:!0},b([n({type:Boolean,reflect:!0})],h.prototype,"disabled"),b([n({type:Boolean,reflect:!0})],h.prototype,"indeterminate"),b([n({type:Boolean,reflect:!0})],h.prototype,"invalid"),b([n({type:Boolean,reflect:!0})],h.prototype,"emphasized"),b([n({reflect:!0,type:Number,attribute:"tabindex"})],h.prototype,"tabIndex");s("sp-checkbox",h);const ne=U({displayName:"Checkbox",elementClass:h,react:C,tagName:"sp-checkbox",events:{change:"change"}});function I(e){return k.jsx(ne,{...e,emphasized:e.variant!=="default","data-variant":e.variant})}I.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{variant:{required:!0,tsType:{name:"union",raw:'"default" | "accent" | "secondary"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"accent"'},{name:"literal",value:'"secondary"'}]},description:""}}};const pe={title:"Example/Checkbox",component:I,decorators:[e=>k.jsx(E,{children:k.jsx(e,{})})],parameters:{layout:"centered",expended:!0},tags:["autodocs"],argTypes:{checked:{control:"boolean",description:"기본값"},size:{control:"select",options:["s","m","l","xl"],description:"버튼 크기"},indeterminate:{control:"boolean",description:"불확실한 상태"},invalid:{control:"boolean",description:"유효성 검사 실패 여부"},disabled:{control:"boolean",description:"비활성화 여부"},children:{control:"text",description:"체크박스 라벨"},variant:{control:"select",options:["default","accent","secondary"],description:"체크박스 색깔"},onChange:{action:"clicked",description:"값 변경 이벤트"}},args:{onChange:$()}},v={args:{size:"m",checked:!1,variant:"default",invalid:!1,disabled:!1,children:"Checkbox"}};var f,g,w;v.parameters={...v.parameters,docs:{...(f=v.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    size: "m",
    checked: false,
    variant: "default",
    invalid: false,
    disabled: false,
    children: "Checkbox"
  }
}`,...(w=(g=v.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};const ve=["Default"];export{v as Default,ve as __namedExportsOrder,pe as default};
