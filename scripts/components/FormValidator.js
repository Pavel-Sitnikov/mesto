export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput = () => {
    return Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButton = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  };

  resetValidation() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButton();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
