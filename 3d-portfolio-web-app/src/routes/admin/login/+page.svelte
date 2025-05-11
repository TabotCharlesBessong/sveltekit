<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	let email = '';
	let password = '';
	let error = '';
	let loading = false;
	let registrationMode = false;
	let name = '';
	let registrationKey = '';
	
	async function handleSubmit() {
		error = '';
		loading = true;
		
		try {
			const endpoint = registrationMode ? '/api/auth/register' : '/api/auth/login';
			const payload = registrationMode
				? { name, email, password, registrationKey }
				: { email, password };
			
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});
			
			const data = await response.json();
			
			if (data.success) {
				localStorage.setItem('token', data.token);
				goto('/admin');
			} else {
				error = data.message || 'Authentication failed';
			}
		} catch (err) {
			console.error('Auth error:', err);
			error = 'An unexpected error occurred';
		} finally {
			loading = false;
		}
	}
	
	onMount(() => {
		// Check if already logged in
		const token = localStorage.getItem('token');
		if (token) {
			goto('/admin');
		}
	});
</script>

<svelte:head>
	<title>{registrationMode ? 'Register Admin' : 'Admin Login'} | Portfolio</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				{registrationMode ? 'Register Admin Account' : 'Sign in to your account'}
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				{registrationMode
					? 'Create the admin account to manage your portfolio'
					: 'Access admin dashboard to manage your portfolio'}
			</p>
		</div>
		
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
			{#if error}
				<div class="rounded-md bg-red-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg
								class="h-5 w-5 text-red-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.97-3.03a.75.75 0 011.06 0L10 14.94l2.91-2.91a.75.75 0 111.06 1.06L11.06 16l2.91 2.91a.75.75 0 11-1.06 1.06L10 17.06l-2.91 2.91a.75.75 0 01-1.06-1.06L8.94 16l-2.91-2.91a.75.75 0 010-1.06z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800">{error}</h3>
						</div>
					</div>
				</div>
			{/if}
			
			<div class="space-y-4 rounded-md shadow-sm">
				{#if registrationMode}
					<div>
						<label for="name" class="sr-only">Name</label>
						<input
							id="name"
							name="name"
							type="text"
							bind:value={name}
							required
							class="relative block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm"
							placeholder="Name"
						/>
					</div>
				{/if}
				
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={email}
						required
						class="relative block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete={registrationMode ? 'new-password' : 'current-password'}
						bind:value={password}
						required
						class="relative block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm"
						placeholder="Password"
					/>
				</div>
				
				{#if registrationMode}
					<div>
						<label for="registration-key" class="sr-only">Registration Key</label>
						<input
							id="registration-key"
							name="registrationKey"
							type="text"
							bind:value={registrationKey}
							required
							class="relative block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm"
							placeholder="Registration Key"
						/>
					</div>
					
					<p class="text-xs text-gray-500">
						The registration key is required and should be set in your environment variables.
					</p>
				{/if}
			</div>
			
			<div>
				<button
					type="submit"
					disabled={loading}
					class="group relative flex w-full justify-center rounded-md bg-yellow-600 py-2 px-3 text-sm font-semibold text-white hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:opacity-70"
				>
					{#if loading}
						<span class="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 animate-spin text-yellow-300"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						</span>
						Processing...
					{:else}
						{registrationMode ? 'Register' : 'Sign in'}
					{/if}
				</button>
			</div>
		</form>
		
		<div class="text-center text-sm">
			<button
				type="button"
				class="text-yellow-600 hover:text-yellow-500"
				on:click={() => (registrationMode = !registrationMode)}
			>
				{registrationMode
					? 'Already have an account? Sign in'
					: 'Need to create an admin account? Register'}
			</button>
		</div>
	</div>
</div> 