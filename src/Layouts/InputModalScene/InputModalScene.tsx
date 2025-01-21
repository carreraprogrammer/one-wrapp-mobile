import {
  IonCol,
  IonContent, IonGrid, IonHeader, IonItem,
  IonModal,
  IonRow,
} from '@ionic/react';
import React, { useMemo, useState, useCallback } from 'react';
import CustomSelect from '../../components/Shared/CustomSelect/CustomSelect';
import ModalToolbar from '../../components/Shared/ModalToolbar/ModalToolbar';
import OutlineLightButton from '../../components/Shared/OutlineLightButton/OutlineLightButton';
import OutlinePrimaryButton from '../../components/Shared/OutlinePrimaryButton/OutlinePrimaryButton';
import useIsMobile from '../../hooks/Shared/useIsMobile';
import { Scene } from '../../interfaces/scenes.types';
import './InputModalScene.scss';

interface InputModalProps {
  sceneName: string;
  listOfScenes: Scene[];
  modalTrigger?: string;
  handleCheckboxToggle: (scene: Scene) => void;
  selectedScenes: Scene[];
  setSelectedScenes?: any;
  clearSelections: () => void;
  multipleSelections?: boolean;
  canCreateNew?: boolean;
  editMode?: boolean;
  sceneCategory?: string;
  existentScenes?: any[];
  modalRef: React.RefObject<HTMLIonModalElement>;
}

const InputModalScene: React.FC<InputModalProps> = ({
  sceneName,
  listOfScenes,
  modalTrigger,
  handleCheckboxToggle,
  clearSelections,
  modalRef,
}) => {
  const [selectedOption, setSelectedOption] = useState<Scene | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string>('');

  const isMobile = useIsMobile();

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.dismiss();
    }
    // Limpiar estados al cerrar
    setSelectedEpisode('');
    setSelectedOption(null);
  };

  const handleEpisodeChange = useCallback((fieldKeyName: string, value: string) => {
    console.log('Episode selected:', value);
    setSelectedEpisode(value);
    // Resetear la escena seleccionada cuando cambia el episodio
    setSelectedOption(null);
  }, []);

  const handleSceneChange = useCallback((fieldKeyName: string, value: Scene | null) => {
    console.log('Scene selected:', value);
    setSelectedOption(value);
  }, []);

  const filteredScenes = useMemo(() => {
    console.log('Filtering scenes for episode:', selectedEpisode);
    if (!selectedEpisode) return [];
    const filtered = listOfScenes.filter((scene: Scene) => scene.episodeNumber === selectedEpisode);
    console.log('Filtered scenes:', filtered);
    return filtered;
  }, [listOfScenes, selectedEpisode]);

  const getUniqueEpisodes = useCallback(() => {
    const episodes = new Set(listOfScenes.map((scene) => scene.episodeNumber)
      .filter((episode) => episode !== null && episode !== undefined));
    return Array.from(episodes)
      .map((episode: any) => ({ value: episode, label: episode }))
      .sort((a, b) => parseInt(a.value) - parseInt(b.value));
  }, [listOfScenes]);

  const episodeInput = useMemo(() => ({
    fieldKeyName: 'episode',
    label: 'Select episode',
    placeholder: 'Select episode',
    selectOptions: getUniqueEpisodes(),
    value: selectedEpisode
  }), [getUniqueEpisodes, selectedEpisode]);

  const sceneInput = useMemo(() => ({
    fieldKeyName: 'scene',
    label: 'Select scene',
    placeholder: 'Select scene',
    selectOptions: filteredScenes.map((scene) => ({
      value: scene,
      label: getSceneHeader(scene),
    })),
    value: selectedOption
  }), [filteredScenes, selectedOption]);

  function getSceneHeader(scene: Scene) {
    const episodeNumber = scene.episodeNumber || '';
    const sceneNumber = scene.sceneNumber || '';
    const intOrExt = scene.intOrExtOption || '';
    const locationName = scene.locationName || '';
    const setName = scene.setName || '';
    const dayOrNight = scene.dayOrNightOption || '';
    const scriptDay = scene.scriptDay || '';
    const year = scene.year || '';

    const sceneHeader = `${parseInt(episodeNumber) > 0 ? (`${episodeNumber}.`) : ''}${sceneNumber} ${intOrExt ? (`${intOrExt}.`) : ''} ${locationName ? (`${locationName}.`) : ''} ${setName}-${dayOrNight}${scriptDay} ${year ? `(${
      year})` : ''}`;

    return sceneHeader.toUpperCase();
  }

  const saveOption = () => {
    if (selectedOption) {
      handleCheckboxToggle(selectedOption);
      closeModal();
    }
  };

  return (
    <IonModal ref={modalRef} trigger={modalTrigger} id="add-scenes-scenes-modal">
      <IonHeader>
        <ModalToolbar
          handleSave={closeModal}
          toolbarTitle={sceneName}
          handleReset={clearSelections}
          handleBack={closeModal}
          showReset={false}
        />
      </IonHeader>
      <IonContent color="tertiary">
        <>
          <IonGrid className="inputs-grid">
            <IonRow>
              <IonCol size="6">
                <CustomSelect
                  input={episodeInput}
                  setNewOptionValue={handleEpisodeChange}
                  enableSearch
                />
              </IonCol>
              <IonCol size="6">
                <CustomSelect
                  input={sceneInput}
                  setNewOptionValue={handleSceneChange}
                  enableSearch
                />
              </IonCol>
            </IonRow>
          </IonGrid>
          <OutlinePrimaryButton
            buttonName="SAVE"
            onClick={saveOption}
            className="ion-margin modal-confirm-button"
          />
          {isMobile && (
            <OutlineLightButton
              buttonName="CANCEL"
              onClick={closeModal}
              className="ion-margin cancel-input-modal-button cancel-button"
            />
          )}
        </>
      </IonContent>
    </IonModal>
  );
};

export default InputModalScene;