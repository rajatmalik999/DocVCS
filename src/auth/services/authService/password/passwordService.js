// Request password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await fetch('http://localhost:3000/api/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    });

    const data = await response.json();

    return {
      success: data.success,
      message: data.message,
      data: data.data || null
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Something went wrong with password reset request',
      data: null
    };
  }
};

// Reset password
export const resetPassword = async (resetToken, newPassword) => {
  try {
    const response = await fetch('http://localhost:3000/api/user/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resetToken, newPassword }),
    });

    const data = await response.json();

    return {
      success: data.success,
      message: data.message,
      data: data.data || null
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Something went wrong with password reset',
      data: null
    };
  }
};

// Verify reset OTP
export const verifyResetOtp = async (email, otp) => {
  try {
    const response = await fetch('http://localhost:3000/api/user/verify-reset-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    return {
      success: data.success,
      message: data.message,
      data: data.data || null
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Something went wrong with OTP verification',
      data: null
    };
  }
}; 