const BASE_URL = 'http://localhost:3001';

// Mock database - keeping the same error handling and response structure
const mockUsers = [
  {
    id: 1,
    email: "demo@mycareassist.com",
    password: "demo123",
    name: "Demo User"
  }
];

export const Register = async ({ email, password, name }) => {
  try {














    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = {
      id: Date.now(),
      email,
      name,
      password
    };
    
    mockUsers.push(newUser);
    return newUser;
  } catch (error) {

    throw new Error('Registration failed');
  }
};

export const Login = async ({ email, password }) => {
  try {


    await new Promise(resolve => setTimeout(resolve, 800));
    







    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
  catch (error) {
    throw error;
  }
};
