const fields = document.querySelectorAll('.field');

const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordnput = document.querySelector('input[name="confirmpassword"]');

const showPasswordButton = document.querySelector('input[name="password"] ~ .show-hide');
const showConfirmPasswordButton = document.querySelector('input[name="confirmpassword"] ~ .show-hide');

showPasswordButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentType = passwordInput.type;

    if(currentType === 'text') {
        passwordInput.type = 'password';
    } else {
        passwordInput.type = 'text';
    };

    fields[2].classList.toggle('show');
});

showConfirmPasswordButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentType = confirmPasswordnput.type;

    if(currentType === 'text') {
        confirmPasswordnput.type = 'password';
    } else {
        confirmPasswordnput.type = 'text';
    };

    fields[3].classList.toggle('show');
});

const isValidEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-z\-0-9]+\.)+[a-z]{2,})$/);
};

const nameToConfigMap = {
    name: {
        validator: (value) => !!value,
        error: 'Ім`я обов`язкове'
    }, email: {
        validator: isValidEmail,
        error: 'Введіть валідну електронну пошту'
    }, password: {
        validator: (value) => !!value,
        error: 'Пароль обов`язковий'
    }, confirmpassword: {
        validator: (confirmPasswordValue) => confirmPasswordValue == passwordInput.value,
        error: 'Паролі не співпадають'
    }
};


fields.forEach((field) => {
    const children = field.childNodes;
    const input = children[1];

    input.addEventListener('blur', (e) => {
        const {name, value} = e.target;
        const config = nameToConfigMap[name];

        let successElement = field.querySelector('div.success');
        let errorElement = field.querySelector('div.error');
        
        if(config.validator(value)) {
            successElement.innerHTML = `<img src="./images/success.svg" alt="Success" />`;
            errorElement.innerHTML = ``;
        } else {
            successElement.innerHTML = ``;
            errorElement.innerHTML = `<img src="./images/error.svg" alt="Error" /> ${config.error}`;
        }
    });
});