import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeStore } from '../store/themeStore';
import { useTranslation } from 'react-i18next';

export default function ThemeSwitcher() {
  const { mode, toggleTheme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={t(`theme.${mode}`)}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDark ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
