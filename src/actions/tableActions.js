import emails from '../../data/emails';

export const DRAG_EMAIL = 'DRAG_EMAIL';
export const EMAILS_LOAD_REQUEST = 'EMAILS_LOAD_REQUEST ';
export const EMAILS_LOAD_SUCCESS = 'EMAILS_LOAD_SUCCESS ';

export function dragEmail(params) {
	return {
		type: DRAG_EMAIL,
		payload: params
	}
}

export function loadEmails() {
	return (dispatch) => {
		dispatch({
			type: EMAILS_LOAD_REQUEST
		});

		new Promise((resolve) => {
			setTimeout(() => resolve(emails), 3000);
		})
			.then(result => {
				dispatch({
					type: EMAILS_LOAD_SUCCESS,
					payload: result
				})
			});
	}
}