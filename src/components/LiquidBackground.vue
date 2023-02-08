<script>
import emitter from 'tiny-emitter/instance'
import LiquidBackground from '/src/scripts/LiquidBackground'

export default {

    mounted() {
        const liquidBg = new LiquidBackground(this.$refs.lbg)
    }
}
</script>

<template>
    <div class="liquid-background" ref="lbg"></div>
</template>

<style scoped>
.liquid-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
}
</style>