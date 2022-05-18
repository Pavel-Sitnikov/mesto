import { Card } from "./Card.js";
import { initialCards } from "./cards.js";

const btnEditingProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-button");

const modalWindowProfile = document.querySelector(
  ".popup_action_profile-change"
);
const modalWindowNewPlace = document.querySelector(".popup_action_add-place");
const modalWindowCard = document.querySelector(".popup_action_open-card");

const modalCloseProfileBtn = modalWindowProfile.querySelector(".popup__close");
const modalCloseNewPlaceBtn =
  modalWindowNewPlace.querySelector(".popup__close");
const modalCloseCardBtn = modalWindowCard.querySelector(".popup__close");

const formEdditPopup = document.getElementById("popup_form_eddit");
const formAddPopup = document.getElementById("popup_form_add");

const nameInput = formEdditPopup.querySelector(".popup__input_enter_name");
const jobInput = formEdditPopup.querySelector(
  ".popup__input_enter_description"
);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const listContainer = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card-template");

const inputTitleElement = formAddPopup.querySelector(
  ".popup__input_enter_title"
);
const inputLinkElement = formAddPopup.querySelector(".popup__input_enter_link");

const btnAddCardSave = modalWindowNewPlace.querySelector(".popup__button");

function openModalWindow(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closeModalWindow(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function saveFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModalWindow(modalWindowProfile);
}

// function render() {
//   initialCards.forEach((card) => {
//     listContainer.append(createElement(card));
//   });
// }

// ------------------------------
// function createElement(item) {
//   const elementTemplate = cardTemplate.content.cloneNode(true);
//   const imgElement = elementTemplate.querySelector(".element__image");
//   const removeImgBtn = elementTemplate.querySelector(".element__delete");
//   const likeBtn = elementTemplate.querySelector(".element__like");

//   const popupImg = modalWindowCard.querySelector(".popup__image");
//   const popupFigcaption = modalWindowCard.querySelector(".popup__figcaption");

//   function openCardPopup() {
//     openModalWindow(modalWindowCard);
//     popupImg.src = item.link;
//     popupImg.alt = item.name;
//     popupFigcaption.textContent = item.name;
//   }

//   imgElement.src = item.link;
//   imgElement.alt = item.name;

//   elementTemplate.querySelector(".element__title").textContent = item.name;
//   imgElement.addEventListener("click", openCardPopup);
//   removeImgBtn.addEventListener("click", removeElement);
//   likeBtn.addEventListener("click", like);

//   return elementTemplate;
// }

// function removeElement(evt) {
//   const element = evt.target.closest(".element");
//   element.remove();
// }

// function like(evt) {
//   evt.target.classList.toggle("element__like_active");
// }

function handleAddElement(evt) {
  evt.preventDefault();

  const element = createElement({
    name: inputTitleElement.value,
    link: inputLinkElement.value,
  });

  formAddPopup.reset();
  listContainer.prepend(element);
  closeModalWindow(modalWindowNewPlace);
}

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalWindow(event.target);
  }
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closeModalWindow(popupOpened);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();

  document.querySelector(".elements__list").append(cardElement);
});

// render();

btnEditingProfile.addEventListener("click", () => {
  openModalWindow(modalWindowProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});
modalCloseProfileBtn.addEventListener("click", () =>
  closeModalWindow(modalWindowProfile)
);
btnAddCard.addEventListener("click", () => {
  disableSubmitButton(btnAddCardSave, config.inactiveButtonClass);
  openModalWindow(modalWindowNewPlace);
});

modalCloseNewPlaceBtn.addEventListener("click", () =>
  closeModalWindow(modalWindowNewPlace)
);
modalCloseCardBtn.addEventListener("click", () =>
  closeModalWindow(modalWindowCard)
);

formEdditPopup.addEventListener("submit", saveFormSubmitHandler);
formAddPopup.addEventListener("submit", handleAddElement);

modalWindowProfile.addEventListener("mousedown", closeOverlay);
modalWindowNewPlace.addEventListener("mousedown", closeOverlay);
modalWindowCard.addEventListener("mousedown", closeOverlay);
