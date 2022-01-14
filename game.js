const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'O que devemos fazer com as pilhas que NÃO são alcalinas?',
        choice1: 'Jogar no lixo comum',
        choice2: 'Devolver aos fabricantes',
        choice3: 'Guardar elas',
        choice4: 'Jogar na rua',
        answer: 2,
    },
    {
        question: 'Em que lixo devemos jogar o Isopor?',
        choice1: 'Lixo para Plásticos',
        choice2: 'Lixo para Vidros',
        choice3: 'Lixo para Metais',
        choice4: 'Lixo para Papel',
        answer: 1,
    },
    {
        question: 'Quanto tempo um plástico demora para se decompor?',
        choice1: '150 Anos',
        choice2: '50 Anos',
        choice3: '450 Anos',
        choice4: '100 Anos',
        answer: 3,
    },
    {
        question: 'Em que lixo devemos jogar os produtos que são feitos de papel?',
        choice1: 'Lixo Marrom',
        choice2: 'Lixo Amarelo',
        choice3: 'Lixo Verde',
        choice4: 'Lixo Azul',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} off ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()