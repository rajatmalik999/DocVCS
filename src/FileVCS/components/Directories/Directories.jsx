import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegFile, FaRegFolder, FaRegImage, FaRegFilePdf } from 'react-icons/fa';
import styles from './Directories.module.css';

const sampleData = [
  {
    id: 1,
    title: 'Project Proposal 2024',
    type: 'document',
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedBy: 'John Doe'
  },
  {
    id: 2,
    title: 'Marketing Assets',
    type: 'folder',
    filesCount: 12,
    lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: 'Brand Guidelines',
    type: 'image',
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedBy: 'Sarah Smith'
  },
  {
    id: 4,
    title: 'Q4 Financial Report',
    type: 'pdf',
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedBy: 'Finance Team'
  }
];

const getIcon = (type) => {
  switch (type) {
    case 'folder':
      return <FaRegFolder className={styles.itemIcon} />;
    case 'image':
      return <FaRegImage className={styles.itemIcon} />;
    case 'pdf':
      return <FaRegFilePdf className={styles.itemIcon} />;
    default:
      return <FaRegFile className={styles.itemIcon} />;
  }
};

const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 48) {
    return 'yesterday';
  } else if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return `${Math.floor(diffInHours / 168)} weeks ago`;
  }
};

const Directories = () => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/user/project/file`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search documents..."
            className={styles.searchInput}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.filterButton}>
            Filter
          </button>
          <button className={styles.sortButton}>
            Sort
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {sampleData.map((item) => (
          <div
            key={item.id}
            className={styles.gridItem}
            onClick={() => handleItemClick(item.id)}
          >
            <div className={styles.itemPreview}>
              {getIcon(item.type)}
            </div>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemMeta}>
                {item.type === 'folder' 
                  ? `${item.filesCount} files • Last modified ${formatTimeAgo(item.lastModified)}`
                  : `Updated ${formatTimeAgo(item.updatedAt)} by ${item.updatedBy}`
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directories;
