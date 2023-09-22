const quizVideoContainer = document.querySelector(".quiz-video-container");
const quizGameContainer = document.querySelector(".quiz-game-container");
const quizOptionContainer = document.querySelector(".quiz-option");
const quizOptionVideo = document.querySelector(".quiz-option video");

const url = location.href.split("/");
const moduleID = url[url.length-2];
const lawID = url[url.length-1];

const toggleQuiz = (e) => {
    console.log(e.target.innerText)
    quizVideoContainer.classList.toggle("toggle-open");
}

const openGame = (e) => {
    console.log(e.target.innerText)
    quizGameContainer.classList.toggle("toggle-open");
}

const selectOption = (e, isAnswer, questionNo, videoSrc, caption) => {
    console.log(e.target.innerText, isAnswer);
    console.log(quizOptionVideo);
    quizOptionVideo.src = videoSrc;
    if (isAnswer) quizOptionContainer.innerHTML += `
        <h2 style="color:green">Right answer!</h2>
        <h1>${caption}</h1>
        <button onclick="location.href='/dashboard'" class="button-82-pushable" type="submit" role="button">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Continue
            </span>
        </button>
    `;
    else quizOptionContainer.innerHTML += `
    <h2 style="color:red">Wrong answer!</h2>
    <h1>${caption}</h1>
    <div style="display:flex;gap:1rem;">
        <button onclick="location.reload()" class="button-82-pushable" type="submit" role="button">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge red-button-edge"></span>
            <span class="button-82-front red-button-front text">
                ← Learn again
            </span>
        </button>
        <button onclick="location.href='/dashboard'" class="button-82-pushable" type="submit" role="button">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge red-button-edge"></span>
            <span class="button-82-front red-button-front text">
                Continue
            </span>
        </button>
    </div>
    `;
    quizOptionContainer.classList.toggle("toggle-open");
}

