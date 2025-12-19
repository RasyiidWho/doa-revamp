<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/global.css';
	import { mainTitle, subTitle } from '$lib/store';
	let { children } = $props();
</script>

<svelte:head>
	{#if $mainTitle || $subTitle}
		<title>{$mainTitle} {$subTitle} – PTDI Design Organization</title>
	{:else}
		<title>PTDI Design Organization</title>
	{/if}
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
