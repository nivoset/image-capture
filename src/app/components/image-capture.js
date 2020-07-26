import {LitElement, html, css} from "lit-element";
import {v1} from "uuid";
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

    const imageEvent = new CustomEvent("image-captured", { detail: { 
      date: new Date(),
      uuid: v1(),
      image,
    }})
    this.dispatchEvent(imageEvent);
  }
  connectedCallback() {
    super.connectedCallback();
    this.connectCamera();
  }
  disconnectedCallback() {
    this.video.srcObject
        .getTracks()
        .forEach(track => track.stop());  
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
      button {
        position: absolute;
        right: 80px;
        top: 200px;
        font-size: 96px;
        border-width: 2px;
        border-style: solid;
        height: 120px;
        width: 120px;
        border-radius: 50%;
      }
      canvas {
        display: none;
      }
      video {
        background-color: grey;
        border: 7px solid  #555;
      }
    `;
  }
  render() {
    return html`
      <video 
        @click="${this.captureImage}"
        autoplay
        id="videoElement">Camera is not Available
      </video>
        
      <button 
        type="submit" 
        @click="${this.captureImage}">&#43;</button>
      <canvas></canvas>
      `
  }
}

customElements.define("image-capture", ImageCapture);