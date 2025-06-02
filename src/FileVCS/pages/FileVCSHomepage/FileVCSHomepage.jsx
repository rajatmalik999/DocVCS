import React from 'react';
import styles from './FileVCSHomepage.module.css';
import { CreateUploadFile } from '../../components';
import RightSideInformation from '../../components/RightSideInformation';
import FilesAndFolder from '../../components/FilesAndFolder/FilesAndFolder';

const FileVCSHomepage = ({ userData }) => {
  return (
    <div className={styles.filevcshomepage} style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' , paddingTop: '4rem' }}>
        <CreateUploadFile userData={userData} />
        <FilesAndFolder userData={userData} />
      </div>
      <div style={{ width: 240, minWidth: 260, background: '#f9fafb', borderLeft: '1.5px solid #f3f4f6', height: '100vh' }}>
        <RightSideInformation userData={userData} />
      </div>
    </div>
  );
};

export default FileVCSHomepage;
