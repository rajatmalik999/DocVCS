// Handle normal login
export const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      // Check for email verification error
      if (data.message === 'Please verify your email first') {
        return {
          success: false,
          requiresVerification: true,
          email: email,
          message: data.message
        };
      }
      throw new Error(data.message || 'Login failed');
    }

    return {
      success: true,
      data: {
        user: data.data.user,
        token: data.data.token,
        message: data.message
      }
    };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}; 