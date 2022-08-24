console.log('script')
import ancientsData from '../data/ancients.js'
import difficulties from '../data/difficulties.js'
import { greenCards, brownCards, blueCards } from '../data/mythicCards/index.js'
import { idan } from './test.js'

const eldrichList = document.querySelector('.eldrich-list')
const counterList = document.querySelector('.counter-list')
const levelList = document.querySelector('.level-list')
const btnGo = document.querySelector('.button-go')
const mythClose = document.querySelector('.myth-close')
const mythOpen = document.querySelector('.myth-open')

let selectAncient
let sumCards = []
let ancientsCallArray = []
let packArray = []
let mainPackArray = []
let reservedPackArray = []
let headPack = []

// console.log(blueCards[1].cardFace)
// mythOpen.style.backgroundImage = `url(${blueCards[1].cardFace})` // раздача
// mythOpen.style.backgroundImage = `url('../assets/MythicCards/blue/blue1.png')`

function getRandomArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let tmp = arr[i]
		let rnd = Math.floor(Math.random() * (i + 1))
		arr[i] = arr[rnd]
		arr[rnd] = tmp
	}
	return arr
}
function getRandomNum(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

eldrichList.addEventListener('click', (event) => {
	ancientsCallArray = []
	if (event.target.classList[0] === 'eldrich-item') {
		selectAncient = ancientsData[event.target.id]
		for (let key in selectAncient) {
			ancientsCallArray.push(Object.values(selectAncient[key]))
		}
		const step = counterList.querySelectorAll('.step')

		//! вывести в отдельную функцию при pop с колоды
		for (let i = 0; i < step.length; i++) {
			const cell = step[i].querySelectorAll('.cell')
			for (let j = 0; j < cell.length; j++) {
				cell[j].innerHTML = ancientsCallArray[i][j]
			}
		}
		if (eldrichList.querySelector('.eldrich-item--active')) {
			eldrichList
				.querySelector('.eldrich-item--active')
				.classList.remove('eldrich-item--active')
		}
		event.target.classList.add('eldrich-item--active')
		if (headPack.length > 0) {
			console.log('lf')
			headPack = []
			levelList
				.querySelector('.level-item--active')
				.classList.remove('level-item--active')
		}
	}
	console.log(headPack)
	document.querySelector('.myth-close').classList.add('visible-off')
	document.querySelector('.myth-open').classList.add('visible-off')
})

levelList.addEventListener('click', (event) => {
	if (event.target.classList[0] === 'level-item') {
		sumAncient()

		if (event.target.id === 'very-easy') {
			console.log('да')
			getPackArrayVery('easy')
		}
		if (event.target.id === 'very-hard') {
			console.log('да')
			getPackArrayVery('hard')
		}

		if (levelList.querySelector('.level-item--active')) {
			levelList
				.querySelector('.level-item--active')
				.classList.remove('level-item--active')
		}
		event.target.classList.add('level-item--active')
	}
})

function sumAncient() {
	sumCards = []
	let sumGreenCards = 0,
		sumBrownCards = 0,
		sumBlueCards = 0

	if (selectAncient) {
		for (let key in selectAncient) {
			sumGreenCards += selectAncient[key].greenCards
			sumBrownCards += selectAncient[key].brownCards
			sumBlueCards += selectAncient[key].blueCards
		}
		sumCards.push(sumGreenCards)
		sumCards.push(sumBrownCards)
		sumCards.push(sumBlueCards)
	}
}

//! очень лёгкий

function getArrayColorAndDifficulty(obj, difficulty) {
	const arrColor = []
	for (let i = 0; i < obj.length; i++) {
		if (obj[i].difficulty == difficulty) {
			arrColor.push(obj[i])
		}
	}
	return arrColor
}

function getPackArrayVery(level) {
	packArray = []
	mainPackArray = []
	reservedPackArray = []
	headPack = []

	mainPackArray.push(getArrayColorAndDifficulty(greenCards, level))
	mainPackArray.push(getArrayColorAndDifficulty(brownCards, level))
	mainPackArray.push(getArrayColorAndDifficulty(blueCards, level))
	packArray.push(mainPackArray)

	reservedPackArray.push(getArrayColorAndDifficulty(greenCards, 'normal'))
	reservedPackArray.push(getArrayColorAndDifficulty(brownCards, 'normal'))
	reservedPackArray.push(getArrayColorAndDifficulty(blueCards, 'normal'))
	packArray.push(reservedPackArray)

	for (let i = 0; i < 3; i++) {
		getRandomArray(mainPackArray[i])
		getRandomArray(reservedPackArray[i])
		if (mainPackArray[i].length >= sumCards[i]) {
			headPack.push(mainPackArray[i].slice(0, sumCards[i]))
		} else {
			headPack.push(mainPackArray[i])
			headPack[i].push(
				...reservedPackArray[i].slice(0, sumCards[i] - mainPackArray[i].length)
			)
			getRandomArray(headPack[i])
		}
	}
}

// //! очень тяжелый

// function getPackArrayVeryHard() {
// 	packArray = []
// 	mainPackArray = []
// 	reservedPackArray = []

// 	mainPackArray.push(getArrayColorAndDifficulty(greenCards, 'hard'))
// 	mainPackArray.push(getArrayColorAndDifficulty(brownCards, 'hard'))
// 	mainPackArray.push(getArrayColorAndDifficulty(blueCards, 'hard'))
// 	packArray.push(mainPackArray)

// 	reservedPackArray.push(getArrayColorAndDifficulty(greenCards, 'normal'))
// 	reservedPackArray.push(getArrayColorAndDifficulty(brownCards, 'normal'))
// 	reservedPackArray.push(getArrayColorAndDifficulty(blueCards, 'normal'))
// 	packArray.push(reservedPackArray)
// }

//! лёгкий

btnGo.addEventListener('click', (event) => {
	if (
		eldrichList.querySelector('.eldrich-item--active') &&
		levelList.querySelector('.level-item--active')
	) {
		mythClose.classList.remove('visible-off')
		mythOpen.classList.remove('visible-off')
	}
})

mythClose.addEventListener('click', (event) => {
	console.log(headPack)
	console.log(ancientsCallArray)

	for (let i = 0; i < 3; i++) {
		if (
			ancientsCallArray[i][0] +
				ancientsCallArray[i][1] +
				ancientsCallArray[i][2] !=
			0
		) {
			let tmpRnd = rndItem(i) // 1 - зеленый, 2 - коричневый, 3 - синий
			let tmpItem = ancientsCallArray[i][tmpRnd] // значение в ячейке. осталось...

			console.log(tmpRnd, '0 - зеленый, 1 - коричневый, 2 - синий')
			console.log(tmpItem, `значение в ячейке. осталось...`)
			return
		} else {
			console.log(`сумма строки ${i} = 0. Красим стадию как завершенную! `)
		}
	}

	mythOpen.style.backgroundImage = `url(${blueCards[1].cardFace})`
})

function rndItem(i) {
	let tmpRnd = getRandomNum(0, 2)
	if (ancientsCallArray[i][tmpRnd] != 0) {
		return tmpRnd
	} else {
		return rndItem(i)
	}
}
