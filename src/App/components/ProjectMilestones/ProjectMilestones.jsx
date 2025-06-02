import React from 'react';
import styles from './ProjectMilestones.module.css';

const ProjectMilestones = () => {
  const milestones = [
    {
      id: 1,
      title: 'UI Design Phase',
      project: 'Website Redesign',
      dateRange: 'Jun 1 - Jun 15',
      progress: 75,
      status: 'On Track',
      statusColor: '#10B981',
      users: [
        { id: 1, avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, avatar: 'https://i.pravatar.cc/150?img=2' }
      ]
    },
    {
      id: 2,
      title: 'Backend Integration',
      project: 'Mobile App',
      dateRange: 'Jun 10 - Jun 25',
      progress: 45,
      status: 'Approaching',
      statusColor: '#F59E0B',
      users: [
        { id: 3, avatar: 'https://i.pravatar.cc/150?img=3' }
      ]
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      project: 'Marketing Campaign',
      dateRange: 'Jun 5 - Jun 12',
      progress: 90,
      status: 'Overdue',
      statusColor: '#EF4444',
      users: [
        { id: 4, avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: 5, avatar: 'https://i.pravatar.cc/150?img=5' }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Project Milestones</h2>
        <div className={styles.filters}>
          <select className={styles.filterSelect}>
            <option value="all">All Projects</option>
            <option value="website">Website</option>
            <option value="mobile">Mobile</option>
            <option value="marketing">Marketing</option>
          </select>
          <select className={styles.filterSelect}>
            <option value="all">All Status</option>
            <option value="ontrack">On Track</option>
            <option value="approaching">Approaching</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className={styles.milestonesList}>
        {milestones.map((milestone) => (
          <div key={milestone.id} className={styles.milestoneCard}>
            <div className={styles.milestoneInfo}>
              <div className={styles.titleSection}>
                <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: `${milestone.statusColor}15`, color: milestone.statusColor }}
                >
                  {milestone.status}
                </span>
              </div>
              <p className={styles.projectName}>{milestone.project}</p>
              <div className={styles.dateRange}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {milestone.dateRange}
              </div>
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                <span>Progress</span>
                <span>{milestone.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ 
                    width: `${milestone.progress}%`,
                    backgroundColor: milestone.statusColor
                  }} 
                />
              </div>
            </div>

            <div className={styles.userAvatars}>
              {milestone.users.map((user) => (
                <img 
                  key={user.id}
                  src={user.avatar}
                  alt="User Avatar"
                  className={styles.avatar}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.viewAllButton}>
        View All Milestones
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ProjectMilestones;

