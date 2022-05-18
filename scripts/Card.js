export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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

  _setEventsListeners() {
    this._btnRemoveCard = this._element.querySelector(".element__delete");
    this._btnToggleLike = this._element.querySelector(".element__like");

    this._btnRemoveCard.addEventListener("click", () => {
      this._removeCard();
    });
    this._btnToggleLike.addEventListener("click", () => {
      this._toggleLike(this._btnToggleLike);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    this._setEventsListeners();

    return this._element;
  }
}
