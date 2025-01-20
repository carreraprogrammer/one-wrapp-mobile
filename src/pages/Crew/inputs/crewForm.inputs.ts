import { FormInput } from "../../../components/Shared/EditionModal/EditionModal";

  export const crewFormInputs: (departmentsOptions: { label: string, value: string }[], countryOptions: { label: string, value: string }[], unitsOptions: { label: string, value: string }[]) => FormInput[] = (departmentsOptions, countryOptions, unitsOptions) => [
    {
      fieldKeyName: 'department',
      label: 'Department',
      type: 'text',
      required: true,
      placeholder: 'Enter department',
      selectOptions: departmentsOptions,
      col: '12',
    },
    {
      fieldKeyName: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name',
      col: '12',
    },
    {
      fieldKeyName: 'position',
      label: 'Job Title',
      type: 'text',
      required: true,
      placeholder: 'Enter position',
      col: '6',
    },
    {
      fieldKeyName: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter email',
      col: '6',
    },
    {
      fieldKeyName: 'countryId',
      label: 'Country',
      type: 'select',
      required: true,
      selectOptions: countryOptions,
      placeholder: 'Select country',
      col: '3',
    },
    {
      fieldKeyName: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone',
      col: '9',
    },
    {
      fieldKeyName: 'unitIds',
      label: 'Unit',
      type: 'select',
      required: true,
      selectOptions: unitsOptions,
      placeholder: 'Select unit',
      multiple: true,
      col: '6',
    },
    {
      fieldKeyName: 'order',
      label: 'Order',
      type: 'number',
      required: true,
      placeholder: 'Enter order',
      col: '6',
    },
    {
      fieldKeyName: 'visibleOnCall',
      label: 'VISIBLE ON CALL',
      type: 'checkbox',
      required: false,
      placeholder: 'VISIBLE ON CALL',
    },
    {
      fieldKeyName: 'visibleOnHeader',
      label: 'CALL SHEET HEADER',
      type: 'checkbox',
      required: false,
      placeholder: 'CALL SHEET HEADER',
    },
    {
      fieldKeyName: 'onCall',
      label: 'ALWAYS ON CALL',
      type: 'checkbox',
      required: false,
      placeholder: 'ALWAYS ON CALL',
    },
    {
      fieldKeyName: 'dailyReportSignature',
      label: 'REPORT SIGNATURE',
      type: 'checkbox',
      required: false,
      placeholder: 'REPORT SIGNATURE',
    },
    {
      fieldKeyName: 'emergencyContact',
      label: 'EMERGENCY CONTACT',
      type: 'checkbox',
      required: false,
      placeholder: 'EMERGENCY CONTACT',
    },
  ];