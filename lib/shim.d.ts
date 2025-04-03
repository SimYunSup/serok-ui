import React from 'react'

declare global {
  export type ElementSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'sp-theme': React.DetailedHTMLProps<any, HTMLElement>;
      'sp-button': React.DetailedHTMLProps<any, HTMLElement>;
    }
  }
}
