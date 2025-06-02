import React, { useState } from 'react';
import styles from './ProjectTaskGrid.module.css';

const projects = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Complete overhaul of company website with modern UI/UX principles',
    status: 'Active',
    stats: {
      toDo: 4,
      inProgress: 6,
      completed: 12
    },
    owner: {
      name: 'Sarah Wilson',
      role: 'Project Owner',
      avatar: '👩‍💼'
    }
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement platform',
    status: 'In Review',
    stats: {
      toDo: 8,
      inProgress: 3,
      completed: 5
    },
    owner: {
      name: 'Mike Chen',
      role: 'Tech Lead',
      avatar: '👨‍💻'
    }
  },
  {
    id: 3,
    title: 'Analytics Platform',
    description: 'Real-time data analytics and reporting dashboard',
    status: 'On Track',
    stats: {
      toDo: 6,
      inProgress: 4,
      completed: 8
    },
    owner: {
      name: 'Emma Davis',
      role: 'Data Analyst',
      avatar: '👩‍🔬'
    }
  },
  {
    id: 4,
    title: 'E-commerce Integration',
    description: 'Shopping cart and payment gateway implementation',
    status: 'Pending',
    stats: {
      toDo: 10,
      inProgress: 2,
      completed: 3
    },
    owner: {
      name: 'Alex Thompson',
      role: 'Developer',
      avatar: '👨‍💻'
    }
  },
  {
    id: 5,
    title: 'Social Media Campaign',
    description: 'Q4 marketing campaign across multiple platforms',
    status: 'Delayed',
    stats: {
      toDo: 7,
      inProgress: 5,
      completed: 2
    },
    owner: {
      name: 'Sophie Martinez',
      role: 'Marketing Lead',
      avatar: '👩‍💼'
    }
  },
  {
    id: 6,
    title: 'Help Desk System',
    description: 'Customer support ticket management platform',
    status: 'New',
    stats: {
      toDo: 12,
      inProgress: 1,
      completed: 0
    },
    owner: {
      name: 'James Wilson',
      role: 'Support Lead',
      avatar: '👨‍💼'
    }
  }
];

const ProjectTaskGrid = () => {
  const [viewType, setViewType] = useState('grid');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Global Tasks</h1>
            <p className={styles.subtitle}>Overview of all active projects and their tasks</p>
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
          {projects.map((project) => (
            <div key={project.id} className={`${styles.card} ${viewType === 'list' ? styles.listCard : ''}`}>
              <div className={`${styles.cardHeader} ${viewType === 'list' ? styles.listHeader : ''}`}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <span className={`${styles.status} ${styles[project.status.toLowerCase().replace(' ', '')]}`}>
                  {project.status}
                </span>
              </div>
              
              <div className={`${styles.content} ${viewType === 'list' ? styles.listContent : ''}`}>
                <div className={styles.mainContent}>
                  <p className={styles.description}>{project.description}</p>
                  
                  <div className={styles.stats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>To Do</span>
                      <span className={styles.statValue}>{project.stats.toDo}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>In Progress</span>
                      <span className={styles.statValue}>{project.stats.inProgress}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Completed</span>
                      <span className={`${styles.statValue} ${styles.completed}`}>{project.stats.completed}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.footer}>
                  <div className={styles.owner}>
                    <div className={styles.avatar}>{project.owner.avatar}</div>
                    <div className={styles.ownerInfo}>
                      <span className={styles.ownerName}>{project.owner.name}</span>
                      <span className={styles.ownerRole}>{project.owner.role}</span>
                    </div>
                  </div>
                  
                  <button className={styles.openTasks}>Open Tasks</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskGrid;
