import React, { useMemo } from 'react';
import Card from './Card';
import '../styles/Column.css';

const Column = ({ title, tickets, users, grouping }) => {
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'backlog': return '/assets/Backlog.svg';
            case 'todo': return '/assets/To-do.svg';
            case 'in progress': return '/assets/in-progress.svg';
            case 'done': return '/assets/Done.svg';
            case 'canceled': return '/assets/Cancelled.svg';
            default: return null;
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 4: return '/assets/SVG - Urgent Priority colour.svg';
            case 3: return '/assets/Img - High Priority.svg';
            case 2: return '/assets/Img - Medium Priority.svg';
            case 1: return '/assets/Img - Low Priority.svg';
            default: return '/assets/No-priority.svg';
        }
    };


    const getPriorityLabel = (priority) => {
        switch (priority) {
            case 4: return 'Urgent';
            case 3: return 'High';
            case 2: return 'Medium';
            case 1: return 'Low';
            default: return 'No priority';
        }
    };

    const renderIcon = () => {
        if (grouping === 'status') return <img src={getStatusIcon(title)} alt={title} className="status-icon" />;
        if (grouping === 'priority') return <img src={getPriorityIcon(Number(title))} alt={title} className="priority-icon" />;
        return null;
    };

    const getUserInitials = (name) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    };
    
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 80%)`;
    };

    // const avatarColor = useMemo(() => getRandomColor(), [user.id]);
    
    const renderTitle = () => {
        if (grouping === 'user') {
            const user = users.find(u => u.id === title);
            return (
                <>
                    <div className="user-avatar-container">
                        <div className="user-avatar" style={{ backgroundColor: getRandomColor() }}>
                            <span className="user-initials">{getUserInitials(user.name)}</span>
                        </div>
                        <div className={`availability-indicator ${user.available ? 'available' : 'unavailable'}`}></div>
                    </div>
                    <span className="column-title">{user?.name}</span>
                </>
            );
        } else {
            return (
                <>
                    {renderIcon()}
                    <span className="column-title">
                        {grouping === 'priority' ? getPriorityLabel(Number(title)) : title}
                    </span>
                </>
            );
        }
    };

    return (
        <div className={`column ${tickets.length === 0 ? 'column-empty' : ''}`}>
            <div className="column-header">
                <div className="header-left">
                    {renderTitle()}
                    <span className="ticket-count">{tickets.length}</span>
                </div>
                {tickets.length > 0 && (
                    <div className="column-actions">
                        <img src="/assets/add.svg" alt="Add" className="action-icon" />
                        <img src="/assets/3 dot menu.svg" alt="More options" className="action-icon" />
                    </div>
                )}
            </div>
            {tickets.length > 0 && (
                <div className="column-body">
                    {tickets.map((ticket) => (
                        <Card key={ticket.id} ticket={ticket} user={users.find(u => u.id === ticket.userId)} grouping={grouping} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Column;