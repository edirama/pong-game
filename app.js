import Ball from './ball.js'
import Paddle from './paddle.js'

const paddleLeft = document.getElementById('player-paddle')
const paddleRight = document.getElementById('computer-paddle')
const ballElem = document.getElementById('ball')
const playerScoreElem = document.getElementById('player-score')
const computerScoreElem = document.getElementById('computer-score')

const ball = new Ball(ballElem)
const playerPaddle = new Paddle(paddleLeft)
const computerPaddle = new Paddle(paddleRight)

let lastTime
const update = function (time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--hue')
    )

    document.documentElement.style.setProperty('--hue', hue + delta * 0.01)

    if (isLose()) handleLose()
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

const isLose = function () {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

const handleLose = function () {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  ball.reset()
  computerPaddle.reset()
}

document.addEventListener('mousemove', function (e) {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)
