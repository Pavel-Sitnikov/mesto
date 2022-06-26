import "./index.css";

import {
  config,
  btnEditingProfile,
  btnAddCard,
  btnEditAvatar,
  formEditPopup,
  formAddPopup,
  formEditAvatarPopup,
  cardTemplate,
  elementsList,
  modalWindowProfile,
  modalWindowNewPlace,
  modalWindowCard,
  modalWindowDeleteCard,
  modalWindowEditAvatar,
  nameSelector,
  descriptionSelector,
  avatarSelector,
  nameInput,
  jobInput,
} from "../utils/сonstants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

const formEditValidator = new FormValidator(config, formEditPopup);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddPopup);
formAddValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(config, formEditAvatarPopup);
formEditAvatarValidator.enableValidation();

let userID = null;

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43");

api
  .getUserData()
  .then((userData) => {
    userID = userData._id;
    profileInfo.setUserInfo(userData);
  })
  .catch((err) => console.log(err));

const createCard = (data) => {
  const card = new Card(data, cardTemplate, userID, {
    handleCardClick: () => {
      popupViewCard.open(data);
    },
    handleRemoveCardClick: (_id) => {
      popupRemoveCardConfirm.open();
      popupRemoveCardConfirm.setSubmitAction(() => {
        api
          .deleteCard(_id)
          .then(() => {
            card.removeCard();
            popupRemoveCardConfirm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleLikeClick: (data) => {
      api
        .likesCard(data._id)
        .then((res) => {
          card.handleLikeCard(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemoveLikeClick: (data) => {
      api
        .removeLike(data._id)
        .then((res) => {
          card.handleRemoveLikeCard(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card.generateCard();
};

const cardsList = new Section(
  {
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
    cardsList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

const profileInfo = new UserInfo({
  nameSelector,
  descriptionSelector,
  avatarSelector,
});

const popupEditProfile = new PopupWithForm(modalWindowProfile, {
  handleFormSubmit: (data) => {
    popupEditProfile.loadingDisplay("Сохранение...");
    api
      .editProfile(data)
      .then((res) => {
        profileInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .finally(() => {
        setTimeout(() => {
          popupEditProfile.loadingDisplay("Создать");
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupEditAvatar = new PopupWithForm(modalWindowEditAvatar, {
  handleFormSubmit: (data) => {
    popupEditAvatar.loadingDisplay("Сохранение...");
    api
      .editProfileAvatar(data)
      .then((res) => {
        profileInfo.setUserInfo(res);
        popupEditAvatar.close();
      })
      .finally(() => {
        setTimeout(() => {
          popupEditAvatar.loadingDisplay("Создать");
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupNewPlace = new PopupWithForm(modalWindowNewPlace, {
  handleFormSubmit: (data) => {
    popupNewPlace.loadingDisplay("Сохранение...");
    api
      .addCard(data)
      .then((res) => {
        const card = createCard(res);
        cardsList.addItem(card);
        popupNewPlace.close();
      })
      .finally(() => {
        setTimeout(() => {
          popupNewPlace.loadingDisplay("Создать");
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupViewCard = new PopupWithImage(modalWindowCard, config);

const popupRemoveCardConfirm = new PopupWithConfirm(modalWindowDeleteCard);

btnEditingProfile.addEventListener("click", () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  formEditValidator.resetValidation();
  popupEditProfile.open();
});

btnAddCard.addEventListener("click", () => {
  formAddValidator.resetValidation();
  popupNewPlace.open();
});

btnEditAvatar.addEventListener("click", () => {
  formEditAvatarValidator.resetValidation();
  popupEditAvatar.open();
});

popupEditProfile.setEventListeners();
popupNewPlace.setEventListeners();
popupViewCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupRemoveCardConfirm.setEventListeners();
