import React from 'react'
import { AdvanceCallsSection, HospitalsSection, LocationsSection, MealsSection, Section } from '../InfoView/InfoView'
import { mergedSceneShoot, ShootingDataProps } from '../../../../pages/ShootingDetail/ShootingDetail';
import { FormInput } from '../../../Shared/EditionModal/EditionModal';
import { LocationInfo, Meal } from '../../../../interfaces/shooting.types';
import './WrapReportView.css'
import ScriptReportView from '../ScriptReportView/ScriptReportView';
import CallSheet from '../../../../pages/CallSheet/CallSheet';
import ShootingBasicInfo from '../../ShootingBasicInfo/ShootingBasicInfo';

interface WrapReportViewProps {
  shootingData: ShootingDataProps;
  updateShootingTime: any;
  setOpenLocations: React.Dispatch<React.SetStateAction<boolean>>;
  openLocations: boolean;
  setLocationsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  locationsEditMode: boolean;
  openMapModal: () => void;
  removeLocation: (location: LocationInfo) => void;
  setOpenHospitals: React.Dispatch<React.SetStateAction<boolean>>;
  openHospitals: boolean;
  openHospitalsMapModal: () => void;
  setOpenAdvanceCalls: React.Dispatch<React.SetStateAction<boolean>>;
  openadvanceCalls: boolean;
  setAdvanceCallsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  advanceCallsEditMode: boolean;
  openAdvanceCallModal: (e: React.MouseEvent) => void;
  getHourMinutesFomISO: (isoString: string) => string;
  deleteAdvanceCall: (call: any) => void;
  advanceCallInputs: any; // Tipo más específico si está disponible
  handleEditAdvanceCall: (call: any) => void;
  setOpenMeals: React.Dispatch<React.SetStateAction<boolean>>;
  openMeals: boolean;
  setMealsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  mealsEditMode: boolean;
  openMealModal: (e: React.MouseEvent) => void;
  deleteMeal: (meal: Meal) => void;
  mealInputs: FormInput[];
  handleEditMeal: (meal: Meal) => void;
  mergedScenesShoot: mergedSceneShoot[]
  editMode: boolean
  setMergedScenesShoot: (mergedScenesShoot: mergedSceneShoot[]) => void
  saveScriptReport: () => void
}

const WrapReportView: React.FC<WrapReportViewProps> = ({
  shootingData,
  updateShootingTime,
  setOpenLocations,
  openLocations,
  setLocationsEditMode,
  locationsEditMode,
  openMapModal,
  removeLocation,
  setOpenHospitals,
  openHospitals,
  openHospitalsMapModal,
  setOpenAdvanceCalls,
  openadvanceCalls,
  setAdvanceCallsEditMode,
  advanceCallsEditMode,
  openAdvanceCallModal,
  getHourMinutesFomISO,
  deleteAdvanceCall,
  advanceCallInputs,
  handleEditAdvanceCall,
  setOpenMeals,
  openMeals,
  setMealsEditMode,
  mealsEditMode,
  openMealModal,
  deleteMeal,
  mealInputs,
  handleEditMeal,
  mergedScenesShoot,
  editMode,
  setMergedScenesShoot,
  saveScriptReport
}) => {
  const [openScenes, setOpenScenes] = React.useState(true);
  const [scriptReportEditMode, setScriptReportEditMode] = React.useState(false);
  return (
    <div className='wrap-report-view'>
      <div className='section-wrapper scenes-table'>
        <ShootingBasicInfo
          shootingInfo={shootingData.shotingInfo}
          updateShootingTime={updateShootingTime}
        />
      </div>
      <div className='section-wrapper'>
        <LocationsSection
          locations={shootingData.shotingInfo.locations}
          open={openLocations}
          setOpen={setOpenLocations}
          editMode={locationsEditMode}
          setEditMode={setLocationsEditMode}
          onAddClick={openMapModal}
          removeLocation={removeLocation}
        />
      </div>
      <div className='section-wrapper'>
        <HospitalsSection
          hospitals={shootingData.shotingInfo.hospitals}
          open={openHospitals}
          setOpen={setOpenHospitals}
          onAddClick={openHospitalsMapModal}
        />
      </div>
      <div className='section-wrapper'>
        <AdvanceCallsSection
          advanceCalls={shootingData.shotingInfo.advanceCalls}
          open={openadvanceCalls}
          setOpen={setOpenAdvanceCalls}
          editMode={advanceCallsEditMode}
          setEditMode={setAdvanceCallsEditMode}
          onAddClick={openAdvanceCallModal}
          getHourMinutesFomISO={getHourMinutesFomISO}
          deleteAdvanceCall={deleteAdvanceCall}
          advanceCallInputs={advanceCallInputs}
          handleEditAdvanceCall={handleEditAdvanceCall}
        />
      </div>
      <div className='section-wrapper'>
        <MealsSection
          meals={shootingData.shotingInfo.meals}
          open={openMeals}
          setOpen={setOpenMeals}
          editMode={mealsEditMode}
          setEditMode={setMealsEditMode}
          onAddClick={openMealModal}
          getHourMinutesFomISO={getHourMinutesFomISO}
          deleteMeal={deleteMeal}
          mealInputs={mealInputs}
          handleEditMeal={handleEditMeal}
        />
      </div>
      <div className='section-wrapper scenes-table'>
        <Section 
          title='Scenes'
          open={openScenes}
          setOpen={setOpenScenes}
          editMode={scriptReportEditMode}
          setEditMode={setScriptReportEditMode}
          onAddClick={() => {}}
          saveAfterEdit={true}
          saveFunction={saveScriptReport}
        >
          <ScriptReportView
            mergedScenesShoot={mergedScenesShoot}
            editMode={scriptReportEditMode}
            setMergedScenesShoot={setMergedScenesShoot}
          />
        </Section>
      </div>
      <div className='section-wrapper scenes-table'>
        <CallSheet isSection={true} />
      </div>
    </div>
  )
}

export default WrapReportView