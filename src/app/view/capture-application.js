import {LitElement, html, css} from "lit-element";
import '../components/display-images'
import '../components/image-capture'
import log from "../../log/logger"

const db = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


class CaptureApplication extends LitElement {
  constructor() {
    super();
    this.images = JSON.parse(localStorage.getItem("images") || "[]");
  }
  connectedCallback() {
    super.connectedCallback();
   
  }
  static get properties() {
    return { 
      images: { type: Array},
    };
  }
  capture() {
    return (e) => {

      this.images = [{ timestamp: e.detail.date, src: e.detail.image, uuid: e.detail.uuid}, ...this.images].slice(0,6);
      localStorage.setItem("images", JSON.stringify(this.images));
      this.requestUpdate();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  static get styles() {
    return css`
      main {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        align-items: stretch;
        justify-items: center;
        grid-gap: 6px;
      }
    `;
  }
  render() {
    return html`
        <main>
          <image-capture
            @image-captured="${this.capture()}">
          </image-capture>
          <display-images 
            .images=${this.images}>
          </display-images>
        </main>
      `
  }
}

customElements.define("capture-application", CaptureApplication);