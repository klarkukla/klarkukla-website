<script>
import emitter from 'tiny-emitter/instance'
import MagneticButton from '/src/scripts/MagneticButton'

export default {

    mounted() {
        const button = new MagneticButton(this.$refs.button, this.$refs.star);
    },

	methods: {
		navigate() {
			window.location.href = 'mailto:klarkukla@gmail.com'
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