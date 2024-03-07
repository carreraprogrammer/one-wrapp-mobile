import React, { useContext } from 'react';
import {
  IonItemSliding,
  IonItemOptions,
  IonButton,
  IonIcon,
  IonItem,
  IonTitle,
  useIonToast,
} from '@ionic/react';
import HighlightedText from '../../components/Shared/HighlightedText/HighlightedText';
import './ElementCard.scss';
import secondsToMinSec from '../../utils/secondsToMinSec';
import floatToFraction from '../../utils/floatToFraction';
import { FiTrash } from 'react-icons/fi';
import { banOutline, checkmarkCircle, pencilOutline } from 'ionicons/icons';
import DropDownButton from '../Shared/DropDownButton/DropDownButton';
import useIsMobile from '../../hooks/useIsMobile';
import EditionModal from '../Shared/EditionModal/EditionModal';
import DatabaseContext from '../../context/database';
import useErrorToast from '../../hooks/useErrorToast';
import InputAlert from '../Shared/InputAlert/InputAlert';

interface Element {
  elementName: string;
  elementsQuantity: number;
  scenesQuantity: number;
  protectionQuantity: number;
  pagesSum: number;
  estimatedTimeSum: number;
  episodesQuantity: number;
  participation: string;
  category: string;
  categoryName: string;
  elementCategory?: string;
}

interface ElementCardProps {
  data: Element;
  searchText: string;
  section: 'category' | 'element';
  isOpen?: boolean;
  onClick?: () => void;
  elementsQuantity?: number;
}

const InfoLabel: React.FC<{ label: string, value: string | number, symbol?: string}> = ({ label, value, symbol }) => (
  <p className="info-label">
    <span className="value-part">
      {value}
      <span className="symbol-part">{symbol}</span>
    </span>
    <span className="label-part">{label}</span>
  </p>
);

const ElementCard: React.FC<ElementCardProps> = ({ data, searchText, section, isOpen = false, onClick, elementsQuantity }) => {
  const isMobile = useIsMobile();
  const { oneWrapDb } = useContext<any>(DatabaseContext);

  const [presentToast] = useIonToast();

  const successMessageSceneToast = (message: string) => {
    presentToast({
      message,
      duration: 2000,
      icon: checkmarkCircle,
      position: 'top',
      cssClass: 'success-toast',
    });
  };

  const errorToast = useErrorToast();
  
  const divideIntegerFromFraction = (value: string) => {
    const [integer, fraction] = value.split(' ');
    return {
      integer,
      fraction,
    };
  };

  const fraction = floatToFraction(data.pagesSum);

  const fractionPart = divideIntegerFromFraction(fraction).fraction;
  const integerPart = divideIntegerFromFraction(fraction).integer;

  const divideMinutesFromSeconds = (value: string) => {
    const [minutes, seconds] = value.split(':');
    return {
      minutes,
      seconds,
    };
  };

  const minutesSeconds = secondsToMinSec(data.estimatedTimeSum);

  const { minutes } = divideMinutesFromSeconds(minutesSeconds);
  const { seconds } = divideMinutesFromSeconds(minutesSeconds);

  const elementName = () => {
    if(data.elementName) {
      if(data.elementName.length > 2) {
        return data.elementName
      }

      return 'N/A'
    }
  }

  const scenesToEditWithElement = () => oneWrapDb.scenes.find({
    selector: {
      'elements.elementName': data.elementName,
    }
  }).exec();

  const scenesToEditWithCategory = () => oneWrapDb.scenes.find({
    selector: {
      'elements.categoryName': data.categoryName,
    }
  }).exec()

  const formElementInputs = [
    {
      label: 'Element Name',
      type: 'text',
      fieldName: 'elementName',
      placeholder: 'INSERT',
      required: true,
      inputName: 'add-element-name-input',
    },
  ]

  const formCategoryInputs = [
    {
      label: 'Category Name',
      type: 'text',
      fieldName: 'categoryName',
      placeholder: 'INSERT',
      required: true,
      inputName: 'add-category-name-input',
    },
  ]

  const defaultFormValuesForElements = {
    elementName: data.elementName,
  }

  const defaultFormValuesForCategories = {
    categoryName: data.categoryName,
  }

  const editElement = async (newElement: any) => {
    try {
      const scenes = await scenesToEditWithElement();
      const updatedScenes: any = [];
  
      scenes.forEach((scene: any) => {
        const updatedScene = { ...scene._data };

        newElement.categoryName = data.elementCategory;
  
        updatedScene.elements = updatedScene.elements.filter((el: any) => el.elementName !== data.elementName).concat(newElement);
        
        updatedScenes.push(updatedScene);
      });

      const result = await oneWrapDb.scenes.bulkUpsert(updatedScenes);
  
      console.log('Bulk update result:', result);
  
      console.log('Character deleted');

      successMessageSceneToast(`${data.elementName ? data.elementName.toUpperCase() : 'NO NAME'} was successfully updated!`);

    } catch (error) {
      console.error(error);
    }
  }

  const deleteElement = async () => {
    try {
      const scenes = await scenesToEditWithElement();
      const updatedScenes: any = [];
  
      scenes.forEach((scene: any) => {
        const updatedScene = { ...scene._data };
  
        updatedScene.elements = updatedScene.elements.filter((el: any) => el.elementName !== data.elementName);
        
        console.log('Updated Scene:', updatedScene);
        
        updatedScenes.push(updatedScene);
      });

      const result = await oneWrapDb.scenes.bulkUpsert(updatedScenes);
  
      console.log('Bulk update result:', result);
  
      console.log('Element deleted');

      successMessageSceneToast(`${data.elementName ? data.elementName.toUpperCase() : 'NO NAME'} was successfully deleted from all scenes!`);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCategory = async () => {
    try {
      const scenes = await scenesToEditWithCategory();
      const updatedScenes: any = [];
  
      scenes.forEach((scene: any) => {
        const updatedScene = { ...scene._data };
  
        updatedScene.elements = updatedScene.elements.filter((el: any) => el.categoryName !== data.categoryName);
        
        console.log('Updated Scene:', updatedScene);
        
        updatedScenes.push(updatedScene);
      });

      const result = await oneWrapDb.scenes.bulkUpsert(updatedScenes);
  
      console.log('Bulk update result:', result);
  
      console.log('Category deleted');

      successMessageSceneToast(`${data.categoryName ? data.categoryName.toUpperCase() : 'N/A'} was successfully deleted from all scenes!`);
    } catch (error) {
      console.error(error);
    }
  }

  const editCategory = async (newCategory: any) => {
    try {
      const scenes = await scenesToEditWithCategory();
      const updatedScenes: any = [];
  
      scenes.forEach((scene: any) => {
        const updatedScene = { ...scene._data };

        const newElements: any[] = []
  
        updatedScene.elements.forEach((el: any) => {
          const newElement = { ...el };
          if(el.categoryName === data.categoryName) {
            newElement.categoryName = newCategory.categoryName;
          }
          newElements.push(newElement);
        })

        updatedScene.elements = newElements;
        
        updatedScenes.push(updatedScene);
      });

      const result = await oneWrapDb.scenes.bulkUpsert(updatedScenes);
  
      console.log('Bulk update result:', result);
  
      console.log('Character deleted');

      successMessageSceneToast(`${data.categoryName ? data.categoryName.toUpperCase() : 'NO NAME'} was successfully updated!`);

    } catch (error: any) {
      console.error(error);
      errorToast(error ? error : 'Error updating category');
    }
  }

  return (
    <IonItemSliding onClick={onClick}>
      <IonItem mode="md" className="element-card ion-no-margin ion-no-padding ion-nowrap" color="tertiary">
        <div className={"element-card-wrapper" + ' ' + section}>
          <div color="dark" className="element-card-header">
            <IonTitle className="element-card-header-title">
              <HighlightedText
                text={elementName() || (data.categoryName + ' (' + elementsQuantity + ')') || ''}
                searchTerm={searchText}
              />
            </IonTitle>
            {
              section === 'category' &&
              isMobile &&
              <DropDownButton open={isOpen} />
            }
            {/* {section === 'element' && (
              <p className="element-card-header-subtitle">
                {data.category ? data.category.toUpperCase() : 'NO CATEGORY'}
              </p>
            )} */}
          </div>
          <div className="element-card-content">
            <InfoLabel label='SCN.' value={data.scenesQuantity} />
            <InfoLabel label='PROT.' value={data.protectionQuantity} />
            <InfoLabel label="PAGES" value={integerPart} symbol={fractionPart} />
            <InfoLabel label="TIME" value={minutes} symbol={`:${seconds}`} />
            <InfoLabel label="EP" value={data.episodesQuantity} />
            <InfoLabel label="PART." value={`${data.participation}%`} />
            {
              section === 'category' && 
              !isMobile &&
              <DropDownButton open={isOpen} />
            }
          </div>
        </div>
      </IonItem>
      <IonItemOptions className="element-card-item-options">
        <div className="buttons-wrapper">
          <IonButton fill="clear" id={section === 'category' ? `edit-category-${data.categoryName}` : `edit-element-${data.elementName}`}>
            <IonIcon icon={pencilOutline} className="button-icon view" />
          </IonButton>
          <IonButton fill="clear" onClick={() => section === 'category' ? scenesToEditWithCategory().then((values: any) => console.log(values)) : scenesToEditWithElement().then((values: any)  => console.log(values))}>
            <IonIcon icon={banOutline} className="button-icon ban" />
          </IonButton>
          <IonButton fill="clear" id={section === 'category' ? `delete-category-${data.categoryName}` : `delete-element-${data.elementName}`}>
            <FiTrash className="button-icon trash" />
          </IonButton>
        </div>
      </IonItemOptions>

      <EditionModal
        formInputs={section === 'category' ? formCategoryInputs : formElementInputs}
        handleEdition={section === 'category' ? editCategory : editElement}
        modalTrigger={section === 'category' ? `edit-category-${data.categoryName}` : `edit-element-${data.elementName}`}
        title='Edit Element'
        defaultFormValues={section === 'category' ? defaultFormValuesForCategories : defaultFormValuesForElements}
      />

      <InputAlert
        header="Delete Category"
        message={`Are you sure you want to delete ${data.categoryName ? data.categoryName.toUpperCase() : 'N/A'} category from all the scenes? This will also delete all the elements inside this category.`}
        handleOk={() => deleteCategory()}
        inputs={[]}
        trigger={`delete-category-${data.categoryName}`}
      />

      <InputAlert
        header="Delete Element"
        message={`Are you sure you want to delete ${data.elementName ? data.elementName.toUpperCase() : 'NO NAME'} element from all the scenes?`}
        handleOk={() => deleteElement()}
        inputs={[]}
        trigger={`delete-element-${data.elementName}`}
      />

    </IonItemSliding>
  );
};

export default ElementCard;