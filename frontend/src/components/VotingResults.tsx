import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type VotingResultsProps = {
  players: {
    name: string;
    vote: string | null;
    client_id?: string;
  }[];
  currentPlayerId?: string;
};

const VotingResults: React.FC<VotingResultsProps> = ({ players, currentPlayerId }) => {
  const { t } = useTranslation();

  const votes = players.filter((p) => p.vote !== null) as { name: string; vote: string }[];

  const noVote = players.filter((p) => p.vote === null).map((p) => ({ name: p.name }));

  const groupedVotes = votes.reduce<Record<string, { name: string }[]>>((acc, vote) => {
    if (!acc[vote.vote]) {
      acc[vote.vote] = [];
    }
    acc[vote.vote].push({ name: vote.name });
    return acc;
  }, {});

  if (noVote.length > 0) {
    groupedVotes['no_vote'] = noVote;
  }

  const currentPlayerName = players.find((p) => p.client_id === currentPlayerId)?.name;

  const groupOfCurrentPlayer = votes.find((v) => v.name === currentPlayerName)?.vote;

  const sortedKeys = Object.keys(groupedVotes).sort((a, b) => {
    if (a === 'no_vote') return 1;
    if (b === 'no_vote') return -1;
    const na = parseFloat(a);
    const nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb)) return a.localeCompare(b);
    return na - nb;
  });

  const numericKeys = sortedKeys.filter((key) => !isNaN(parseFloat(key)));
  const numericValues = numericKeys.map((k) => parseFloat(k));
  const min = Math.min(...numericValues);
  const max = Math.max(...numericValues);
  const highlightOutliers =
    max - min > 1 || (Object.keys(groupedVotes).length > 2 && max - min === 1);

  const specialVotes = ['?', '∞', '☕'];

  const chartData = sortedKeys.map((key) => ({
    key,
    name: key === 'no_vote' ? t('session_page.voting_results.no_vote') : key,
    value: groupedVotes[key].length,
    isOutlier:
      key !== 'no_vote' &&
      highlightOutliers &&
      (parseFloat(key) === min || parseFloat(key) === max),
    isSpecial: specialVotes.includes(key),
    isNoVote: key === 'no_vote',
    isCurrentPlayerGroup:
      (groupOfCurrentPlayer !== undefined && key === groupOfCurrentPlayer) ||
      (groupOfCurrentPlayer === undefined && key === 'no_vote'),
  }));

  return (
    <div>
      <h2>{t('session_page.voting_results.title')}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <Paper sx={{ p: 1 }}>
                    <div>
                      <strong>{t('session_page.voting_results.vote')}:</strong> {label}
                    </div>
                    <div>
                      <strong>{t('session_page.voting_results.vote_count')}:</strong>{' '}
                      {payload[0].value}
                    </div>
                    <div>
                      <strong>{t('session_page.voting_results.voters')}:</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {groupedVotes[payload[0].payload.key]?.map((v, i) => (
                        <li key={i}>{v.name}</li>
                      ))}
                    </ul>
                  </Paper>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isNoVote
                    ? '#9e9e9e'
                    : entry.isSpecial
                      ? '#1976d2'
                      : entry.isOutlier
                        ? '#ffa726'
                        : '#8884d8'
                }
                stroke={entry.isCurrentPlayerGroup ? '#2e7d32' : undefined}
                strokeWidth={entry.isCurrentPlayerGroup ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('session_page.voting_results.vote')}</TableCell>
              <TableCell>{t('session_page.voting_results.vote_count')}</TableCell>
              <TableCell>{t('session_page.voting_results.voters')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedKeys.map((key) => {
              const isSpecial = specialVotes.includes(key);
              const isOutlier =
                highlightOutliers && (parseFloat(key) === min || parseFloat(key) === max);
              const isNoVote = key === 'no_vote';
              const isCurrentGroup =
                (groupOfCurrentPlayer !== undefined && key === groupOfCurrentPlayer) ||
                (groupOfCurrentPlayer === undefined && key === 'no_vote');
              return (
                <TableRow
                  key={key}
                  sx={{
                    ...(isNoVote
                      ? { backgroundColor: '#eeeeee' }
                      : isSpecial
                        ? { backgroundColor: '#e3f2fd' }
                        : isOutlier
                          ? { backgroundColor: '#fff3cd' }
                          : {}),
                    ...(isCurrentGroup
                      ? {
                          border: '2px solid #4caf50',
                          boxShadow: 'inset 0 0 4px #4caf50',
                        }
                      : {}),
                  }}
                >
                  <TableCell>
                    {isNoVote ? (
                      <em>{t('session_page.voting_results.no_vote')}</em>
                    ) : isSpecial ? (
                      <strong style={{ color: '#1976d2' }}>{key}</strong>
                    ) : (
                      key
                    )}
                  </TableCell>
                  <TableCell>{groupedVotes[key].length}</TableCell>
                  <TableCell>{groupedVotes[key].map((vote) => vote.name).join(', ')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VotingResults;
