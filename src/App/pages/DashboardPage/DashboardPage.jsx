import React from 'react';
import PinnedProjects from '../../components/PinnedProjects/PinnedProjects';
import MyTasks from '../../components/MyTasks/MyTasks';
import PinnedDocuments from '../../components/PinnedDocuments/PinnedDocuments';
import ProjectMilestones from '../../components/ProjectMilestones/ProjectMilestones';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardStack}>
        <div className={styles.section}>
          <PinnedProjects />
        </div>
        <div className={styles.section}>
          <MyTasks />
        </div>
        <div className={styles.section}>
          <ProjectMilestones />
        </div>
        <div className={styles.section}>
          <PinnedDocuments />
        </div>
        <div className={styles.section}>
          <ProjectMilestones />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
