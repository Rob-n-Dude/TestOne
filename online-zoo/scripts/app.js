const donateButton = document.querySelector('.footer_donate');
const nextButton = document.querySelector('.button_next');
const donateFormButton = document.querySelector('.button_pay');
const form = document.querySelector('.form');
const formSelects = [document.querySelector('.select-currency'), document.querySelector('.form-choose-select')]

//Формы с карточками и донатом
const cardForm = form.childNodes[1];
const donateForm = form.childNodes[5];


const amountInput = document.querySelector('.form-choose-to-donate_amount');

let prevAmountValue = 0;
let prevCardNumbervalue = '';
let prevCardMonth = '';
let prevCardCVCValue = '';
let prevCardYear = '';
let prevCardOwner = '';

function checkOption(select) { 
    // Забирает параметры из select в формате ['животное','сумма','валюта']
    const currency = select[0].value;
    const animal = select[1].value;
    const value = amountInput.value;
    return [animal,value, currency];
}

function toggleClassToForm (event) {
    if (event.target.getAttribute('name') == 'form' || event.target.value == 'Donate for volunteers' || event.target.getAttribute('alt') == 'close-image') {
        donateForm.classList.toggle('form_active')
        form.classList.toggle('form_active')
        if(cardForm.classList.contains('form_active')) {
            donateForm.classList.toggle('form_active')
            cardForm.classList.toggle('form_active')
        }
    }
}

function nextForm () {
    donateForm.classList.toggle('form_active')
    cardForm.classList.toggle('form_active')
}

function donate () {
    //завершает обработку формы
    const options = checkOption(formSelects);
    const report = function (options) {
        const donateMessage = `You donate ${options[1]} ${options[2]} for ${options[0]}s`;
        const thxMessage = `Thanks for visiting my online zoo`;
        (options[1] && Number(options[1]) > 0) == true ? alert(`${donateMessage}`) : alert(`${thxMessage}`);
    }
    cardForm.classList.toggle('form_active')
    form.classList.toggle('form_active')

    clearForm();
    toggleNextButton();
    setTimeout(() => {report(options)},200)
}

function clearForm() {
    const cardInputs = cardForm.childNodes[1]
    for(let inp of cardInputs) {
        if(inp.type == "text") {
            inp.value = '';
        }
    }
    const donateInputs = donateForm.childNodes[1];
    for (let inp of donateInputs) {
        if (inp.type == 'textarea' || inp.type == 'number') {
            inp.value = '';
        }
    }
}

function amountHandler() {
    //Проверяет ввод в Amount поле
    amountInput.value = amountInput.value > 9999 ? prevAmountValue : amountInput.value;
    prevAmountValue = amountInput.value
    if (amountInput.value.startsWith('0')) {
        amountInput.value = '';
    }
}

function checkButton (value) {
    return value == '' ? true : false
}

function toggleNextButton() {
    nextButton.disabled = checkButton(amountInput.value)
}

function toggleDonateButton () {
    let res = false;
    for (let form of cardForm.childNodes[1]){
        if (form.type == 'text'){
            if (form.classList.value == 'frontcard_owner'){
                continue;
            }
            if(form.value == '') {
                res = true;
                break;
            }
        }
    }
    donateFormButton.disabled = res;
}

function cardInputHandler (e) {
    const regex = /\d/;
    if (regex.test(e.data) || e.inputType == "deleteContentBackward" || e.inputType == "deleteContentForward") {
        prevCardNumbervalue = e.target.value
    }
    else {
        e.target.value = prevCardNumbervalue;
    }
}

function cardCVCHandler (e) {
    const regex = /\d/;
    if (regex.test(e.data) || e.inputType == "deleteContentBackward" || e.inputType == "deleteContentForward") {
        prevCardCVCValue = e.target.value
    }
    else {
        e.target.value = prevCardCVCValue;
    }
}

function cardYearHandler (e) {
    const regex = /\d/;
    if (regex.test(e.data) || e.inputType == "deleteContentBackward" || e.inputType == "deleteContentForward") {
        prevCardYear = e.target.value
    }
    else {
        e.target.value = prevCardYear;
    }
}

function cardMonthHandler (e) {
    const regex = /\d/;
    if (regex.test(e.data) || e.inputType == "deleteContentBackward" || e.inputType == "deleteContentForward") {
        prevCardMonth = e.target.value
    }
    else {
        e.target.value = prevCardMonth;
    }

    if(Number(e.target.value) > 12) {
        e.target.value = 12;
    }
}

function cardMonthFormater (e) {
    if (Number(e.target.value) < 10) {
        e.target.value = '0' + e.target.value;
    }
    if (e.target.value == 0) {
        e.target.value = ''
    }
}

function cardNameHandler (e) {
    const regexp = /[A-Za-z ]/;
    if (regexp.test(e.data) || e.inputType == "deleteContentBackward" || e.inputType == "deleteContentForward") {
        prevCardOwner = e.target.value
    }
    else {
        e.target.value = prevCardOwner;
    }
}

function addListenersForDonateForm() {
    for (let form of cardForm.childNodes[1]){
        if (form.type == 'text'){
                form.addEventListener('input', e => toggleDonateButton())            
            if  (form.classList.value == 'frontcard_number') {
                form.addEventListener('input', e => cardInputHandler(e));
            }
            else if (form.classList.value == 'frontcard_year') {
                form.addEventListener('input', e => cardYearHandler(e))
            }
            else if (form.classList.value == 'backcard_CVC') {
                form.addEventListener('input', e => cardCVCHandler(e));
            }
            else if (form.classList.value == 'frontcard_month') {
                form.addEventListener('input', e => cardMonthHandler(e));
                form.addEventListener('change', e => cardMonthFormater(e));

            }
            else if (form.classList.value == 'frontcard_owner') {
                form.addEventListener('input', e => cardNameHandler(e));
            }
        }
    }
}

donateButton.addEventListener('click',e => toggleClassToForm(e))
form.addEventListener('click', e => toggleClassToForm(e));
nextButton.addEventListener('click', e => nextForm());
donateFormButton.addEventListener('click', e => donate());

amountInput.addEventListener('input',() => {
    amountHandler()
    toggleNextButton()
});

addListenersForDonateForm();