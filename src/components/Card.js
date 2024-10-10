import React, { useMemo } from 'react';
import '../styles/Card.css';

const Card = ({ ticket, user, grouping }) => {
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 4: return '/assets/SVG - Urgent Priority colour.svg';
            case 3: return '/assets/Img - High Priority.svg';
            case 2: return '/assets/Img - Medium Priority.svg';
            case 1: return '/assets/Img - Low Priority.svg';
            default: return '/assets/No-priority.svg';
        }
    };

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

    const avatarColor = useMemo(() => getRandomColor(), [user.id]);
    const showStatusIcon = grouping === 'user' || grouping === 'priority';

    return (
        <div className="card">
            <div className="card-header">
                <span className="ticket-id">{ticket.id}</span>
                {grouping !== 'user' && (
                    <div className="user-avatar-container">
                        <div className="user-avatar" style={{ backgroundColor: avatarColor }}>
                            <span className="user-initials">{getUserInitials(user.name)}</span>
                        </div>
                        <div className={`availability-indicator ${user.available ? 'available' : 'unavailable'}`}></div>
                    </div>
                )}
            </div>
            <div className="card-title-container">
                {showStatusIcon && (
                    <img 
                        src={getStatusIcon(ticket.status)} 
                        alt={ticket.status} 
                        className="status-icon"
                    />
                )}
                <h3 className="card-title">{ticket.title}</h3>
            </div>
            <div className="card-footer">
                {grouping !== 'priority' && (
                    <img src={getPriorityIcon(ticket.priority)} alt="Priority" className="priority-icon" />
                )}
                <div className="tag-container">
                    <span className="tag-dot"></span>
                    <span className="tag">{ticket.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;