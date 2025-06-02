import React from 'react';
import styles from './PinnedDocuments.module.css';

const PinnedDocuments = () => {
  const documents = [
    {
      id: 1,
      title: 'Design System Documentation',
      type: 'PDF Document',
      size: '2.4 MB',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
          <path d="M12 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          <path d="M14 2v6h6" />
        </svg>
      ),
      lastModified: '2 hours ago',
      user: {
        name: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    },
    {
      id: 2,
      title: 'Q4 Marketing Strategy',
      type: 'Spreadsheet',
      size: '1.8 MB',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h8" />
          <path d="M8 9h2" />
        </svg>
      ),
      lastModified: '5 hours ago',
      user: {
        name: 'Mike Ross',
        avatar: 'https://i.pravatar.cc/150?img=2'
      }
    },
    {
      id: 3,
      title: 'Product Roadmap 2024',
      type: 'Presentation',
      size: '3.2 MB',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
          <path d="M4 16l4-4-4-4" />
          <path d="M12 20h8" />
          <path d="M12 12h8" />
          <path d="M12 4h8" />
        </svg>
      ),
      lastModified: '1 day ago',
      user: {
        name: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    },
    {
      id: 4,
      title: 'Brand Guidelines',
      type: 'Image Collection',
      size: '5.7 MB',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
      lastModified: '2 days ago',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=4'
      }
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pinned Documents</h2>
        <button className={styles.viewAllButton}>
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={styles.documentsGrid}>
        {documents.map((doc) => (
          <div key={doc.id} className={styles.documentCard}>
            <div className={styles.docIcon}>{doc.icon}</div>
            <div className={styles.docInfo}>
              <h3 className={styles.docTitle}>{doc.title}</h3>
              <div className={styles.docMeta}>
                <span className={styles.docType}>{doc.type}</span>
                <span className={styles.docSize}>{doc.size}</span>
              </div>
            </div>
            <div className={styles.docFooter}>
              <div className={styles.userInfo}>
                <img src={doc.user.avatar} alt={doc.user.name} className={styles.avatar} />
                <span className={styles.userName}>{doc.user.name}</span>
              </div>
              <span className={styles.lastModified}>{doc.lastModified}</span>
            </div>
            <button className={styles.menuButton}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedDocuments;

