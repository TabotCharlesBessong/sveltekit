<script lang="ts">
	import type { IProfile } from '$lib/db/models';
	
	export let profile: IProfile | null = null;
	
	// Function to get icon based on platform name
	function getSocialIcon(platform: string): string {
		switch (platform.toLowerCase()) {
			case 'github':
				return 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z';
			case 'linkedin':
				return 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z';
			case 'twitter':
			case 'x':
				return 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';
			case 'instagram':
				return 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z';
			default:
				return 'M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.86v-9.294H9.922v-3.622h3.263V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z';
		}
	}
</script>

<footer class="bg-gray-900 text-white py-12 px-4">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
			<!-- About me -->
			<div class="col-span-1 md:col-span-1 lg:col-span-2">
				<h3 class="text-2xl font-bold mb-4">
					{#if profile}
						{profile.firstName} {profile.lastName}
					{:else}
						My Portfolio
					{/if}
				</h3>
				<p class="text-gray-300 mb-6">
					{#if profile}
						{profile.tagline}
					{:else}
						Full Stack Developer | Web Enthusiast | Tech Advocate
					{/if}
				</p>
				
				<!-- Social Links -->
				<div class="flex space-x-4">
					{#if profile && profile.socialLinks && profile.socialLinks.length > 0}
						{#each profile.socialLinks as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-yellow-500 hover:text-black"
								aria-label={social.platform}
							>
								<svg
									class="h-5 w-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d={getSocialIcon(social.platform)} />
								</svg>
							</a>
						{/each}
					{:else}
						<!-- Default social links -->
						<a
							href="#"
							class="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-yellow-500 hover:text-black"
							aria-label="GitHub"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d={getSocialIcon('github')} />
							</svg>
						</a>
						<a
							href="#"
							class="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-yellow-500 hover:text-black"
							aria-label="LinkedIn"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d={getSocialIcon('linkedin')} />
							</svg>
						</a>
						<a
							href="#"
							class="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-yellow-500 hover:text-black"
							aria-label="Twitter"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d={getSocialIcon('twitter')} />
							</svg>
						</a>
					{/if}
				</div>
			</div>
			
			<!-- Quick Links -->
			<div>
				<h3 class="text-xl font-bold mb-4">Quick Links</h3>
				<ul class="space-y-2">
					<li>
						<a href="#" class="text-gray-300 transition-colors hover:text-yellow-400">Home</a>
					</li>
					<li>
						<a href="#projects" class="text-gray-300 transition-colors hover:text-yellow-400">Projects</a>
					</li>
					<li>
						<a href="#experience" class="text-gray-300 transition-colors hover:text-yellow-400">Experience</a>
					</li>
					<li>
						<a href="#skills" class="text-gray-300 transition-colors hover:text-yellow-400">Skills</a>
					</li>
					<li>
						<a href="#education" class="text-gray-300 transition-colors hover:text-yellow-400">Education</a>
					</li>
				</ul>
			</div>
			
			<!-- Contact Info -->
			<div>
				<h3 class="text-xl font-bold mb-4">Contact</h3>
				{#if profile}
					<p class="flex items-center mb-3 text-gray-300">
						<svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>
						<span>{profile.email}</span>
					</p>
					<p class="flex items-center text-gray-300">
						<svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
						</svg>
						<span>{profile.location}</span>
					</p>
				{:else}
					<!-- Default contact info -->
					<p class="flex items-center mb-3 text-gray-300">
						<svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>
						<span>contact@example.com</span>
					</p>
					<p class="flex items-center text-gray-300">
						<svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
						</svg>
						<span>City, Country</span>
					</p>
				{/if}
			</div>
		</div>
		
		<div class="mt-10 border-t border-gray-800 pt-6 text-center">
			<p class="text-gray-400 text-sm">
				&copy; {new Date().getFullYear()} {profile ? `${profile.firstName} ${profile.lastName}` : 'My Portfolio'}. All rights reserved.
			</p>
		</div>
	</div>
</footer> 