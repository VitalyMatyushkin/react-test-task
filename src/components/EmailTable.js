import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import '../styles/EmailTable.scss';

export class EmailTable extends Component {
	render() {
		const { title='', items, droppableId, isDragItem, className } = this.props;
		return (
			<Droppable droppableId={droppableId}>
				{(provided, snapshot) => (
					<div className={className}>
						<h2>{ title }</h2>
						<table
							ref			= {provided.innerRef}
							className	= { `table_blur ${snapshot.isDraggingOver ? 'dragging-table' : ''}` }
						>
							<thead>
								<tr>
									<th>Summary</th>
									<th>From email</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
							{items.map((item, index) => (
								isDragItem ?
									<Draggable
										key			= {item.id}
										draggableId	= {item.id}
										index		= {index}>
										{(provided, snapshot) => (
											<tr
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={snapshot.isDragging ? 'dragging-row' : ''}

											>
												<td>{ item.summary}</td><td>{ item.from}</td><td>{ item.date}</td>
											</tr>
										)}
									</Draggable>
									:
									<tr key={item.id}>
										<td>{ item.summary}</td><td>{ item.from}</td><td>{ item.date}</td>
									</tr>
							))}
							{provided.placeholder}
							</tbody>
						</table>
					</div>
				)}
			</Droppable>
		);
	}
}

EmailTable.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array.isRequired,
	droppableId: PropTypes.string.isRequired,
	isDragItem: PropTypes.bool,
	className: PropTypes.string
};
