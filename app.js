let apiBtn = document.querySelector('.choose__btn')
let quiz = document.querySelector('.quiz')
let choose = document.querySelector('.choose')
let result = document.querySelector('.result')
let count = 0
let trueCount = 0
let questions = []
let chooseCount = 5

let minut = 0
let secund = 0
apiBtn.addEventListener('click', ()=>{
  chooseCount = document.getElementById('chooseCount').value
  if (chooseCount > 50) {
    document.querySelector('.choose .error').classList.add('active')
    return false
  } else {
    document.querySelector('.choose .error').classList.remove('active')
  }
  minut = chooseCount * 2
  let chooseCat = document.getElementById('chooseCat').value
  let chooseDif = document.getElementById('chooseDif').value
  let chooseType = document.getElementById('chooseType').value
  let url = ''
  if (chooseType == 'any' && chooseDif == 'any' && chooseCat == 'any') url = 'https://opentdb.com/api.php?amount='+chooseCount+''
  
  else if (chooseCat == 'any' && chooseDif == 'any') url = 'https://opentdb.com/api.php?amount='+chooseCount+''
  
  else if (chooseCat == 'any' && chooseType == 'any') url = 'https://opentdb.com/api.php?amount='+chooseCount+'&difficulty='+chooseDif+''

  else if (chooseCat == 'any') url = 'https://opentdb.com/api.php?amount='+chooseCount+'&difficulty='+chooseDif+'&type='+chooseType+''

  else if (chooseType == 'any' && chooseDif == 'any') url = 'https://opentdb.com/api.php?amount='+chooseCount+'&category='+chooseCat+''

  else if (chooseDif == 'any') url = 'https://opentdb.com/api.php?amount='+chooseCount+'&category='+chooseCat+'&type='+chooseType+''

  else if (chooseType == 'any') url = 'https://opentdb.com/api.php?amount='+chooseCount+'&category='+chooseCat+'&difficulty='+chooseDif+''

  else url = 'https://opentdb.com/api.php?amount='+chooseCount+'&category='+chooseCat+'&difficulty='+chooseDif+'&type='+chooseType+''

  let xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  
  xhr.onload = () => {
    questions = JSON.parse(xhr.responseText).results
    time()
    show(questions[count]) 
  }
  xhr.send()
  
  choose.classList.remove('active')
  quiz.classList.add('active')
  document.querySelector('.quiz__cat').innerHTML = 'Category: '+chooseCat
  document.getElementById('resCat').innerHTML = chooseCat
})



let checkBtn = document.querySelector('.quiz__check')
checkBtn.addEventListener('click', ()=> {
  
  let answer = document.querySelector('.quiz__input input:checked').value
  console.log(questions[count].correct_answer);
  console.log(answer);

  if (answer == questions[count].correct_answer){
    trueCount ++
  }
  if(count == chooseCount-1 || (minut == 0 && secund == 0)) {
    quiz.classList.remove('active')
    result.classList.add('active')
    document.getElementById('res').innerHTML = trueCount
    document.getElementById('resCount').innerHTML = chooseCount
    document.getElementById('resTime').innerHTML = String(numbers(minut)) + ':' + String(numbers(secund))
    document.getElementById('resFoiz').innerHTML = trueCount / parseInt(chooseCount) * 100
    console.log(trueCount, chooseCount);
    return false
  }
  count ++

  show(questions[count])
})





function show(array){
  document.querySelector('.quiz__count .allCount').innerHTML = '/ ' + chooseCount
  document.querySelector('.quiz__count .count').innerHTML = (count+1)
  document.querySelector('.quiz__question').innerHTML = array.question
  let answers = array.incorrect_answers
  answers.push(array.correct_answer)
  answers = shuffleArray(answers)
  let quizList = document.querySelector('.quiz__list')
  quizList.innerHTML = ''
  let i = 1
  console.log(answers);
  answers.forEach(element => {
    quizList.innerHTML += ` <div class="quiz__input">
                    <input type="radio" id="answer${i}" value="${element}" name="quiz">
                    <label for="answer${i}">${element}</label>
                  </div>`
    i++
  });
}

function time(){
  setInterval(() => {
    document.querySelector('.quiz__count .minut').innerHTML = numbers(minut) + ':'
    document.querySelector('.quiz__count .secund').innerHTML = numbers(secund)
    if(minut == 0 && secund == 0) {
      quiz.classList.remove('active')
      result.classList.add('active')
      document.getElementById('res').innerHTML = trueCount
      document.getElementById('resCount').innerHTML = chooseCount
      document.getElementById('resTime').innerHTML = String(numbers(minut)) + ':' + String(numbers(secund))
      document.getElementById('resFoiz').innerHTML = trueCount / parseInt(chooseCount) * 100
      console.log(trueCount, chooseCount);
      return false
    }
    if(secund  == 0 ){
      secund = 60
      minut --
      console.log(secund);
    }
    secund -- 
  }, 1000);
}
function numbers(num){
  return (num < 10) ? '0' + num: num
}

function shuffleArray(array){
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

