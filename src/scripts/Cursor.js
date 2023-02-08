import { gsap } from 'gsap'
import { lerp, getMousePos } from './Utils'

// Mouse tracking
let mouse = {x: 0, y: 0}
window.addEventListener('mousemove', ev => mouse = getMousePos(ev))

export default class Cursor {

    constructor(cursor, circle, star, emitter) {

        emitter.on('enter', () => this.enter())
        emitter.on('leave', () => this.leave())

        this.DOM = {
            cursor: cursor,
            circle: circle,
            star: star
        }
        
        this.bounds = this.DOM.cursor.getBoundingClientRect()
        
        this.renderedStyles = {
            tx: {previous: 0, current: 0, amt: 0.2},
            ty: {previous: 0, current: 0, amt: 0.2}
        };

        this.onMouseMoveEv = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width/2;
            this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = mouse.y - this.bounds.height/2;
            
            requestAnimationFrame(() => this.render());
            window.removeEventListener('mousemove', this.onMouseMoveEv);
        };
        window.addEventListener('mousemove', this.onMouseMoveEv);
    }
    enter() {
        gsap.to(this.DOM.circle, {duration: .4, ease: 'Power3.easeOut', scale: .4});
        gsap.to(this.DOM.star, {duration: .4, ease: 'Power3.easeOut', scale: 1.4});
    }
    leave() {
        gsap.to(this.DOM.circle, {duration: .4, ease: 'Power3.easeOut', scale: 1});
        gsap.to(this.DOM.star, {duration: .4, ease: 'Power3.easeOut', scale: 1});
    }
    render() {
        this.renderedStyles['tx'].current = mouse.x - this.bounds.width/2;
        this.renderedStyles['ty'].current = mouse.y - this.bounds.height/2;
        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }
        this.DOM.cursor.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;

        requestAnimationFrame(() => this.render());
    }
}