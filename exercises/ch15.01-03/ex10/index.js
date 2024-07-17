document.addEventListener('DOMContentLoaded', () => {
    const divElement = document.querySelector('#editor-front');
    const inputElement = document.querySelector('#editor-back');

    divElement.addEventListener('click', () => {
        inputElement.focus();
    });

    inputElement.addEventListener('focus', () => {
        divElement.style.backgroundColor = 'silver';
    });

    inputElement.addEventListener('blur', () => {
        divElement.style.backgroundColor = 'white';
    });

    inputElement.addEventListener('input', () => {
        divElement.textContent = inputElement.value;
    });
});