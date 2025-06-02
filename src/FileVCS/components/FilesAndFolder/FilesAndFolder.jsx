import React, { useState } from 'react';
import { FaFolder, FaFileAlt, FaThLarge, FaThList, FaRegListAlt, FaTh } from 'react-icons/fa';
import styles from './FilesAndFolder.module.css';

const folders = [
  { name: 'assets' },
  { name: 'auth' },
  { name: 'FileVCS' },
  { name: 'userprofile' },
  { name: 'utils' },
];
const files = [
  { name: 'App.jsx' },
  { name: 'App.js' },
  { name: 'App.test.js' },
  { name: 'index.js' },
  { name: 'main.jsx' },
];

const displayModes = [
  { key: 'small', label: 'Small Icons', icon: <FaThList /> },
  { key: 'large', label: 'Large Icons', icon: <FaThLarge /> },
  { key: 'tiles', label: 'Tiles', icon: <FaTh /> },
  { key: 'details', label: 'Details', icon: <FaRegListAlt /> },
];

const FilesAndFolder = () => {
  const [displayMode, setDisplayMode] = useState('small');

  const renderList = () => (
    <div className={styles.list}>
      {folders.map(folder => (
        <div className={styles.item} key={folder.name}>
          <FaFolder className={styles.folderIcon} />
          <span className={styles.name}>{folder.name}</span>
        </div>
      ))}
      <div className={styles.divider} />
      {files.map(file => (
        <div className={styles.item} key={file.name}>
          <FaFileAlt className={styles.fileIcon} />
          <span className={styles.name}>{file.name}</span>
        </div>
      ))}
    </div>
  );

  const renderGrid = (showDesc = false) => (
    <div className={styles.tilesGrid}>
      {[...folders, ...files].map(entry => (
        <div className={styles.tile} key={entry.name}>
          {folders.some(f => f.name === entry.name) ? (
            <FaFolder className={styles.tileIcon} />
          ) : (
            <FaFileAlt className={styles.tileIcon} />
          )}
          <div className={styles.tileText}>
            <span className={styles.name}>{entry.name}</span>
            {showDesc && <span className={styles.tileDesc}>Description</span>}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDetails = () => (
    <table className={styles.detailsTable}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>Name</th>
          <th style={{ textAlign: 'left' }}>Type</th>
          <th style={{ textAlign: 'left' }}>Modified</th>
        </tr>
      </thead>
      <tbody>
        {folders.map(folder => (
          <tr key={folder.name}>
            <td style={{ textAlign: 'left' }}><FaFolder className={styles.detailsIcon} /> {folder.name}</td>
            <td style={{ textAlign: 'left' }}>Folder</td>
            <td style={{ textAlign: 'left' }}>--</td>
          </tr>
        ))}
        {files.map(file => (
          <tr key={file.name}>
            <td style={{ textAlign: 'left' }}><FaFileAlt className={styles.detailsIcon} /> {file.name}</td>
            <td style={{ textAlign: 'left' }}>File</td>
            <td style={{ textAlign: 'left' }}>--</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <div className={styles.displayModeBar}>
        {displayModes.map(mode => (
          <button
            key={mode.key}
            className={displayMode === mode.key ? styles.displayModeActive : styles.displayModeBtn}
            onClick={() => setDisplayMode(mode.key)}
            title={mode.label}
            type="button"
          >
            {mode.icon}
          </button>
        ))}
      </div>
      {displayMode === 'small' ? renderList() : null}
      {displayMode === 'large' ? renderGrid(false) : null}
      {displayMode === 'tiles' ? renderGrid(true) : null}
      {displayMode === 'details' ? renderDetails() : null}
    </div>
  );
};

export default FilesAndFolder;
