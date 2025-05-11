<script lang="ts">
	import type { IProject } from '$lib/db/models';
	
	export let project: IProject;
</script>

<div class="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
	<div class="relative aspect-video overflow-hidden">
		<img
			src={project.imageUrl}
			alt={project.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
	</div>
	
	<div class="p-6">
		<h3 class="mb-2 text-xl font-bold text-gray-900">{project.title}</h3>
		
		<p class="mb-4 text-gray-600 line-clamp-3">{project.description}</p>
		
		<div class="mb-6 flex flex-wrap gap-2">
			{#each project.technologies as tech}
				<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
					{tech}
				</span>
			{/each}
		</div>
		
		<div class="flex justify-between gap-4">
			{#if project.liveDemoUrl}
				<a
					href={project.liveDemoUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-400"
				>
					Live Demo
				</a>
			{/if}
			
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					Source Code
				</a>
			{/if}
		</div>
	</div>
	
	{#if project.featured}
		<div class="absolute right-0 top-0 rounded-bl-lg bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
			Featured
		</div>
	{/if}
</div> 