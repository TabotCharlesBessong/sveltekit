<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	let isAuthenticated = false;
	let checking = true;
	
	onMount(async () => {
		try {
			const token = localStorage.getItem('token');
			
			if (!token) {
				goto('/admin/login');
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
			
			if (!data.success) {
				localStorage.removeItem('token');
				goto('/admin/login');
				return;
			}
			
			isAuthenticated = true;
		} catch (error) {
			console.error('Auth check error:', error);
			goto('/admin/login');
		} finally {
			checking = false;
		}
	});
</script>

{#if checking}
	<div class="flex h-screen w-full items-center justify-center bg-gray-50">
		<div class="text-center">
			<div class="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900 mx-auto"></div>
			<p class="mt-4 text-lg text-gray-700">Checking authentication...</p>
		</div>
	</div>
{:else if isAuthenticated}
	<div class="min-h-screen bg-gray-50">
		<header class="bg-gray-900 text-white shadow">
			<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div class="flex items-center justify-between">
					<h1 class="text-xl font-bold">Admin Dashboard</h1>
					<button
						class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
						on:click={() => {
							localStorage.removeItem('token');
							goto('/admin/login');
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</header>
		
		<main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<slot />
		</main>
	</div>
{/if} 