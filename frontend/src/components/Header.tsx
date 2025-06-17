import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <Box component="header" borderBottom={1} borderColor="divider" py={2} mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" component="div">
            <Link component={RouterLink} to="/" underline="none" color="inherit">
              Poklet.ru
            </Link>
          </Typography>
          <Typography variant="body2" component="div" fontStyle="italic">
            Scrum Poker Online
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </Box>
      </Box>
    </Box>
  );
}
