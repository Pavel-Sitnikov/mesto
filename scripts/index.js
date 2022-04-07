let editingBtn = document.querySelector('.profile__edit-button');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = modalWindow.querySelector('.popup__close');
let formElement = document.getElementById('popup_form');
let nameInput = formElement.querySelector('.popup__input_enter_name');
let jobInput = formElement.querySelector('.popup__input_enter_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openModalWindow() {
  modalWindow.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function closeModalWindow() {
  modalWindow.classList.remove('popup_opened');
}

function saveFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModalWindow();
}

editingBtn.addEventListener('click', openModalWindow);
modalCloseBtn.addEventListener('click', closeModalWindow);
formElement.addEventListener('submit', saveFormSubmitHandler);
