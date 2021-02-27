import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import { User } from '../models/User';
import { Survey } from '../models/Survey';

class SendMailService {

	private client: Transporter;

	constructor() {
		nodemailer.createTestAccount().then(acconut => {
			const transporter = nodemailer.createTransport({
				host: acconut.smtp.host,
				port: acconut.smtp.port,
				secure: acconut.smtp.secure,
				auth: {
					user: acconut.user,
					pass: acconut.pass,
				},
			});

			this.client = transporter;
		});
	}

	async sendMail(to: string, subject: string, variables: object, path: string) {
		const templateFileContent = fs.readFileSync(path).toString('utf8');

		const mailTemplateParse = handlebars.compile(templateFileContent);

		const html = mailTemplateParse(variables);

		const message = await this.client.sendMail({
			to,
			subject,
			html,
			from: 'NPS <noreply@nps.com.br>'
		});

		console.log(`Message sent: ${message.messageId}`);
		console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
	}
}

export default new SendMailService();
