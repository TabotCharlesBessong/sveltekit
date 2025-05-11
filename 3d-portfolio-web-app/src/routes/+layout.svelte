<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Header from '$lib/components/ui/Header.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import type { IProfile } from '$lib/db/models';
	
	// Authentication state
	let isLoggedIn = false;
	let profile: IProfile | null = null;
	let loading = true;
	
	async function checkAuth() {
		try {
			const token = localStorage.getItem('token');
			
			if (!token) {
				isLoggedIn = false;
				return;
			}
			
			const response = await fetch('/api/auth/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token })
			});
			
			const data = await response.json();
			isLoggedIn = data.success;
		} catch (error) {
			console.error('Auth check error:', error);
			isLoggedIn = false;
		}
	}
	
	async function fetchProfile() {
		try {
			const response = await fetch('/api/profile');
			const data = await response.json();
			
			if (data.success) {
				profile = data.profile;
			}
		} catch (error) {
			console.error('Error fetching profile:', error);
		} finally {
			loading = false;
		}
	}
	
	onMount(async () => {
		await checkAuth();
		await fetchProfile();
	});
</script>

<svelte:head>
	<title>Portfolio | Web Developer</title>
	<meta name="description" content="Personal portfolio website showcasing projects, skills, and experience" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header {isLoggedIn} />
	
	<main class="flex-1">
		<slot />
	</main>
	
	<Footer {profile} />
</div>
