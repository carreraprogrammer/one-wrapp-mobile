import React, { useState } from 'react';
import { IonItem, IonButton, IonIcon, IonAlert, IonGrid, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import { add } from 'ionicons/icons';
import AddElementInput from './AddElementInput';

interface AddElementFormProps {
  handleSceneChange: (value: any, field: string) => void;
}

const AddElementForm: React.FC<AddElementFormProps> = ({ handleSceneChange }) => {
  const [categories, setCategories] = useState<string[]>([]);

  const toggleForm = (index: number) => {
    const element = document.getElementById(`element-form-${index}`);
    if (element) {
      element.style.display === 'none' ? element.style.display = 'block' : element.style.display = 'none';
    }
  };

  const handleOk = (inputData: { categoryName: string }) => {
    const inputElement = document.getElementById('add-element-category-input');
    if (inputData.categoryName) {
      setCategories([...categories, inputData.categoryName]);
    }
    if (inputElement) {
      (inputElement as HTMLInputElement).value = '';
    }
  };

  const removeCategory = (categoryName: string) => {
    const updatedCategories = categories.filter(category => category !== categoryName);
    setCategories(updatedCategories);
  };

  return (
    <>
      <IonItem>
        Elements
        <IonButton id="element-category-alert" slot='end'>
          <IonIcon icon={add} />
        </IonButton>
      </IonItem>
      <IonAlert
        trigger='element-category-alert'
        header='Please, enter an element category name'
        buttons={[
          {
            text: 'OK',
            handler: handleOk
          }
        ]}
        inputs={[
          {
            name: 'categoryName',
            type: 'text',
            placeholder: 'Element Category Name',
            id: 'add-element-category-input'
          }
        ]}
      ></IonAlert>

      {categories.length > 0 && 
        <IonGrid>
          {categories.map((category, index) => (
            <IonCard key={index}>
              <IonCardHeader className='ion-flex'>
                <div className='ion-flex ion-justify-content-between'>
                  <IonCardContent>
                    {category}
                  </IonCardContent>
                  <IonButton 
                    size='small' 
                    onClick={() => {toggleForm(index)}}
                  >
                    <IonIcon icon={add} />
                  </IonButton>
                </div>
                <IonCardContent>
                  <AddElementInput
                    categoryName={category}
                    id={index}
                    toggleForm={toggleForm}
                    handleSceneChange={handleSceneChange}
                  />
                </IonCardContent>
              </IonCardHeader>
            </IonCard>  
          ))}
        </IonGrid>
      }
    </>
  );
};

export default AddElementForm;
