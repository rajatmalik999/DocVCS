import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import FileVCSHomepage from '../pages/FileVCSHomepage/FileVCSHomepage';
import FilePage from '../pages/FilePage/FilePage';
import DescriptionAndActions from '../components/DescriptionAndActions/DescriptionAndActions';
import FileNavigationMenu from '../components/FileNavigationMenu';
import { UserProvider, FileVCSProvider, useFileVCS, PopupProvider } from '../context';
import { FileProvider, useFile } from '../context/FileContext';
import { LoaderProvider } from '../utils';
import getUserFiles from '../services/getUserFiles';
import VersionHistoryPage from '../pages/VersionHistoryPage/VersionHistoryPage';
import VCSSettings from '../components/VCSSettings/VCSSettings';
import TopBar from '../utils/TopBar/TopBar';
import Directories from '../components/Directories/Directories';

const FileVcsLayout = () => {
  const { userData, refreshTrigger } = useFileVCS();
  const { selectedFile } = useFile();
  const [userFiles, setUserFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchUserFiles = useCallback(async () => {
    if (userData?.id) {
      try {
        setLoading(true);
        const response = await getUserFiles(userData.id);
        console.log('Fetching user files, trigger:', refreshTrigger);
        if (response.success) {
          setUserFiles(response.data);
        }
      } catch (error) {
        console.error('Error fetching user files:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [userData?.id, refreshTrigger]);

  useEffect(() => {
    fetchUserFiles();
  }, [fetchUserFiles]);

  const shouldShowNavigation = !location.pathname.endsWith('settings') && !location.pathname.endsWith('files');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar userData={userData} />
      <div style={{ display: 'flex', flex: 1 }}>
        {shouldShowNavigation && (
          <div style={{ minWidth: '16rem',  background: '#fff', borderRight: '1.5px solid #f3f4f6' }}>
            <FileNavigationMenu 
              userData={userData} 
              userFiles={userFiles}
              loading={loading}
            />
          </div>
        )}
        <div style={{ flex: 1, background: '#f8fafc' }}>
          <Outlet context={{ userData, userFiles, loading, selectedFile }} />
        </div>
      </div>
    </div>
  );
};

const RoutesWithData = () => {
  const { userData } = useFileVCS();
  const { selectedFile } = useFile();
  
  return (
    <Routes>
      <Route element={<FileVcsLayout />}>
        <Route index element={<FileVCSHomepage userData={userData} selectedFile={selectedFile} />} />
        <Route path="file/*" element={<FilePage userData={userData} selectedFile={selectedFile} />}>
          <Route index element={<DescriptionAndActions userData={userData} selectedFile={selectedFile} />} />
        </Route>
        <Route path="files" element={<Directories />} />
        <Route path="history" element={<VersionHistoryPage userData={userData} selectedFile={selectedFile} />} />
        <Route path="settings" element={<VCSSettings userData={userData} />} />
      </Route>
    </Routes>
  );
};

const FileVcsRoutes = () => (
  <UserProvider>
    <FileVCSProvider>
      <FileProvider>
        <PopupProvider>
          <LoaderProvider>
            <RoutesWithData />
          </LoaderProvider>
        </PopupProvider>
      </FileProvider>
    </FileVCSProvider>
  </UserProvider>
);

export default FileVcsRoutes;
