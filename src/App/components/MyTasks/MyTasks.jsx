import React from 'react';
import styles from './MyTasks.module.css';

const MyTasks = () => {
  const taskCategories = [
    {
      id: 'todo',
      icon: (
        <svg className={styles.todoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      title: 'To Do',
      count: 4,
      tasks: [
        {
          id: 1,
          title: 'Update landing page design',
          project: 'Website Redesign',
          projectColor: '#4F46E5',
          status: 'Overdue',
          statusColor: '#EF4444',
          dueText: '2 days ago'
        },
        {
          id: 2,
          title: 'Create user flow diagrams',
          project: 'Mobile App',
          projectColor: '#3B82F6',
          status: 'Today',
          statusColor: '#F59E0B',
          dueText: 'Due today'
        }
      ]
    },
    {
      id: 'inprogress',
      icon: (
        <svg className={styles.progressIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 6V12L16 14" />
        </svg>
      ),
      title: 'In Progress',
      count: 3,
      tasks: [
        {
          id: 3,
          title: 'Implement authentication',
          project: 'Backend API',
          projectColor: '#10B981',
          status: 'Tomorrow',
          statusColor: '#F59E0B',
          dueText: 'Due tomorrow'
        },
        {
          id: 4,
          title: 'Write API documentation',
          project: 'Documentation',
          projectColor: '#F97316',
          status: 'Next week',
          statusColor: '#6B7280',
          dueText: 'In 5 days'
        }
      ]
    },
    {
      id: 'done',
      icon: (
        <svg className={styles.doneIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17L4 12" />
        </svg>
      ),
      title: 'Done',
      count: 2,
      tasks: [
        {
          id: 5,
          title: 'Setup development environment',
          project: 'Setup',
          projectColor: '#6B7280',
          status: 'Completed',
          statusColor: '#10B981',
          dueText: '2 days ago'
        },
        {
          id: 6,
          title: 'Initial project setup',
          project: 'Setup',
          projectColor: '#6B7280',
          status: 'Completed',
          statusColor: '#10B981',
          dueText: '3 days ago'
        }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Tasks</h2>
        <button className={styles.viewAllButton}>
          View All Tasks
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={styles.taskCategories}>
        {taskCategories.map((category) => (
          <div key={category.id} className={styles.category}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryTitle}>
                {category.icon}
                <span>{category.title}</span>
                <span className={styles.count}>{category.count}</span>
              </div>
            </div>

            <div className={styles.tasks}>
              {category.tasks.map((task) => (
                <div key={task.id} className={styles.taskCard}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  <div className={styles.taskMeta}>
                    <span 
                      className={styles.project}
                      style={{ backgroundColor: `${task.projectColor}15`, color: task.projectColor }}
                    >
                      {task.project}
                    </span>
                    <span 
                      className={styles.status}
                      style={{ backgroundColor: `${task.statusColor}15`, color: task.statusColor }}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className={styles.dueDate}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {task.dueText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
