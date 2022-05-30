export class Card {
  constructor(data, cardSelector, handleViewing) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleViewing = handleViewing;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._btnToggleLike.classList.toggle("element__like_active");
  }

  _removeCard() {
    this._element.remove();
  }

  _handlePhotoClick = () => {
    this._handleViewing({ name: this._name, link: this._link });
  };

  _setEventsListeners() {
    this._btnRemoveCard = this._element.querySelector(".element__delete");
    this._btnToggleLike = this._element.querySelector(".element__like");
    this._imgCard = this._element.querySelector(".element__image");
    this._titleCard = this._element.querySelector(".element__title");

    this._btnRemoveCard.addEventListener("click", () => {
      this._removeCard();
    });
    this._btnToggleLike.addEventListener("click", () => {
      this._toggleLike();
    });
    this._imgCard.addEventListener("click", this._handlePhotoClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventsListeners();
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._titleCard.textContent = this._name;

    return this._element;
  }
}
