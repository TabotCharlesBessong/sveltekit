<script lang="ts">
	import { onMount } from 'svelte';
	
	// Stats
	let stats = {
		projects: 0,
		skills: 0,
		experiences: 0,
		education: 0
	};
	
	let loading = true;
	
	async function fetchStats() {
		try {
			loading = true;
			
			// Fetch projects count
			const projectsResponse = await fetch('/api/projects');
			const projectsData = await projectsResponse.json();
			if (projectsData.success) {
				stats.projects = projectsData.projects.length;
			}
			
			// Fetch skills count
			const skillsResponse = await fetch('/api/skills');
			const skillsData = await skillsResponse.json();
			if (skillsData.success) {
				stats.skills = skillsData.skills.length;
			}
			
			// Fetch experiences count
			const experiencesResponse = await fetch('/api/experiences');
			const experiencesData = await experiencesResponse.json();
			if (experiencesData.success) {
				stats.experiences = experiencesData.experiences.length;
			}
			
			// Fetch education count
			const educationResponse = await fetch('/api/education');
			const educationData = await educationResponse.json();
			if (educationData.success) {
				stats.education = educationData.educations.length;
			}
		} catch (error) {
			console.error('Error fetching stats:', error);
		} finally {
			loading = false;
		}
	}
	
	onMount(async () => {
		await fetchStats();
	});
</script>

<svelte:head>
	<title>Admin Dashboard | Portfolio</title>
</svelte:head>

<div>
	<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
	<p class="mt-1 text-sm text-gray-600">Manage your portfolio content from here.</p>
	
	<div class="mt-6">
		<h2 class="text-lg font-medium text-gray-900">Overview</h2>
		
		{#if loading}
			<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
				{#each Array(4) as _}
					<div class="rounded-lg bg-white p-6 shadow animate-pulse">
						<div class="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
						<div class="h-7 w-1/4 bg-gray-200 rounded"></div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
				<div class="rounded-lg bg-white p-6 shadow">
					<div class="flex items-center">
						<div class="flex-shrink-0 rounded-md bg-yellow-100 p-3">
							<svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
								/>
							</svg>
						</div>
						<div class="ml-5">
							<h3 class="text-sm font-medium text-gray-500">Projects</h3>
							<p class="mt-1 text-xl font-semibold text-gray-900">{stats.projects}</p>
						</div>
					</div>
				</div>
				
				<div class="rounded-lg bg-white p-6 shadow">
					<div class="flex items-center">
						<div class="flex-shrink-0 rounded-md bg-green-100 p-3">
							<svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								/>
							</svg>
						</div>
						<div class="ml-5">
							<h3 class="text-sm font-medium text-gray-500">Skills</h3>
							<p class="mt-1 text-xl font-semibold text-gray-900">{stats.skills}</p>
						</div>
					</div>
				</div>
				
				<div class="rounded-lg bg-white p-6 shadow">
					<div class="flex items-center">
						<div class="flex-shrink-0 rounded-md bg-blue-100 p-3">
							<svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div class="ml-5">
							<h3 class="text-sm font-medium text-gray-500">Experience</h3>
							<p class="mt-1 text-xl font-semibold text-gray-900">{stats.experiences}</p>
						</div>
					</div>
				</div>
				
				<div class="rounded-lg bg-white p-6 shadow">
					<div class="flex items-center">
						<div class="flex-shrink-0 rounded-md bg-purple-100 p-3">
							<svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg>
						</div>
						<div class="ml-5">
							<h3 class="text-sm font-medium text-gray-500">Education</h3>
							<p class="mt-1 text-xl font-semibold text-gray-900">{stats.education}</p>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
	
	<div class="mt-10">
		<h2 class="text-lg font-medium text-gray-900">Quick Actions</h2>
		
		<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<a href="/admin/profile" class="rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
				<h3 class="font-medium text-gray-900">Edit Profile</h3>
				<p class="mt-1 text-sm text-gray-500">Update your personal information and hero section</p>
			</a>
			
			<a href="/admin/projects" class="rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
				<h3 class="font-medium text-gray-900">Manage Projects</h3>
				<p class="mt-1 text-sm text-gray-500">Add, edit or remove projects from your portfolio</p>
			</a>
			
			<a href="/admin/skills" class="rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
				<h3 class="font-medium text-gray-900">Manage Skills</h3>
				<p class="mt-1 text-sm text-gray-500">Update your skills and proficiency levels</p>
			</a>
			
			<a href="/admin/experience" class="rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
				<h3 class="font-medium text-gray-900">Manage Experience</h3>
				<p class="mt-1 text-sm text-gray-500">Edit your work experience history</p>
			</a>
			
			<a href="/admin/education" class="rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
				<h3 class="font-medium text-gray-900">Manage Education</h3>
				<p class="mt-1 text-sm text-gray-500">Update your educational background</p>
			</a>
		</div>
	</div>
</div> 