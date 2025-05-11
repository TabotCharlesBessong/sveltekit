<script lang="ts">
	import { onMount } from 'svelte';
	import type { IProject } from '$lib/db/models';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	
	export let projects: IProject[] = [];
	export let loading = false;
	
	let visibleProjects: IProject[] = [];
	let showAll = false;
	let initialLimit = 6;
	
	$: {
		if (showAll) {
			visibleProjects = [...projects];
		} else {
			visibleProjects = projects.slice(0, initialLimit);
		}
	}
	
	function toggleShowAll() {
		showAll = !showAll;
	}
</script>

<section id="projects" class="bg-gray-100 py-20 px-4">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
			<div class="mx-auto h-1 w-20 bg-yellow-500 mb-6"></div>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Check out some of my recent work. These projects showcase my skills and experience in building
				web applications.
			</p>
		</div>

		{#if loading}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _, i}
					<div class="h-96 rounded-lg bg-gray-200 animate-pulse"></div>
				{/each}
			</div>
		{:else if projects.length === 0}
			<div class="text-center py-16">
				<p class="text-xl text-gray-500">No projects to display yet.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each visibleProjects as project, i (project._id)}
					<div
						class="transition-all duration-500"
						style="animation-delay: {i * 100}ms;"
					>
						<ProjectCard {project} />
					</div>
				{/each}
			</div>

			{#if projects.length > initialLimit}
				<div class="mt-12 text-center">
					<button
						on:click={toggleShowAll}
						class="inline-flex items-center justify-center rounded-md bg-yellow-500 px-6 py-3 font-medium text-black transition-colors hover:bg-yellow-400"
					>
						{showAll ? 'Show Less' : 'View More Projects'}
					</button>
				</div>
			{/if}
		{/if}
	</div>
</section> 