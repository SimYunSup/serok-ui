import React from 'react'

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'sp-theme': React.DetailedHTMLProps<any, HTMLElement>;
      'sp-button': React.DetailedHTMLProps<any, HTMLElement>;
    }
  }
}
