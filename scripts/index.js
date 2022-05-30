import { initialCards } from "./utils/cards.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";

const popups = document.querySelectorAll(".popup");
const modalWindowProfile = document.querySelector(
  ".popup_action_profile-change"
);
const modalWindowNewPlace = document.querySelector(".popup_action_add-place");
const modalWindowCard = document.querySelector(".popup_action_open-card");

const btnEditingProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-button");

const formEditPopup = document.getElementById("popup_form_eddit");
const formAddPopup = document.getElementById("popup_form_add");

const nameInput = formEditPopup.querySelector(".popup__input_enter_name");
const jobInput = formEditPopup.querySelector(".popup__input_enter_description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const listContainer = document.querySelector(".elements__list");

const inputTitleElement = formAddPopup.querySelector(
  ".popup__input_enter_title"
);
const inputLinkElement = formAddPopup.querySelector(".popup__input_enter_link");

const popupImg = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formEditValidator = new FormValidator(config, formEditPopup);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddPopup);
formAddValidator.enableValidation();

function openModalWindow(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closeModalWindow(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModalWindow(modalWindowProfile);
}

function openCardPopup(item) {
  popupImg.src = item.link;
  popupImg.alt = item.name;
  popupFigcaption.textContent = item.name;
  openModalWindow(modalWindowCard);
}

function createCard(dataCard) {
  const card = new Card(dataCard, "#card-template", openCardPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", openCardPopup);
      const cardElement = card.generateCard();
      addItem.renderItems(cardElement);
    },
  },
  cardListSelection
);

initialCards.forEach((dataCard) => {
  listContainer.append(createCard(dataCard));
});

function handleAddElement(evt) {
  evt.preventDefault();

  const element = createCard({
    name: inputTitleElement.value,
    link: inputLinkElement.value,
  });

  listContainer.prepend(element);
  closeModalWindow(modalWindowNewPlace);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closeModalWindow(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModalWindow(popup);
    }
  });
});

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closeModalWindow(popupOpened);
  }
}

btnEditingProfile.addEventListener("click", () => {
  openModalWindow(modalWindowProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formEditValidator.resetValidation();
});

btnAddCard.addEventListener("click", () => {
  openModalWindow(modalWindowNewPlace);
  formAddPopup.reset();
  formAddValidator.resetValidation();
});

formEditPopup.addEventListener("submit", handleProfileFormSubmit);
formAddPopup.addEventListener("submit", handleAddElement);
