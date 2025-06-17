import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box mt={4} py={2} textAlign="center" borderTop={1} borderColor="divider">
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Poklet.ru — {t('footer.developedBy')}{' '}
        <a href={t('footer.developerLink')} target="_blank" rel="noopener noreferrer">
          {t('footer.developer')}
        </a>
      </Typography>
    </Box>
  );
}
