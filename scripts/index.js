// popup open/close
let editing = document.querySelector(".profile__edit-button");
let modalWindow = document.querySelector(".popup");
let modalCloseBtn = modalWindow.querySelector(".popup__close");

function toggleModalWindow() {
  modalWindow.classList.toggle("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

editing.addEventListener("click", toggleModalWindow);

modalCloseBtn.addEventListener("click", toggleModalWindow);

// popup profile changes

let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__name");
let jobInput = formElement.querySelector(".popup__description");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let sendBtn = document.querySelector(".popup__send");

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  toggleModalWindow();
}

sendBtn.addEventListener("click", formSubmitHandler);
