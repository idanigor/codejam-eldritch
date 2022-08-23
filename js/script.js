console.log('script')
import ancientsData from '../data/ancients.js'
import difficulties from '../data/difficulties.js'
import { greenCards, brownCards, blueCards } from '../data/mythicCards/index.js'

import { idan } from './test.js'

// const azathoth = document.querySelector('#azathoth')
// const cthulthu = document.querySelector('#cthulthu')
// const iogsothoth = document.querySelector('#iogsothoth')
// const shubniggurath = document.querySelector('#shubniggurath')
// const mythOpen = document.querySelector('.myth-open')

const eldrichList = document.querySelector('.eldrich-list')
const counterList = document.querySelector('.counter-list')
const levelList = document.querySelector('.level-list')

const packArray = []

// console.log(ancientsData)
// console.log(difficulties)
console.log(greenCards, brownCards, blueCards)
// console.log(idan)

//console.log(blueCards[1].cardFace)
//mythOpen.style.backgroundImage = `url(${blueCards[1].cardFace})` // раздача
// mythOpen.style.backgroundImage = `url('../assets/MythicCards/blue/blue1.png')`

eldrichList.addEventListener('click', (event) => {
	if (event.target.classList[0] === 'eldrich-item') {
		const step = counterList.querySelectorAll('.step')
		const selectAncient = ancientsData[event.target.id]
		const ancientsCallArray = []


		console.log(selectAncient)
		for (let key in selectAncient) {
			ancientsCallArray.push(Object.values(selectAncient[key]))
		}

		for (let i = 0; i < step.length; i++) {
			const cell = step[i].querySelectorAll('.cell')
			for (let j = 0; j < cell.length; j++) {
				cell[j].innerHTML = ancientsCallArray[i][j]
				console.log(ancientsCallArray[i][j])
			}
		}
		console.log(ancientsCallArray)
		if (eldrichList.querySelector('.eldrich-item--active')) {
			eldrichList
				.querySelector('.eldrich-item--active')
				.classList.remove('eldrich-item--active')
		}
		event.target.classList.add('eldrich-item--active')
	}
})

levelList.addEventListener('click', (event) => {
	if (event.target.classList[0] === 'level-item') {
		if (levelList.querySelector('.level-item--active')) {
			levelList
				.querySelector('.level-item--active')
				.classList.remove('level-item--active')
		}
		event.target.classList.add('level-item--active')
	}
})
