export const getWorkRequests = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('workRequests')
      .get()
      // .where('createdText', '>=', '201902031000')
      // .where('createdText', '<=', '201902041200')
      .then((snapshot) => {
        const value = snapshot.docs;
        dispatch({ type: 'GET_WORK_REQUESTS_SUCCESS', value });
      })
      .catch(err => {
        dispatch({ type: 'GET_WORK_REQUESTS_ERROR', err });
      });
  };
};

export default getWorkRequests;