import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { standard } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	// Search functionality (data.s)
	if (data.s) {
		const searchPattern = `%${data.s}%`;
		const results = await db
			.select()
			.from(standard)
			.where(
				sql`${standard.remark} != 'D' AND (${standard.no} LIKE ${searchPattern} OR 
					${standard.number} LIKE ${searchPattern} OR 
					${standard.date} LIKE ${searchPattern} OR 
					${standard.date2} LIKE ${searchPattern} OR 
					${standard.title} LIKE ${searchPattern} OR 
					${standard.revision} LIKE ${searchPattern} OR 
					${standard.panel} LIKE ${searchPattern} OR 
					${standard.nik} LIKE ${searchPattern} OR 
					${standard.nama} LIKE ${searchPattern})`
			);
		return json(results);
	}

	// Filter by type functionality (data.t)
	if (data.t) {
		const results = await db
			.select()
			.from(standard)
			.where(sql`${standard.type} = ${data.t} AND ${standard.remark} != 'D'`);
		return json(results);
	}

	// Default functionality (stats)
	const counts = await db
		.select({
			type: standard.type,
			count: sql<number>`count(*)`
		})
		.from(standard)
		.where(sql`${standard.remark} != 'D'`)
		.groupBy(standard.type);

	// Convert to a map for easy lookup
	const countMap: Record<string, number> = {};
	counts.forEach((item) => {
		if (item.type) {
			countMap[item.type] = Number(item.count);
		}
	});

	const getCount = (type: string) => countMap[type] || 0;

	// Helper to format number (similar to PHP number_format 0 decimals, which is default for integers)
	const fmt = (n: number) => n.toString();

	const result = {
		aircraft: [
			{
				name: 'CERTIFICATE',
				type: 'cer',
				total: fmt(getCount('cer'))
			},
			{
				name: 'COMMAND MEDIA',
				type: 'cmd',
				total: fmt(getCount('cmd'))
			},
			{
				name: 'MANUAL',
				type: 'man',
				total: fmt(getCount('man'))
			},
			{
				name: 'PROCEDURE',
				type: 'pro',
				total: fmt(getCount('pro'))
			},
			{
				name: 'WORK INSTRUCTION',
				type: 'wi',
				total: fmt(getCount('wi'))
			},
			{
				name: 'DOCUMENT',
				type: 'doc',
				total: fmt(getCount('doc'))
			},
			{
				name: 'PERSONNEL ASSIGNMENT',
				total: fmt(getCount('CVE') + getCount('AWO') + getCount('ass')),
				sub: [
					{
						name: 'PERSONNEL ASSIGNMENT - CVE',
						type: 'CVE',
						total: fmt(getCount('CVE'))
					},
					{
						name: 'PERSONNEL ASSIGNMENT - AWO',
						type: 'AWO',
						total: fmt(getCount('AWO'))
					},
					{
						name: 'Assignment Project CVE and AWO',
						type: 'ass',
						total: fmt(getCount('ass'))
					}
				]
			},
			{
				name: 'ENGINEERING STANDARD',
				total: fmt(getCount('41A') + getCount('41B') + getCount('41C-1') + getCount('41C-2') + getCount('41C-3') + getCount('41D') + getCount('41E') + getCount('41F') + getCount('41G') + getCount('41H') + getCount('41I') + getCount('mtm')),
				sub: [
					{
						name: 'PART 41A Design Standard Manual (NDM)',
						type: '41A',
						total: fmt(getCount('41A'))
					},
					{
						name: 'PART 41B Drafting Standard Manual (NDS)',
						type: '41B',
						total: fmt(getCount('41B'))
					},
					{
						name: 'PART 41C NPS-Mark & Label',
						type: '41C-1',
						total: fmt(getCount('41C-1'))
					},
					{
						name: 'PART 41C NPS-Part',
						type: '41C-2',
						total: fmt(getCount('41C-2'))
					},
					{
						name: 'PART 41C NPS-Profile',
						type: '41C-3',
						total: fmt(getCount('41C-3'))
					},
					{
						name: 'PART 41D Process Specification Manual (PS20)',
						type: '41D',
						total: fmt(getCount('41D'))
					},
					{
						name: 'PART 41E Material Standard Manual (IMS)',
						type: '41E',
						total: fmt(getCount('41E'))
					},
					{
						name: 'PART 41F Design Checklist Standard Manual (DCL)',
						type: '41F',
						total: fmt(getCount('41F'))
					},
					{
						name: 'PART 41G Computation/Software Standard Manual (NCS)',
						type: '41G',
						total: fmt(getCount('41G'))
					},
					{
						name: 'PART 41H Material Specification Standard Manual (NMS)',
						type: '41H',
						total: fmt(getCount('41H'))
					},
					{
						name: 'PART 41I Support Specification Standard Manual (NSS)',
						type: '41I',
						total: fmt(getCount('41I'))
					},
					{
						name: 'Material Test Method (MTM)',
						type: 'mtm',
						total: fmt(getCount('mtm'))
					}
				]
			},
			{
				name: 'WORKING ARRANGEMENT',
				type: 'wa',
				total: fmt(getCount('wa'))
			},
			{
				name: 'QUALITY PLAN',
				type: 'qp1',
				total: fmt(getCount('qp1'))
			},
			{
				name: 'LIBRARY',
				type: 'lib',
				total: fmt(getCount('lib'))
			},
			{
				name: 'FORM',
				type: 'standard', // Based on PHP link type=standard
				total: fmt(getCount('standard'))
			}
		],
		non_aircraft: [
			{
				name: 'CERTIFICATE',
				type: 'cer2',
				total: fmt(getCount('cer2'))
			},
			{
				name: 'MANUAL',
				type: 'man2',
				total: fmt(getCount('man2'))
			},
			{
				name: 'PROCEDURE',
				type: 'pro2',
				total: fmt(getCount('pro2'))
			},
			{
				name: 'WORK INSTRUCTION',
				type: 'wi2',
				total: fmt(getCount('wi2'))
			},
			{
				name: 'DOCUMENT',
				type: 'doc2',
				total: fmt(getCount('doc2'))
			},
			{
				name: 'CERTIFICATION PROCEDURE',
				type: 'cp',
				total: fmt(getCount('cp'))
			},
			{
				name: 'TEST METHOD',
				type: 'tm',
				total: fmt(getCount('tm'))
			},
			{
				name: 'WORKING ARRANGEMENT & QUALITY PLAN',
				type: 'qp2', // Combined in label, but type=qp2
				total: fmt(getCount('qp2'))
			},
			{
				name: 'ENGINEERING STANDARD',
				total: fmt(getCount('41N')),
				sub: [
					{
						name: 'PART 41N Standard Non Aircraft',
						type: '41N',
						total: fmt(getCount('41N'))
					}
				]
			},
			{
				name: 'FORM',
				type: 'form2',
				total: fmt(getCount('form2'))
			}
		]
	};

	return json(result);
};
