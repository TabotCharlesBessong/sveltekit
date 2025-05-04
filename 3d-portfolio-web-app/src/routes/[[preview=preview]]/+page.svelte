<script>
	import { SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';

	export let data;
</script>

<!-- <SliceSimulator background="#222222" > -->

	<SliceZone slices={data.page.data.slices} {components} />
<!-- </SliceSimulator> -->
