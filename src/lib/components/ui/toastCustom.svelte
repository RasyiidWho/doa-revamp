<script>
	import * as Alert from '$lib/components/ui/alert';
	import '$lib/global.css';

	export let icon;
	export let title;
	export let description;
	export let onClick = () => {}; // Add onClick prop with default empty function
</script>

<Alert.Root class="hover-zoom relative right-0 m-0 rounded-none !border-1 border-secondary! bg-white !py-3 pr-3 !pl-5 !drop-shadow-[0px_0px_10px_rgba(0,0,0,0.1)] will-change-transform" onclick={onClick}>
	<Alert.Description>
		<div class="flex items-center gap-4">
			<div class="absolute -left-2 -top-2 bg-white p-1 rounded-full !border-1 border-secondary!">
				<img src={icon} class="h-4 w-4" />
			</div>
			<div>
				<!-- <p class="text-base font-bold">{@html title}</p> -->
				<p class="text-sm font-normal opacity-100"><span class="text-base font-bold">{@html title}</span> {@html description}</p>
			</div>
		</div>
	</Alert.Description>
</Alert.Root>
