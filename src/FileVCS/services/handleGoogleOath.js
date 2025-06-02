const CLIENT_ID = '1026034210243-nvg4chvhju3tl43jjsbch3otg9rr120m.apps.googleusercontent.com';
const REDIRECT_URI_BASE = 'http://localhost:3000/api/access/oauth/google/handlecallback';
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/presentations'
].join(' ');

export function handleGoogleOauth(userId, popup = null) {
  // Add userId to state
  const state = encodeURIComponent(JSON.stringify({ userId }));

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI_BASE)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&access_type=offline&prompt=consent&state=${state}`;

  if (popup) {
    popup.location.href = googleAuthUrl;
  } else {
    window.location.href = googleAuthUrl;
  }

  // Set up message listener for popup window
  if (popup) {
    const messageListener = (event) => {
      if (event.origin === window.location.origin && event.data.type === 'oauth_complete') {
        popup.close();
        window.removeEventListener('message', messageListener);
        // Refresh the page or update the UI as needed
        window.location.reload();
      }
    };
    window.addEventListener('message', messageListener);
  }
}