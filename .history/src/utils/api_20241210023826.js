export const createProfile = (profileData) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      resolve(profileData);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProfile = () => {
  return new Promise((resolve, reject) => {
    try {
      const profile = localStorage.getItem('userProfile');
      resolve(profile ? JSON.parse(profile) : null);
    } catch (error) {
      reject(error);
    }
  });
};

export const addDoctor = (data) => {
  const newDoctor = {
    _id: Date.now().toString(),
    ...data
  };
  
  setDoctors(prevState => {
    const newState = {
      activeDoctor: prevState.doctorsList.length === 0 ? newDoctor : prevState.activeDoctor,
      doctorsList: [...prevState.doctorsList, newDoctor]
    };
    localStorage.setItem('doctors', JSON.stringify(newState.doctorsList));
    return newState;
  });
  closeActiveModal();
};


