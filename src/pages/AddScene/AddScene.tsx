import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AddScene.css';
import { useEffect } from 'react';

const AddScene = () => {
  useEffect(() => {
    const tabsContainer: any = document.querySelector('.app-tabs-container');
    if (tabsContainer) {
      tabsContainer.style.display = 'none';
    }

    return () => {
      if (tabsContainer) {
        tabsContainer.style.display = '';
      }
    };
  }, []);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='dark'>
          <IonTitle> Add Strip </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='dark'>
      </IonContent>
    </IonPage>
  );
};

export default AddScene;