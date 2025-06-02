import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DescriptionAndActions.module.css';
import TopBarComponent from '../TopBarComponent/TopBarComponent';
import FileActions from '../../utils/FileActions/FileActions';
import DeleteFile from '../../utils/DeleteFile/DeleteFile';
import ShareFile from '../../utils/ShareFile/ShareFile';
import TakeNewSnapShotComponent from '../TakeNewSnapShotComponent/TakeNewSnapShotComponent';
import CreateNewFile from '../../utils/CreateNewFile/CreateNewFile';
import NewFileUpload from '../../utils/NewFileUpload/NewFileUpload';
import FileOwnerShipTransfer from '../../utils/FileOwnerShipTransfer/FileOwnerShipTransfer';
import SharedWith from '../../utils/SharedWithList.jsx/SharedWith';

const DescriptionAndActions = ({ userData, selectedFile }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const navigate = useNavigate();

  if (!selectedFile) {
    return null;
  }

  const handleDeleteFile = () => setShowDelete(true);
  const handleShare = () => setShowShare(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseShare = () => setShowShare(false);
  const handleVersionHistory = () => navigate('/user/project/history');
  const handleCreate = () => setShowCreate(true);
  const handleUpload = () => setShowUpload(true);
  const handleCloseCreate = () => setShowCreate(false);
  const handleCloseUpload = () => setShowUpload(false);
  const handleTransferOwnership = () => setShowTransfer(true);
  const handleCloseTransfer = () => setShowTransfer(false);

  const renderModals = () => (
    <>
      {showDelete && (
        <DeleteFile 
          selectedFile={selectedFile}
          onCancel={handleCloseDelete} 
          onDelete={() => {
            handleCloseDelete();
            navigate('/user/project');
          }} 
        />
      )}
      {showShare && (
        <ShareFile 
          selectedFile={selectedFile}
          userData={userData}
          onClose={handleCloseShare} 
        />
      )}
      {showCreate && (
        <CreateNewFile onClose={handleCloseCreate} />
      )}
      {showUpload && (
        <NewFileUpload onClose={handleCloseUpload} />
      )}
      {showTransfer && (
        <FileOwnerShipTransfer 
          selectedFile={selectedFile}
          userData={userData}
          onCancel={handleCloseTransfer} 
          onConfirm={handleCloseTransfer} 
        />
      )}
    </>
  );

  return (
    <div className={styles.descriptionandactions}>
      <div className={styles.mainContent}>
        <FileActions
          selectedFile={selectedFile}
          userData={userData}
          onDeleteFile={handleDeleteFile}
          onShare={handleShare}
          onVersionHistory={handleVersionHistory}
          onTransferOwnership={handleTransferOwnership}
        />
        
        <div className={styles.sharedWithSection}>
          <SharedWith selectedFile={selectedFile} />
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <TakeNewSnapShotComponent 
          selectedFile={selectedFile}
          userData={userData}
        />
      </div>

      {renderModals()}
    </div>
  );
};

export default DescriptionAndActions;
