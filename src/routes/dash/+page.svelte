<script lang="ts">
	import type { PageProps } from './$types';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	let { data }: PageProps = $props();
	let mbukakDoa = $state(false);
	let mbukakTambahDoa = $state(false);
	let mbukakUsers = $state(false);
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select/index.js';

	const types = [
		{ icon: 'plane.svg', value: 'aircraft', label: 'With Aircraft' },
		{ icon: 'helic.svg', value: 'non-aircraft', label: 'Non Aircraft' },
	];


	let value = $state('aircraft');

	const triggerContent = $derived(types.find((t) => t.value === value) ?? { label: 'Aircraft', value: 'aircraft', icon: 'plane.svg' });

	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		gsap.fromTo(
			'.plane',
			{
				delay: 0,
				opacity: 0,
				x: -100,
				y: 100
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
	});

	let mebur = () => {
		gsap.to('.plane', {
			duration: 2,
			x: 100,
			y: -100,
			ease: 'power3.out'
		});

		setTimeout(async () => {
			await goto('/login');
		}, 500);
	};

	const doas = [
		{
			a: 'PANEL 0',
			b: '246002',
			c: 'MEISAR SUPRIYATNO ',
			d: 'A',
			e: '2025-12-15',
			f: '2026-12-15',
			g: 'System Engineering',
			h: ''
		},
		{
			a: 'PANEL 0',
			b: '246002',
			c: 'MEISAR SUPRIYATNO ',
			d: 'A',
			e: '2025-12-15',
			f: '2026-12-15',
			g: 'System Engineering',
			h: ''
		}
	];

	const users = [
		{
			a: 'Y',
			b: '246002',
			c: 'MEISAR SUPRIYATNO ',
			d: '',
			e: 'PMO/PPC'
		},
		{
			a: 'N',
			b: '246002',
			c: 'MEISAR SUPRIYATNO ',
			d: '',
			e: ''
		}
	];
</script>

<img class="fixed bottom-0 left-0 -z-50 h-1/2 opacity-75" src="grad.svg" alt="" />
<img class="fixed top-0 right-0 -z-50 h-1/2 -rotate-180" src="grad.svg" alt="" />

<!-- @b floating button -->
<div class="fixed flex flex-row gap-2 bottom-5 left-1/2 -translate-x-1/2 p-2 bg-[#F8EAD9] !drop-shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
	<!--<div class="flex flex-row bg-white/50 p-2 px-3 gap-3 group w-auto overflow-hidden">
		<!~~ <img
			src="helic.svg?v=3"
			class="w-7 group-hover:rotate-[-45deg] transition-all duration-500"
			alt=""
		/> ~~>
		<div class="flex items-center plane opacity-0">
			<img src="plane.svg?v=2" class="w-5 group-hover:rotate-[-45deg] transition-all duration-500" alt="" />
		</div>
		<p class="">Aircraft</p>
		<img src="down.svg" class="w-2 pt-1" alt="" />
	</div>
-->
	<Select.Root type="single" name="favoriteFruit" bind:value>
		<Select.Trigger class="flex flex-row bg-white/50 py-5 px-3 w-48 gap-3 group shadow-none overflow-hidden border-0 rounded-none">
			<!-- {triggerContent} -->
		<!-- <img
			src="helic.svg?v=3"
			class="w-7 group-hover:rotate-[-45deg] transition-all duration-500"
			alt=""
		/> -->
		<div class="flex items-center plane opacity-0">
			<!-- <img src={triggerContent.icon} class="{triggerContent.value === 'aircraft' ? 'w-6' : 'w-7'} group-hover:rotate-[-45deg] transition-all duration-500" alt="" /> -->

			{#if triggerContent.value === 'aircraft'}
				<img src="plane.svg?v=2" class="w-6 mr-1 group-hover:rotate-[-45deg] transition-all duration-500" alt="" />
			{:else}
				<img src="helic.svg?v=3" class="w-7 group-hover:rotate-[-45deg] transition-all duration-500 scale-x-[-1]" alt="" />
			{/if}
		</div>
		<p class="text-base">{triggerContent.label}</p>
		<!-- <img src="down.svg" class="w-2 pt-1" alt="" /> -->
		</Select.Trigger>
		<Select.Content class="mb-2 rounded-none shadow-none border-0 bg-[#F8EAD9] p-1">
			<Select.Group>
				<!-- <Select.Label>Fruits</Select.Label> -->
				{#each types as type (type.value)}
					<Select.Item class="rounded-none shadow-none px-3 py-3 border-0 hover:bg-white/50! bg-white/50 active:bg-white/50!" value={type.value} label={type.label}>
						{#if type.value === 'aircraft'}
							<img src="plane.svg?v=2" class="w-6 mr-2 group-hover:rotate-[-45deg] transition-all duration-500" alt="" />
						{:else}
							<img src="helic.svg?v=3" class="w-7 mr-2 group-hover:rotate-[-45deg] transition-all duration-500 scale-x-[-1]" alt="" />
						{/if}
						<p class="text-base">{type.label}</p>
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	<div
		class="flex flex-row bg-white/50 p-2 px-3 gap-2 group"
		onclick={() => {
			mbukakTambahDoa = true;
		}}
	>
		<img src="plus.svg" class="w-4 group-hover:rotate-[180deg] transition-all duration-1000" alt="" />
		<p class="">Tambah</p>
	</div>
	<div
		class="flex flex-row bg-white/50 p-2 px-3 gap-2 group aspect-squre"
		onclick={() => {
			mbukakUsers = true;
		}}
	>
		<img src="users2.svg?c" class="w-5 group-hover:rotate-[24deg] transition-all duration-500" alt="" />
	</div>
	<div class="flex flex-row bg-white/50 p-2 px-3 gap-2 group">
		<img src="search.svg" class="w-4 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
	</div>
	<div
		class="flex flex-row bg-white/50 p-2 px-3 gap-2 group"
		onclick={() => {
			mebur();
		}}
	>
		<img src="power.svg" class="w-4 pt-1 group-hover:rotate-[24deg] transition-all duration-500" alt="" />
	</div>
</div>

<div class="h-full w-full flex z-50 flex-col justify-center items-center gap-4 pt-4">
	<div class="w-11/12 h-1/4 flex justify-between">
		<div class="flex flex-row w-1/2 gap-2">
			<div class="w-20 flex items-center justify-center aspect-square bg-white/25 p-4">
				<img src="logo.png" class="" />
			</div>
		</div>

		<!-- @b top bar -->
		<div class="flex flex-row w-1/2 gap-2 justify-end">
			<div class="w-fit bg-white/25 p-4 px-6">
				<div class="flex gap-1.5">
					<img src="user.svg" class="w-4" alt="" />
					<p class="text-secondary opacity-75">User</p>
				</div>
				<p class="font-medium text-lg whitespace-nowrap overflow-hidden text-ellipsis">Kevin Galang, 155160</p>
			</div>
			<div class="w-fit bg-white/25 p-4 px-6">
				<div class="flex gap-1.5">
					<img src="date.svg?f" class="w-3.5" alt="" />
					<p class="text-secondary opacity-75">Tanggal</p>
				</div>
				<p class="font-medium text-lg whitespace-nowrap overflow-hidden text-ellipsis">Selasa, 14 Januari 2000</p>
			</div>
			<div class="w-fit bg-white/25 p-4 px-6">
				<div class="flex gap-1.5">
					<img src="clock.svg?f" class="w-4" alt="" />
					<p class="text-secondary opacity-75">Jam</p>
				</div>
				<p class="font-medium text-lg whitespace-nowrap overflow-hidden text-ellipsis">Siang, 14:32:10</p>
			</div>
		</div>
	</div>

	<!-- @b list doa -->
	<div class="bg-white/25 flex items-center justify-center w-11/12 h-3/4">
		<div class="bg-white/50 h-full w-full mx-4 my-4 flex flex-col">
			<div class="p-4">
				<div class="flex justify-between w-full bg-[#F3EBE0] p-4 px-6">
					<p class="font-medium">Daftar DOA</p>
					<p class="font-medium">Jumlah</p>
				</div>
				<div class="flex justify-between w-full p-2 px-6">
					<div class="flex gap-1.5">
						<img src="cert.svg?f" class="w-5" alt="" />
						<p class="font-medium">Certificate</p>
					</div>
					<p class="font-medium">15</p>
				</div>
				<div class="flex justify-between w-full p-2 px-6">
					<div class="flex gap-1.5">
						<img src="users.svg?f" class="w-5" alt="" />
						<p class="font-medium">Personnel Assignment</p>
					</div>
					<p class="font-medium">21</p>
				</div>
				<div class="flex justify-between w-full p-0 px-6 text-secondary opacity-75">
					<div class="flex gap-1.5 items-center">
						<div class="pl-2 pr-2 flex justify-center">
							<div class="w-0.5 h-7 border-l border-dashed border-secondary" />
						</div>
						<p class="">CVE</p>
					</div>
					<p class="">10</p>
				</div>
				<div class="flex justify-between w-full p-0 px-6 text-secondary opacity-75">
					<div class="flex gap-1.5 items-center">
						<div class="pl-2 pr-2 flex justify-center">
							<div class="w-0.5 h-7 border-l border-dashed border-secondary" />
						</div>
						<p class="">AWO</p>
					</div>
					<p class="">10</p>
				</div>
				<div class="flex justify-between w-full p-0 px-6 text-secondary opacity-75">
					<div class="flex gap-1.5 items-center">
						<div class="pl-2 pr-2 flex justify-center">
							<div class="w-0.5 h-7 border-l border-dashed border-secondary" />
						</div>
						<p class="">Project CVE dan AWO</p>
					</div>
					<p class="">1</p>
				</div>
				<div
					class="flex justify-between w-full p-2 px-6 group"
					onclick={() => {
						mbukakDoa = true;
					}}
				>
					<div class="flex gap-1.5">
						<img src="case.svg?f" class="w-4" alt="" />
						<p class="font-medium group-hover:underline cursor-pointer!">Working Arrangement</p>
					</div>
					<p class="font-medium">43</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- @b doa -->
<Drawer.Root bind:open={mbukakDoa}>
	<Drawer.Content class="bg-[#FAF8F4] min-h-[95dvh] flex items-center">
		<div class="w-11/12 pt-12 gap-2 flex flex-col">
			<div class="w-full flex justify-between">
				<div>
					<div class="flex flex-row bg-[#F3EBE0] p-2 px-3 gap-2 group">
						<img src="case.svg?f" class="w-4" alt="" />
						<p class="font-medium">Working Arrangement</p>
					</div>
				</div>

				<div class="flex gap-2">
					<div>
						<div class="flex flex-row bg-[#F3EBE0] items-center group">
							<div class="bg-secondary p-2 px-3">
								<p class="text-white!">50</p>
							</div>
							<p class="font-medium px-3">Total Dokumen</p>
						</div>
					</div>
					<div>
						<div class="relative flex flex-row bg-[#F3EBE0] p-3 group">
							<img src="search.svg" class="w-4 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
							<div class="bg-secondary w-2 h-2 absolute -right-0.5 -top-0.5"></div>
						</div>
					</div>
					<div
						onclick={() => {
							mbukakTambahDoa = true;
						}}
					>
						<div class="flex flex-row bg-[#F3EBE0] p-3.5 group">
							<img src="plus.svg" class="w-3 group-hover:rotate-[180deg] transition-all duration-1000" alt="" />
						</div>
					</div>
				</div>
			</div>
			<Table.Root>
				<Table.Header class="">
					<Table.Row class="bg-[#F3EBE0]">
						<Table.Head class="py-4 pl-4">PA Number</Table.Head>
						<Table.Head>NIK</Table.Head>
						<Table.Head>Nama</Table.Head>
						<Table.Head>Rev</Table.Head>
						<Table.Head>Tanggal</Table.Head>
						<Table.Head>Valid</Table.Head>
						<Table.Head>Judul</Table.Head>
						<!-- <Table.Head class="text-end pr-4">-</Table.Head> -->
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each doas as doa (doa)}
						<Table.Row class="group relative border-0">
							<Table.Cell class="font-medium py-3 pl-4 w-1">{doa.a.length > 20 ? doa.a.substring(0, 20) + '...' : doa.a}</Table.Cell>
							<Table.Cell class="w-1">{doa.b.length > 20 ? doa.b.substring(0, 20) + '...' : doa.b}</Table.Cell>
							<Table.Cell>{doa.c.length > 20 ? doa.c.substring(0, 20) + '...' : doa.c}</Table.Cell>
							<Table.Cell class="w-1">{doa.d.length > 20 ? doa.d.substring(0, 20) + '...' : doa.d}</Table.Cell>
							<Table.Cell class="w-1">{doa.e.length > 20 ? doa.e.substring(0, 20) + '...' : doa.e}</Table.Cell>
							<Table.Cell class="w-1">{doa.f.length > 20 ? doa.f.substring(0, 20) + '...' : doa.f}</Table.Cell>
							<Table.Cell>{doa.g.length > 20 ? doa.g.substring(0, 20) + '...' : doa.g}</Table.Cell>
							<!-- <Table.Cell class="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-all">
								<img src="edit.svg" class="w-3" alt="" />
								<img src="download.svg" class="w-4" alt="" />
							</Table.Cell> -->
							<div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-all">
								<img src="edit.svg" class="w-3" alt="" />
								<img src="download.svg" class="w-4" alt="" />
							</div>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</Drawer.Content>
</Drawer.Root>

<!-- @b tambah doa -->
<Drawer.Root bind:open={mbukakTambahDoa} direction="right">
	<Drawer.Content class="bg-[#FAF8F4] !min-h-0">
		<ScrollArea scrollbarYClasses="hidden" class="el relative flex items-center px-4 gap-2 h-full !min-h-0 flex-col" orientation="vertical" type="scroll">
			<div class="w-full flex justify-between pt-4">
				<div>
					<div class="flex flex-row bg-[#F3EBE0] p-2 px-3 gap-2 group">
						<img src="plus.svg?f" class="w-4" alt="" />
						<p class="font-medium">Tambah DOA</p>
					</div>
				</div>

				<div
					class="flex gap-2"
					onclick={() => {
						mbukakTambahDoa = false;
					}}
				>
					<div>
						<div class="flex flex-row bg-[#F3EBE0] p-3.5 group">
							<img src="plus.svg" class="w-3 rotate-[45deg]" alt="" />
						</div>
					</div>
				</div>
			</div>

			<div class="w-full pt-4 flex flex-col gap-2 pb-4">
				<div class="flex flex-col gap-1">
					<p class="font-medium">Masukkan Judul</p>
					<div class="relative w-full items-center">
						<img src="cert.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
						<Input type="text" placeholder="Masukkan Judul" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Dokumen</p>
					<div class="relative w-full items-center">
						<img src="clip.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Input type="text" placeholder="Upload Dokumen" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Tipe</p>
					<div class="relative w-full items-center">
						<img src="type.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Input type="text" placeholder="Pilih Tipe" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Revisi</p>
					<div class="relative w-full items-center">
						<img src="beat.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Input type="text" placeholder="Revisi" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Nomor</p>
					<div class="relative w-full items-center">
						<img src="number.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Input type="text" placeholder="Nomor" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
					</div>
				</div>

				<div class="flex w-full flex-col justify-center gap-1 text-left">
					<p class="font-medium">Remarks</p>
					<div class="relative w-full items-center">
						<img src="note.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Textarea placeholder="Tambahkan Remarks" class="resize-none! bg-primary/50 border-transparent! rounded-none placeholder:text-secondary/35 py-4! pr-4! pl-12! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0   xl:text-base" autofocus={false} />
					</div>
				</div>
			</div>
		</ScrollArea>
		<div>
			<div class="flex w-full justify-center items-center py-4 text-center bg-secondary p-2 px-3 gap-2 group">
				<p class="font-medium !text-white">Tambah</p>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>

<!-- @b users -->
<Drawer.Root bind:open={mbukakUsers}>
	<Drawer.Content class="bg-[#FAF8F4] min-h-[95dvh] flex items-center">
		<div class="w-11/12 pt-12 gap-2 flex flex-col">
			<div class="w-full flex justify-between">
				<div>
					<div class="flex flex-row bg-[#F3EBE0] p-2 px-3 gap-2 group">
						<img src="users3.svg?f" class="w-4" alt="" />
						<p class="font-medium">Daftar User</p>
					</div>
				</div>

				<div class="flex gap-2">
					<div>
						<div class="flex flex-row bg-[#F3EBE0] items-center group">
							<div class="bg-secondary p-2 px-3">
								<p class="text-white!">12</p>
							</div>
							<p class="font-medium px-3">Total User</p>
						</div>
					</div>
					<div>
						<div class="relative flex flex-row bg-[#F3EBE0] p-3 group">
							<img src="search.svg" class="w-4 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
							<div class="bg-secondary w-2 h-2 absolute -right-0.5 -top-0.5"></div>
						</div>
					</div>
				</div>
			</div>
			<Table.Root>
				<Table.Header class="">
					<Table.Row class="bg-[#F3EBE0]">
						<Table.Head class="py-4 pl-4">Status</Table.Head>
						<Table.Head class="text-center">NIK</Table.Head>
						<Table.Head>Nama</Table.Head>
						<Table.Head>Organisasi</Table.Head>
						<Table.Head>User Level</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each users as user (user)}
						<Table.Row class="group relative border-0">
							<Table.Cell class="font-medium pl-4 w-1 text-center">
								{#if user.a === 'Y'}
									<p class="!text-green-500 !leading-[0] !tracking-[0] text-4xl">•</p>
								{:else}
									<p class="!text-gray-400 !leading-[0] !tracking-[0] text-4xl">•</p>
								{/if}
							</Table.Cell>
							<Table.Cell class="text-center w-1/8">{user.b.length > 20 ? user.b.substring(0, 20) + '...' : user.b}</Table.Cell>
							<Table.Cell class="">{user.c.length > 20 ? user.c.substring(0, 20) + '...' : user.c}</Table.Cell>
							<Table.Cell class="w-1/6"
								>{#if user.d}
									{user.d.length > 20 ? user.d.substring(0, 20) + '...' : user.d}
								{:else}
									-
								{/if}</Table.Cell
							>
							<Table.Cell class="w-1/6">{user.e.length > 20 ? user.e.substring(0, 20) + '...' : user.e}</Table.Cell>
							<div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-all">
								{#if user.e}
									<!-- <img src="copy.svg" class="w-3" alt="" /> -->
									<img src="edit.svg" class="w-3" alt="" />
								{:else}
									<p class="text-xs font-medium bg-primary px-2 py-1 rounded-none">Aktivasi</p>
								{/if}
							</div>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</Drawer.Content>
</Drawer.Root>
