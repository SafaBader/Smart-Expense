import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const validateInputs = () => {
    let isValid = true;

    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

   
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);

      
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error);

      const code = error?.code || "";
      if (code === "auth/email-already-in-use") {
        setEmailError(true);
        setEmailErrorMessage("This email is already in use.");
      } else if (code === "auth/invalid-email") {
        setEmailError(true);
        setEmailErrorMessage("Invalid email address.");
      } else if (code === "auth/weak-password") {
        setPasswordError(true);
        setPasswordErrorMessage("Password is too weak. Use at least 6 characters.");
      } else {
        setPasswordError(true);
        setPasswordErrorMessage("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />

     
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          p: 2,
          background:
            "radial-gradient(1000px circle at 20% 10%, rgba(99,102,241,0.18), transparent 55%)," +
            "radial-gradient(900px circle at 80% 30%, rgba(16,185,129,0.16), transparent 55%)," +
            "linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            backgroundImage:
              "linear-gradient(rgba(2,6,23,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(2,6,23,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none",
          }}
        />

       
        <Box
          sx={{
            width: "100%",
            maxWidth: 980,
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.85fr 1.15fr" },
            gap: 2,
            alignItems: "stretch",
          }}
        >
         
          <Card
            elevation={0}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "space-between",
              p: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "rgba(2,6,23,0.10)",
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(16,185,129,0.10))",
              boxShadow:
                "0 10px 30px rgba(2, 6, 23, 0.06), 0 2px 8px rgba(2, 6, 23, 0.04)",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Start reaching your goals.
              </Typography>

              <Typography color="text.secondary">
                Create your Smart Expense account to organize transactions, control your
                budget, and stay focused on your financial goals.
              </Typography>

              <Stack spacing={1.25} sx={{ mt: 3 }}>
                <FeatureItem
                  title="Personalized goals"
                  text="Set goals and track progress with clear insights."
                />
                <FeatureItem
                  title="Better spending habits"
                  text="Stay on budget with structured categories and summaries."
                />
                <FeatureItem
                  title="Everything in one place"
                  text="Keep your transactions organized and easy to review."
                />
              </Stack>
            </Box>

            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Smart Expense
            </Typography>
          </Card>

         
          <Card
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "rgba(2,6,23,0.10)",
              boxShadow:
                "0 10px 30px rgba(2, 6, 23, 0.08), 0 2px 8px rgba(2, 6, 23, 0.05)",
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(255,255,255,0.85)",
            }}
          >
            <Stack spacing={1} sx={{ mb: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  letterSpacing: 1,
                  background: "linear-gradient(90deg, #6366f1, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Smart Expense
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Create your account and start building better money habits today.
              </Typography>
            </Stack>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                  helperText={emailErrorMessage}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={passwordError}
                  helperText={passwordErrorMessage}
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
              >
                {loading ? "Creating account…" : "Sign up"}
              </Button>

              <Divider sx={{ my: 0.5 }}>or</Divider>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                component={RouterLink}
                to="/"
                sx={{ textDecoration: "none" }}
              >
                Back to login
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}

function FeatureItem({ title, text }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        border: "1px solid rgba(2,6,23,0.08)",
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 0.25 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
