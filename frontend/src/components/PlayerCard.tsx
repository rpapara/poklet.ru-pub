import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PlayerCardProps {
  name: string;
  vote: string | null;
  has_voted: boolean;
  revealed: boolean;
  isYou?: boolean;
}

export default function PlayerCard({
  name,
  vote,
  has_voted,
  revealed,
  isYou = false,
}: PlayerCardProps) {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        minWidth: 220,
        backgroundColor: (theme) => {
          if (isYou && !has_voted) {
            return theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.2)' : '#e3f2fd';
          } else if (has_voted) {
            return theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
          }
          return 'inherit';
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 2 }}>{isYou ? t('cards.you_short') : name[0]}</Avatar>
        <Box>
          <Typography>{isYou ? `${t('cards.you')} (${name})` : name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {has_voted
              ? revealed
                ? `${t('cards.voted')}: ${vote}`
                : t('cards.voted')
              : t('cards.not_voted')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
