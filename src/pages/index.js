import "./index.css";

import {
  config,
  btnEditingProfile,
  btnAddCard,
  formEditPopup,
  formAddPopup,
  cardTemplate,
  elementsList,
  modalWindowProfile,
  modalWindowNewPlace,
  modalWindowCard,
  nameSelector,
  descriptionSelector,
  nameInput,
  jobInput,
} from "../utils/сonstants.js";
import { initialCards } from "../utils/cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43");

const formEditValidator = new FormValidator(config, formEditPopup);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddPopup);
formAddValidator.enableValidation();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
    },
  },
  elementsList
);

api
  .getCards()
  .then((cards) => {
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// cardsList.renderItems();

const profileInfo = new UserInfo({
  nameSelector,
  descriptionSelector,
});

const popupEditProfile = new PopupWithForm(modalWindowProfile, {
  handleFormSubmit: (data) => {
    profileInfo.setUserInfo(data);
    popupEditProfile.close();
  },
});

const popupNewPlace = new PopupWithForm(modalWindowNewPlace, {
  handleFormSubmit: (data) => {
    const inputs = {
      name: data.title,
      link: data.link,
    };
    const card = createCard(inputs);
    cardsList.addItem(card);
    popupNewPlace.close();
  },
});

const popupViewCard = new PopupWithImage(modalWindowCard, config);

function createCard(dataCard) {
  const card = new Card(dataCard, cardTemplate, () => {
    popupViewCard.open(dataCard);
  });
  return card.generateCard();
}

btnEditingProfile.addEventListener("click", () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.description;
  formEditValidator.resetValidation();
  popupEditProfile.open();
});

btnAddCard.addEventListener("click", () => {
  formAddValidator.resetValidation();
  popupNewPlace.open();
});

popupEditProfile.setEventListeners();
popupNewPlace.setEventListeners();
popupViewCard.setEventListeners();
