export const createDevices = device => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('devices')
      .add({
        ...device,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: 'CREATE_DEVICE_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_DEVICE_ERROR' }, err);
      });
  };
};
