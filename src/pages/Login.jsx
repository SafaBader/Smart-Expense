import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

import logo from '../assets/SE-LOGO.png';

export default function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/home');
    });
    return () => unsub();
  }, [navigate]);

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      const code = error?.code || '';

      if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        setPasswordError(true);
        setPasswordErrorMessage('Invalid email or password.');
      } else if (code === 'auth/too-many-requests') {
        setPasswordError(true);
        setPasswordErrorMessage('Too many attempts. Try again later.');
      } else {
        setPasswordError(true);
        setPasswordErrorMessage('Login failed. Please try again.');
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
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          p: 2,
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(1100px circle at 18% 12%, rgba(34,197,94,0.22), transparent 55%),' +
            'radial-gradient(950px circle at 82% 28%, rgba(250,204,21,0.18), transparent 55%),' +
            'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
        }}
      >
        <BlobLayer />
        <ParticlesLayer />

        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.22,
            backgroundImage:
              'linear-gradient(rgba(2,6,23,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(2,6,23,0.06) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage:
              'radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
          }}
        />


        <Box
          aria-hidden
          component="img"
          src={logo}
          alt=""
          sx={{
            position: 'absolute',
            right: { xs: -90, md: -70 },
            bottom: { xs: -110, md: -90 },
            width: { xs: 260, md: 360 },
            opacity: 0.05,
            filter: 'blur(2px)',
            transform: 'rotate(-8deg)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        <Box
          sx={{
            width: '100%',
            maxWidth: 980,
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
            gap: 2,
            alignItems: 'stretch',
          }}
        >

          <Card
            elevation={0}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'rgba(2,6,23,0.10)',
              background:
                'linear-gradient(135deg, rgba(34,197,94,0.14), rgba(250,204,21,0.10))',
              boxShadow:
                '0 14px 40px rgba(2, 6, 23, 0.08), 0 2px 10px rgba(2, 6, 23, 0.04)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -2,
                background:
                  'conic-gradient(from 180deg at 50% 50%, rgba(34,197,94,0.16), rgba(250,204,21,0.16), rgba(34,197,94,0.16))',
                filter: 'blur(18px)',
                opacity: 0.55,
                zIndex: 0,
                animation: 'spin 7s linear infinite',
              },
              '@keyframes spin': {
                from: { transform: 'rotate(0deg)' },
                to: { transform: 'rotate(360deg)' },
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                Spend smarter.
              </Typography>
              <Typography color="text.secondary">
                Smart Expense helps you organize every transaction, control your budget,
                and stay focused on reaching the financial goals you set for yourself.
              </Typography>

              <Stack spacing={1.25} sx={{ mt: 3 }}>
                <FeatureItem
                  title="Clear transaction organization"
                  text="Keep all your income and expenses structured so you always know where your money goes."
                />
                <FeatureItem
                  title="Smart budget control"
                  text="Plan your spending, avoid overspending, and stay aligned with your financial priorities."
                />
                <FeatureItem
                  title="Goal-driven insights"
                  text="Track your progress and make better decisions that bring you closer to your personal financial goals."
                />
              </Stack>
            </Box>

            <Typography sx={{ position: 'relative', zIndex: 1 }} variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Smart Expense
            </Typography>
          </Card>


          <Card
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'rgba(2,6,23,0.10)',
              boxShadow:
                '0 18px 55px rgba(2, 6, 23, 0.10), 0 2px 10px rgba(2, 6, 23, 0.06)',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.84)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'cardIn 540ms cubic-bezier(.2,.9,.2,1) both',
              '@keyframes cardIn': {
                from: { opacity: 0, transform: 'translateY(14px) scale(0.99)' },
                to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -2,
                background: 'linear-gradient(90deg, rgba(34,197,94,0.35), rgba(250,204,21,0.28))',
                filter: 'blur(18px)',
                opacity: 0.55,
                zIndex: 0,
                animation: 'glow 2.8s ease-in-out infinite',
              },
              '@keyframes glow': {
                '0%, 100%': { opacity: 0.35 },
                '50%': { opacity: 0.65 },
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Stack spacing={1} sx={{ mb: 2, alignItems: 'center', textAlign: 'center' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Smart Expense"
                  sx={{
                    width: 92,
                    height: 92,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0px 12px 22px rgba(2,6,23,0.18))',
                    animation: 'float 2.8s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                      '50%': { transform: 'translateY(-10px) rotate(-1deg)' },
                    },
                  }}
                />

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: 1,
                    background: 'linear-gradient(90deg, #16a34a, #22c55e, #facc15)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.05,
                  }}
                >
                  Smart Expense
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
                  Organize your transactions, manage your budget, and move closer to the
                  financial goals that matter to you.
                </Typography>
              </Stack>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
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
                    autoComplete="current-password"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  sx={{
                    py: 1.2,
                    fontWeight: 800,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                    boxShadow: '0 10px 25px rgba(59,130,246,0.30)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #1d4ed8, #2563eb)',
                    },
                  }}
                >
                  {loading ? 'Logging in…' : 'Log in'}
                </Button>


                <Divider
                  sx={{
                    my: 1,
                    fontWeight: 800,
                    color: '#64748b',
                    '&::before, &::after': {
                      borderColor: 'rgba(34,197,94,0.30)',
                    },
                  }}
                >
                  OR
                </Divider>


                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    textDecoration: 'none',
                    borderRadius: 3,
                    fontWeight: 800,
                    borderColor: '#22c55e',
                    color: '#16a34a',
                    '&:hover': {
                      borderColor: '#16a34a',
                      backgroundColor: 'rgba(34,197,94,0.08)',
                    },
                  }}
                >
                  Create an account
                </Button>
              </Box>
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
        backgroundColor: 'rgba(255, 255, 255, 0.62)',
        border: '1px solid rgba(2,6,23,0.08)',
      }}
    >
      <Typography sx={{ fontWeight: 800, mb: 0.25 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

function BlobLayer() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        '& .blob': {
          position: 'absolute',
          width: { xs: 320, md: 520 },
          height: { xs: 320, md: 520 },
          borderRadius: '40% 60% 55% 45% / 45% 45% 55% 55%',
          filter: 'blur(28px)',
          opacity: 0.55,
          mixBlendMode: 'multiply',
        },
      }}
    >
      <Box
        className="blob"
        sx={{
          top: { xs: -120, md: -160 },
          left: { xs: -140, md: -160 },
          background: 'radial-gradient(circle at 30% 30%, rgba(34,197,94,0.72), transparent 60%)',
          animation: 'blobA 9s ease-in-out infinite',
          '@keyframes blobA': {
            '0%, 100%': { transform: 'translate(0px,0px) rotate(0deg) scale(1)' },
            '50%': { transform: 'translate(60px,40px) rotate(10deg) scale(1.08)' },
          },
        }}
      />
      <Box
        className="blob"
        sx={{
          top: { xs: 60, md: 80 },
          right: { xs: -160, md: -220 },
          background: 'radial-gradient(circle at 40% 35%, rgba(250,204,21,0.62), transparent 60%)',
          animation: 'blobB 10.5s ease-in-out infinite',
          '@keyframes blobB': {
            '0%, 100%': { transform: 'translate(0px,0px) rotate(0deg) scale(1)' },
            '50%': { transform: 'translate(-70px,30px) rotate(-12deg) scale(1.12)' },
          },
        }}
      />
      <Box
        className="blob"
        sx={{
          bottom: { xs: -170, md: -220 },
          left: { xs: 60, md: 140 },
          background: 'radial-gradient(circle at 45% 40%, rgba(16,185,129,0.55), transparent 60%)',
          animation: 'blobC 12s ease-in-out infinite',
          '@keyframes blobC': {
            '0%, 100%': { transform: 'translate(0px,0px) rotate(0deg) scale(1)' },
            '50%': { transform: 'translate(40px,-40px) rotate(8deg) scale(1.10)' },
          },
        }}
      />
    </Box>
  );
}

function ParticlesLayer() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.42,
        backgroundImage:
          'radial-gradient(circle, rgba(2,6,23,0.10) 1px, transparent 1.2px),' +
          'radial-gradient(circle, rgba(2,6,23,0.08) 1px, transparent 1.2px)',
        backgroundSize: '40px 40px, 70px 70px',
        backgroundPosition: '0 0, 10px 15px',
        animation: 'drift 18s linear infinite',
        '@keyframes drift': {
          from: { transform: 'translate3d(0px,0px,0px)' },
          to: { transform: 'translate3d(-60px, -80px, 0px)' },
        },
      }}
    />
  );
}