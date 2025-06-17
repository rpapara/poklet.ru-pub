import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface JoinSessionFormProps {
  name: string;
  setName: (name: string) => void;
  onJoin: (name: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function JoinSessionForm({
  name,
  setName,
  onJoin,
  loading,
  error,
}: JoinSessionFormProps) {
  const [localName, setLocalName] = useState(name);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onJoin(localName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
    setName(e.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label={t('join_session_form.input.name')}
        value={localName}
        onChange={handleChange}
        fullWidth
        disabled={loading}
        required
      />
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 2, position: 'relative' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !localName.trim()}
        >
          {t('join_session_form.button.join')}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
