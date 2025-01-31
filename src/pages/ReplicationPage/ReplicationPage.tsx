import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonSpinner,
} from '@ionic/react';
import { refresh, reload } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import DatabaseContext from '../../context/Database/Database.context';
import useHideTabs from '../../Shared/hooks/useHideTabs';
import './ReplicationPage.scss';
import { DatabaseContextProps } from '../../context/Database/types/Database.types';

const ReplicationPage: React.FC = () => {
  const {
    replicationPercentage,
    replicationStatus,
    hardResync, 
    initialProjectReplication,
    isOnline,
    projectsInfoIsOffline,
  } = useContext<DatabaseContextProps>(DatabaseContext);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const toggleTabs = useHideTabs();
  const [isReplicating, setIsReplicating] = useState(false);
  const [dots, setDots] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const messages = [
    'Please wait, replication can take some minutes to finish',
    'Do not close or refresh the app',
    'Replication is in progress, please be patient',
    'Syncing data, this may take a while',
  ];

  useIonViewDidEnter(() => {
    toggleTabs.hideTabs();
  });


  useEffect(() => {
    if (isOnline && !projectsInfoIsOffline[`project_${id}`]) {
      setIsReplicating(true);
      initialProjectReplication().then(() => {
        setIsReplicating(false);
        history.push(`/my/projects/${id}/strips`);
      }).catch(() => {
        setIsReplicating(false);
        setError('There was an error replicating the data. Please try again or contact support.');
      });
    }
  }, [isOnline, id]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : `${prev}.`));
    }, 500);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 10000); // Change message every 10 seconds

    return () => {
      clearInterval(dotsInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const retryButton = () => {
    return (
      <IonButton
        expand="block"
        onClick={handleRetry}
        disabled={!isOnline || (isReplicating && !error)}
        className="retry-button"
        style={{
          '--background': 'var(--ion-color-yellow)',
        }}
      >
        <IonIcon icon={refresh} slot="start" />
        Retry Replication
      </IonButton>
    );
  }

  const retryReplication = () => {
    setError(null);
    setIsReplicating(true);
    hardResync().then(() => {
      setIsReplicating(false);
      history.push(`/my/projects/${id}/strips`);
    }).catch(() => {
      setIsReplicating(false);
      setError('There was an error replicating the data. Please try again or contact support.');
    });
  }

  const handleRetry = () => {
    if (isOnline) {
      retryReplication();
    }
  };

  if(error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Data Replication</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="replication-page-content" color="tertiary">
          <IonCard className="replication-card" color="tertiary">
            <IonCardContent>
              <IonText color="danger">
                <h2>Error while replicating</h2>
                <p>{error}</p>
                {retryButton()}
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Data Replication</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="replication-page-content" color="tertiary">
        <IonCard className="replication-card" color="tertiary">
          <IonCardContent>
            <IonText color="primary">
              <h2>Replication Progress</h2>
            </IonText>
            {isReplicating && (
              <div className="spinner-container">
                <p>
                  {messages[messageIndex]}
                  {dots}
                </p>
              </div>
            )}
            <IonProgressBar
              value={replicationPercentage / 100}
              style={{ height: '20px', margin: '20px 0', borderRadius: '10px' }}
              className="progress-bar"
            />
            <IonText>
              <h3 className="replication-percentage">
                {replicationPercentage}
                %
              </h3>
              <p>{replicationStatus}</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {!isOnline && (
          <IonText color="danger" className="offline-message">
            <p>You are offline. Please connect to the internet to start replication.</p>
          </IonText>
        )}

        {retryButton()}
        <IonSpinner name="crescent" color="primary" />
      </IonContent>
    </IonPage>
  );
};

export default ReplicationPage;
