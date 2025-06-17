import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../api/sessions';
import ErrorAlert from '../components/ErrorAlert';
import RecentSessions from '../components/RecentSessions';

export default function HomePage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState('');
  const { t } = useTranslation();

  const handleCreate = async () => {
    try {
      const session = await createSession();
      navigate(`/session/${session.short_id}`);
    } catch (error) {
      console.error(t('error.session_create_failed'), error);
      setError(t('error.session_create_failed'));
    }
  };

  const handleJoin = () => {
    if (sessionCode.trim()) {
      navigate(`/session/${sessionCode.trim()}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('app.title')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 300 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {t('main_page.section.create')}
          </Typography>
          <Button variant="contained" fullWidth onClick={handleCreate}>
            {t('main_page.button.create_session')}
          </Button>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {t('main_page.section.join')}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label={t('main_page.input.session_code')}
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="outlined" fullWidth onClick={handleJoin}>
            {t('main_page.button.join_session')}
          </Button>
        </Box>
      </Box>

      {error && <ErrorAlert message={error} open={!!error} onClose={() => setError(null)} />}
      <RecentSessions />
    </Container>
  );
}
