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

export const addDoctor = (doctorData) => {
  return new Promise((resolve, reject) => {
    try {
      const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
      doctors.push(doctorData);
      localStorage.setItem('doctors', JSON.stringify(doctors));
      resolve(doctors);
    } catch (error) {
      reject(error);
    }
  });
};

