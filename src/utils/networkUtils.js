const BASE = `${process.env.REACT_APP_API_URL}`;
// const BASE = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}`;

export const getUserMedicationsEndpoint = (userId) =>
  `${BASE}/medication/medications/${userId}`;

export const putModifyMedicationEndpoint = (medicationId) =>
  `${BASE}/medication/${medicationId}`;

export const putModifyDoseEndpoint = () => `${BASE}/dose/update`;

export const postAddMedicationEndpoint = () => `${BASE}/medication/add`;

export const deleteDoseEndpoint = (doseId) => `${BASE}/dose/${doseId}`;

export const deleteMedicationEndpoint = (medicationId) =>
  `${BASE}/medication/${medicationId}`;

export const postRegisterEndpoint = () => `${BASE}/user/register`;

export const postLoginEndpoint = () => `${BASE}/user/login`;

export const getCurrentUserEndpoint = () => `${BASE}/user/current`;

export const postWebPushEndpoint = () => `${BASE}/user/webpush`;

export const deleteUserEndpoint = () => `${BASE}/user/delete`;

export const putEditUserEndpoint = () => `${BASE}/user/edit`;
