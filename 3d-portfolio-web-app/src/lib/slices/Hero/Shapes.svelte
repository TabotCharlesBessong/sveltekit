<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import * as THREE from 'three';
</script>

<Threlte.PerspectiveCamera
	makeDefault
	position={[0, 0, 25]}
	aspect={1}
	fov={30}
	near={1}
	far={40}
/>
<!-- <Threlte.Mesh>
  <Threlte.BoxGeometry />
  <Threlte.MeshBasicMaterial />
</Threlte.Mesh> -->
