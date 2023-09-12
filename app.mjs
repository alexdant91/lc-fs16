import { InternalMemory } from "./utility.mjs";

const $form = document.querySelector('#login');
const $inputs = document.querySelectorAll('.form-input');
const $content = document.querySelector('#content');

const auth = InternalMemory.get('auth');

const state = {
  auth: {
    user: auth?.user || null,
    token: auth?.token || null
  },
  form: {
    email: '',
    password: ''
  }
}

// functions
const handleInput = (event) => {
  const { name, value } = event.target;
  state.form = {
    ...state.form,
    [name]: value
  }
}

const renderUI = () => {
  if (state.auth.token !== null) {
    $content.innerHTML = `
      <p>${state.auth.token}</p>
      <button id="logout">Log out</button>
    `
  } else {
    $content.innerHTML = '';
  }
}

const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: "POST",
      body: JSON.stringify(state.form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    state.auth = { ...data };
    InternalMemory.set('auth', state.auth);

    renderUI();
  } catch (error) {
    console.error(error);
  }
}

const logout = () => {
  state.auth.token = null;
  state.auth.user = null;
  InternalMemory.remove('auth');
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'logout') {
    logout();
    renderUI();
  }
})

$inputs.forEach($input => {
  $input.addEventListener('input', (event) => {
    handleInput(event);
  })
})

$form.addEventListener('submit', async (event) => {
  event.preventDefault();

  //Chiamata di login al server
  await login();

  $inputs.forEach($input => {
    $input.value = '';
    state.form.email = '';
    state.form.password = '';
  })
})

const init = () => {
  renderUI()
}

init();





/* const errors = [];
  if (state.form.email !== '') {
    const isValid = state.form.email.match(/([A-Za-z0-9\.]{1,})(\@)([A-Za-z0-9\.]{1,})(\.)([A-Za-z]{2,6})/ig);
    if (!isValid) {
      errors.push({
        label: 'email',
        message: 'Email not valid!'
      })
    }
  } else {
    errors.push({
      label: 'email',
      message: 'Email is requied!'
    })
  }

  if (errors.length > 0) {
    // Gestione degli errori
    return;
  } */