// Google Sign-In initialization
export const initializeGoogleSignIn = (callback, context = 'signup') => {
  if (!window.google) {
    throw new Error('Google Sign-In is not available');
  }

  window.google.accounts.id.initialize({
    client_id: "1026034210243-nvg4chvhju3tl43jjsbch3otg9rr120m.apps.googleusercontent.com",
    callback,
    auto_select: false,
    cancel_on_tap_outside: true,
    context,
    ux_mode: 'popup',
    flow: 'implicit'
  });

  window.google.accounts.id.renderButton(
    document.getElementById('googleSignInButton'),
    { 
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: context === 'signup' ? 'signup_with' : 'signin_with',
      shape: 'rectangular',
      width: '300'
    }
  );
};


// Handle Google Sign-In response
export const handleGoogleSignupResponse = async (response) => {
  try {
    const result = await response.credential;
    const apiResponse = await fetch('http://localhost:3000/api/user/google-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: result })
    });
    const data = await apiResponse.json();

    if (!data.success) {
      throw new Error(data.message || 'Google signup failed');
    }

    if (!data.data?.user || !data.data?.token) {
      throw new Error('Invalid response from server');
    }

    return {
      success: true,
      data: {
        user: {
          id: data.data.user.id,
          email: data.data.user.email,
          fullName: data.data.user.name,
          picture: data.data.user.picture,
          isVerified: true,
          createdAt: data.data.user.createdAt || new Date().toISOString()
        },
        token: data.data.token,
        message: data.message
      }
    };
  } catch (error) {
    throw new Error(error.message || 'Something went wrong with Google authentication');
  }
};

// Handle Google Login
export const handleGoogleLogin = async (response) => {
  try {
    const result = await response.credential;
    const apiResponse = await fetch('http://localhost:3000/api/user/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: result })
    });
    const data = await apiResponse.json();

    if (!data.success) {
      if (data.data && data.data.isRegistered === false) {
        // If account is not registered, attempt to sign up instead
        const signupResponse = await fetch('http://localhost:3000/api/user/google-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: result })
        });

        const signupData = await signupResponse.json();

        if (!signupData.success) {
          throw new Error(signupData.message || 'Google signup failed');
        }

        return {
          success: true,
          isNewUser: true,
          data: {
            user: signupData.data.user,
            token: signupData.data.token,
            message: signupData.message
          }
        };
      }
      throw new Error(data.message || 'Google login failed');
    }

    return {
      success: true,
      isNewUser: false,
      data: {
        user: data.data.user,
        token: data.data.token,
        message: data.message
      }
    };
  } catch (error) {
    throw new Error(error.message || 'Something went wrong with Google authentication');
  }
}; 