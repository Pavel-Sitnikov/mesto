export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  popupImgSelector: ".popup__image",
  popupFigcaptionSelector: ".popup__figcaption",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const btnEditingProfile = document.querySelector(
  ".profile__edit-button"
);
export const btnAddCard = document.querySelector(".profile__add-button");
export const btnEditAvatar = document.querySelector(".profile__hover");

export const formEditPopup = document.getElementById("popup_form_eddit");
export const formAddPopup = document.getElementById("popup_form_add");
export const formEditAvatarPopup = document.getElementById("popup_form_update");

export const nameInput = document.querySelector(".popup__input_enter_name");
export const jobInput = document.querySelector(
  ".popup__input_enter_description"
);

export const cardTemplate = "#card-template";
export const elementsList = ".elements__list";

export const modalWindowProfile = ".popup_action_profile-change";
export const modalWindowNewPlace = ".popup_action_add-place";
export const modalWindowCard = ".popup_action_open-card";
export const modalWindowDeleteCard = ".popup_action_delete-card";
export const modalWindowEditAvatar = ".popup_action_update-avatar";

export const nameSelector = ".profile__name";
export const descriptionSelector = ".profile__description";
export const avatarSelector = ".profile__avatar";
