const registerForm = document.querySelector("#form-register")
const nameInput = document.querySelector("#name")
const lastNameInput = document.querySelector("#last-name")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const phoneInput = document.querySelector("#phone")

// funciones auxiliares

const users = JSON.parse(localStorage.getItem("users")) || [];

// funcion que almacena los datos en el storage

const saveToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users))
}

// funcion que chequea si un campo esta vacio

const isEmpty = (input) => {
    return !input.value.trim().length
}

// funcion que chequea si el valor del input es mayor al minimo y menor al maximo

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max
}

// funcion para validar el gmail con expresiones regulares

const isEmailValid = (input) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    // testeamos
    return regex.test(input.value.trim())
}

// funcion para validar si el email existe

const isExistingEmail = (input) => {
    return users.some(user => user.email === input.value.trim())
}

// funcion para validar contraseña con expresiones regulares

const isPassSecure = (input) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
    // testeamos
    return regex.test(input.value.trim())
}

// funcion para validar el telefono con regex

const isPhoneValid = (input) => {
    const regex = /^[0-9]{10}$/
    // testeamos 
    return regex.test(input.value.trim())
}

// funcion para mostrar el error al validar el input

const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove("success")
    formField.classList.add("error")
    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = message
}

const showSuccess = (input) => {
    const formField = input.parentElement
    formField.classList.remove("error")
    formField.classList.add("success")
    const error = formField.querySelector("small")
    error.textContent = ""
}

// funcion para las validaciones de los inputs

const checkTextInput = (input) => {
    let valid = false
    const minCharacters = 3
    const maxCharacters = 25

    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio")
        return
    }
    if ((!isBetween(input, minCharacters, maxCharacters))) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`)
        return
    }

    showSuccess(input)
    valid = true
    return valid
}


const checkEmail = (input) => {
    let valid = false

    if (isEmpty(input)) {
        showError(input, "El email es obligatorio")
        return
    }
    if (!isEmailValid(input)) {
        showError(input, "el email no es valido")
        return
    }
    if (isExistingEmail(input)) {
        showError(input, "El email ya se encuentra registrado")
        return
    }

    showSuccess(input)
    valid = true
    return valid
}


const checkPassword = (input) => {
    let valid = false

    if (isEmpty(input)) {
        showError(input, "La contraseña es obligatorio")
        return
    }
    if (!isPassSecure(input)) {
        showError(input, "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo")
        return
    }

    showSuccess(input)
    valid = true
    return valid
}


const checkPhone = (input) => {
    let valid = false

    if (isEmpty(input)) {
        showError(input, "El telefono es obligatorio")
        ReadableStreamDefaultController
    }
    if (!isPhoneValid(input)) {
        showError(input, "El telefono no es valido")
        return
    }

    showSuccess(input)
    valid = true
    return valid
}

// validacion general y almacenamiento de datos

const validateForm = (e) => {
    e.preventDefault()

    // almacenamos el estado de los inputs

    let isNameValid = checkTextInput(nameInput)
    let isLastNameValid = checkTextInput(lastNameInput)
    let isEmailValid = checkEmail(emailInput)
    let isPasswordValid = checkPassword(passwordInput)
    let isPhoneValid = checkPhone(phoneInput)

    let isValidForm = isNameValid && isLastNameValid && isEmailValid && isPasswordValid && isPhoneValid

    if (isValidForm) {
        users.push({
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            phone: phoneInput.value
        })
        saveToLocalStorage(users)
        alert("Te has registrado con exito")
        window.location.href = "./login.html"
    }
}

// funcion inicializadora 

const init = () => {
    registerForm.addEventListener("submit", validateForm)
    // validar con un evento a cada campo
    nameInput.addEventListener("input", () => checkTextInput(nameInput))
    lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput))
    emailInput.addEventListener("input", () => checkEmail(emailInput))
    passwordInput.addEventListener("input", () => checkPassword(passwordInput))
    phoneInput.addEventListener("input", () => checkPhone(phoneInput))
}

init()