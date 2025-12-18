<script>
	import { Toaster } from '$lib/components/ui/sonner/index';
</script>

<Toaster
	position="top-left"
	richColors={false}
	duration={3000}
	visibleToasts={1}
	class="!z-[10] [--width:340px]! xl:[--width:400px]!"
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'xl:absolute xl:left-0 mb-14 xl:mb-4 !z-[10]'
		}
	}}
/>
