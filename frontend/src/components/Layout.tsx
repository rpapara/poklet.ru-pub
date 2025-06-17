// src/components/Layout.tsx
import Header from './Header';
import Footer from './Footer';
import { Container, Box } from '@mui/material';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        <Header />
        <Container maxWidth="md" sx={{ flexGrow: 1, py: 2 }}>
          {children}
        </Container>
        <Footer />
      </Container>
    </Box>
  );
}
