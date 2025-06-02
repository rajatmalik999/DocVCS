# Auth Module Test Scenarios

## 1. Signup

### Positive
- [ ] User can sign up with valid email, strong password, and all required fields.
- [ ] User receives a success message and a verification email after signup.

### Negative
- [ ] User cannot sign up with an already registered email (should see backend error message).
- [ ] User cannot sign up with invalid email format.
- [ ] User cannot sign up with a weak password (less than 8 chars, no symbol/number).
- [ ] User cannot sign up with missing required fields.
- [ ] User cannot sign up if backend is down (should see backend error message).

### Edge/Security
- [ ] User cannot sign up with script injection in any field (XSS prevention).
- [ ] User cannot sign up with whitespace-only fields.

---

## 2. Email Verification

### Positive
- [ ] User can verify their email with a valid OTP/code.
- [ ] User is redirected to login after successful verification.

### Negative
- [ ] User cannot verify with an invalid or expired OTP/code (should see backend error message).
- [ ] User cannot verify with empty OTP/code field.
- [ ] User cannot verify with a code for a different email.

### Edge/Security
- [ ] User cannot brute-force OTP (rate limiting or lockout after several attempts).
- [ ] User cannot use the same OTP twice.

---

## 3. Login

### Positive
- [ ] User can log in with correct email and password.
- [ ] User is redirected to the dashboard/home after login.

### Negative
- [ ] User cannot log in with incorrect password (should see backend error message).
- [ ] User cannot log in with unregistered email.
- [ ] User cannot log in if email is not verified (should see backend error message).
- [ ] User cannot log in with empty fields.

### Edge/Security
- [ ] User cannot log in with SQL/script injection in fields.
- [ ] User is locked out after multiple failed attempts (if implemented).

---

## 4. Google/Social Login

### Positive
- [ ] User can log in with Google and is redirected appropriately.
- [ ] User is prompted to complete registration if Google account is not linked.

### Negative
- [ ] User cannot log in with revoked Google access (should see backend error message).
- [ ] User cannot log in if Google returns an error.

---

## 5. Forgot Password

### Positive
- [ ] User can request a password reset OTP with a registered email and receives a success message.
- [ ] User can request OTP resend and receives a success message.

### Negative
- [ ] User cannot request OTP with an unregistered email (should see generic message).
- [ ] User cannot request OTP with invalid email format.
- [ ] User cannot request OTP with empty email field.

### Edge/Security
- [ ] User cannot determine if an email is registered based on the response.
- [ ] User cannot request OTP repeatedly in a short time (rate limiting).

---

## 6. OTP Verification (Forgot Password)

### Positive
- [ ] User can verify OTP with correct code and is allowed to reset password.

### Negative
- [ ] User cannot verify with invalid or expired OTP (should see backend error message).
- [ ] User cannot verify with empty OTP field.

### Edge/Security
- [ ] User cannot brute-force OTP (rate limiting or lockout after several attempts).

---

## 7. Reset Password

### Positive
- [ ] User can reset password with valid token and strong password.
- [ ] User is redirected to login after successful reset.

### Negative
- [ ] User cannot reset password with invalid or expired token (should see backend error message).
- [ ] User cannot reset password if new passwords do not match.
- [ ] User cannot reset password with weak password.
- [ ] User cannot reset password with empty fields.

### Edge/Security
- [ ] User cannot reuse the same reset token.
- [ ] User cannot reset password for another user with a stolen token.

---

## 8. Auth Context & State

### Positive
- [ ] Auth context updates on login, logout, and signup.
- [ ] User state persists across page reloads (if using localStorage/session).
- [ ] User is redirected to protected routes only if authenticated.

### Negative
- [ ] User is redirected to login if accessing protected routes while unauthenticated.

---

## 9. UI/UX

### General
- [ ] All popups show only backend-provided messages for both success and error.
- [ ] Loader appears during async actions (login, signup, reset, etc).
- [ ] All forms validate required fields before submission.
- [ ] Password fields toggle visibility.
- [ ] All navigation links (login, signup, forgot password, etc) work as expected.

---

## 10. Security

- [ ] No sensitive information is leaked in error messages.
- [ ] Passwords are never logged or shown in UI.
- [ ] Email existence is not revealed in forgot password flow.
- [ ] All API requests are sent over HTTPS (in production).
- [ ] JWT/session tokens are stored securely (httpOnly, secure, etc).

---

**How to use:**
- For each test, perform the action in the UI and verify the expected result.
- For backend error messages, check that the popup displays the exact message from the backend.
- For edge cases, try invalid/expired tokens, wrong OTPs, etc.
- For security, inspect network and UI for leaks or vulnerabilities. 