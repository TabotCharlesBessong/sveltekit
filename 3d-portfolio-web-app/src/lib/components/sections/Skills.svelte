<script lang="ts">
	import { onMount } from 'svelte';
	import type { ISkill } from '$lib/db/models';
	
	export let skills: ISkill[] = [];
	export let loading = false;
	
	// Organize skills by category
	$: skillsByCategory = skills.reduce((acc, skill) => {
		if (!acc[skill.category]) {
			acc[skill.category] = [];
		}
		acc[skill.category].push(skill);
		return acc;
	}, {} as Record<string, ISkill[]>);
	
	// Get array of unique categories
	$: categories = Object.keys(skillsByCategory);
	
	// For swiper setup
	let swiperContainer: HTMLElement;
	
	onMount(async () => {
		if (typeof window !== 'undefined') {
			// Dynamically import Swiper to ensure SSR compatibility
			const { Swiper } = await import('swiper');
			const { Navigation, Pagination, Autoplay } = await import('swiper/modules');
			
			// Import Swiper styles
			await import('swiper/css');
			await import('swiper/css/navigation');
			await import('swiper/css/pagination');
			
			// Initialize Swiper
			const swiper = new Swiper(swiperContainer, {
				slidesPerView: 1,
				spaceBetween: 20,
				loop: true,
				centeredSlides: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				modules: [Navigation, Pagination, Autoplay],
				breakpoints: {
					640: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 30
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 40
					}
				}
			});
		}
	});
</script>

<section id="skills" class="bg-white py-20 px-4">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">My Skills</h2>
			<div class="mx-auto h-1 w-20 bg-yellow-500 mb-6"></div>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Technologies and tools I've mastered over the years.
			</p>
		</div>

		{#if loading}
			<div class="space-y-10">
				{#each Array(3) as _}
					<div>
						<div class="h-8 w-1/4 bg-gray-200 rounded mb-6 mx-auto"></div>
						<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
							{#each Array(4) as _}
								<div class="rounded-lg bg-gray-100 p-8 animate-pulse">
									<div class="mx-auto h-16 w-16 rounded bg-gray-200 mb-4"></div>
									<div class="h-5 w-1/2 bg-gray-200 rounded mb-2 mx-auto"></div>
									<div class="h-3 w-full bg-gray-200 rounded"></div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else if skills.length === 0}
			<div class="text-center py-16">
				<p class="text-xl text-gray-500">No skills to display yet.</p>
			</div>
		{:else}
			<!-- Desktop view - show all skills -->
			<div class="hidden md:block">
				{#each categories as category}
					<div class="mb-12">
						<h3 class="mb-6 text-center text-2xl font-bold text-gray-800">{category}</h3>
						<div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
							{#each skillsByCategory[category] as skill (skill._id)}
								<div class="rounded-lg bg-gray-50 p-6 text-center shadow-sm transition-transform hover:shadow-md hover:-translate-y-1">
									{#if skill.logoUrl}
										<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
											<img
												src={skill.logoUrl}
												alt={skill.name}
												class="h-full w-full object-contain"
											/>
										</div>
									{/if}
									<h4 class="mb-3 text-lg font-medium text-gray-900">{skill.name}</h4>
									<div class="mx-auto w-full max-w-xs">
										<div class="h-2 w-full rounded-full bg-gray-200">
											<div
												class="h-2 rounded-full bg-yellow-500"
												style="width: {skill.proficiency}%"
											></div>
										</div>
										<p class="mt-2 text-sm text-gray-600">{skill.proficiency}% Proficiency</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			
			<!-- Mobile view - swiper for small screens -->
			<div class="md:hidden">
				<div bind:this={swiperContainer} class="swiper">
					<div class="swiper-wrapper">
						{#each skills as skill (skill._id)}
							<div class="swiper-slide">
								<div class="rounded-lg bg-gray-50 p-6 text-center shadow-sm h-full">
									{#if skill.logoUrl}
										<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
											<img
												src={skill.logoUrl}
												alt={skill.name}
												class="h-full w-full object-contain"
											/>
										</div>
									{/if}
									<h4 class="mb-1 text-lg font-medium text-gray-900">{skill.name}</h4>
									<p class="mb-3 text-sm text-gray-500">{skill.category}</p>
									<div class="mx-auto w-full">
										<div class="h-2 w-full rounded-full bg-gray-200">
											<div
												class="h-2 rounded-full bg-yellow-500"
												style="width: {skill.proficiency}%"
											></div>
										</div>
										<p class="mt-2 text-sm text-gray-600">{skill.proficiency}% Proficiency</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
					
					<div class="swiper-pagination"></div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>
			</div>
		{/if}
	</div>
</section>

<svelte:head>
	{#if !loading && skills.length > 0}
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
	{/if}
</svelte:head> 