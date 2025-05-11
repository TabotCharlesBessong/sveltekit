<script lang="ts">
	import { onMount } from 'svelte';
	import { T, useFrame } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import * as THREE from 'three';
	import type { IProfile } from '$lib/db/models';

	export let profile: IProfile | null = null;

	let mounted = false;
	
	onMount(() => {
		mounted = true;
	});
	
	// Animation variables
	let rotationY = 0;
	
	// Update the rotation on each frame
	useFrame((state, delta) => {
		rotationY += delta * 0.2;
	});
</script>

<section class="relative min-h-[80vh] bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16 text-white overflow-hidden">
	<div class="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-center lg:justify-between">
		<div class="z-10 max-w-2xl">
			{#if profile}
				<h1 class="mb-2 text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl">
					<span class="block">
						{profile.firstName}
					</span>
					<span class="block text-yellow-400 -mt-2">
						{profile.lastName}
					</span>
				</h1>
				<p class="mt-4 mb-8 text-xl font-bold uppercase tracking-widest text-yellow-300">
					{profile.tagline}
				</p>
				<p class="mb-8 text-lg text-gray-300 max-w-md">
					{profile.bio}
				</p>
				
				<div class="flex flex-wrap gap-4">
					<a
						href="#contact"
						class="inline-flex items-center justify-center rounded-md bg-yellow-500 px-6 py-3 font-medium text-black transition-colors hover:bg-yellow-400"
					>
						Contact Me
					</a>
					<a
						href="#projects"
						class="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
					>
						View Projects
					</a>
				</div>
			{:else}
				<div class="animate-pulse">
					<div class="h-10 w-3/4 bg-gray-700 rounded mb-6"></div>
					<div class="h-10 w-1/2 bg-gray-700 rounded mb-8"></div>
					<div class="h-6 w-full bg-gray-700 rounded mb-2"></div>
					<div class="h-6 w-5/6 bg-gray-700 rounded mb-8"></div>
					<div class="flex gap-4">
						<div class="h-12 w-32 bg-gray-700 rounded"></div>
						<div class="h-12 w-32 bg-gray-700 rounded"></div>
					</div>
				</div>
			{/if}
		</div>
		
		<div class="relative mt-8 h-[500px] w-full max-w-lg lg:mt-0">
			{#if mounted}
				<div class="h-full w-full">
					<T.Canvas>
						<T.PerspectiveCamera position={[0, 0, 5]} fov={50}>
							<OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
						</T.PerspectiveCamera>
						
						<T.DirectionalLight position={[10, 10, 5]} intensity={1} />
						<T.AmbientLight intensity={0.5} />
						
						<T.Mesh rotation.y={rotationY}>
							<T.TorusGeometry args={[2, 0.5, 16, 100]} />
							<T.MeshStandardMaterial color="#FFC107" metalness={0.5} roughness={0.2} />
						</T.Mesh>
						
						<T.Mesh rotation.y={-rotationY} position={[0, 0, 0]}>
							<T.SphereGeometry args={[1, 32, 32]} />
							<T.MeshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
						</T.Mesh>
					</T.Canvas>
				</div>
			{:else}
				<div class="h-full w-full bg-gray-700 rounded-lg animate-pulse"></div>
			{/if}
		</div>
	</div>
	
	<!-- Background decorative elements -->
	<div class="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-yellow-500/20 blur-3xl"></div>
	<div class="absolute -left-16 top-1/3 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
</section> 