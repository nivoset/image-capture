import {LitElement, html, css} from "lit-element";
import log from "../../log/logger"

export default class DisplayImages extends LitElement {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  get images() {
    return this._images || [];
  }
  set images(images) {
    this._images = images;
    log.info(images);
    this.requestUpdate();
  }
  
  static get properties() {
    return { 
      images: { type: Array },
    };
  }
  disconnectedCallback() {
    super.connectedCallback();
  }
  static get styles() {
    return css`
      img { width: 100px }
      span {
        display: grid;
        justify-items: center;
        align-items: center;
      }
      div {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto;
        align-items: stretch;
        justify-items: center;
        grid-gap: 6px;
      }
    `;
  }
  render() {
    return html`
      <span>Image Displayed: ${this.images.length}</span>
      <div>
        ${this.images.map(({src, timestamp}) => html`<img src="${src}" alt="${timestamp}"></img>`)}
      </div>
      `
  }
}

customElements.define("display-images", DisplayImages);