import React from 'react';
import styles from './PinnedProjects.module.css';

const PinnedProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Website Redesign',
      category: 'Marketing Campaign',
      progress: 75,
      status: 'In Progress',
      statusColor: '#10B981',
      user: {
        name: 'Sarah Lee',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    },
    {
      id: 2,
      title: 'Mobile App Development',
      category: 'Development',
      progress: 45,
      status: 'On Track',
      statusColor: '#22C55E',
      user: {
        name: 'Mike Chen',
        avatar: 'https://i.pravatar.cc/150?img=2'
      }
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      category: 'Data Analysis',
      progress: 90,
      status: 'Review',
      statusColor: '#6366F1',
      user: {
        name: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pinned Projects</h2>
        <button className={styles.viewAllButton}>
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className={styles.projectsList}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectItem}>
            <div className={styles.mainInfo}>
              <div className={styles.projectDetails}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.projectCategory}>{project.category}</span>
              </div>
              
              <div className={styles.statusInfo}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: project.statusColor
                    }} 
                  />
                </div>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: `${project.statusColor}15`, color: project.statusColor }}
                >
                  {project.status}
                </span>
              </div>
            </div>

            <div className={styles.secondaryInfo}>
              <div className={styles.userInfo}>
                <img src={project.user.avatar} alt={project.user.name} className={styles.userAvatar} />
                <span className={styles.userName}>{project.user.name}</span>
              </div>
              
              <div className={styles.actions}>
                <button className={styles.actionButton} title="View Details">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button className={styles.actionButton} title="More">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedProjects;
