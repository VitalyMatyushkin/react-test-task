import {
	DRAG_EMAIL,
	EMAILS_LOAD_REQUEST,
	EMAILS_LOAD_SUCCESS
} from '../actions/tableActions';
import { STATUS } from '../components/const';
import { sortingInputEmails } from "../helper/helperTable";

const initialState = {
	unsorted: [],
	support: [],
	marketing: [],
	seo: [],
	isLoading: false
};

export function tableReducer(state = initialState, action) {
	switch (action.type) {
		case EMAILS_LOAD_REQUEST:
			return {
				...state,
				isLoading: true
			};

		case EMAILS_LOAD_SUCCESS:
			const emails = sortingInputEmails(action.payload);

			return {
				...state,
				unsorted: emails.unsorted,
				support: emails.support,
				marketing: emails.marketing,
				seo: emails.seo,
				isLoading: false
			};

		case DRAG_EMAIL:
			const unsortedCopy = [...state.unsorted];
			const [removed] = unsortedCopy.splice(action.payload.source.index, 1);
			return {
				...state,
				unsorted: unsortedCopy,
				support: action.payload.destination.droppableId === STATUS.SUPPORT ? [...state.support, removed] : [...state.support],
				marketing: action.payload.destination.droppableId === STATUS.MARKETING ? [...state.marketing, removed] : [...state.marketing],
				seo: action.payload.destination.droppableId === STATUS.SEO ? [...state.seo, removed] : [...state.seo]

			};
		default:
			return state
	}
}