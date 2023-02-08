<script>
import emitter from 'tiny-emitter/instance'
import Cursor from '/src/scripts/Cursor'

export default {

    mounted() {
        const cursor = new Cursor(this.$refs.cursor, this.$refs.circle, this.$refs.star, emitter);
    }
}
</script>

<template>
    <div class="cursor" ref="cursor">
		<div class="inner">
			<svg ref="circle" class="shape circle" width="25" height="25" viewBox="0 0 25 25">
				<circle class="cursor__inner" cx="12.5" cy="12.5" r="6.25"/>
			</svg>
			<svg ref="star" class="shape star" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M48 89.0538C47.424 85.0738 46.354 81.1718 44.8082 77.4398C42.3708 71.5556 38.7983 66.209 34.2947 61.7053C29.791 57.2017 24.4444 53.6292 18.5602 51.1918C14.8282 49.646 10.9262 48.576 6.94624 48C10.9262 47.424 14.8282 46.354 18.5602 44.8082C24.4444 42.3708 29.791 38.7983 34.2947 34.2947C38.7983 29.791 42.3708 24.4444 44.8082 18.5601C46.354 14.8282 47.424 10.9262 48 6.94624C48.576 10.9262 49.646 14.8282 51.1918 18.5601C53.6292 24.4444 57.2017 29.791 61.7053 34.2947C66.209 38.7983 71.5556 42.3708 77.4398 44.8082C81.1719 46.354 85.0738 47.424 89.0538 48C85.0738 48.576 81.1719 49.646 77.4398 51.1918C71.5556 53.6292 66.209 57.2017 61.7053 61.7053C57.2017 66.209 53.6292 71.5555 51.1918 77.4398C49.646 81.1718 48.576 85.0738 48 89.0538Z" stroke="#023D19"/>
			</svg>
		</div>
	</div>
</template>

<style scoped>

.cursor {
	display: none;
}

.inner {
	position: relative;
}

.shape {
	position: absolute;
}

.circle {
	top: -12.5px;
	left: -12.5px;
	/* backdrop-filter: blur(10px); */
	/* opacity: .4; */
}

.star {
	top: -48px;
	left: -48px;
}

@media (any-pointer: fine) {
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		pointer-events: none;
	}
	.cursor__inner {
		fill: #023D19;
	}
}
</style>