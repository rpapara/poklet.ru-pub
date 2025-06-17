// src/components/LanguageSwitcher.tsx
import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0]; // "en-US" -> "en"
  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="language-switcher-label">Language</InputLabel>
      <Select
        labelId="language-switcher-label"
        value={currentLang}
        onChange={handleChange}
        label="Language"
        sx={{ minWidth: 120 }}
        MenuProps={{
          disablePortal: true,
          disableScrollLock: true,
          PaperProps: {
            sx: {
              minWidth: 120,
            },
          },
        }}
      >
        <MenuItem value="en">🇺🇸 English</MenuItem>
        <MenuItem value="ru">🇷🇺 Русский</MenuItem>
      </Select>
    </FormControl>
  );
}
