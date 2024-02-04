const BASE = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}`;

export const getUserMedicationsEndpoint = (userId) =>
  `${BASE}/medication/medications/${userId}`;

export const putModifyMedicationEndpoint = (medicationId) =>
  `${BASE}/medication/${medicationId}`;

export const putModifyDoseEndpoint = () => `${BASE}/dose/update`;

export const postAddMedicationEndpoint = () => `${BASE}/medication/add`;

export const deleteDoseEndpoint = (doseId) => `${BASE}/dose/${doseId}`;

export const deleteMedicationEndpoint = (medicationId) =>
  `${BASE}/medication/${medicationId}`;
