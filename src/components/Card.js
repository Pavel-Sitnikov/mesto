export class Card {
  constructor(
    data,
    cardSelector,
    userID,
    {
      handleCardClick,
      handleRemoveCardClick,
      handleLikeClick,
      handleRemoveLikeClick,
    }
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._userID = userID;
    this._ownerID = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._handleLikeCardClick = handleLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _chekOwnerLike() {
    if (this._getLikeInfo()) {
      this.handleLikeCard(this._data);
    }
  }

  _checkOwnerCard() {
    if (this._userID !== this._ownerID) {
      this._btnRemoveCard.remove();
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getLikeInfo() {
    return this._data.likes.some((item) => item._id === this._userID);
  }

  _changeLikeStatus = () => {
    if (this._getLikeInfo()) {
      this._handleRemoveLikeClick(this._data);
    } else {
      this._handleLikeCardClick(this._data);
    }
  };

  _countLikes(data) {
    this._data.likes = data.likes;
    this._numberOfLikes.textContent = String(this._data.likes.length);
  }

  handleLikeCard(data) {
    this._btnLikeCard.classList.add("element__like_active");
    this._countLikes(data);
  }

  handleRemoveLikeCard(data) {
    this._btnLikeCard.classList.remove("element__like_active");
    this._countLikes(data);
  }

  _setEventsListeners() {
    this._btnRemoveCard = this._element.querySelector(".element__delete");
    this._btnLikeCard = this._element.querySelector(".element__like");
    this._numberOfLikes = this._element.querySelector(".element__number-likes");
    this._imgCard = this._element.querySelector(".element__image");
    this._titleCard = this._element.querySelector(".element__title");

    this._btnRemoveCard.addEventListener("click", () => {
      this._handleRemoveCardClick(this._data._id);
    });
    this._btnLikeCard.addEventListener("click", this._changeLikeStatus);

    this._imgCard.addEventListener("click", () =>
      this._handleCardClick(this._data)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventsListeners();
    this._checkOwnerCard();
    this._chekOwnerLike();
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._titleCard.textContent = this._name;
    this._numberOfLikes.textContent = String(this._data.likes.length);

    return this._element;
  }
}
