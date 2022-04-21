const editingBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const modalWindowProfile = document.querySelector('.popup_action_profile-change');
const modalWindowNewPlace = document.querySelector('.popup_action_add-place');
const modalWindowCard = document.querySelector('.popup_action_open-card');

const modalCloseProfileBtn = modalWindowProfile.querySelector('.popup__close');
const modalCloseNewPlaceBtn = modalWindowNewPlace.querySelector('.popup__close');
const modalCloseCardBtn = modalWindowCard.querySelector('.popup__close');

const formEdditPopup = document.getElementById('popup_form_eddit');
const formAddPopup = document.getElementById('popup_form_add');

const nameInput = formEdditPopup.querySelector('.popup__input_enter_name');
const jobInput = formEdditPopup.querySelector('.popup__input_enter_description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const listContainer = document.querySelector('.elements__list');
const cardTemplate = document.getElementById('card-template');

const inputTitleElement = formAddPopup.querySelector('.popup__input_enter_title');
const inputLinkElement = formAddPopup.querySelector('.popup__input_enter_link');

function openModalWindow(popup) {
  popup.classList.add('popup_opened');
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
  const cards = initialCards.map(createElement);
  listContainer.append(...cards);
}

function createElement(item) {
  const elementTemplate = cardTemplate.content.cloneNode(true);
  const imgElement = elementTemplate.querySelector('.element__image');
  const removeImgBtn = elementTemplate.querySelector('.element__delete');
  const likeBtn = elementTemplate.querySelector('.element__like');

  const popupImg = modalWindowCard.querySelector('.popup__image');
  const popupFigcaption = modalWindowCard.querySelector('.popup__figcaption');

  function openCardPopup() {
    openModalWindow(modalWindowCard);
    popupImg.src = item.link;
    popupImg.alt = item.name
    popupFigcaption.textContent = item.name;
  }
  
  imgElement.src = item.link;
  imgElement.alt = item.name;

  elementTemplate.querySelector('.element__title').textContent = item.name;
  imgElement.addEventListener('click', openCardPopup);
  removeImgBtn.addEventListener('click', removeElement);
  likeBtn.addEventListener('click', like);

  return elementTemplate;
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

  const element = createElement({name: inputTitleElement.value, link: inputLinkElement.value});
  
  formAddPopup.reset();
  listContainer.prepend(element);
  closeModalWindow(modalWindowNewPlace);
}

render();

editingBtn.addEventListener('click', () => {
  openModalWindow(modalWindowProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});
modalCloseProfileBtn.addEventListener('click', () => closeModalWindow(modalWindowProfile));
addCardBtn.addEventListener('click', () => openModalWindow(modalWindowNewPlace));
modalCloseNewPlaceBtn.addEventListener('click', () => closeModalWindow(modalWindowNewPlace));
modalCloseCardBtn.addEventListener('click', () => closeModalWindow(modalWindowCard));

formEdditPopup.addEventListener('submit', saveFormSubmitHandler);
formAddPopup.addEventListener('submit', handleAddElement);