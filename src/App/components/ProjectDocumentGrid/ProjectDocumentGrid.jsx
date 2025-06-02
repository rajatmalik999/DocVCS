import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectDocumentGrid.module.css';

const sampleDocuments = [
  {
    id: 1,
    title: 'Financial Reports',
    description: 'Annual financial statements and analysis',
    stats: [
      { type: 'docs', count: 3, icon: '📄' },
      { type: 'sheets', count: 4, icon: '📊' },
      { type: 'slides', count: 0, icon: '📑' }
    ],
    lastEdited: 'Q4 Report - 5h ago',
    editor: {
      name: 'John Smith',
      role: 'Owner',
      image: 'https://i.pravatar.cc/40?img=2'
    },
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jaWFsJTIwcmVwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Marketing Campaign 2024',
    description: 'Q1 marketing strategy and content planning',
    stats: [
      { type: 'docs', count: 5, icon: '📄' },
      { type: 'sheets', count: 2, icon: '📊' },
      { type: 'slides', count: 1, icon: '📑' }
    ],
    lastEdited: 'Campaign Deck - 2h ago',
    editor: {
      name: 'Sarah Lee',
      role: 'Editor',
      image: 'https://i.pravatar.cc/40?img=1'
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    title: 'Product Design',
    description: 'New product features and wireframes',
    stats: [
      { type: 'docs', count: 4, icon: '📄' },
      { type: 'sheets', count: 1, icon: '📊' },
      { type: 'slides', count: 3, icon: '📑' }
    ],
    lastEdited: 'Design Specs - 1h ago',
    editor: {
      name: 'Emily Chen',
      role: 'Editor',
      image: 'https://i.pravatar.cc/40?img=3'
    },
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3QlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    title: 'HR Policies',
    description: 'Employee handbook and guidelines',
    stats: [
      { type: 'docs', count: 6, icon: '📄' },
      { type: 'sheets', count: 1, icon: '📊' },
      { type: 'slides', count: 1, icon: '📑' }
    ],
    lastEdited: 'Benefits Guide - 4h ago',
    editor: {
      name: 'Lisa Wong',
      role: 'Owner',
      image: 'https://i.pravatar.cc/40?img=4'
    },
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aHJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    title: 'Tech Documentation',
    description: 'API documentation and technical specs',
    stats: [
      { type: 'docs', count: 8, icon: '📄' },
      { type: 'sheets', count: 0, icon: '📊' },
      { type: 'slides', count: 2, icon: '📑' }
    ],
    lastEdited: 'API Docs - 30m ago',
    editor: {
      name: 'Mike Johnson',
      role: 'Editor',
      image: 'https://i.pravatar.cc/40?img=5'
    },
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  }
];

const ProjectDocumentGrid = () => {
  const [viewType, setViewType] = useState('grid');
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Documents Dashboard</h1>
            <p className={styles.subtitle}>View and manage your project documents</p>
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
          {sampleDocuments.map((doc) => (
            <div key={doc.id} className={`${styles.card} ${viewType === 'list' ? styles.listCard : ''}`}>
              <div className={`${styles.thumbnailContainer} ${viewType === 'list' ? styles.listThumbnail : ''}`}>
                <img 
                  src={doc.thumbnail} 
                  alt={doc.title} 
                  className={styles.thumbnail}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBpbWFnZSBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'
                  }}
                />
                <button className={styles.favoriteButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              </div>
              
              <div className={`${styles.content} ${viewType === 'list' ? styles.listContent : ''}`}>
                <div className={styles.mainContent}>
                  <h2 className={styles.documentTitle}>{doc.title}</h2>
                  <p className={styles.description}>{doc.description}</p>
                  
                  <div className={styles.stats}>
                    {doc.stats.map((stat, index) => (
                      <div key={index} className={styles.statItem}>
                        <span className={styles.statIcon}>{stat.icon}</span>
                        <span className={styles.statCount}>{stat.count} {stat.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.divider}></div>
                
                <div className={styles.footer}>
                  <div className={styles.editorInfo}>
                    <img src={doc.editor.image} alt={doc.editor.name} className={styles.editorImage} />
                    <div className={styles.editorDetails}>
                      <span className={styles.editorName}>{doc.editor.name}</span>
                      <span className={styles.editorRole}>{doc.editor.role}</span>
                    </div>
                  </div>
                  <div className={styles.lastEdited}>
                    <svg className={styles.clockIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span>Last edited: {doc.lastEdited}</span>
                  </div>
                  
                  <button 
                    className={styles.openButton}
                    onClick={() => navigate(`/user/project`)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.buttonIcon}>
                      <path d="M12 5l7 7-7 7M5 12h14" />
                    </svg>
                    Open Docs
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

export default ProjectDocumentGrid;
