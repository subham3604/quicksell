import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import { groupTickets, sortTickets } from './utils/dataUtils';
import { fetchData } from './utils/api';
import './styles/App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      const usersWithAvatars = data.users.map(user => ({
        ...user,
        avatar: user.avatar || '/assets/image.png'
      }));

      setTickets(data.tickets);
      setUsers(usersWithAvatars);
    };
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
  };

  const groupedAndSortedTickets = sortTickets(groupTickets(tickets, grouping), sorting);

  return (
    <div className="app">
      <Header
        grouping={grouping}
        sorting={sorting}
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
      />
      <Board tickets={groupedAndSortedTickets} users={users} grouping={grouping} />
    </div>
  );
};

export default App;