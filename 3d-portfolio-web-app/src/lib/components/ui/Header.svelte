<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	export let isLoggedIn = false;
	let isScrolled = false;
	let isMenuOpen = false;
	
	// Handle scroll event to change header appearance
	function handleScroll() {
		isScrolled = window.scrollY > 20;
	}
	
	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header
	class="fixed top-0 left-0 z-50 w-full transition-all duration-300 {isScrolled
		? 'bg-gray-900/95 py-3 shadow-lg backdrop-blur-sm'
		: 'bg-transparent py-5'}"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4">
		<!-- Logo -->
		<a href="/" class="text-2xl font-bold text-white">Portfolio</a>
		
		<!-- Desktop Navigation -->
		<nav class="hidden space-x-6 md:flex">
			<a
				href="/"
				class="text-white/80 transition-colors hover:text-yellow-400"
				aria-label="Home"
			>
				Home
			</a>
			<a
				href="#projects"
				class="text-white/80 transition-colors hover:text-yellow-400"
				aria-label="Projects"
			>
				Projects
			</a>
			<a
				href="#experience"
				class="text-white/80 transition-colors hover:text-yellow-400"
				aria-label="Experience"
			>
				Experience
			</a>
			<a
				href="#skills"
				class="text-white/80 transition-colors hover:text-yellow-400"
				aria-label="Skills"
			>
				Skills
			</a>
			<a
				href="#education"
				class="text-white/80 transition-colors hover:text-yellow-400"
				aria-label="Education"
			>
				Education
			</a>
			
			{#if isLoggedIn}
				<a
					href="/admin"
					class="rounded-md bg-yellow-500 px-4 py-2 text-black transition-colors hover:bg-yellow-400"
					aria-label="Admin Dashboard"
				>
					Admin
				</a>
			{/if}
		</nav>
		
		<!-- Mobile menu button -->
		<button
			on:click={toggleMenu}
			class="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isMenuOpen}
		>
			<svg
				class="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				{#if isMenuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				{/if}
			</svg>
		</button>
	</div>
	
	<!-- Mobile Navigation Menu -->
	{#if isMenuOpen}
		<div
			class="absolute top-full left-0 w-full bg-gray-900/95 py-4 px-4 shadow-lg backdrop-blur-sm md:hidden"
			transition:slide={{ duration: 300 }}
		>
			<nav class="flex flex-col space-y-4">
				<a
					href="/"
					class="text-white/80 transition-colors hover:text-yellow-400"
					on:click={() => (isMenuOpen = false)}
				>
					Home
				</a>
				<a
					href="#projects"
					class="text-white/80 transition-colors hover:text-yellow-400"
					on:click={() => (isMenuOpen = false)}
				>
					Projects
				</a>
				<a
					href="#experience"
					class="text-white/80 transition-colors hover:text-yellow-400"
					on:click={() => (isMenuOpen = false)}
				>
					Experience
				</a>
				<a
					href="#skills"
					class="text-white/80 transition-colors hover:text-yellow-400"
					on:click={() => (isMenuOpen = false)}
				>
					Skills
				</a>
				<a
					href="#education"
					class="text-white/80 transition-colors hover:text-yellow-400"
					on:click={() => (isMenuOpen = false)}
				>
					Education
				</a>
				
				{#if isLoggedIn}
					<a
						href="/admin"
						class="rounded-md bg-yellow-500 px-4 py-2 text-center text-black transition-colors hover:bg-yellow-400"
						on:click={() => (isMenuOpen = false)}
					>
						Admin
					</a>
				{/if}
			</nav>
		</div>
	{/if}
</header> 