<script lang="ts">
	import type { IExperience } from '$lib/db/models';
	import { format } from 'date-fns';
	
	export let experiences: IExperience[] = [];
	export let loading = false;
	
	function formatDate(date: Date | undefined, current: boolean): string {
		if (current) return 'Present';
		if (!date) return '';
		return format(new Date(date), 'MMM yyyy');
	}
</script>

<section id="experience" class="bg-gray-900 py-20 px-4 text-white">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-bold mb-4">Work Experience</h2>
			<div class="mx-auto h-1 w-20 bg-yellow-500 mb-6"></div>
			<p class="mx-auto max-w-2xl text-lg text-gray-300">
				My professional journey and the companies I've had the privilege to work with.
			</p>
		</div>

		{#if loading}
			<div class="space-y-8">
				{#each Array(3) as _}
					<div class="rounded-lg bg-gray-800 p-8 animate-pulse">
						<div class="h-8 w-1/2 bg-gray-700 rounded mb-4"></div>
						<div class="h-6 w-1/3 bg-gray-700 rounded mb-6"></div>
						<div class="h-4 w-full bg-gray-700 rounded mb-2"></div>
						<div class="h-4 w-full bg-gray-700 rounded mb-2"></div>
						<div class="h-4 w-3/4 bg-gray-700 rounded"></div>
					</div>
				{/each}
			</div>
		{:else if experiences.length === 0}
			<div class="text-center py-16">
				<p class="text-xl text-gray-400">No experience records to display yet.</p>
			</div>
		{:else}
			<div class="relative">
				<!-- Timeline line -->
				<div class="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-700 md:left-[80px]"></div>
				
				<div class="space-y-12">
					{#each experiences as experience, i (experience._id)}
						<div
							class="relative flex flex-col items-center md:flex-row"
							style="animation-delay: {i * 150}ms;"
						>
							<!-- Company logo or timeline dot -->
							<div class="absolute left-1/2 -translate-x-1/2 z-10 md:relative md:left-0 md:translate-x-0 md:mr-16">
								{#if experience.companyLogo}
									<div class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-md">
										<img
											src={experience.companyLogo}
											alt={experience.company}
											class="h-full w-full object-contain"
										/>
									</div>
								{:else}
									<div class="h-5 w-5 rounded-full bg-yellow-500 shadow-md"></div>
								{/if}
							</div>
							
							<!-- Content card -->
							<div class="mt-8 w-full rounded-lg bg-gray-800 p-6 shadow-lg md:mt-0">
								<div class="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
									<h3 class="text-xl font-bold text-white">{experience.position}</h3>
									<div class="flex items-center text-sm text-gray-300">
										<span>{formatDate(experience.startDate, false)} - {formatDate(experience.endDate, experience.current)}</span>
									</div>
								</div>
								
								<div class="mb-4 flex items-center">
									<p class="text-lg font-medium text-yellow-400">{experience.company}</p>
									<span class="mx-2 text-gray-500">•</span>
									<p class="text-sm text-gray-400">{experience.location}</p>
								</div>
								
								<p class="text-gray-300">{experience.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section> 