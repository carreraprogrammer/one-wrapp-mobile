// import sceneData from '../../data/scn_data.json';

// each selected sort option is a criteria, and each CRITERIA is an array with the following structure:
// [CRITERIAKEY, ASCENDING/DESCENDING, SORTORDER]
// SORT ORDER IS THE ORDER IN WHICH THE CRITERIA IS APPLIED

const sortBySceneNumber = (a: any, b: any, criteriaOrder: string) => {
  const [aNumber, aLetter] = a.match(/(\d+)([A-Z]*)/).slice(1);
  const [bNumber, bLetter] = b.match(/(\d+)([A-Z]*)/).slice(1);

  // Convert aNumber and bNumber into integer numbers
  const aNumberInt = parseFloat(aNumber);
  const bNumberInt = parseFloat(bNumber);

  // Sort first by number and then by letter
  if (aNumberInt !== bNumberInt) {
    return criteriaOrder === 'asc' ? aNumberInt - bNumberInt : bNumberInt - aNumberInt;
  }
  // If numbers are equal, sort by letter (if any)
  if (aLetter && bLetter) {
    return criteriaOrder === 'asc' ? aLetter.localeCompare(bLetter) : bLetter.localeCompare(aLetter);
  } if (!aLetter && bLetter) {
    return criteriaOrder === 'asc' ? -1 : 1;
  } if (aLetter && !bLetter) {
    return criteriaOrder === 'asc' ? 1 : -1;
  }
  return 0;
};

// "1.1A"

const applySortCriteria = (data: any, criteria: any) => {
  const [criteriaKey, criteriaOrder] = criteria;
  if (criteriaKey === 'sceneNumber') {
    return data.sort((a: any, b: any) => sortBySceneNumber(a.sceneNumber, b.sceneNumber, criteriaOrder));
  }

  if (criteriaKey === 'characterNum') {
    return data.sort((a: any, b: any) => {
      const aNumber = a.characterNum ? a.characterNum.split('.')[0] : '';
      const bNumber = b.characterNum ? b.characterNum.split('.')[0] : '';

      if (aNumber === '' && bNumber === '') {
        return 0;
      } else if (aNumber === '') {
        return criteriaOrder === 'asc' ? 1 : -1;
      } else if (bNumber === '') {
        return criteriaOrder === 'asc' ? -1 : 1;
      } else {
        return criteriaOrder === 'asc' ? aNumber - bNumber : bNumber - aNumber;
      }
    });
  }

  return data.sort((a: any, b: any) => {
    const aValue = !Number.isNaN(Number.parseFloat(a[criteriaKey])) ? Number.parseFloat(a[criteriaKey]) : a[criteriaKey];
    const bValue = !Number.isNaN(Number.parseFloat(b[criteriaKey])) ? Number.parseFloat(b[criteriaKey]) : b[criteriaKey];

    if (aValue < bValue) {
      return criteriaOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return criteriaOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

const orderSortOptions = (selectedSortOptions: any[]) => {
  selectedSortOptions.sort((a, b) => {
    const aOptionIndex = a[2];
    const bOptionIndex = b[2];
    return bOptionIndex - aOptionIndex;
  });
};

const sortByCriterias = (data: any, criterias: any) => {
  orderSortOptions(criterias);
  return criterias.reduce((acc: any, criteria: any) => applySortCriteria(acc, criteria), data);
};

export default sortByCriterias;

// EXAMPLE

// THE FIRST CRITERIA APPLIED IS THE LAST ONE IN THE ARRAY, AND FOR THAT REASON IT HAS THE HIGHEST SORT ORDER

// const scenes = [...sceneData.scenes];
// const sortCriteria = [['dayOrNightOption', 'desc']];

// CHECK DAY OR NIGHT OPTION

// const sortedScenes = sortScenes(scenes, sortCriteria);

// // console.log('UTILS DISPLAY', sortedScenes);