<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/global.css';
	import Tos from '$lib/tos.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
