import {STATUS} from "../components/const";

export const sortingInputEmails = (emails) => {
	const tables = {
		unsorted: [],
		support: [],
		marketing: [],
		seo: []
	};
	emails.forEach(email => {
		switch(email.status) {
			case STATUS.UNSORTED:
				tables.unsorted.push(email);
				break;
			case STATUS.SUPPORT:
				tables.support.push(email);
				break;
			case STATUS.MARKETING:
				tables.marketing.push(email);
				break;
			case STATUS.SEO:
				tables.seo.push(email);
				break;
		}
	});
	return tables;
};