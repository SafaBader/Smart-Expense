import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import "./Settings.css";

export default function Settings() {
  const user = auth.currentUser;

  const [email, setEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    if (!user) return;

    setMessage("");

    try {
      // update email if changed
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      // update password if entered
      if (newPassword.trim() !== "") {
        await updatePassword(user, newPassword);
      }

      setMessage("Changes saved successfully");
    } catch (err) {
      console.error(err);
      setMessage("Error updating account");
    }
  }

  if (!user) return null;

  return (
    <main className="settingsPage">
      <h2>Settings</h2>

      <form onSubmit={handleSave} className="settingsCard">
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        </label>

        <button type="submit">Save Changes</button>

        {message && <p className="msg">{message}</p>}
      </form>
    </main>
  );
}