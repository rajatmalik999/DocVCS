import React, { useState } from 'react';
import styles from './ProjectGrid.module.css';

const projects = [
  {
    id: 1,
    title: 'Digital Transformation',
    description: 'Enterprise-wide digital transformation initiative for ABC Corp',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjB0cmFuc2Zvcm1hdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    members: 14,
    progress: 25,
    lastUpdated: '3 days ago',
    color: '#4F46E5'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Next-gen mobile banking application',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    members: 8,
    progress: 75,
    lastUpdated: '1 day ago',
    color: '#9333EA'
  },
  {
    id: 3,
    title: 'Data Analytics Platform',
    description: 'Real-time analytics and reporting system',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YSUyMGFuYWx5dGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    members: 6,
    progress: 45,
    lastUpdated: '5 days ago',
    color: '#10B981'
  },
  {
    id: 4,
    title: 'E-commerce Platform',
    description: 'Global marketplace for artisanal products',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    members: 10,
    progress: 60,
    lastUpdated: '2 days ago',
    color: '#F97316'
  },
  {
    id: 5,
    title: 'AI Chatbot',
    description: 'Customer service automation solution',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBjaGF0Ym90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    members: 5,
    progress: 30,
    lastUpdated: '1 week ago',
    color: '#14B8A6'
  },
  {
    id: 6,
    title: 'Blockchain Integration',
    description: 'Decentralized payment processing system',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvY2tjaGFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    members: 7,
    progress: 15,
    lastUpdated: '4 days ago',
    color: '#EF4444'
  }
];

const ProjectGrid = () => {
  const [viewType, setViewType] = useState('grid');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>My Projects</h1>
            <p className={styles.subtitle}>Manage and track all your ongoing projects</p>
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
              <div className={`${styles.thumbnailContainer} ${viewType === 'list' ? styles.listThumbnail : ''}`}>
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className={styles.thumbnail}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBpbWFnZSBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                  }}
                />
                <div className={styles.lastUpdated}>
                  <svg className={styles.clockIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {project.lastUpdated}
                </div>
              </div>
              
              <div className={`${styles.content} ${viewType === 'list' ? styles.listContent : ''}`}>
                <div className={styles.mainContent}>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <p className={styles.description}>{project.description}</p>
                  
                  <div className={styles.stats}>
                    <div className={styles.members}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      {project.members} Members
                    </div>
                    <div className={styles.progress}>
                      <div className={styles.progressText}>{project.progress}% Complete</div>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ 
                            width: `${project.progress}%`,
                            backgroundColor: project.color
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className={styles.openButton} style={{ backgroundColor: project.color }}>
                  Open Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
