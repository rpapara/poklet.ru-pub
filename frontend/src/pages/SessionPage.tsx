// frontend/src/pages/SessionPage.tsx
import IosShareIcon from '@mui/icons-material/IosShare';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { vote } from '../api/players';
import ErrorAlert from '../components/ErrorAlert';
import FormattedDate from '../components/FormattedDate';
import JoinSessionForm from '../components/JoinSessionForm';
import PlayerCard from '../components/PlayerCard';
import VoteCard from '../components/VoteCard';
import VotingResults from '../components/VotingResults';
import { useJoinSession } from '../hooks/useJoinSession';
import { useRecentSessions } from '../hooks/useRecentSessions';
import { useResetSession } from '../hooks/useResetSession';
import { useRevealSession } from '../hooks/useRevealSession';
import { useSession } from '../hooks/useSession';
import { useClientStore } from '../store/client';
import type { CardValue } from '../types/session';

const cards: CardValue[] = ['0', '1', '2', '3', '5', '8', '13', '20', '∞', '?', '☕'];

export default function SessionPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { session, loading, sessionErrorCode, clearError, refetch } = useSession(id);
  const { clientId, name, setName } = useClientStore();
  const { join, loading: joinLoading, error, errorCode } = useJoinSession();
  const { addSession } = useRecentSessions();
  const [myVote, setMyVote] = useState<CardValue | null>(null);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const { reveal } = useRevealSession(id!);
  const { reset } = useResetSession(id!);

  const currentPlayer = session?.players.find((p) => p.client_id === clientId);

  useEffect(() => {
    if (!currentPlayer || !session) return;
    const key = `recent_session_${session.id}`;
    if (!sessionStorage.getItem(key)) {
      addSession({ short_id: session.short_id, created_at: session.created_at });
      sessionStorage.setItem(key, '1');
    }
  }, [currentPlayer, session, addSession]);

  const handleCardClick = (card: CardValue) => {
    if (!session!.revealed) {
      setMyVote(card);
    }
  };

  const handleReveal = async () => {
    await reveal();
    refetch?.();
  };

  const handleReset = async () => {
    await reset();
    setMyVote(null);
    refetch?.();
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!session || !id) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {t('error.unknown_error')}
        </Typography>
        {sessionErrorCode && (
          <ErrorAlert
            message={t(sessionErrorCode) ?? t('error.unknown_error')}
            open={!!sessionErrorCode}
            onClose={clearError}
          />
        )}
      </Container>
    );
  }

  if (!currentPlayer) {
    return (
      <Container>
        <Typography variant="h5" gutterBottom>
          {t('session_page.title')}: {id}
        </Typography>
        <JoinSessionForm
          name={name || ''}
          setName={setName}
          onJoin={async (name: string) => {
            await join(id, name, clientId);
            refetch?.();
          }}
          loading={joinLoading}
          error={errorCode ? t(`error.${errorCode}`) : error}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Box mb={1}>
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              wordBreak: 'break-all',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {t('session_page.title')}: {id}
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopySuccess(true);
            }}
            title={t('session_page.button.copy_link')}
          >
            <IosShareIcon fontSize="small" />
          </IconButton>
        </Box>
        <FormattedDate date={session.created_at} prefix={t('session_page.created_at')} />
      </Box>
      <Box mt={3}>
        {session.revealed ? (
          <VotingResults players={session.players} currentPlayerId={currentPlayer.client_id} />
        ) : (
          <>
            <Typography variant="h6">{t('session_page.your_vote')}:</Typography>
            <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
              {cards.map((card) => (
                <VoteCard
                  key={card}
                  value={card}
                  selected={myVote === card}
                  revealed={session.revealed}
                  onClick={() => {
                    if (currentPlayer.client_id === clientId && !session.revealed) {
                      handleCardClick(card);
                      vote(currentPlayer.id, card)
                        .then(() => refetch?.())
                        .catch((err) => {
                          setVoteError(err.response?.data?.detail || 'Vote failed');
                        });
                    }
                  }}
                />
              ))}
            </Box>
          </>
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          {t('session_page.players')}:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {[
            ...session.players.filter((p) => p.client_id === clientId),
            ...session.players
              .filter((p) => p.client_id !== clientId)
              .sort((a, b) => new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime()),
          ].map((player, idx) => (
            <PlayerCard
              key={idx}
              name={player.name}
              vote={player.vote}
              has_voted={player.has_voted}
              revealed={session.revealed}
              isYou={player.client_id === clientId}
            />
          ))}
        </Box>
      </Box>

      <Box mt={4} display="flex" gap={2}>
        {!session.revealed && (
          <Button variant="contained" color="primary" onClick={handleReveal}>
            {t('session_page.button.reveal')}
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          {t('session_page.button.reset')}
        </Button>
      </Box>
      {voteError && (
        <ErrorAlert message={voteError} open={!!voteError} onClose={() => setVoteError(null)} />
      )}
      {sessionErrorCode && (
        <ErrorAlert message={t(sessionErrorCode)} open={!!sessionErrorCode} onClose={clearError} />
      )}
      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setCopySuccess(false)}>
          {t('session_page.alert.link_copied')}
        </Alert>
      </Snackbar>
    </Container>
  );
}
