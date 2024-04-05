export const handleError = (error) => {
  let errorMessage;
  if (error.response) {
    errorMessage = error.response.data;
  }  else if (error.response) {
    errorMessage = error.response.statusText;
  } else if ( error.response) {
    errorMessage = error.response.data.error;
  }  else if (error.message) {
    errorMessage = 'No se pudo conectar al servidor';
  } else if (error.request) {
    errorMessage = 'No se pudo conectar al servidor';
  } else {
    errorMessage = error.errorMessage || 'Error desconocido';
  }
  return errorMessage;
}