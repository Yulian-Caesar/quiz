
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




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCIuLi9jb21wb25lbnRzL2hvbWUvaG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBRHhaQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLz1pbmNsdWRlIC4uL2NvbXBvbmVudHMvaG9tZS9ob21lLmpzXG4iLCIvLyBGT1JNIHZhbGlkYXRlXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbiAgICBjb25zdCBpbnB1dE5hbWUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9faW5wdXQtLW5hbWVcIik7XHJcbiAgICBjb25zdCBpbnB1dEVtYWlsID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2lucHV0LS1lbWFpbFwiKTtcclxuICAgIGNvbnN0IGlucHV0UGFzc3dvcmQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9faW5wdXQtLXBhc3N3b3JkXCIpO1xyXG4gICAgY29uc3QgaW5wdXRDb25maXJtID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tY2hlY2tib3hfX2lucHV0XCIpO1xyXG4gICAgY29uc3QgY2hlY2tFbWFpbCA9IC9eKFtBLVphLXowLTlfXFwtXFwuXSkrXFxAKFtBLVphLXowLTlfXFwtXFwuXSkrXFwuKFtBLVphLXpdezIsNH0pJC87XHJcbiAgICBjb25zdCBnZW5kZXJNYWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5kZXItbWFsZVwiKTtcclxuICAgIGNvbnN0IGdlbmRlckZlbWFsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuZGVyLWZlbWFsZVwiKTtcclxuXHJcblxyXG4gICAgaW5wdXROYW1lLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcclxuICAgIGlucHV0RW1haWwuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xyXG4gICAgaW5wdXRQYXNzd29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XHJcbiAgICBpbnB1dENvbmZpcm0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwibGFiZWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xyXG4gICAgZ2VuZGVyTWFsZS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XHJcbiAgICBnZW5kZXJGZW1hbGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwibGFiZWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xyXG5cclxuICAgIGlmIChnZW5kZXJNYWxlLmNoZWNrZWQgPT0gZmFsc2UgJiYgZ2VuZGVyRmVtYWxlLmNoZWNrZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICBnZW5kZXJNYWxlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcImxhYmVsXCIpLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcclxuICAgICAgICBnZW5kZXJGZW1hbGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwibGFiZWxcIikuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlucHV0TmFtZS52YWx1ZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgaW5wdXROYW1lLnBsYWNlaG9sZGVyID0gXCLQktCy0LXQtNC40YLQtSDRgdCy0L7QtSDQuNC80Y9cIjtcclxuICAgICAgICBpbnB1dE5hbWUuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGNoZWNrRW1haWwudGVzdChpbnB1dEVtYWlsLnZhbHVlKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlucHV0RW1haWwudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgaW5wdXRFbWFpbC5wbGFjZWhvbGRlciA9IFwi0J3QtdCy0LXRgNC90YvQuSDRhNC+0YDQvNCw0YIgZW1haWxcIjtcclxuICAgICAgICBpbnB1dEVtYWlsLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihpbnB1dFBhc3N3b3JkLnZhbHVlID09IFwiXCIpIHtcclxuICAgICAgICBpbnB1dFBhc3N3b3JkLnBsYWNlaG9sZGVyID0gXCLQn9GA0LjQtNGD0LzQsNC50YLQtSDQvdC+0LLRi9C5INC/0LDRgNC+0LvRjFwiO1xyXG4gICAgICAgIGlucHV0UGFzc3dvcmQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlucHV0Q29uZmlybS5jaGVja2VkID09IGZhbHNlKSB7XHJcbiAgICAgICAgaW5wdXRDb25maXJtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcImxhYmVsXCIpLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYoXHJcbiAgICAgICAgaW5wdXROYW1lLnZhbHVlID09IFwiXCIgfHxcclxuICAgICAgICBjaGVja0VtYWlsLnRlc3QoaW5wdXRFbWFpbC52YWx1ZSkgPT0gZmFsc2UgfHxcclxuICAgICAgICBpbnB1dFBhc3N3b3JkLnZhbHVlID09IFwiXCIgfHxcclxuICAgICAgICBpbnB1dENvbmZpcm0uY2hlY2tlZCA9PSBmYWxzZSB8fFxyXG4gICAgICAgIGdlbmRlck1hbGUuY2hlY2tlZCA9PSBmYWxzZSAmJiBnZW5kZXJGZW1hbGUuY2hlY2tlZCA9PSBmYWxzZVxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuY29uc3QgYnV0dG9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fYnV0dG9uXCIpO1xyXG5idXR0b25Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdmFsaWRhdGVGb3JtKTtcclxuLy8gRk9STSB2YWxpZGF0ZSBFTkRcclxuXHJcbmNvbnN0IGZvcm1Cb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tYm94XCIpO1xyXG4vLyBGT1JNIHNob3dcclxuZnVuY3Rpb24gc2hvd0Zvcm0oZSkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInF1aXpfX2VuZC1idXR0b25cIikpIHtcclxuICAgICAgICBhcHAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGZvcm1Cb3guc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIH1cclxufVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd0Zvcm0pO1xyXG4vLyBGT1JNIHNob3cgRU5EXHJcblxyXG5cclxuLy8gUXVpelxyXG5jb25zdCBxdWVzdGlvbkFsbCA9IFtcclxuICAgIHtcclxuICAgICAgICBhc2s6IFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gSW50ZWdlciBhIHVybmEgc2l0IGFtZXRcIixcclxuICAgICAgICBhbnN3ZXJzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhcmlhbnQ6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCLQktCw0YDQuNCw0L3RgiDQkFwiLFxyXG4gICAgICAgICAgICAgICAgcHJvZml0OiBcIjMwJVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhcmlhbnQ6IFwi0JFcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwi0JLQsNGA0LjQsNC90YIg0JFcIixcclxuICAgICAgICAgICAgICAgIHByb2ZpdDogXCI1MCVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXJpYW50OiBcItCSXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcItCS0LDRgNC40LDQvdGCINCSXCIsXHJcbiAgICAgICAgICAgICAgICBwcm9maXQ6IFwiMjAlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdGV4dFJlc3VsdDogXCLQu9GO0LTQtdC5INC+0LHRgNCw0YnQsNGO0YIg0LLQvdC40LzQsNC90LjQtSDQvdCwXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgYXNrOiBcIkxvcmVtIGlwc3VtXCIsXHJcbiAgICAgICAgYW5zd2VyczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXJpYW50OiBcIkFcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwi0JLQsNGA0LjQsNC90YIg0JBcIixcclxuICAgICAgICAgICAgICAgIGljb25NYW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwcm9maXQ6IFwiNjAlXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyaWFudDogXCLQkVwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCLQktCw0YDQuNCw0L3RgiDQkVwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbldvbWFuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJvZml0OiBcIjQwJVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHRleHRSZXN1bHQ6IFwi0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10Lkg4oCUINCS0LDRgNC40LDQvdGCXCJcclxuICAgIH1cclxuXTtcclxuY29uc3QgY29sb3IgPSBbXCIjZmNjMTUwXCIsIFwiI2ZjODk1MFwiLCAgXCIjMWRhN2MwXCJdO1xyXG5jb25zdCBhcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1aXpcIik7XHJcbmNvbnN0IGFwcENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1aXotY29udGVudFwiKTtcclxuY29uc3QgcHJvZml0Q291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpdF9fdGl0bGVcIik7XHJcbmNvbnN0IHByb2ZpdFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpdF9fdGV4dFwiKTtcclxuY29uc3QgcHJvZml0VmFyaWFudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZml0X192YXJpYW50XCIpO1xyXG5jb25zdCBob21lQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX2JnXCIpO1xyXG5cclxuY29uc3QgZ2VuZXJhdG9yQ29sb3IgPSBmdW5jdGlvbiogKGFycikge1xyXG4gICAgbGV0IGNvbG9yQ291bnQgPSAwO1xyXG4gICAgbGV0IGxlbmd0aCA9IGFyci5sZW5ndGg7XHJcbiAgICB3aGlsZSh0cnVlKSB7XHJcbiAgICAgICAgeWllbGQgYXJyW2NvbG9yQ291bnRdO1xyXG4gICAgICAgIGNvbG9yQ291bnQrKztcclxuICAgICAgICBpZihjb2xvckNvdW50ID09PSBsZW5ndGgpIGNvbG9yQ291bnQgPSAwXHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IGNvbG9yTG9vcCA9IGdlbmVyYXRvckNvbG9yKGNvbG9yKTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcXVpelN5dGFydCgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fY29udGFpbmVyXCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX2JveFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgc2V0VGltZW91dChjaGFuZ2VRdWVzdGlvbigpLCA1MDApO1xyXG59XHJcbmNvbnN0IGJ1dHRvblF1aXogPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLS1zdGFydC1xdWl6XCIpO1xyXG5idXR0b25RdWl6LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBxdWl6U3l0YXJ0KTtcclxuXHJcbmxldCBpID0gMDtcclxuZnVuY3Rpb24gY2hhbmdlUXVlc3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwLmNsYXNzTGlzdC5yZW1vdmUoXCJkb25lXCIpO1xyXG4gICAgICAgIGhvbWVCZy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGZvcihjb2xvckNvdW50ID0gMDsgY29sb3JDb3VudCA8IDIwOyBjb2xvckNvdW50KyspIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWN1cnJlbnQtY29sb3InLCBjb2xvckxvb3AubmV4dCgpLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIGkgPCBxdWVzdGlvbkFsbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYXBwQ29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInF1aXpfX2Fza1wiPiR7cXVlc3Rpb25BbGxbaV0uYXNrfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdWl6X19idXR0b24tYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtxdWVzdGlvbkFsbFtpXS5hbnN3ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChhbnN3ZXIgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gcXVpel9fYW5zd2VyICR7YW5zd2VyLmljb25NYW4gPyBcImljb24tLW1hblwiIDogXCJcIn0gJHthbnN3ZXIuaWNvbldvbWFuID8gXCJpY29uLS13b21hblwiIDogXCJcIn1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZGVzY3JpcHRpb249XCIke2Fuc3dlci5wcm9maXQgPyBhbnN3ZXIucHJvZml0IDogXCI/XCJ9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdmFyaWFudD1cIiR7YW5zd2VyLnZhcmlhbnQgPyBhbnN3ZXIudmFyaWFudCA6IFwiXCJ9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2Fuc3dlci50ZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiXFxuXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHByb2ZpdFRleHQuaW5uZXJIVE1MID0gcXVlc3Rpb25BbGxbaV0udGV4dFJlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnF1aXpfX2VuZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpKys7XHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY3VycmVudEFuc3dlcihlKSB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3Qgbm9kZXMgPSBwYXJlbnQuY2hpbGRyZW47XHJcbiAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicXVpel9fYW5zd2VyXCIpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihub2Rlc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgIG5vZGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicXVpel9fYW5zd2VyXCIpKSB7XHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgYXBwLmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gICAgICAgIGhvbWVCZy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIHByb2ZpdENvdW50LmlubmVySFRNTCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlc2NyaXB0aW9uXCIpO1xyXG4gICAgICAgIHByb2ZpdFZhcmlhbnQuaW5uZXJIVE1MID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtdmFyaWFudFwiKTtcclxuICAgIH1cclxufVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3VycmVudEFuc3dlcik7XHJcblxyXG5jb25zdCBxdWVzdGlvbk5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnF1aXpfX2J1dHRvbi1uZXh0XCIpO1xyXG5xdWVzdGlvbk5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVF1ZXN0aW9uKCkpO1xyXG4vLyBRdWl6IEVORFxyXG5cclxuXHJcbiJdfQ==
