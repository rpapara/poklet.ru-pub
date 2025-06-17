// src/components/RecentSessions.tsx
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FormattedDate from '../components/FormattedDate';
import { useRecentSessions } from '../hooks/useRecentSessions';

export default function RecentSessions() {
  const { sessions } = useRecentSessions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (sessions.length === 0) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        {t('session_page.recent.title')}
      </Typography>
      {sessions.map((session) => (
        <Card key={session.short_id} sx={{ mb: 1 }}>
          <CardActionArea onClick={() => navigate(`/session/${session.short_id}`)}>
            <CardContent>
              <Typography variant="body1">ID: {session.short_id}</Typography>
              <FormattedDate date={session.created_at} prefix={t('session_page.created_at')} />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
