import { gsap } from 'gsap'
import { lerp, getMousePos, calcWinsize, distance, getRandomFloat } from './Utils'
import emitter from 'tiny-emitter/instance'

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

// Track the mouse position
let mousepos = {x: 0, y: 0};
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

export default class MagneticButton {

    constructor(button, star) {

        this.DOM = {
            button: button,
            star: star
        }

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

        requestAnimationFrame(() => this.render());
    }
    calculateSizePosition() {
        this.rect = this.DOM.button.getBoundingClientRect();
        // the movement will take place when the distance from the mouse to the center of the button is lower than this value
        this.distanceToTrigger = this.rect.width*1.1;
    }
    initEvents() {
        this.onResize = () => this.calculateSizePosition();
        window.addEventListener('resize', this.onResize);
    }
    render() {
        // calculate the distance from the mouse to the center of the button
        const distanceMouseButton = distance(mousepos.x+window.scrollX, mousepos.y+window.scrollY, this.rect.left + this.rect.width/2, this.rect.top + this.rect.height/2);
        // new values for the translations and scale
        let x = 0;
        let y = 0;

        if (distanceMouseButton < this.distanceToTrigger) {
            if (!this.state.hover) {
                this.enter();
            }
            x = (mousepos.x + window.scrollX - (this.rect.left + this.rect.width/2))*.3
            y = (mousepos.y + window.scrollY - (this.rect.top + this.rect.height/2))*.3
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
    }
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
    }
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
