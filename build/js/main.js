
// FORM validate
function validateForm() {
    const form = document.querySelector(".form");
    const inputName = form.querySelector(".form__input--name");
    const inputEmail = form.querySelector(".form__input--email");
    const inputPassword = form.querySelector(".form__input--password");
    const inputConfirm = form.querySelector(".form-checkbox__input");
    const checkEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const genderMale = document.getElementById("gender-male");
    const genderFemale = document.getElementById("gender-female");


    inputName.classList.remove("error");
    inputEmail.classList.remove("error");
    inputPassword.classList.remove("error");
    inputConfirm.parentNode.querySelector("label").classList.remove("error");
    genderMale.parentNode.querySelector("label").classList.remove("error");
    genderFemale.parentNode.querySelector("label").classList.remove("error");

    if (genderMale.checked == false && genderFemale.checked == false) {
        genderMale.parentNode.querySelector("label").classList.add("error");
        genderFemale.parentNode.querySelector("label").classList.add("error");
    }

    if(inputName.value == "") {
        inputName.placeholder = "Введите свое имя";
        inputName.classList.add("error");
    }

    if(checkEmail.test(inputEmail.value) == false) {
        inputEmail.value = ""
        inputEmail.placeholder = "Неверный формат email";
        inputEmail.classList.add("error");
    }

    if(inputPassword.value == "") {
        inputPassword.placeholder = "Придумайте новый пароль";
        inputPassword.classList.add("error");
    }

    if(inputConfirm.checked == false) {
        inputConfirm.parentNode.querySelector("label").classList.add("error");
    }


    if(
        inputName.value == "" ||
        checkEmail.test(inputEmail.value) == false ||
        inputPassword.value == "" ||
        inputConfirm.checked == false ||
        genderMale.checked == false && genderFemale.checked == false
    ) {
        return false;
    }
    return true;
}
const buttonForm = document.querySelector(".form__button");
buttonForm.addEventListener('click', validateForm);
// FORM validate END

const formBox = document.querySelector(".form-box");
// FORM show
function showForm(e) {
    const target = e.target;
    if (target.classList.contains("quiz__end-button")) {
        app.style.display = "none";
        formBox.style.display = "block";
    }
}
document.addEventListener("click", showForm);
// FORM show END


// Quiz
const questionAll = [
    {
        ask: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a urna sit amet",
        answers: [
            {
                variant: "A",
                text: "Вариант А",
                profit: "30%"
            },
            {
                variant: "Б",
                text: "Вариант Б",
                profit: "50%"
            },
            {
                variant: "В",
                text: "Вариант В",
                profit: "20%"
            }
        ],
        textResult: "людей обращают внимание на"
    },
    {
        ask: "Lorem ipsum",
        answers: [
            {
                variant: "A",
                text: "Вариант А",
                iconMan: true,
                profit: "60%"
            },
            {
                variant: "Б",
                text: "Вариант Б",
                iconWoman: true,
                profit: "40%"
            }
        ],
        textResult: "пользователей — Вариант"
    }
];
const color = ["#fcc150", "#fc8950",  "#1da7c0"];
const app = document.getElementById("quiz");
const appContent = document.getElementById("quiz-content");
const profitCount = document.querySelector(".profit__title");
const profitText = document.querySelector(".profit__text");
const profitVariant = document.querySelector(".profit__variant");
const homeBg = document.querySelector(".home__bg");

const generatorColor = function* (arr) {
    let colorCount = 0;
    let length = arr.length;
    while(true) {
        yield arr[colorCount];
        colorCount++;
        if(colorCount === length) colorCount = 0
    }
};
const colorLoop = generatorColor(color);



function quizSytart() {
    const container = document.querySelector(".home__container");
    container.classList.add("active");
    document.querySelector(".home__box").classList.add("active");
    setTimeout(changeQuestion(), 500);
}
const buttonQuiz = document.querySelector(".js--start-quiz");
buttonQuiz.addEventListener("click", quizSytart);

let i = 0;
function changeQuestion() {
    return function() {
        app.classList.remove("done");
        homeBg.classList.remove("active");
        for(colorCount = 0; colorCount < 20; colorCount++) {
            document.documentElement.style.setProperty('--current-color', colorLoop.next().value);
        }
        if( i < questionAll.length) {
            appContent.innerHTML = `
                <span class="quiz__ask">${questionAll[i].ask}</span>
                <div class="quiz__button-box">
                    ${questionAll[i].answers
                    .map(answer => `
                        <button 
                            class="button quiz__answer ${answer.iconMan ? "icon--man" : ""} ${answer.iconWoman ? "icon--woman" : ""}" 
                            data-description="${answer.profit ? answer.profit : "?"}"
                            data-variant="${answer.variant ? answer.variant : ""}">
                            ${answer.text}
                        </button>
                    `
                    )
                    .join("\n")}
                </div>
            `;
            profitText.innerHTML = questionAll[i].textResult;
        } else {
            document.querySelector(".quiz__end").style.display = "block";
        }
        i++;
    };
}


function currentAnswer(e) {
    const target = e.target;
    const parent = target.parentNode;
    const nodes = parent.children;
    if(target.classList.contains("quiz__answer")) {
        for (let i = 0; i < nodes.length; i++) {
            if(nodes[i].classList.contains("active")) {
                nodes[i].classList.remove("active");
            }
        }
    }
    if(target.classList.contains("quiz__answer")) {
        target.classList.add("active");
        app.classList.add("done");
        homeBg.classList.add("active");
        profitCount.innerHTML = target.getAttribute("data-description");
        profitVariant.innerHTML = target.getAttribute("data-variant");
    }
}
document.addEventListener("click", currentAnswer);

const questionNext = document.querySelector(".quiz__button-next");
questionNext.addEventListener("click", changeQuestion());
// Quiz END



