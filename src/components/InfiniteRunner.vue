<script>
import * as THREE from 'three'
import gemSprite from '/src/assets/images/gem.png'

export default {
    mounted() {

        const gems = []
        const horizon = 300

        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0xEAEAEA, 0.01)
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, horizon)
        camera.position.set(0, 5, 0)
        //camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0xEAEAEA)
        this.$refs.three.appendChild(renderer.domElement)

        const map = new THREE.TextureLoader().load(gemSprite)
        const material = new THREE.SpriteMaterial({map: map})

        for(var i = 0; i < 80; i++){
            let gem = new THREE.Sprite(material)
            gem.position.set(Math.random() * 50 - 50/2, Math.random() * 50 - 50/2, ((Math.random() * horizon)-horizon))
            gems.push(gem)
            scene.add(gem)
        }

        function update(time) {
            requestAnimationFrame(update)

            for(var i = 0; i < gems.length; i++) {
                let gem = gems[i]
                gem.position.z += .4
                if(gem.position.z > camera.position.z) {
                    gem.position.z = camera.position.z - ((Math.random() * horizon)+horizon)
                }
            }
            renderer.render(scene, camera)
        }
        update()
    }
}
</script>

<template>
    <div class="three" ref="three"></div>
</template>

<style scoped>
.three {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}
</style>