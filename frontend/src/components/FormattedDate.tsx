import { Typography } from '@mui/material';
import type { Locale } from 'date-fns';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const locales: Record<string, Locale> = {
  en: enUS,
  ru: ru,
};

interface FormattedDateProps {
  date: string | Date;
  variant?: 'body1' | 'body2' | 'caption';
  color?: 'textPrimary' | 'textSecondary';
  formatStr?: string;
  prefix?: string;
}

export default function FormattedDate({
  date,
  variant = 'body2',
  color = 'textSecondary',
  formatStr = 'd MMMM yyyy, HH:mm',
  prefix,
}: FormattedDateProps) {
  const { i18n } = useTranslation();
  const locale = locales[i18n.language] || enUS;

  return (
    <Typography variant={variant} color={color}>
      {prefix}: {format(new Date(date), formatStr, { locale })}
    </Typography>
  );
}
