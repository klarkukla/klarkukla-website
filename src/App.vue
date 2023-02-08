<script setup>
import MagneticButton from './components/MagneticButton.vue'
import Cursor from './components/Cursor.vue'
import LiquidBackground from './components/LiquidBackground.vue'
import InfiniteRunner from './components/InfiniteRunner.vue';
</script>

<template>
  <img src="./assets/images/klarkukla.svg" class="klarkukla">
  <img src="./assets/images/k.svg" class="k">
  <MagneticButton />
  <Cursor />
  <!-- <LiquidBackground /> -->
  <InfiniteRunner />
  <div class="gradient"></div>
</template>

<style scoped>

.gradient {
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(rgba(0, 0, 0, 0), #000);
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.6;
  z-index: -1;
  display: none;
}

.klarkukla {
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
  display: block;
}

.k {
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

</style>