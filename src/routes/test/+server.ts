import type { RequestHandler } from './$types';
import nodemailer from 'nodemailer';


export const GET: RequestHandler = async () => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: "jaminankelaikan@gmail.com",
			pass: "ejgz qqhd bhhc ouum"
		}
	});

	await transporter.sendMail({
		from: "jaminankelaikan@gmail.com",
		to: ['hi@rasyiid.com', 'minthi@ioneric.id'],
		subject: 'Nyobo Email',
		text: 'Nyobo email tok',
		html: '<b>HTML NYOBO</b>'
	});

	return new Response();
};
