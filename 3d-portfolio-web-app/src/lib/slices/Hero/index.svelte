<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.HeroSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<span class="text-3xl text-orange-600" >
		{slice.primary.first_name}
	</span>
	<span>
		{slice.primary.last_name}
	</span>
	<span>
		{slice.primary.tag_line}
	</span>
</section>
