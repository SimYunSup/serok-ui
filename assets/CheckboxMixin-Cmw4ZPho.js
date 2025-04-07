import{n as i,e as a,o as d,x as p}from"./index-m4lUXf2c.js";var l=Object.defineProperty,c=(n,e,r,o)=>{for(var t=void 0,h=n.length-1,s;h>=0;h--)(s=n[h])&&(t=s(e,r,t)||t);return t&&l(e,r,t),t};function m(n){let e=class extends n{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}handleChange(){if(this.readonly){this.inputElement.checked=this.checked;return}this.checked=this.inputElement.checked;const o=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(o)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return p`
                <input
                    id="input"
                    name=${d(this.name||void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `}};return c([i({type:Boolean,reflect:!0})],e.prototype,"checked"),c([i({type:String,reflect:!0})],e.prototype,"name"),c([i({type:Boolean,reflect:!0})],e.prototype,"readonly"),c([a("#input")],e.prototype,"inputElement"),e}export{m as C};
