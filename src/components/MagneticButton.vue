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
				scale: 1.1
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
            <span class="button__text-inner">Parlez-nous de votre projet</span>
        </span>
		<svg ref="star" class="star" width="419" height="419" viewBox="0 0 419 419" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M209.5 404.517C207.936 381.896 202.717 359.644 194.015 338.636C183.461 313.158 167.993 290.008 148.492 270.508C128.992 251.007 105.842 235.539 80.3635 224.985C59.3556 216.284 37.1041 211.064 14.483 209.5C37.1041 207.936 59.3556 202.716 80.3635 194.015C105.842 183.461 128.992 167.993 148.492 148.492C167.993 128.992 183.461 105.842 194.015 80.3635C202.716 59.3556 207.936 37.1041 209.5 14.483C211.064 37.1041 216.284 59.3556 224.985 80.3635C235.539 105.842 251.007 128.992 270.508 148.492C290.008 167.993 313.158 183.461 338.636 194.015C359.644 202.716 381.896 207.936 404.517 209.5C381.896 211.064 359.644 216.283 338.636 224.985C313.158 235.539 290.008 251.007 270.508 270.508C251.007 290.008 235.539 313.158 224.985 338.636C216.284 359.644 211.064 381.896 209.5 404.517Z" stroke="#A5AEFF"/>
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
	color: #A5AEFF;
	font-size: 14px;
}

.star {
	position: absolute;
}

</style>