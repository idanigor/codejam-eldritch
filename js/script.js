console.log('script')
import ancientsData from '../data/ancients.js'
import difficulties from '../data/difficulties.js'
import { brownCards, blueCards, greenCards } from '../data/mythicCards/index.js'

import { idan } from './test.js'

const azathoth = document.querySelector('#azathoth')
const cthulthu = document.querySelector('#cthulthu')
const iogsothoth = document.querySelector('#iogsothoth')
const shubniggurath = document.querySelector('#shubniggurath')
const mythOpen = document.querySelector('.myth-open')

const eldrichList = document.querySelector('.eldrich-list')

// console.log(ancientsData)
// console.log(difficulties)
// console.log(brownCards, blueCards, greenCards)
// console.log(idan)
console.log(brownCards[1].cardFace)
mythOpen.style.backgroundImage = `url(${blueCards[1].cardFace})`
// mythOpen.style.backgroundImage = `url('../assets/MythicCards/blue/blue1.png')`

eldrichList.addEventListener('click', (event) => {
	if (event.target.classList[0] === 'eldrich-item') {
		console.log(event.target.id, 'выбираем карту')
		if (eldrichList.querySelector('.eldrich-item--active')) {
			eldrichList
				.querySelector('.eldrich-item--active')
				.classList.remove('eldrich-item--active')
		}
		event.target.classList.add('eldrich-item--active')
	}
})
