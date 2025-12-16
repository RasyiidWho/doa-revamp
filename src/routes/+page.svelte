<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	let { data } = $props();

	onMount(() => {
		console.log(data);
		console.log('eek');
	});
</script>

<Button variant="outline">Button</Button>
