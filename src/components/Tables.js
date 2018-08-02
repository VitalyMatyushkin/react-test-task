import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { EmailTable } from './EmailTable';
import emails from '../../data/emails';
import { STATUS } from "./const";

import '../styles/Tables.scss';

export class Tables extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSync: false,
			unsortedEmails: [],
			supportEmails: [],
			marketingEmails: [],
			seoEmails: []
		};
	}

	componentDidMount() {
		//here we get the data from the server, eg fetch(`url`).then ...
		new Promise((resolve) => {
			setTimeout(() => resolve(emails), 3000);
		})
		.then(result => {
			this.sortingInputEmails(result);
			this.setState({isSync: true});
		});
	}

	sortingInputEmails = (emails) => {
		emails.forEach(email => {
			switch(email.status) {
				case STATUS.UNSORTED:
					const {unsortedEmails} = this.state;
					unsortedEmails.push(email);
					this.setState({unsortedEmails});
					break;
				case STATUS.SUPPORT:
					const {supportEmails} = this.state;
					supportEmails.push(email);
					this.setState({supportEmails});
					break;
				case STATUS.MARKETING:
					const {marketingEmails} = this.state;
					marketingEmails.push(email);
					this.setState({marketingEmails});
					break;
				case STATUS.SEO:
					const {seoEmails} = this.state;
					seoEmails.push(email);
					this.setState({seoEmails});
					break;
			}
		})
	};


	onDragEnd = (result) => {
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			let destinationTableItems;

			switch (destination.droppableId) {
				case STATUS.SUPPORT:
					destinationTableItems = this.state.supportEmails;
					break;
				case STATUS.MARKETING:
					destinationTableItems = this.state.marketingEmails;
					break;
				case STATUS.SEO:
					destinationTableItems = this.state.seoEmails;
					break;
			}

			const moveResult = this.move(
				this.state.unsortedEmails,
				destinationTableItems,
				source,
				destination
			);

			switch (destination.droppableId) {
				case 'support':
					this.setState({
						unsortedEmails: moveResult.unsorted,
						supportEmails: moveResult.support
					});
					break;
				case 'marketing':
					this.setState({
						unsortedEmails: moveResult.unsorted,
						marketingEmails: moveResult.marketing
					});
					break;
				case 'seo':
					this.setState({
						unsortedEmails: moveResult.unsorted,
						seoEmails: moveResult.seo
					});
					break;
			}
		}
	};

	move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = Array.from(source);
		const destClone = Array.from(destination);
		const [removed] = sourceClone.splice(droppableSource.index, 1);

		destClone.splice(destClone.length-1, 0, removed);

		const result = {};
		result[droppableSource.droppableId] = sourceClone;
		result[droppableDestination.droppableId] = destClone;

		return result;
	};

	render() {
		const {isSync} = this.state;
		return (
			<div className="container">
				{isSync ?
					<DragDropContext onDragEnd={this.onDragEnd}>
						<EmailTable
							droppableId="unsorted"
							items={this.state.unsortedEmails}
							isDragItem={true}
							className="unsorted-table"
						/>
						<div className="sorted-tables">
							<EmailTable
								title="Technical support"
								droppableId="support"
								items={this.state.supportEmails}
								isDragItem={false}
							/>
							<EmailTable
								title="Marketing"
								droppableId="marketing"
								items={this.state.marketingEmails}
								isDragItem={false}
							/>
							<EmailTable
								title="SEO"
								droppableId="seo"
								items={this.state.seoEmails}
								isDragItem={false}
							/>
						</div>
					</DragDropContext>
					:
					<div className="loading">
						Loading...
					</div>
				}
			</div>
		);
	}
}
