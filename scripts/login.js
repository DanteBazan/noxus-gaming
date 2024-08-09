const loginForm = document.querySelector("#login-form")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const errorMessage = document.querySelector("#form__error")

const users = JSON.parse(localStorage.getItem("users")) || [];

// funcion para guardar el usuario en el session

const saveToSessionStorage = (user) => {
    sessionStorage.setItem("avtiveUser", JSON.stringify(user))
}

// funcion que muestra el error al validar

const showError = (message) => {
    errorMessage.textContent = message
}

// funcion que chequea si el campo es valido

const isEmpty = (input) => {
    return !input.value.trim().length
}

// funcion para chequear si el email existe en el array de usuarios

const isExistingEmail = (input) => {
    let flag = users.some((user) => user.email === input.value.trim())
    console.log(flag)
    return flag
}

// funcion para validar si el password coincide con el password del usuario

const isMatchingPass = (input) => {
    //busco en el array de usuarios el email que concuerde con el ingresado en el input de email y lo almaceno en la variable user
    const user = users.find((user) => user.email === emailInput.value.trim())
    //comparo el password ingresado con el password de la variable user

    return user.password === input.value.trim()
}

/**
 * Función para mostrar error al validar el formulario.
 * Consta de 4 instancias:
    -1. Chequea si el campo de email esta vacio.
    -2. Chequea si el email ingresado existe en el array de usuarios.
    -3. Chequea si el campo de password esta vacio.
    -4. Chequea si la password ingresada coincide con la registrada para ese mail.
  * Si pasa todas las validaciones, es porque los datos ingresados son validos
*/

const isValidAccount = () => {
    let valid = false

    if (isEmpty(emailInput)) {
        showError("Por favor, complete los campos")
        return
    }
    if (!isExistingEmail(emailInput)) {
        showError("El email ingresado no existe")
        return
    }
    if (isEmpty(passwordInput)) {
        showError("Por favor, complete los campos")
        return
    }
    if (!isMatchingPass(passwordInput)) {
        showError("Los datos ingresador son incorrectos")
        return
    }

    alert("Iniciaste sesion con exito")
    valid = true
    errorMessage.textContent = ""
    loginForm.reset()
    return valid
}

// funcion de login

const login = (e) => {
    e.preventDefault()

    if (isValidAccount()) {
        const user = users.find(user => user.email === emailInput.value.trim())
        saveToSessionStorage(user)
        window.location.href = "../index.html"
    }

}

const init = () => {
    loginForm.addEventListener("submit", login)
}

init()