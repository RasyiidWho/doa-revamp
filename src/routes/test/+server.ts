import type { RequestHandler } from './$types';
import nodemailer from 'nodemailer';


export const GET: RequestHandler = async () => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: "rasyiidwho@gmail.com",
			pass: "saep pmmu jhoh tiec"
		}
	});

	await transporter.sendMail({
		from: "rasyiidwho@gmail.com",
		to: 'hi@rasyiid.com',
		subject: 'Nyobo Email',
		text: 'Nyobo email tok',
		html: '<b>HTML NYOBO</b>'
	});

	return new Response();
};
