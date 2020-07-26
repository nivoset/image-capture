import {LitElement, html, css} from "lit-element";
import log from "../../log/logger"

class ImageCapture extends LitElement {
  constructor() {
    super();
    this.streaming = false;

    navigator.mediaDevices.enumerateDevices()
      .then(ex => ex.filter(({kind}) => kind === "videoinput"))
      .then(l => log.info(...l));
  }
  connectCamera() {
    log.debug("connected");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.video.srcObject = stream;
          this.streaming = true;
        })
        .catch(err => log.error("Something went wrong connecting to the camera", err));
    }
    

  }
  captureImage(e) {
    e.preventDefault();
    log.debug("click", this.streaming);
    const context = this.canvas.getContext("2d");
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    const image = this.canvas.toDataURL('image/png');

    const imageEvent = new CustomEvent("image-captured", { detail: { image }})
    this.dispatchEvent(imageEvent);
  }
  connectedCallback() {
    super.connectedCallback();
    this.connectCamera();
  }
  disconnectedCallback() {
    const tracks = this.video.srcObject.getTracks();
  
    tracks.forEach(track => track.stop());  
    this.video.srcObject = null;
    super.disconnectedCallback();
  }
  get video () {
    return this.shadowRoot.querySelector("#videoElement");
  }
  get canvas () {
    return this.shadowRoot.querySelector("canvas");
  }
  static get styles() {
    return css`
      canvas {
        display: none;
      }
      video {
        width: 400px;
        height: 300px;
        background-color: grey;
      }
    `;
  }
  render() {
    return html`
      <video 
        @click="${this.captureImage}"
        autoplay="true"
        id="videoElement">Camera is not Available
      </video>
      <canvas></canvas>
      `
  }
}

customElements.define("image-capture", ImageCapture);