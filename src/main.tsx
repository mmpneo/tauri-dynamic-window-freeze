import { WebviewWindow } from "@tauri-apps/api/window";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

declare global {
  interface Window {
    API: Backend;
  }
}

class Backend {
  #inputfieldWindow?: WebviewWindow;

  async switchInputField() {
    const isVisible = await this.#inputfieldWindow?.isVisible();
    isVisible ?
      this.#inputfieldWindow?.hide() :
      this.#inputfieldWindow?.show() 
  }
  async init() {
    this.#inputfieldWindow = new WebviewWindow('inputfield', {
      url: '/inputfield.html',
      theme: 'dark',
      title: "Dynamic window",
      alwaysOnTop: true,
      width: 320,
      height: 240,
      decorations: false,
      transparent: true,
      minWidth: 200,
      minHeight: 102,
      visible: false
    });
  }
}

// has this in actual app
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

window.API = new Backend();
window.API.init().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})
