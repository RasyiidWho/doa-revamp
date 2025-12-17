<script lang="ts">
	import type { PageProps } from './$types';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import Headroom from 'headroom.js';

	let showSearch = $state(false);
	let { data }: PageProps = $props();
	let mbukakDoa = $state(false);
	let mbukakTambahDoa = $state(false);
	let mbukakUsers = $state(false);
	let mbukakEditUser = $state(false);
	let navbar = $state();

	const group = [
		{ icon: 'plane.svg', value: 'aircraft', label: 'Aircraft' },
		{ icon: 'helic.svg', value: 'non-aircraft', label: 'Non Aircraft' }
	];

	const subtypes = [
		{ value: '', label: 'Pilih Type' },
		{ value: '41A', label: 'PART 41A Design Standard Manual (NDM)' },
		{ value: '41B', label: 'PART 41B Drafting Standard Manual (NDS)' },
		{ value: '41C-1', label: 'PART 41C NPS-Mark & Label' },
		{ value: '41C-2', label: 'PART 41C NPS-Part' },
		{ value: '41C-3', label: 'PART 41C NPS-Profile' },
		{ value: '41D', label: 'PART 41D Process Specification Manual (PS20)' },
		{ value: '41E', label: 'PART 41E Material Standard Manual (IMS)-Metallic' },
		{ value: '41F', label: 'PART 41F Design Checklist Standard Manual (DCL)' },
		{ value: '41G', label: 'PART 41G Computation/Software Standard Manual (NCS)' },
		{ value: '41H', label: 'PART 41H Material Specification Standard Manual (NMS)' },
		{ value: '41I', label: 'PART 41I Support Specification Standard Manual (NSS)' },
		{ value: '41N', label: '41 N Standard (Non Aircraft)' },
		{ value: 'AIA-NAS', label: 'AIA-NAS' },
		{ value: 'ANSI', label: 'ANSI' },
		{ value: 'AWO', label: 'Personnel Assignment - AWO' },
		{ value: 'cer', label: 'Certificate' },
		{ value: 'cer2', label: 'Certificate - Non Aircraft' },
		{ value: 'cmd', label: 'Command Media' },
		{ value: 'cp', label: 'Certification Procedure - Non Aircraft' },
		{ value: 'CVE', label: 'Personnel Assignment - CVE' },
		{ value: 'doc', label: 'Documment' },
		{ value: 'doc2', label: 'Documment - Non Aircraft' },
		{ value: 'form', label: 'FORM' },
		{ value: 'form2', label: 'FORM - Non Aircraft' },
		{ value: 'ISO', label: 'ISO' },
		{ value: 'lib', label: 'Library' },
		{ value: 'man', label: 'Manual' },
		{ value: 'man2', label: 'Manual - Non Aircraft' },
		{ value: 'MILSTD', label: 'MILSTD' },
		{ value: 'mtm', label: 'Material Test Method (MTM)' },
		{ value: 'pro', label: 'Procedure' },
		{ value: 'pro2', label: 'Procedure - Non Aircraft' },
		{ value: 'RTCA', label: 'RTCA' },
		{ value: 'SAE', label: 'SAE' },
		{ value: 'standard', label: 'Standard' },
		{ value: 'tm', label: 'Test Method - Non Aircraft' },
		{ value: 'WA', label: 'Working Arrangement - Non Aircraft' },
		{ value: 'wi', label: 'Work Instruction' },
		{ value: 'wi2', label: 'Work Instruction - Non Aircraft' }
	];

	const userlevels = [
		{ value: '-1', label: 'Administrator' },
		{ value: '1', label: 'PMO/PPC' },
		{ value: '2', label: 'Managemen' },
		{ value: '3', label: 'PM dan PE' },
		{ value: '4', label: 'Eksekutif' },
		{ value: '5', label: 'Controller' }
	];

	let value = $state('aircraft');
	let search = $state('');
	let searchDoa = $state('');
	let selectedUser = $state<any>({});
	let selectedUserLevel = $state('0');
	let selectedDoaGroup = $state('');
	let selectedDoaIcon = $state('');
	let selectedDoaTitle = $state('');

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

		gsap.to('.plane-img', {
			x: 3,
			y: 3,
			duration: 1,
			repeat: -1,
			yoyo: true,
			ease: 'power1.inOut'
		});

		gsap.to('.heli-img', {
			x: 3,
			// y: 5,
			duration: 1,
			repeat: -1,
			yoyo: true,
			ease: 'power1.inOut'
		});



		fUsers();
		fDoa();
	});

	$effect(() => {
	  		const headroom = new Headroom(navbar, {
			tolerance: {
				up: 0,
				down: 0
			}
			// scroller: scroller
		}).init();
	})

	const fUsers = async () => {
		const response = await fetch('/-users/v', {
			method: 'GET'
		});

		if (response) {
			response.json().then((res) => {
				const transformedUsers = res.map((user) => ({
					...user,
					userlevel_name: (() => {
						if (user.userlevel == '-1') return 'Administrator';
						if (user.userlevel == '1') return 'PMO/PPC';
						if (user.userlevel == '2') return 'Managemen';
						if (user.userlevel == '3') return 'PM dan PE';
						if (user.userlevel == '4') return 'Eksekutif';
						if (user.userlevel == '5') return 'Controller';
						return '-';
					})(),
					activated: user.userlevel == '0' ? 'Aktivasi' : user.activated === 'Y' ? 'Aktif' : user.activated === 'N' ? 'Nonaktif' : user.activated
				}));
				data = { ...data, users: transformedUsers };
				// console.log(data.users[0]);
			});
		}
	};

	const fDoa = async (s: string, t: string) => {
		data = { ...data, doa_selected: [] };
		const response = await fetch('/-doa/v', {
			method: 'POST',
			body: JSON.stringify({ s: s, t: t })
		});

		if (response) {
			response.json().then((res) => {
				if (s || t) {
					data = { ...data, doa_selected: res };
				} else {
					data = { ...data, doa: res };
				}
			});
		}
	};

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

	const getIcon = (name: string) => {
		const lower = name.toLowerCase();
		if (lower.includes('personnel')) return 'users.svg?f';
		if (lower.includes('working') || lower.includes('quality') || lower.includes('library')) return 'case.svg?f';
		return 'cert.svg?f';
	};
</script>

<img class="fixed bottom-0 left-0 -z-50 h-1/2 opacity-75" src="grad.svg" alt="" />
<img class="fixed top-0 right-0 -z-50 h-1/2 -rotate-180" src="grad.svg" alt="" />

<!-- @b floating button -->
<div bind:this={navbar} class="fixed flex flex-row gap-2 bottom-5 left-1/2 -translate-x-1/2 p-2 bg-[#e1d5c5] !drop-shadow-[0px_0px_10px_rgba(0,0,0,0.1)] z-[10]">
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
		<Select.Trigger class="flex flex-row bg-[#fef8f0] py-5 px-3 w-48 gap-3 group shadow-none overflow-hidden border-0 rounded-none">
			<!-- {triggerContent} -->
			<!-- <img
			src="helic.svg?v=3"
			class="w-7 group-hover:rotate-[-45deg] transition-all duration-500"
			alt=""
		/> -->
			<div class="flex items-center plane opacity-0">
				<!-- {#if group.find((t) => t.value === value)?.value === 'aircraft'}
					<img src="plane.svg?v=2" class="w-6 group-hover:rotate-[-45deg] transition-all duration-500" alt="" />
				{:else}
					<img src="helic.svg?v=3" class="w-7 group-hover:rotate-[45deg] transition-all duration-500 scale-x-[-1]" alt="" />
				{/if} -->

				<div class="plane-img {group.find((t) => t.value === value)?.value === 'aircraft' ? 'block' : 'hidden'}">
					<img src="plane.svg?v=2" class="w-6 group-hover:rotate-[-45deg] transition-all duration-500" alt="" />
				</div>
				<div class="heli-img {group.find((t) => t.value === value)?.value === 'aircraft' ? 'hidden' : 'block'}">
					<img src="helic.svg?v=3" class="w-7 group-hover:rotate-[45deg] transition-all duration-500 scale-x-[-1]" alt="" />
				</div>
			</div>
			<p class="text-base">{group.find((t) => t.value === value)?.label}</p>
		</Select.Trigger>
		<Select.Content class="mb-2 rounded-none shadow-none border-0 bg-[#fef8f0] border-1 border-[#e1d5c5] p-1">
			<Select.Group>
				<!-- <Select.Label>Fruits</Select.Label> -->
				{#each group as group (group.value)}
					<Select.Item class="rounded-none shadow-none px-3 py-3 border-0 hover:bg-transparent! bg-transparent active:bg-transparent!" value={group.value} label={group.label}>
						{#if group.value === 'aircraft'}
							<img src="plane.svg?v=2" class="w-6 mr-2 group-hover:rotate-[-45deg] transition-all duration-500" alt="" />
						{:else}
							<img src="helic.svg?v=3" class="w-7 mr-2 group-hover:rotate-[-45deg] transition-all duration-500 scale-x-[-1]" alt="" />
						{/if}
						<p class="text-base">{group.label}</p>
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	<div
		class="flex flex-row bg-[#fef8f0] p-2 px-3 gap-2 group"
		onclick={() => {
			mbukakTambahDoa = true;
		}}
	>
		<img src="plus.svg" class="w-4 group-hover:rotate-[180deg] transition-all duration-1000" alt="" />
		<p class="">Tambah</p>
	</div>
	<div
		class="flex flex-row bg-[#fef8f0] p-2 px-3 gap-2 group aspect-squre"
		onclick={() => {
			fUsers();
			mbukakUsers = true;
		}}
	>
		<img src="users2.svg?c" class="w-5 group-hover:rotate-[24deg] transition-all duration-500" alt="" />
	</div>
	<Popover.Root>
		<Popover.Trigger class="flex flex-row bg-[#fef8f0] p-2 px-3 gap-2 group">
			<img src="search.svg" class="w-4 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
		</Popover.Trigger>
		<Popover.Content class="mb-3 rounded-none shadow-none border-0 bg-[#fef8f0] border-1 border-[#e1d5c5] p-2">
			<div class="relative w-full items-center group h-full">
				<img src="search.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
				<Input
					type="text"
					placeholder="Cari..."
					class="w-full rounded-none bg-transparent border-transparent! placeholder:text-secondary/35 h-full pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0"
					autofocus={false}
					bind:value={searchDoa}
					onkeydown={async (event) => {
						if (event.key === 'Enter') {
							await fDoa(searchDoa, '');
							search = '';
							selectedDoaGroup = '';
							selectedDoaIcon = 'search';
							selectedDoaTitle = 'Hasil Pencarian';
							mbukakDoa = true;
						}
					}}
				/>
				<img
					src="enter.svg"
					class=" absolute top-1/2 right-3 h-4! w-4! -translate-y-1/2 cursor-pointer"
					alt=""
					onclick={async () => {
						await fDoa(searchDoa, '');
						search = '';
						selectedDoaGroup = '';
						selectedDoaIcon = 'search';
						selectedDoaTitle = 'Hasil Pencarian';
						mbukakDoa = true;
					}}
				/>
			</div>
		</Popover.Content>
	</Popover.Root>

	<div
		class="flex flex-row bg-[#fef8f0] p-2 px-3 gap-2 group"
		onclick={() => {
			mebur();
		}}
	>
		<img src="power.svg" class="w-4 pt-1 group-hover:rotate-[24deg] transition-all duration-500" alt="" />
	</div>
</div>

<div class="h-full w-full flex z-50 flex-col justify-center items-center gap-4 pt-12 pb-12">
	<div class="w-11/12 h-1/4 flex justify-between">
		<div class="flex flex-row w-1/2 gap-2">
			<div class="w-20 flex items-center justify-center aspect-square bg-white/0 p-4">
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
				{#if data.doa}
					{#each data.doa[value === 'non-aircraft' ? 'non_aircraft' : 'aircraft'] || [] as item (item.name)}
						{#if item.sub}
							<div class="withsub">
								<div class="flex justify-between w-full p-2 px-6">
									<div class="flex gap-1.5">
										<img src={item.name.toLowerCase() + '.svg'} class="w-5" alt="" />
										<p class="font-medium">{item.name}</p>
									</div>
									<p class="font-medium">{item.total}</p>
								</div>
								{#each item.sub as sub (sub.name)}
									<div
										class="flex hover:underline cursor-pointer justify-between w-full p-0 px-6 text-secondary opacity-75"
										onclick={async () => {
											await fDoa('', sub.type);
											search = '';
											selectedDoaGroup = value.toUpperCase();
											selectedDoaIcon = item.name.toLowerCase();
											selectedDoaTitle = sub.name;
											mbukakDoa = true;
										}}
									>
										<div class="flex gap-1.5 items-center">
											<div class="pl-2 pr-2 flex justify-center">
												<div class="w-0.5 h-7 border-l border-dashed border-secondary" />
											</div>
											<p class="">{sub.name}</p>
										</div>
										<p class="">{sub.total}</p>
									</div>
								{/each}
							</div>
						{:else}
							<div
								class="nonsub flex justify-between w-full p-2 px-6 hover:underline cursor-pointer"
								onclick={async () => {
									await fDoa('', item.type);
									search = '';
									selectedDoaGroup = value.toUpperCase();
									selectedDoaIcon = item.name.toLowerCase();
									selectedDoaTitle = item.name;
									mbukakDoa = true;
								}}
							>
								<div class="flex gap-1.5">
									<img src={item.name.toLowerCase() + '.svg'} class="w-5" alt="" />
									<p class="font-medium">{item.name}</p>
								</div>
								<p class="font-medium">{item.total}</p>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<!-- @b doa -->
<Drawer.Root bind:open={mbukakDoa}>
	<Drawer.Content class="bg-[#FAF8F4] min-h-[95dvh] flex items-center">
		<div class="w-11/12 pt-12 gap-2 flex flex-col">
			<div class="w-full flex justify-between">
				<div class="flex gap-2">
					<div class={selectedDoaGroup ? 'flex' : 'hidden'}>
						<div class="plane-img flex flex-row bg-[#F3EBE0] p-2 px-3 gap-2 group">
							<img src={selectedDoaGroup === 'aircraft' ? 'plane.svg?v=2' : 'helic.svg?v=3'} class="w-4 {selectedDoaGroup === 'aircraft' ? 'w-4' : 'w-5'}" alt="" />
							<p class="font-medium">{selectedDoaGroup.toUpperCase().replace('-', ' ')}</p>
						</div>
					</div>

					<div>
						<div class="flex flex-row bg-[#F3EBE0] p-2 px-3 gap-2 group">
							<img src={selectedDoaIcon + '.svg'} class="w-4" alt="" />
							<p class="font-medium">{selectedDoaTitle}</p>
						</div>
					</div>
				</div>

				<div class="flex gap-2">
					<div>
						<div class="flex flex-row bg-[#F3EBE0] items-center group">
							<div class="bg-secondary p-2 px-3">
								<p class="text-white!">{data.doa_selected ? data.doa_selected.length : 0}</p>
							</div>
							<p class="font-medium px-3">Total Dokumen</p>
						</div>
					</div>
					<div>
						<div class="relative w-full items-center group h-full">
							<img src="search.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
							<Input type="text" placeholder="Cari..." class="w-full rounded-none bg-primary border-transparent! placeholder:text-secondary/35 h-full pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} bind:value={search} />
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
			<div class="[&_[data-slot=table-container]]:max-h-[80vh] [&_[data-slot=table-container]]:overflow-y-auto">
				<Table.Root>
					<Table.Header class="shadow-none">
						<Table.Row class="bg-[#F3EBE0] sticky top-0 z-20">
							<Table.Head class="py-4 pl-4">Nomor</Table.Head>
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
						{#if data.doa_selected}
							{#each data.doa_selected.filter((doa) => !search || (doa.number && doa.number.toLowerCase().includes(search.toLowerCase())) || (doa.nik && doa.nik.toLowerCase().includes(search.toLowerCase())) || (doa.nama && doa.nama.toLowerCase().includes(search.toLowerCase())) || (doa.revision && doa.revision.toLowerCase().includes(search.toLowerCase())) || (doa.date && doa.date.toLowerCase().includes(search.toLowerCase())) || (doa.date2 && doa.date2.toLowerCase().includes(search.toLowerCase())) || (doa.title && doa.title.toLowerCase().includes(search.toLowerCase()))) as doa (doa.no)}
								<Table.Row class="group relative border-0">
									<Table.Cell class="font-medium py-3 pl-4 w-1">{doa.number || '-'}</Table.Cell>
									<Table.Cell class="w-1">{doa.nik || '-'}</Table.Cell>
									<Table.Cell>{doa.nama || '-'}</Table.Cell>
									<Table.Cell class="w-1">{doa.revision || '-'}</Table.Cell>
									<Table.Cell class="w-1">{doa.date && !doa.date.includes('0000') ? doa.date : '-'}</Table.Cell>
									<Table.Cell class="w-1">{doa.date2 && !doa.date2.includes('0000') ? doa.date2 : '-'}</Table.Cell>
									<Table.Cell>{doa.title ? (doa.title.length > 100 ? doa.title.substring(0, 90) + '...' : doa.title) : '-'}</Table.Cell>
									<div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-all">
										<img src="edit.svg" class="w-3" alt="" />
										<img src="download.svg" class="w-4" alt="" />
									</div>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</div>
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
								<p class="text-white!">{data.users ? data.users.length : 0}</p>
							</div>
							<p class="font-medium px-3">Total User</p>
						</div>
					</div>
					<div>
						<!-- <div class="relative flex flex-row bg-[#F3EBE0] p-3 group">
							<img src="search.svg" class="w-4 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
							<div class="bg-secondary w-2 h-2 absolute -right-0.5 -top-0.5"></div>
						</div> -->
						<div class="relative w-full items-center group h-full">
							<img src="search.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2 group-hover:rotate-[90deg] transition-all duration-500" alt="" />
							<Input type="text" placeholder="Cari..." class="w-full rounded-none bg-primary border-transparent! placeholder:text-secondary/35 h-full pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} bind:value={search} />
						</div>
					</div>
				</div>
			</div>
			<div class="[&_[data-slot=table-container]]:max-h-[80vh] [&_[data-slot=table-container]]:overflow-y-auto">
				<Table.Root>
					<Table.Header class="shadow-none">
						<Table.Row class="bg-[#F3EBE0] sticky top-0 z-20">
							<Table.Head class="py-4 pl-4">Status</Table.Head>
							<Table.Head class="text-center">NIK</Table.Head>
							<Table.Head>Nama</Table.Head>
							<!-- <Table.Head>Organisasi</Table.Head> -->
							<Table.Head>User Level</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if data.users}
							{#each data.users.filter((user) => !search || user.username.toLowerCase().includes(search.toLowerCase()) || user.activated.toLowerCase().includes(search.toLowerCase()) || user.userlevel_name.toLowerCase().includes(search.toLowerCase()) || user.configPenghasil.toLowerCase().includes(search.toLowerCase())) as user (user.kuid)}
								<!-- {"username":"160238","kuid":"c054e296693e2c4eb00c371ad632fdc4","password":"6d2f4baaaee3f763980805bad0363546","userlevel":1,"provinsi":"","configPenghasil":"Dimas Septa","activated":"Y"}, -->
								<Table.Row class="group relative border-0">
									<Table.Cell class="font-medium pl-4 w-1! justify-center items-center">
										{#if user.userlevel == '0'}
											<div class="bg-orange-500/10 py-0.5 flex items-center gap-1 px-1.5 text-center flex w-min">
												<div class="bg-orange-600! rounded-full w-1 h-1"></div>
												<span class="text-[10px] text-orange-600!">Aktivasi</span>
											</div>
										{:else if user.activated === 'Aktif'}
											<div class="bg-green-500/10 py-0.5 flex items-center gap-1 px-1.5 text-center flex w-min">
												<div class="bg-green-600! rounded-full w-1 h-1"></div>
												<span class="text-[10px] text-green-600!">Aktif</span>
											</div>
										{:else}
											<div class="bg-gray-500/10 py-0.5 flex items-center gap-1 px-1.5 text-center flex w-min">
												<div class="bg-gray-600! rounded-full w-1 h-1"></div>
												<span class="text-[10px] text-gray-600!">Nonaktif</span>
											</div>
										{/if}
									</Table.Cell>
									<Table.Cell class="text-center w-1/8">{user.username.length > 20 ? user.username.substring(0, 20) + '...' : user.username}</Table.Cell>
									<Table.Cell class="">{user.configPenghasil.length > 20 ? user.configPenghasil.substring(0, 20) + '...' : user.configPenghasil}</Table.Cell>
									<!-- <Table.Cell class="w-1/6"
									>{#if user.d}
										{user.d.length > 20 ? user.d.substring(0, 20) + '...' : user.d}
									{:else}
										-
									{/if}</Table.Cell
								> -->
									<Table.Cell class="w-1/6">{user.userlevel_name}</Table.Cell>
									<div
										class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-all"
										onclick={() => {
											selectedUser = user;
											selectedUserLevel = user.userlevel.toString();
											// selectedUserLevel = '0';
											search = '';
											mbukakEditUser = true;
										}}
									>
										{#if user.userlevel}
											<!-- <img src="copy.svg" class="w-3" alt="" /> -->
											<img src="edit.svg" class="w-3" alt="" />
										{:else}
											<p class="text-xs font-medium bg-primary px-2 py-1 rounded-none">Aktivasi</p>
										{/if}
									</div>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>

<!-- @b tambah doa -->
<Drawer.Root bind:open={mbukakEditUser} direction="right">
	<Drawer.Content class="bg-[#FAF8F4] !min-h-0 z-[100]!">
		<ScrollArea scrollbarYClasses="hidden" class="el relative flex items-center px-4 gap-2 h-full !min-h-0 flex-col" orientation="vertical" type="scroll">
			<div class="w-full flex justify-between pt-4">
				<div>
					<div class="flex flex-row bg-[#F3EBE0] p-2 px-3 gap-2 group">
						<img src="user.svg?f" class="w-4" alt="" />
						<p class="font-medium">Edit User</p>
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
					<p class="font-medium">NIK</p>
					<div class="relative w-full items-center">
						<img src="cert.svg" class=" absolute top-1/2 left-3 h-5! w-5! -translate-y-1/2" alt="" />
						<Input type="text" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} value={selectedUser.username} disabled />
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Nama</p>
					<div class="relative w-full items-center">
						<img src="clip.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Input type="text" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" value={selectedUser.configPenghasil} autofocus={false} disabled />
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">User Level</p>
					<!-- <div class="relative w-full items-center">
						<img src="type.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Input type="text" placeholder="Pilih Tipe" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
					</div> -->
					<Select.Root type="single" name="favoriteFruit" bind:value={selectedUserLevel}>
						<Select.Trigger placeholder="Pilih Tipe" class="flex relative pl-11! flex-row bg-primary/50 py-7 px-3 w-full gap-3 group shadow-none overflow-hidden border-0 rounded-none">
							<img src="type.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
							<p class="text-base {selectedUserLevel === '0' ? 'text-secondary/35!' : 'text-secondary!'}">{userlevels.find((t) => t.value === selectedUserLevel)?.label || 'Pilih Tipe'}</p>
							<!-- <img src="down.svg" class="w-2 pt-1" alt="" /> -->
						</Select.Trigger>
						<Select.Content class="mb-2 rounded-none shadow-none border-0 bg-[#f4efe7] border-1 border-[#e1d5c5] p-0 z-[100]">
							<Select.Group>
								<!-- <Select.Label>Fruits</Select.Label> -->
								{#each userlevels as userlevels (userlevels.value)}
									<Select.Item class="rounded-none shadow-none px-3 py-3 border-0 hover:bg-transparent! bg-transparent active:bg-transparent!" value={userlevels.value} label={userlevels.label}>
										<img src="type.svg" class="w-3 ml-2 mr-2 group-hover:rotate-[-45deg] transition-all duration-500" alt="" />
										<p class="text-base">{userlevels.label}</p>
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-medium">Password</p>
					<div class="relative w-full items-center">
						<img src="beat.svg" class=" absolute top-1/2 left-3 h-4! w-4! -translate-y-1/2" alt="" />
						<Input type="password" placeholder="Masukkan Password Baru" class="w-full rounded-none bg-primary/50 border-transparent! placeholder:text-secondary/35 py-7! pl-11! text-base! focus:!border-transparent shadow-none! focus:!ring-transparent focus:!ring-offset-0" autofocus={false} />
					</div>
				</div>

				<div class="flex w-full flex-col justify-center gap-1 text-left">
					<p class="font-medium">Status Akun</p>
					<RadioGroup.Root value={selectedUser.activated}>
						<Label class="flex items-start gap-3 rounded-none border p-3 border-black/10 has-[[aria-checked=true]]:border-secondary has-[[aria-checked=true]]:bg-primary/50">
							<RadioGroup.Item value="Aktif" id="toggle-2" class="data-[state=checked]:bg-secondary data-[state=checked]:text-white shadow-none! border-none! bg-black/10 rounded-full" />
							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">Aktif</p>
								<p class="text-secondary/75! text-sm">Status akun menjadi aktif memungkinkan pengguna untuk login dan menggunakan semua fitur aplikasi DOA.</p>
							</div>
						</Label>

						<Label class="flex items-start gap-3 rounded-none border p-3 border-black/10 has-aria-checked:border-secondary has-aria-checked:bg-primary/50">
							<RadioGroup.Item value="Nonaktif" id="toggle-2" class="data-[state=checked]:bg-secondary data-[state=checked]:text-white shadow-none! border-none! bg-black/10 rounded-full" />
							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">Nonaktif</p>
								<p class="text-secondary/75! text-sm">Status akun menjadi nonaktif pengguna tidak dapat login dan tidak dapat menggunakan fitur aplikasi DOA.</p>
							</div>
						</Label>
					</RadioGroup.Root>
				</div>
			</div>
		</ScrollArea>
		<div class="flex">
			<div class="flex w-1/3 justify-center items-center py-4 text-center bg-red-900 p-2 px-3 gap-2 group">
				<p class="font-medium !text-white">Hapus</p>
			</div>
			<div class="flex w-2/3 justify-center items-center py-4 text-center bg-secondary p-2 px-3 gap-2 group">
				<p class="font-medium !text-white">Ubah</p>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
