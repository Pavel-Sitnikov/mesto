let editingBtn = document.querySelector('.profile__edit-button');
let addCardBtn = document.querySelector('.profile__add-button');

let modalWindowProfile = document.querySelector('.popup_action_profile-change');
let modalWindowNewPlace = document.querySelector('.popup_action_add-place')
let modalWindowCard = document.querySelector('.popup_action_open-card')

let modalCloseProfileBtn = modalWindowProfile.querySelector('.popup__close');
let modalCloseNewPlaceBtn = modalWindowNewPlace.querySelector('.popup__close');
let modalCloseCardBtn = modalWindowCard.querySelector('.popup__close');

let formElement = document.getElementById('popup_form_eddit');
let nameInput = formElement.querySelector('.popup__input_enter_name');
let jobInput = formElement.querySelector('.popup__input_enter_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openModalWindow(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function closeModalWindow(popup) {
  popup.classList.remove('popup_opened');
}

function saveFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModalWindow(modalWindowProfile);
}

let popupImg = modalWindowCard.querySelector('.popup__image');
let popupFigcaption = modalWindowCard.querySelector('.popup__figcaption');
let imageCard = document.querySelectorAll('.element__image');

function openForViewing(evt) {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;

  openModalWindow(modalWindowCard);

}

editingBtn.addEventListener('click', () => openModalWindow(modalWindowProfile));
modalCloseProfileBtn.addEventListener('click', () => closeModalWindow(modalWindowProfile));
addCardBtn.addEventListener('click', () => openModalWindow(modalWindowNewPlace));
modalCloseNewPlaceBtn.addEventListener('click', () => closeModalWindow(modalWindowNewPlace));
formElement.addEventListener('submit', saveFormSubmitHandler);

imageCard.addEventListener('click', openForViewing);
modalCloseCardBtn.addEventListener('click', () => closeModalWindow(modalWindowCard));

console.log(addCardBtn);
