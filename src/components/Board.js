import React from 'react';
import Column from './Column';
import '../styles/Board.css';

const Board = ({ tickets, users, grouping }) => {
  const allStatuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
  const allPriorities = ['Urgent', 'High', 'Medium', 'Low', 'No priority'];

  const groupTickets = () => {
    if (grouping === 'status') {
      const groupedTickets = {...tickets};  // Create a copy of the existing grouped tickets
      allStatuses.forEach(status => {
        if (!groupedTickets[status]) {
          groupedTickets[status] = [];  // Add empty arrays for missing statuses
        }
      });
      return groupedTickets;
    } else if (grouping === 'priority') {
      const groupedTickets = {};
      allPriorities.forEach((priority, index) => {
        const priorityValue = 4 - index; // Map priority names to their numeric values
        groupedTickets[priorityValue] = tickets[priorityValue] || [];
      });
      return groupedTickets;
    } else {
      // For user grouping, use the tickets as they are
      return tickets;
    }
  };

  const groupedTickets = groupTickets();
  const columns = Object.entries(groupedTickets);

  // For priority grouping, we want to display columns from highest to lowest priority
  const orderedColumns = grouping === 'priority' 
    ? columns.sort((a, b) => Number(b[0]) - Number(a[0])) 
    : columns;

  return (
    <div className="board">
      {orderedColumns.map(([key, columnTickets]) => (
        <Column
          key={key}
          title={key}
          tickets={columnTickets}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
};

export default Board;