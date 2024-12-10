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
  return new Promise((resolve, reject) => {
    try {
      // Get existing doctors from localStorage
      const existingDoctors = localStorage.getItem('doctors');
      const doctorsList = existingDoctors ? JSON.parse(existingDoctors) : [];

      // Create new doctor with unique ID
      const newDoctor = {
        _id: Date.now().toString(),
        ...data
      };

      // Add new doctor to the list
      const updatedDoctorsList = [...doctorsList, newDoctor];
      
      localStorage.setItem('doctors', JSON.stringify(updatedDoctorsList));

      resolve({
        newDoctor,
        doctorsList: updatedDoctorsList
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getDoctors = () => {
  return new Promise((resolve, reject) => {
    try {
      const doctors = localStorage.getItem('doctors');
      resolve(doctors ? JSON.parse(doctors) : []);
    } catch (error) {
      reject(error);
    }
  });
};


