const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Turkiyenin Baskenti Neresidir ?',
    answers: [
      { text: 'Ankara', correct: true },
      { text: 'Trabzon', correct: false },
      { text: 'Urfa', correct: false },
      { text: 'Istanbul', correct: false }
    ]
  },
  {
    question: 'Burclara Inaniyor Musun',
    answers: [
      { text: 'EVET', correct: true },
      { text: 'HAYIR', correct: true }
      
    ]
  },
  {
    question: 'Trabzon Hangi Yemek Ile Meshurdur ?',
    answers: [
      { text: 'Hamsi', correct: true },
      { text: 'Iskender', correct: false },
      { text: 'Soslu Durum', correct: false },
      { text: 'Cokertme Kebabi', correct: false }
    ]
  },
  {
    question: 'Hangisi En Yararli Ulasim Bicimidir ?',
    answers: [
      { text: 'Metrobus', correct: true },
      { text: 'Araba', correct: false },
      { text: 'ATV', correct: false },
      { text: 'Motorsiklet', correct: false }
    ]
  },
  {
    question: 'Hangisi Atletizmin dallarindan birisi degildir ?',
    answers: [
      { text: 'Gulle Atmak', correct: false },
      { text: 'Takla Atmak', correct: true },
      { text: 'Disk Atmak', correct: false },
      { text: 'Cirit Atmak', correct: false }
    ]
  },
  {
    question: 'Kama Nehri Hangi Ulkededir ?',
    answers: [
      { text: 'Rusya', correct: true },
      { text: 'Romanya', correct: false },
      { text: 'Polonya', correct: false },
      { text: 'Iran', correct: false }
    ]
  },
  {
    question: 'Bir Gun Kac Saniyedir ?',
    answers: [
      { text: '86000', correct: false },
      { text: '88600', correct: false },
      { text: '86400', correct: true },
      { text: '84800', correct: false }
    ]
  }
]