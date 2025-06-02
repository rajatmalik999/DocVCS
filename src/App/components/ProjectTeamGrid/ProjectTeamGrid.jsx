import React, { useState } from 'react';
import styles from './ProjectTeamGrid.module.css';

const teams = [
  {
    id: 1,
    title: 'Marketing Campaign',
    description: 'Q4 Digital Marketing Strategy and Implementation',
    icon: '🚀',
    backgroundColor: '#3B82F6',
    members: {
      total: 12,
      owners: 3,
      editors: 6,
      viewers: 3
    },
    userRole: 'Editor',
    avatars: [
      { id: 1, image: 'https://i.pravatar.cc/150?img=1', name: 'Sarah Wilson' },
      { id: 2, image: 'https://i.pravatar.cc/150?img=2', name: 'John Smith' },
      { id: 3, image: 'https://i.pravatar.cc/150?img=3', name: 'Emma Davis' }
    ]
  },
  {
    id: 2,
    title: 'Website Redesign',
    description: 'Company Website Revamp Project',
    icon: '</>', 
    backgroundColor: '#8B5CF6',
    members: {
      total: 8,
      owners: 2,
      editors: 4,
      viewers: 2
    },
    userRole: 'Owner',
    avatars: [
      { id: 4, image: 'https://i.pravatar.cc/150?img=4', name: 'Mike Chen' },
      { id: 5, image: 'https://i.pravatar.cc/150?img=5', name: 'Lisa Wong' },
      { id: 6, image: 'https://i.pravatar.cc/150?img=6', name: 'Tom Harris' }
    ]
  },
  {
    id: 3,
    title: 'Mobile App',
    description: 'Customer Mobile Application Development',
    icon: '📱',
    backgroundColor: '#F59E0B',
    members: {
      total: 15,
      owners: 2,
      editors: 8,
      viewers: 5
    },
    userRole: 'Viewer',
    avatars: [
      { id: 7, image: 'https://i.pravatar.cc/150?img=7', name: 'Alex Johnson' },
      { id: 8, image: 'https://i.pravatar.cc/150?img=8', name: 'Emily Brown' },
      { id: 9, image: 'https://i.pravatar.cc/150?img=9', name: 'David Lee' }
    ]
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Business Intelligence Platform Development',
    icon: '📊',
    backgroundColor: '#10B981',
    members: {
      total: 10,
      owners: 2,
      editors: 5,
      viewers: 3
    },
    userRole: 'Editor',
    avatars: [
      { id: 10, image: 'https://i.pravatar.cc/150?img=10', name: 'Rachel Green' },
      { id: 11, image: 'https://i.pravatar.cc/150?img=11', name: 'Chris Martin' },
      { id: 12, image: 'https://i.pravatar.cc/150?img=12', name: 'Sophie Turner' }
    ]
  },
  {
    id: 5,
    title: 'Social Media',
    description: 'Social Media Management and Strategy',
    icon: '📣',
    backgroundColor: '#EC4899',
    members: {
      total: 6,
      owners: 1,
      editors: 3,
      viewers: 2
    },
    userRole: 'Editor',
    avatars: [
      { id: 13, image: 'https://i.pravatar.cc/150?img=13', name: 'Kate Wilson' },
      { id: 14, image: 'https://i.pravatar.cc/150?img=14', name: 'James Miller' },
      { id: 15, image: 'https://i.pravatar.cc/150?img=15', name: 'Anna Lee' }
    ]
  },
  {
    id: 6,
    title: 'Customer Support',
    description: 'Help Desk and Support System',
    icon: '🎧',
    backgroundColor: '#8B5CF6',
    members: {
      total: 9,
      owners: 2,
      editors: 4,
      viewers: 3
    },
    userRole: 'Viewer',
    avatars: [
      { id: 16, image: 'https://i.pravatar.cc/150?img=16', name: 'Mark Thompson' },
      { id: 17, image: 'https://i.pravatar.cc/150?img=17', name: 'Sarah Davis' },
      { id: 18, image: 'https://i.pravatar.cc/150?img=18', name: 'John Wilson' }
    ]
  }
];

const ProjectTeamGrid = () => {
  const [viewType, setViewType] = useState('grid');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Global Teams</h1>
            <p className={styles.subtitle}>Manage and overview teams across all your projects</p>
          </div>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewButton} ${viewType === 'grid' ? styles.active : ''}`}
              onClick={() => setViewType('grid')}
              title="Grid View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button 
              className={`${styles.viewButton} ${viewType === 'list' ? styles.active : ''}`}
              onClick={() => setViewType('list')}
              title="List View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${styles.grid} ${viewType === 'list' ? styles.listView : ''}`}>
          {teams.map((team) => (
            <div key={team.id} className={`${styles.card} ${viewType === 'list' ? styles.listCard : ''}`}>
              <div className={styles.iconContainer} style={{ backgroundColor: team.backgroundColor }}>
                <span className={styles.icon}>{team.icon}</span>
              </div>
              
              <div className={styles.content}>
                <div className={styles.mainContent}>
                  <h2 className={styles.teamTitle}>{team.title}</h2>
                  <p className={styles.description}>{team.description}</p>
                  
                  <div className={styles.memberInfo}>
                    <div className={styles.memberCount}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      {team.members.total} Members:
                    </div>
                    <div className={styles.memberTypes}>
                      <span className={styles.memberType}>{team.members.owners} Owners</span>
                      <span className={styles.memberType}>{team.members.editors} Editors</span>
                      <span className={styles.memberType}>{team.members.viewers} Viewers</span>
                    </div>
                  </div>

                  <div className={styles.teamMembers}>
                    <div className={styles.avatars}>
                      {team.avatars.map((avatar, index) => (
                        <img 
                          key={avatar.id}
                          src={avatar.image}
                          alt={avatar.name}
                          className={styles.avatar}
                          style={{ zIndex: team.avatars.length - index }}
                        />
                      ))}
                      {team.members.total > 3 && (
                        <div className={styles.avatarMore}>
                          +{team.members.total - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.footer}>
                  <div className={styles.roleTag}>
                    You are {team.userRole === 'Owner' ? 'an' : 'a'} {team.userRole}
                  </div>
                  <button className={styles.viewTeamButton}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    View Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTeamGrid;
