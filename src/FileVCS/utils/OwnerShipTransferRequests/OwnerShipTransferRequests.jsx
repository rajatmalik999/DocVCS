import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './OwnerShipTransferRequests.module.css';
import getOwnerShipRequests from '../../services/getOwnerShipRequests';
import acceptOwnershipRequest from '../../services/acceptOwnershipRequest';
import revokeOwnershipRequest from '../../services/revokeOwnershipRequest';
import declineOwnershipRequest from '../../services/declineOwnershipRequest';
import { useLoader } from '../../../auth/utils';

function OwnerShipTransferRequests({ onClose, userId }) {
  const [activeTab, setActiveTab] = useState('received');
  const [requests, setRequests] = useState({ received: [], sent: [] });
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    fetchRequests();
  }, [userId]);

  const fetchRequests = async () => {
    try {
      showLoader('Loading transfer requests...');
      setError(null);
      const response = await getOwnerShipRequests(userId);
      
      if (response.success) {
        const processedRequests = {
          received: [],
          sent: []
        };

        response.data.forEach(request => {
          const processedRequest = {
            id: request._id,
            fileName: request.file.name,
            fileId: request.file._id,
            fileType: 'FILE',
            status: request.status,
            requestDate: new Date(request.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            respondedAt: request.respondedAt,
            currentFileGoogleId: request.currentFileGoogleId,
            newFileGoogleId: request.newFileGoogleId,
            requester: {
              id: request.requester._id,
              email: request.requester.email,
              name: request.requester.email.split('@')[0]
            },
            currentOwner: {
              id: request.currentOwner._id,
              email: request.currentOwner.email,
              name: request.currentOwner.email.split('@')[0]
            },
            receiver: {
              id: request.receiver._id,
              email: request.receiver.email,
              name: request.receiver.email.split('@')[0]
            }
          };

          if (request.requester._id === userId) {
            processedRequests.sent.push(processedRequest);
          } else {
            processedRequests.received.push(processedRequest);
          }
        });

        setRequests(processedRequests);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch ownership requests');
      console.error('Error fetching requests:', err);
    } finally {
      hideLoader();
    }
  };

  const handleAcceptRequest = async (request) => {
    try {
      showLoader('Accepting transfer request...');
      setError(null);

      const response = await acceptOwnershipRequest(userId, request.id);

      if (response.success) {
        await fetchRequests();
      } else {
        setError(response.message || 'Failed to accept ownership request');
      }
    } catch (err) {
      setError('Failed to accept ownership request');
      console.error('Error in handleAcceptRequest:', err);
    } finally {
      hideLoader();
    }
  };

  const handleRevokeRequest = async (request) => {
    try {
      showLoader('Revoking transfer request...');
      setError(null);

      const response = await revokeOwnershipRequest(userId, request.fileId);

      if (response.success) {
        await fetchRequests();
      } else {
        setError(response.message || 'Failed to revoke ownership request');
      }
    } catch (err) {
      setError('Failed to revoke ownership request');
      console.error('Error in handleRevokeRequest:', err);
    } finally {
      hideLoader();
    }
  };

  const handleDeclineRequest = async (request) => {
    try {
      showLoader('Declining transfer request...');
      setError(null);

      const response = await declineOwnershipRequest(userId, request.fileId);

      if (response.success) {
        await fetchRequests();
      } else {
        setError(response.message || 'Failed to decline ownership request');
      }
    } catch (err) {
      setError('Failed to decline ownership request');
      console.error('Error in handleDeclineRequest:', err);
    } finally {
      hideLoader();
    }
  };

  const getFileIcon = (fileType) => {
    return '📄';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: styles.statusPending,
      accepted: styles.statusAccepted,
      rejected: styles.statusRejected,
      cancelled: styles.statusCancelled
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderRequestCard = (request, type) => {
    const otherUser = type === 'sent' ? request.receiver : request.requester;
    const respondedDate = request.respondedAt ? new Date(request.respondedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : null;

    return (
      <div key={request.id} className={styles.requestCard}>
        <div className={styles.fileInfo}>
          <span className={styles.fileIcon}>{getFileIcon(request.fileType)}</span>
          <div className={styles.fileDetails}>
            <h3>{request.fileName}</h3>
            <span className={styles.fileMetadata}>
              {request.fileType}
            </span>
          </div>
          {getStatusBadge(request.status)}
        </div>
        
        <div className={styles.requesterInfo}>
          <img 
            src={`https://ui-avatars.com/api/?name=${otherUser.name}&background=random`} 
            alt="Avatar" 
            className={styles.avatar}
          />
          <div className={styles.requesterDetails}>
            <span className={styles.requesterName}>
              {otherUser.name}
            </span>
            <span className={styles.requesterEmail}>
              {otherUser.email}
            </span>
            <span className={styles.userRole}>
              {type === 'sent' ? 'Receiving User' : 'Requesting User'}
            </span>
          </div>
          <div className={styles.dates}>
            <span className={styles.requestDate}>
              Requested: {request.requestDate}
            </span>
            {respondedDate && (
              <span className={styles.respondedDate}>
                Responded: {respondedDate}
              </span>
            )}
          </div>
        </div>

        {request.status === 'pending' && (
          <div className={styles.actions}>
            {type === 'received' ? (
              <>
                <button 
                  className={styles.acceptButton}
                  onClick={() => handleAcceptRequest(request)}
                >
                  Accept
                </button>
                <button 
                  className={styles.rejectButton}
                  onClick={() => handleDeclineRequest(request)}
                >
                  Decline
                </button>
              </>
            ) : (
              <button 
                className={styles.revokeButton}
                onClick={() => handleRevokeRequest(request)}
              >
                Revoke Request
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ownership Transfer Requests</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'received' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('received')}
          >
            Received
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'sent' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent
          </button>
        </div>

        <div className={styles.requestsList}>
          {error ? (
            <div className={styles.errorState}>{error}</div>
          ) : activeTab === 'received' ? (
            requests.received.length > 0 ? (
              requests.received.map(request => renderRequestCard(request, 'received'))
            ) : (
              <div className={styles.emptyState}>No received requests</div>
            )
          ) : (
            requests.sent.length > 0 ? (
              requests.sent.map(request => renderRequestCard(request, 'sent'))
            ) : (
              <div className={styles.emptyState}>No sent requests</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnerShipTransferRequests;

