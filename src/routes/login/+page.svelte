<script lang="ts">
	import type { PageProps } from './$types';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	let mbukakDoa = $state(false);
	let mbukakTambahUser = $state(false);
	let mbukakUsers = $state(false);
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import VanillaTilt from 'vanilla-tilt';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index';

	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { tos } from '$lib/utils';

	let disabled = $state(false);

	// import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		VanillaTilt.init(document.querySelectorAll('.planex'), {
			// reverse: true,
			max: 30,
			// glare: true,
			'full-page-listening': true
			// gyroscope: false
		});

		gsap.fromTo(
			'.plane',
			{
				delay: 0,
				opacity: 0,
				x: -500,
				y: 500
			},
			{
				delay: 0,
				duration: 1,
				opacity: 1,
				x: 0,
				y: 0,
				ease: 'power3.out'
			}
		);

		// gsap.fromTo(
		// 	'.plane',
		// 	{
		// 		delay: 0,
		// 		opacity: 0,
		// 		x: -100,
		// 		y: 100
		// 	},
		// 	{
		// 		delay: 0,
		// 		duration: 1,
		// 		opacity: 1,
		// 		x: 0,
		// 		y: 0,
		// 		ease: 'power3.out'
		// 	}
		// );

		gsap.to('.plane-img', {
			x: 10,
			y: 10,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: 'power1.inOut'
		});
	});

	let username = $state('');
	let password = $state('');
	let errorMessage = $state('');

	let fLogin = async () => {
		disabled = true;
		errorMessage = '';
		const response = await fetch('/-login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const res = await response.json();

		if (response.ok) {
			gsap.to('.plane', {
				duration: 1,
				x: 500,
				y: -500,
				ease: 'power3.out'
			});

			setTimeout(async () => {
				await goto('/dash', { replaceState: true, invalidateAll: true });
			}, 500);
		} else {
			// errorMessage = res.message || 'Login failed';
			tos('beat.svg', 'Login Gagal', res.message || 'Login failed');
		}
		disabled = false;
	};
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

<img class="fixed bottom-0 left-0 -z-50 h-1/2 opacity-75" src="grad.svg" alt="" />
<img class="fixed top-0 right-0 -z-50 h-1/2 -rotate-180" src="grad.svg" alt="" />

<div class="relative flex min-h-dvh! w-dvw flex-col items-center justify-center py-10">
	<!-- @b list doa -->
	<div class="bg-white/25 flex items-center justify-center w-8/12">
		<div class="bg-white/50 h-full w-auto mx-4 my-4 flex flex-row">
			<div class="w-1/3 m-[3vw] flex items-center">
				<div class="w-full pt-4 flex items-center flex-col gap-2 pb-4">
					<div class="w-20 flex items-center justify-center aspect-square mb-6">
						<img src="logo.png" class="" />
					</div>
					<div class="flex w-full flex-col gap-2">
						<div class="flex w-full flex-col gap-1">
							<p class="font-medium">NIK</p>
							<div class="relative w-full items-center">
								<img src="nik.svg" class=" h-5! w-5! absolute left-3 top-1/2 -translate-y-1/2" alt="" />
								<Input type="text" bind:value={username} placeholder="Masukkan NIK" class="text-base! shadow-none! w-full rounded-none border-transparent! bg-primary/50 py-7! pl-11! placeholder:text-secondary/35 focus:!border-transparent focus:!ring-transparent focus:!ring-offset-0 {disabled ? 'pointer-events-none' : ''}" autofocus={false} />
							</div>
						</div>

						<div class="flex w-full flex-col gap-1">
							<p class="font-medium">Password</p>
							<div class="relative w-full items-center">
								<img src="pass.svg" class=" h-5! w-5! absolute left-3 top-1/2 -translate-y-1/2" alt="" />
								<Input type="password" bind:value={password} placeholder="Masukkan Password" class="text-base! shadow-none! w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! focus:!border-transparent focus:!ring-transparent focus:!ring-offset-0 {disabled ? 'pointer-events-none' : ''}" autofocus={false} onkeydown={(e) => e.key === 'Enter' && fLogin()} />
							</div>
						</div>

						<div class="flex w-full gap-1">
							<div
								class="group flex w-1/3 items-center justify-center bg-primary p-2 px-3 py-4 text-center cursor-pointer"
								onclick={() => {
									mbukakTambahUser = true;
								}}
							>
								<p class="font-medium">Daftar</p>
							</div>
							<div class="group flex w-2/3 items-center justify-center gap-2 bg-secondary p-2 px-3 py-4 text-center cursor-pointer {disabled ? 'pointer-events-none' : ''}" onclick={fLogin}>
								<p class="font-medium !text-white">Login</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="w-2/3 flex relative overflow-hidden">
				<!-- Top-right cloud -->
				<div class="cloud cloud-1 absolute pointer-events-none z-50 rounded-full blur-lg w-[180px] h-[90px]"></div>
				<!-- Top-center cloud -->
				<div class="cloud cloud-2 absolute pointer-events-none z-50 rounded-full blur-md w-[220px] h-[110px]"></div>
				<!-- Middle-right cloud -->
				<div class="cloud cloud-3 absolute pointer-events-none z-10 rounded-full blur-lg w-[160px] h-[80px]"></div>
				<!-- Top-left cloud -->
				<div class="cloud cloud-4 absolute pointer-events-none z-50 rounded-full blur-md w-[200px] h-[100px]"></div>
				<!-- Bottom-right cloud -->
				<div class="cloud cloud-5 absolute pointer-events-none z-10 rounded-full blur-lg w-[140px] h-[70px]"></div>
				<!-- Center cloud -->
				<div class="cloud cloud-6 absolute pointer-events-none z-50 rounded-full blur-md w-[190px] h-[95px]"></div>
				<div class="planex absolute inset-0 flex items-center justify-center z-40">
					<div class="plane opacity-0">
						<img src="plane.svg?v=2" class="plane-img w-60" alt="" />
					</div>
				</div>
				<img src="bg.jpg" class="w-full" />
			</div>
		</div>
	</div>
</div>

<!-- @b tambah user -->
<Drawer.Root bind:open={mbukakTambahUser} direction="right">
	<Drawer.Content class="bg-[#FAF8F4]! !min-h-0">
		<ScrollArea scrollbarYClasses="hidden" class="el relative flex items-center px-4 gap-2 h-full !min-h-0 flex-col " orientation="vertical" type="scroll">
			<div class="w-full flex justify-between pt-4" data-vaul-no-drag>
				<div>
					<div class="flex flex-row bg-[#F3EBE0] p-2 px-3 gap-2 group">
						<img src="user.svg?f" class="w-4" alt="" />
						<p class="font-medium">Surat Pernyataan</p>
					</div>
				</div>

				<div
					class="flex gap-2"
					onclick={() => {
						mbukakTambahUser = false;
					}}
				>
					<div>
						<div class="flex flex-row bg-[#F3EBE0] p-3.5 group">
							<img src="minimize.svg?a" class="w-3 group-hover:rotate-[180deg] transition-all duration-500" alt="" />
						</div>
					</div>
				</div>
			</div>

			<p class="p-3 bg-primary mt-3">Form proposal permohonan akses ke aplikasi Design Organization.</p>

			<div class="w-full pt-4 flex flex-col gap-2 pb-4">
				<div class="flex flex-col gap-1">
					<p class="font-medium">Informasi Pribadi</p>
					<div class="flex flex-col gap-2 p-3 pt-2 pb-3 bg-primary/35">
						<div class="flex flex-col gap-1">
							<p class="font-medium">Email</p>
							<div class="relative w-full items-center">
								<img src="mail.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan Email" class="w-full rounded-none border-transparent! bg-primary/75 placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>

						<div class="flex flex-col gap-1">
							<p class="font-medium">Nama</p>
							<div class="relative w-full items-center">
								<img src="name.svg?a" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan Nama" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>

						<div class="flex flex-col gap-1">
							<p class="font-medium">Password</p>
							<div class="relative w-full items-center">
								<img src="pass.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="password" placeholder="Masukkan Password" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Informasi Pekerjaan</p>
					<div class="flex flex-col gap-2 p-3 pt-2 pb-3 bg-primary/35">
						<div class="flex flex-col gap-1">
							<p class="font-medium">NIK</p>
							<div class="relative w-full items-center">
								<img src="nik.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan NIK" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>

						<div class="flex flex-col gap-1">
							<p class="font-medium">Kode Organisasi</p>
							<div class="relative w-full items-center">
								<img src="engineering standard.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan Kode Organisasi" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>

						<div class="flex flex-col gap-1">
							<p class="font-medium">Lokasi Kerja</p>
							<div class="relative w-full items-center">
								<img src="case.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan Lokasi Kerja" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Informasi Manager</p>
					<div class="flex flex-col gap-2 p-3 pt-2 pb-3 bg-primary/35">
						<div class="flex flex-col gap-1">
							<p class="font-medium">Nama Manager</p>
							<div class="relative w-full items-center">
								<img src="name.svg?a" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan Nama Manager" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>

						<div class="flex flex-col gap-1">
							<p class="font-medium">NIK Manager</p>
							<div class="relative w-full items-center">
								<img src="nik.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan NIK Manager" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>

						<div class="flex flex-col gap-1">
							<p class="font-medium">Email Manager</p>
							<div class="relative w-full items-center">
								<img src="mail.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
								<Input type="text" placeholder="Masukkan Email Manager" class="w-full rounded-none bg-primary/75 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
							</div>
						</div>
					</div>

					<div class="flex w-full flex-col justify-center gap-1 text-left pt-4">
						<p class="font-medium">Dengan ini, saya tidak akan:</p>
						<Label class="flex items-start gap-3 rounded-none border p-3 border-black/10 has-[[aria-checked=true]]:border-secondary has-[[aria-checked=true]]:bg-primary/50">
							<Checkbox id="toggle-2" class="data-[state=checked]:bg-secondary data-[state=checked]:text-white shadow-none! border-none! bg-black/10 rounded-none" />
							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">Duplikasi Data</p>
								<p class="text-secondary/75! text-sm">Saya tidak akan menduplikat/mencetak semua/sebagian data dan informasi yang ada di website/portal.</p>
							</div>
						</Label>

						<Label class="flex items-start gap-3 rounded-none border p-3 border-black/10 has-[[aria-checked=true]]:border-secondary has-[[aria-checked=true]]:bg-primary/50">
							<Checkbox id="toggle-2" class="data-[state=checked]:bg-secondary data-[state=checked]:text-white shadow-none! border-none! bg-black/10 rounded-none" />
							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">Sharing Akun</p>
								<p class="text-secondary/75! text-sm">Saya tidak akan memberikan kewenangan kepada orang lain.</p>
							</div>
						</Label>

						<Label class="flex items-start gap-3 rounded-none border p-3 border-black/10 has-[[aria-checked=true]]:border-secondary has-[[aria-checked=true]]:bg-primary/50">
							<Checkbox id="toggle-2" class="data-[state=checked]:bg-secondary data-[state=checked]:text-white shadow-none! border-none! bg-black/10 rounded-none" />
							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">Distribusi Data</p>
								<p class="text-secondary/75! text-sm">Saya tidak mendistribusikan/membawa keluar area kerja/keluar kawasan perusahaan semua/sebagian data dan informasi yang ada di website/portal kepada pihak lain (pihak ketiga).</p>
							</div>
						</Label>
					</div>
				</div>
			</div></ScrollArea
		>
		<div>
			<div class="flex w-full justify-center items-center py-4 text-center bg-secondary p-2 px-3 gap-2 group">
				<p class="font-medium !text-white">Daftar</p>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
