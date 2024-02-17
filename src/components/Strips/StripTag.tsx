import { IonButton, IonIcon } from '@ionic/react';
import React, { useContext } from 'react';
import './StripTag.scss';
import { close, closeCircleOutline } from 'ionicons/icons';
import ScenesContext from '../../context/ScenesContext';

interface StripTagProps {
  tagKey: string;
  filterOption: string;
}

const StripTag: React.FC<StripTagProps> = ({ tagKey, filterOption }) => {
  const { selectedFilterOptions, setSelectedFilterOptions } = useContext(ScenesContext);

  interface SelectedFilterOptionsInterface {
    [key: string]: any[];
  }

  const clearOption = (filterTag: string, filterOptions: SelectedFilterOptionsInterface) => {
    Object.entries(filterOptions).forEach(([key, value]) => {
      if (value.every((val: any[]) => typeof val === 'string')) {
        if(value.length  <= 1) {
          const newFilterOptions: SelectedFilterOptionsInterface = {
            ...filterOptions
          }

          delete newFilterOptions[key]

          setSelectedFilterOptions({
            ...newFilterOptions
          })
        } else {
          const filteredOptionArray = filterOptions[key].filter((option) => {
            return option !== filterTag
          })

          setSelectedFilterOptions({
            ...filterOptions,
            [key]: filteredOptionArray
          })
        }
      } else if(value.every((val: any) => typeof val === 'object')) {
        value.forEach((val: any) => {

          const newSubArray = value.filter((option) => option !== val)

          Object.entries(val).forEach(([subKey, subValue]: any[]) => {
            console.log()
            if(subValue.length <= 1) {

              if(newSubArray.length <= 1) {
                const newFilterOptions = {
                  ...filterOptions
                }

                delete newFilterOptions[key]

                setSelectedFilterOptions({
                  ...newFilterOptions
                })
              }
            } else {
              const newSubArray = subValue.filter((option: string) => option !== filterTag)
              const subValueIndex = value.findIndex(({key, array}) => array === subValue )
              value[subValueIndex] = newSubArray

              const newFilterOptions = {
                ...filterOptions
              }

              const objectIndex = newFilterOptions[key].findIndex((option) => {
                return option === val
              })

              newFilterOptions[key][objectIndex][subKey] = newSubArray

              console.log('NEW FILTER OPTIONS',newFilterOptions)

              setSelectedFilterOptions(
                newFilterOptions
              )
            }
          })
        })
      }
    });
  };

  return (
    <div key={tagKey} className="filter-tag-container">
      <p className=' ion-no-padding ion-no-margin'>{filterOption.toUpperCase()}</p>
      <IonButton onClick={() => clearOption(filterOption, (selectedFilterOptions as SelectedFilterOptionsInterface))} fill='clear' color='danger' className='ion-no-padding'>
        <IonIcon icon={close} />
      </IonButton>
    </div>
  );
};

export default StripTag;
