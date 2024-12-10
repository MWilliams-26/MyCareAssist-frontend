const BASE_URL = 'http://localhost:3001';

export const Register = async ({ email, password, name }) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const Login = async ({ email, password }) => {
  try {
    // First get all users and find matching credentials
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    
    if (!response.ok) {
      throw new Error('Login failed');
    }

    const users = await response.json();
    const user = users.find(u => u.password === password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
  catch (error) {
    throw error;
  }
};

