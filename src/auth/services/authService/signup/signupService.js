// Handle normal signup
export const handleNormalSignup = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email.toLowerCase().trim(),
        password: userData.password,
        fullName: userData.fullName
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    return {
      success: true,
      data: {
        requiresVerification: true,
        emailSent: data.data?.emailSent ?? false,
        message: data.message
      }
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.message || 'Something went wrong with signup');
  }
}; 