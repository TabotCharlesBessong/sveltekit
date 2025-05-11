<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Skills from '$lib/components/sections/Skills.svelte';
	import Education from '$lib/components/sections/Education.svelte';
	import type { IProfile, IProject, IExperience, ISkill, IEducation } from '$lib/db/models';
	
	// Data for each section
	let profile: IProfile | null = null;
	let projects: IProject[] = [];
	let experiences: IExperience[] = [];
	let skills: ISkill[] = [];
	let education: IEducation[] = [];
	
	// Loading states
	let loadingProfile = true;
	let loadingProjects = true;
	let loadingExperiences = true;
	let loadingSkills = true;
	let loadingEducation = true;
	
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
			loadingProfile = false;
		}
	}
	
	async function fetchProjects() {
		try {
			const response = await fetch('/api/projects');
			const data = await response.json();
			
			if (data.success) {
				projects = data.projects;
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		} finally {
			loadingProjects = false;
		}
	}
	
	async function fetchExperiences() {
		try {
			const response = await fetch('/api/experiences');
			const data = await response.json();
			
			if (data.success) {
				experiences = data.experiences;
			}
		} catch (error) {
			console.error('Error fetching experiences:', error);
		} finally {
			loadingExperiences = false;
		}
	}
	
	async function fetchSkills() {
		try {
			const response = await fetch('/api/skills');
			const data = await response.json();
			
			if (data.success) {
				skills = data.skills;
			}
		} catch (error) {
			console.error('Error fetching skills:', error);
		} finally {
			loadingSkills = false;
		}
	}
	
	async function fetchEducation() {
		try {
			const response = await fetch('/api/education');
			const data = await response.json();
			
			if (data.success) {
				education = data.educations;
			}
		} catch (error) {
			console.error('Error fetching education:', error);
		} finally {
			loadingEducation = false;
		}
	}
	
	onMount(async () => {
		await Promise.all([
			fetchProfile(),
			fetchProjects(),
			fetchExperiences(),
			fetchSkills(),
			fetchEducation()
		]);
	});
</script>

<Hero {profile} />
<Projects projects={projects} loading={loadingProjects} />
<Experience experiences={experiences} loading={loadingExperiences} />
<Skills skills={skills} loading={loadingSkills} />
<Education education={education} loading={loadingEducation} /> 