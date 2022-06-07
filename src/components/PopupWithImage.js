import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, { popupImgSelector, popupFigcaptionSelector }) {
    super(popupSelector);
    this._popupImgSelector = this._popup.querySelector(popupImgSelector);
    this._popupFigcaptionSelector = this._popup.querySelector(
      popupFigcaptionSelector
    );
  }

  open(item) {
    this._popupImgSelector.src = item.link;
    this._popupImgSelector.alt = item.name;
    this._popupFigcaptionSelector.textContent = item.name;
    super.open();
  }
}
