<script>
import * as THREE from 'three'
import smiley from '/src/assets/images/smiley.png'

export default {
    mounted() {

        const lines = []
        const horizon = 300

        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0xDDDDDD, 0.01)
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, horizon)
        camera.position.set(0, 5, 0)
        //camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0xDDDDDD)
        this.$refs.three.appendChild(renderer.domElement)

        const map = new THREE.TextureLoader().load(smiley)
        const material = new THREE.SpriteMaterial({map: map})

        for(var i = 0; i < 80; i++){
            let line = new THREE.Sprite(material)
            line.position.set(Math.random() * 50 - 50/2, Math.random() * 50 - 50/2, ((Math.random() * horizon)-horizon))
            lines.push(line)
            scene.add(line)
        }

        function animate(time) {
            requestAnimationFrame( animate )

            for(var i = 0; i < lines.length; i++) {
                let line = lines[i]
                line.position.z += 1
                if(line.position.z > camera.position.z) {
                    line.position.z = camera.position.z - ((Math.random() * horizon)+horizon)
                }
            }
            renderer.render( scene, camera )
        }
        animate()
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