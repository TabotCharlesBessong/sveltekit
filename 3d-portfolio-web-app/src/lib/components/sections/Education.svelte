<script lang="ts">
	import type { IEducation } from '$lib/db/models';
	import { format } from 'date-fns';
	
	export let education: IEducation[] = [];
	export let loading = false;
	
	function formatDate(date: Date | undefined, current: boolean): string {
		if (current) return 'Present';
		if (!date) return '';
		return format(new Date(date), 'MMM yyyy');
	}
</script>

<section id="education" class="bg-gray-100 py-20 px-4">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Education</h2>
			<div class="mx-auto h-1 w-20 bg-yellow-500 mb-6"></div>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				My academic background and qualifications.
			</p>
		</div>

		{#if loading}
			<div class="space-y-8">
				{#each Array(2) as _}
					<div class="rounded-lg bg-white p-8 shadow-sm animate-pulse">
						<div class="h-8 w-1/2 bg-gray-200 rounded mb-4"></div>
						<div class="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
						<div class="h-4 w-full bg-gray-200 rounded mb-2"></div>
						<div class="h-4 w-3/4 bg-gray-200 rounded"></div>
					</div>
				{/each}
			</div>
		{:else if education.length === 0}
			<div class="text-center py-16">
				<p class="text-xl text-gray-500">No education records to display yet.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each education as edu, i (edu._id)}
					<div 
						class="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
						style="animation-delay: {i * 150}ms;"
					>
						<div class="mb-4 flex items-start justify-between">
							<div>
								<h3 class="text-xl font-bold text-gray-900">{edu.degree}</h3>
								<p class="text-lg text-gray-800">{edu.field}</p>
							</div>
							
							{#if edu.logoUrl}
								<div class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg p-1">
									<img
										src={edu.logoUrl}
										alt={edu.institution}
										class="h-full w-full object-contain"
									/>
								</div>
							{/if}
						</div>
						
						<div class="mb-4">
							<p class="text-lg font-medium text-yellow-600">{edu.institution}</p>
							<div class="flex items-center">
								<p class="text-sm text-gray-500">{edu.location}</p>
								<span class="mx-2 text-gray-300">•</span>
								<p class="text-sm text-gray-500">
									{formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
								</p>
							</div>
						</div>
						
						{#if edu.description}
							<p class="text-gray-600">{edu.description}</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section> 