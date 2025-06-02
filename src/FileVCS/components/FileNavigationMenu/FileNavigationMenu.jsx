import React, { useMemo, useState } from 'react';
import { FaSearch, FaFilter, FaHome, FaExchangeAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './FileNavigationMenu.module.css';
import PinnedFiles from '../PinnedFiles/PinnedFiles';
import AllFiles from '../AllFiles/AllFiles';
import { useFile } from '../../context/FileContext';
import { useFileVCS } from '../../context';
import OwnerShipTransferRequests from '../../utils/OwnerShipTransferRequests/OwnerShipTransferRequests';

const FileNavigationMenu = ({ userData, userFiles = [], loading }) => {
  const navigate = useNavigate();
  const { selectedFile, setSelectedFile } = useFile();
  const { refreshTrigger } = useFileVCS();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showRequests, setShowRequests] = useState(false);
  // Memoize the sorted files to prevent unnecessary recalculations
  const { pinnedFiles, unpinnedFiles } = useMemo(() => {
    const filtered = userFiles.filter(file => 
      file.fileName.toLowerCase().includes(search.toLowerCase()) ||
      file.fileTags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );

    return {
      pinnedFiles: filtered.filter(file => file.isPinned),
      unpinnedFiles: filtered.filter(file => !file.isPinned)
    };
  }, [userFiles, search, refreshTrigger]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    // Toggle between 'all', 'owned', 'shared'
    const filters = ['all', 'owned', 'shared'];
    const currentIndex = filters.indexOf(filter);
    const nextFilter = filters[(currentIndex + 1) % filters.length];
    setFilter(nextFilter);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    navigate(`/user/project/file/${file._id}`);
  };

  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };

  return (
    <>
      <div className={styles.panel}>
        <div className={styles.searchRow}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.filterRow}>
          <FaFilter className={styles.filterIcon} />
          <button 
            className={styles.filterBtn} 
            onClick={handleFilter}
          >
            {filter === 'all' ? 'All Types' : 
             filter === 'owned' ? 'My Files' : 
             'Shared Files'}
          </button>
        </div>
        <div className={styles.sectionSpacing} />
        <PinnedFiles 
          files={pinnedFiles}
          loading={loading}
          userId={userData?.id}
          selectedFileId={selectedFile?._id}
          onFileSelect={handleFileSelect}
        />
        <div className={styles.sectionSpacing} />
        <AllFiles 
          files={unpinnedFiles}
          loading={loading}
          userId={userData?.id}
          selectedFileId={selectedFile?._id}
          onFileSelect={handleFileSelect}
        />
      </div>
      {showRequests && (
        <OwnerShipTransferRequests 
          onClose={toggleRequests} 
          userId={userData?.id} 
        />
      )}
    </>
  );
};

export default FileNavigationMenu;
