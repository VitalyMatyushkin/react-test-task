import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { EmailTable } from './EmailTable';
import { dragEmail, loadEmails } from "../actions/tableActions";

import '../styles/Tables.scss';

class Tables extends Component {

	componentDidMount() {
		this.props.loadEmails();
	}


	onDragEnd = (result) => {
		const { source, destination } = result;


		if (source.droppableId !== destination.droppableId) {
			this.props.dragEmail({source, destination});
		}

	};

	render() {
		const {isLoading, unsortedEmails, supportEmails, marketingEmails, seoEmails} = this.props;
		console.log(isLoading);
		return (
			<div className="container">
				{!isLoading ?
					<DragDropContext onDragEnd={this.onDragEnd}>
						<EmailTable
							droppableId="unsorted"
							items={unsortedEmails}
							isDragItem={true}
							className="unsorted-table"
						/>
						<div className="sorted-tables">
							<EmailTable
								title="Technical support"
								droppableId="support"
								items={supportEmails}
								isDragItem={false}
							/>
							<EmailTable
								title="Marketing"
								droppableId="marketing"
								items={marketingEmails}
								isDragItem={false}
							/>
							<EmailTable
								title="SEO"
								droppableId="seo"
								items={seoEmails}
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

const mapStateToProps = store => {
	return {
		unsortedEmails: store.table.unsorted,
		supportEmails: store.table.support,
		marketingEmails: store.table.marketing,
		seoEmails: store.table.seo,
		isLoading: store.table.isLoading
	}
};

const mapDispatchToProps = dispatch => ({
	loadEmails: () => dispatch(loadEmails()),
	dragEmail: (params) => dispatch(dragEmail(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tables);