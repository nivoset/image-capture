import {LitElement, html, css} from "lit-element";
// import log from "../../log/logger"

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
    this._images = [...images];
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
      img { width: 100px;
        border: 7px solid rgb(24, 22, 22);
      }
      .selected {
        border: 7px solid #33f;
      }
      span {
        display: grid;
        justify-items: center;
        align-items: center;
        color: white;
      }
      div {
        display: grid;
        grid-template-columns: repeat(3, minmax(100px, 1fr));
        grid-template-rows: auto;
        align-items: stretch;
        justify-items: center;
        grid-gap: 6px;
      }
    `;
  }
  select(uuid) {
    return () => {
      console.log(`uuid: ${uuid} clicked`);
      this.selected = uuid;
      this.requestUpdate();
    }
  }
  render() {
    return html`
      <span>Image Displayed: ${this.images.length}</span>
      <div>
        ${this.images.map(({src, timestamp, uuid}) => html`<img class="${uuid === this.selected ? "selected" : ""}" src="${src}" alt="${timestamp}" @click="${this.select(uuid)}"></img>`)}
      </div>
      `
  }
}

customElements.define("display-images", DisplayImages);