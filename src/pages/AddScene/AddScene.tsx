import { IonContent } from '@ionic/react';
import './AddScene.css';
import { useContext, useEffect, useRef, useState } from 'react';
import AddScenesForm from '../../components/AddScene/AddSceneForm';
import useHideTabs from '../../hooks/useHideTabs';
import SecondaryPagesLayout from '../../Layouts/SecondaryPagesLayout/SecondaryPagesLayout';
import { useHistory, useParams } from 'react-router';
import useHandleBack from '../../hooks/useHandleBack';
import { useForm } from 'react-hook-form';
import DatabaseContext from '../../context/database';
import useSuccessToast from '../../hooks/useSuccessToast';
import useErrorToast from '../../hooks/useErrorToast';

const AddScene: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement>(null);
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id);
  const updatedAt = new Date().toISOString();
  const { oneWrapDb } = useContext<any>(DatabaseContext);

  const successMessageToast = useSuccessToast();
  const errorToast = useErrorToast();

  const sceneDefaultValues = {
    projectId,
    id: null,
    episodeNumber: null,
    sceneNumber: null,
    sceneType: null,
    protectionType: null,
    intOrExtOption: null,
    dayOrNightOption: null,
    locationName: null,
    setName: null,
    scriptDay: null,
    year: null,
    synopsis: null,
    page: null,
    pages: null,
    estimatedSeconds: null,
    characters: null,
    extras: null,
    elements: null,
    notes: [],
    updatedAt,
  };

  const [formData, _] = useState<any>(sceneDefaultValues);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({ defaultValues: formData });


  const sceneFormId = 'add-scene-form-id'

  const handleBack = useHandleBack()

  const scrollToTop = () => {
    contentRef.current?.scrollToTop();
  };

  const insertScene = async (formData: any) => {
    try {
      formData.id = `${watch('projectId')}.${watch('episodeNumber')}.${watch('sceneNumber')}`;

      const sceneExists = await oneWrapDb?.scenes.findOne({
        selector: {
          projectId,
          episodeNumber: formData.episodeNumber,
          sceneNumber: formData.sceneNumber,
        },
      }).exec();

      if (sceneExists) {
        errorToast('Scene already exists');
        scrollToTop();
        return;
      }

      console.log('Inserting scene:', formData);
      await oneWrapDb?.scenes.insert(formData);
      successMessageToast("Scene created successfully!");

      reset();
      handleBack();
    } catch (error: any) {
      console.log('Error inserting scene:', error);
      errorToast(error ? error.message : 'Error inserting scene');
      scrollToTop();
    }

    scrollToTop();
  };

  const onSubmit = (formData: any): void => {
    scrollToTop();
    insertScene(formData);
  };

  const handleConfirm = () => {
    scrollToTop();
    handleSubmit(onSubmit)();
  }

  useHideTabs();

  return (
    <SecondaryPagesLayout resetSelections={handleBack} pageTitle="Add Scene" handleConfirm={handleConfirm}>
      <IonContent color="tertiary" ref={contentRef}>
        <AddScenesForm 
          scrollToTop={() => scrollToTop()} 
          editMode= {false} 
          sceneFormId={sceneFormId}
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          reset={reset}
          setValue={setValue}
          watch={watch}
          formData={formData}
          onSubmit={onSubmit}
        />
      </IonContent>
    </SecondaryPagesLayout>
  );
};

export default AddScene;
