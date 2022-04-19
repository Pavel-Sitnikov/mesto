const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

let editingBtn = document.querySelector('.profile__edit-button');
let addCardBtn = document.querySelector('.profile__add-button');

let modalWindowProfile = document.querySelector('.popup_action_profile-change');
let modalWindowNewPlace = document.querySelector('.popup_action_add-place');
let modalWindowCard = document.querySelector('.popup_action_open-card');

let modalCloseProfileBtn = modalWindowProfile.querySelector('.popup__close');
let modalCloseNewPlaceBtn = modalWindowNewPlace.querySelector('.popup__close');
let modalCloseCardBtn = modalWindowCard.querySelector('.popup__close');

let formElement = document.getElementById('popup_form_eddit');
let formAddElement = document.getElementById('popup_form_add');

let nameInput = formElement.querySelector('.popup__input_enter_name');
let jobInput = formElement.querySelector('.popup__input_enter_description');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let listContainer = document.querySelector('.elements__list');
let elementTemplate = document.getElementById('card-template');

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

function render() {
  const html = initialCards.map(createElement);
  listContainer.append(...html);
}

function createElement(item) {
  const geteElementTemplate = elementTemplate.content.cloneNode(true);
  const imgElement = geteElementTemplate.querySelector('.element__image');
  const removeImgBtn = geteElementTemplate.querySelector('.element__delete');
  const likeBtn = geteElementTemplate.querySelector('.element__like');

  const popupImg = modalWindowCard.querySelector('.popup__image');
  const popupFigcaption = modalWindowCard.querySelector('.popup__figcaption');
  
  imgElement.src = item.link;
  imgElement.alt = item.name;

  geteElementTemplate.querySelector('.element__title').textContent = item.name;
  
  imgElement.addEventListener('click', function() {
    modalWindowCard.classList.add('popup_opened');
    popupImg.src = item.link;
    popupImg.alt = item.name
    popupFigcaption.textContent = item.name;
  });

  removeImgBtn.addEventListener('click', removeElement);
  likeBtn.addEventListener('click', like);

  return geteElementTemplate;
}

function removeElement(evt) {
  const element = evt.target.closest('.element');
  element.remove();
}

function like(evt) {
  evt.target.classList.toggle("element__like_active");
}

function handleAddElement(evt) {
  evt.preventDefault();
  
  const inputTitleElement = formAddElement.querySelector('.popup__input_enter_title').value;
  const inputLinkElement = formAddElement.querySelector('.popup__input_enter_link').value;
  const element = createElement({name: inputTitleElement, link: inputLinkElement});
  
  formAddElement.reset();
  listContainer.prepend(element);
  closeModalWindow(modalWindowNewPlace);
}

render();

editingBtn.addEventListener('click', () => openModalWindow(modalWindowProfile));
modalCloseProfileBtn.addEventListener('click', () => closeModalWindow(modalWindowProfile));
addCardBtn.addEventListener('click', () => openModalWindow(modalWindowNewPlace));
modalCloseNewPlaceBtn.addEventListener('click', () => closeModalWindow(modalWindowNewPlace));
modalCloseCardBtn.addEventListener('click', () => closeModalWindow(modalWindowCard));

formElement.addEventListener('submit', saveFormSubmitHandler);
formAddElement.addEventListener('submit', handleAddElement);