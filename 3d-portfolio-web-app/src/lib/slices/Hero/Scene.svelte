<script lang="ts">
  import { onMount } from 'svelte';
  import { Canvas } from "@threlte/core/dist/index.js";
  import Shapes from "./Shapes.svelte";
</script>

{#if typeof window !== 'undefined'}
  <Canvas shadows>
    <Shapes />
  </Canvas>
{:else}
  <div class="w-full h-full bg-gray-200 animate-pulse" />
{/if}