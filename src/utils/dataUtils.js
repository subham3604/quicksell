
  
  export const groupTickets = (tickets, grouping) => {
    switch (grouping) {
      case 'status':
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
          return acc;
        }, {});
      case 'user':
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.userId] = acc[ticket.userId] || []).push(ticket);
          return acc;
        }, {});
      case 'priority':
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.priority] = acc[ticket.priority] || []).push(ticket);
          return acc;
        }, {});
      default:
        return { 'All Tickets': tickets };
    }
  };
  
  export const sortTickets = (groupedTickets, sorting) => {
    const sortFunction = sorting === 'priority'
      ? (a, b) => b.priority - a.priority
      : (a, b) => a.title.localeCompare(b.title);
  
    return Object.entries(groupedTickets).reduce((acc, [key, tickets]) => {
      acc[key] = tickets.sort(sortFunction);
      return acc;
    }, {});
  };