<script>
import emitter from 'tiny-emitter/instance'
import { gsap } from 'gsap'
import { lerp, getMousePos, calcWinsize, distance, getRandomFloat } from '/src/scripts/Utils'

export default {

    mounted() {

		this.DOM = {
            button: this.$refs.button,
            star: this.$refs.star
        }

		// Calculate the viewport size
		let winsize = calcWinsize();
		window.addEventListener('resize', () => winsize = calcWinsize());

		// Track the mouse position
		this.mousepos = {x: 0, y: 0};
		window.addEventListener('mousemove', ev => this.mousepos = getMousePos(ev));

        this.DOM.text = this.DOM.button.querySelector('.button__text');
        this.DOM.textinner = this.DOM.button.querySelector('.button__text-inner');

        // amounts the button will translate/scale
        this.renderedStyles = {
            tx: {previous: 0, current: 0, amt: 0.1},
            ty: {previous: 0, current: 0, amt: 0.1},
            scale: {previous: 1, current: 1, amt: 0.2}
        }

        this.state = {
            hover: false
        }

        this.calculateSizePosition()
        this.initEvents()

		if(!navigator.userAgentData.mobile) {
			requestAnimationFrame(() => this.render())
		}
    },

	methods: {

		navigate() {
			window.location.href = 'mailto:klarkukla@gmail.com'
		},

		calculateSizePosition() {
			this.rect = this.DOM.button.getBoundingClientRect();
			// the movement will take place when the distance from the mouse to the center of the button is lower than this value
			this.distanceToTrigger = this.rect.width*1.1;
		},

		initEvents() {
			this.onResize = () => this.calculateSizePosition();
			window.addEventListener('resize', this.onResize);
		},

		render() {
			// calculate the distance from the mouse to the center of the button
			const distanceMouseButton = distance(this.mousepos.x+window.scrollX, this.mousepos.y+window.scrollY, this.rect.left + this.rect.width/2, this.rect.top + this.rect.height/2);
			// new values for the translations and scale
			let x = 0;
			let y = 0;

			if (distanceMouseButton < this.distanceToTrigger) {
				if (!this.state.hover) {
					this.enter();
				}
				x = (this.mousepos.x + window.scrollX - (this.rect.left + this.rect.width/2))*.3
				y = (this.mousepos.y + window.scrollY - (this.rect.top + this.rect.height/2))*.3
			}
			else if (this.state.hover) {
				this.leave()
			}

			this.renderedStyles['tx'].current = x;
			this.renderedStyles['ty'].current = y;
			
			for (const key in this.renderedStyles ) {
				this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
			}
			
			this.DOM.button.style.transform = `translate3d(${this.renderedStyles['tx'].previous}px, ${this.renderedStyles['ty'].previous}px, 0)`;
			this.DOM.text.style.transform = `translate3d(${-this.renderedStyles['tx'].previous*0.2}px, ${-this.renderedStyles['ty'].previous*0.2}px, 0)`;

			requestAnimationFrame(() => this.render());
		},

		enter() {
			emitter.emit('enter')

			this.state.hover = true
			this.DOM.button.classList.add('button--hover')
			
			gsap.killTweensOf(this.DOM.textinner)

			gsap
			.timeline()
			.to(this.DOM.textinner, .4, {
				ease: 'Expo.easeOut',
				scale: 0.8
			}, 0)
			.to(this.DOM.star, .4, {
				ease: 'Expo.easeOut',
				scale: 1.2
			}, 0)
		},

		leave() {
			emitter.emit('leave')

			this.state.hover = false
			this.DOM.button.classList.remove('button--hover')

			gsap
			.timeline()
			.to(this.DOM.textinner, .4, {
				ease: 'Expo.easeOut',
				scale: 1
			}, 0)
			.to(this.DOM.star, .4, {
				ease: 'Expo.easeOut',
				scale: 1
			}, 0)
		}
	}
}
</script>

<template>
    <button class="button" ref="button" v-on:click="navigate">
        <span class="button__text">
            <span class="button__text-inner">Contactez-nous</span>
        </span>
		<svg ref="star" width="317" height="317" viewBox="0 0 317 317" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M158.5 304.4C157.183 287.836 153.276 271.553 146.897 256.153C138.906 236.863 127.194 219.335 112.43 204.57C97.6655 189.806 80.1375 178.094 60.8467 170.103C45.4468 163.724 29.1643 159.817 12.5998 158.5C29.1643 157.183 45.4468 153.276 60.8467 146.897C80.1374 138.906 97.6655 127.194 112.43 112.43C127.194 97.6655 138.906 80.1375 146.897 60.8467C153.276 45.4468 157.183 29.1643 158.5 12.5998C159.817 29.1643 163.724 45.4468 170.103 60.8467C178.094 80.1375 189.805 97.6655 204.57 112.43C219.335 127.195 236.863 138.906 256.153 146.897C271.553 153.276 287.836 157.183 304.4 158.5C287.836 159.817 271.553 163.724 256.153 170.103C236.863 178.094 219.335 189.806 204.57 204.57C189.805 219.335 178.094 236.863 170.103 256.153C163.724 271.553 159.817 287.836 158.5 304.4Z" stroke="#002D9F"/>
		</svg>
    </button>
</template>

<style scoped>

.button {
	cursor: pointer;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	border: 0;
	background: none;
	width: 300px;
	height: 300px;
	padding: 0;
	font-family: inherit;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: calc(50% - 150px);
	left: calc(50% - 150px);
}

.button:focus,
.button--hover {
	outline: none;
	border-width: 1px;
	border-color: #A5AEFF;
	color: #A5AEFF;
}

.button__text, 
.button__text-inner {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	color: #002D9F;
	font-size: 14px;
	position: absolute;
	font-weight: 600;
}

.star {
	position: absolute;
}

</style>