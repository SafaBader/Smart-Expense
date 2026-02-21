import { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import "./Settings.css";

export default function Settings() {
  const user = auth.currentUser;

  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    if (!user) return;

    setMessage("");

    const wantsEmailChange = email.trim() !== (user.email || "");
    const wantsPasswordChange = newPassword.trim() !== "";

    // ✅ Tip: prevent weak password BEFORE calling Firebase
    if (wantsPasswordChange && newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      // Re-auth only if user is trying to update email/password
      if (wantsEmailChange || wantsPasswordChange) {
        if (!currentPassword) {
          setMessage("Please enter your current password");
          return;
        }

        const cred = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, cred);
      }

      if (wantsEmailChange) {
        await updateEmail(user, email.trim());
      }

      if (wantsPasswordChange) {
        await updatePassword(user, newPassword.trim());
      }

      setNewPassword("");
      setCurrentPassword("");
      setMessage("Changes saved ✅");
    } catch (err) {
      console.error("Firebase error:", err?.code, err?.message);

      // Small friendly messages for common errors
      if (err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential") {
        setMessage("Current password is incorrect ❌");
      } else if (err?.code === "auth/email-already-in-use") {
        setMessage("This email is already in use ❌");
      } else if (err?.code === "auth/invalid-email") {
        setMessage("Invalid email format ❌");
      } else {
        setMessage(err?.code || "Error updating account ❌");
      }
    }
  }

  if (!user) return null;

  const isWeakPassword = newPassword.length > 0 && newPassword.length < 6;

  return (
    <main className="settingsPage">
      <h2>Settings</h2>

      <form onSubmit={handleSave} className="settingsCard">
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Current Password
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </label>

        <label>
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          {isWeakPassword && (
            <small className="hint">Password must be at least 6 characters</small>
          )}
        </label>

        <button type="submit" disabled={isWeakPassword}>
          Save Changes
        </button>

        {message && <p className="msg">{message}</p>}
      </form>
    </main>
  );
}