'use client';

import { m } from 'framer-motion';
import { SimpleLayout } from '@/layouts/simple';
import { RouterLink } from '@/routes/components';
import { ServerErrorIllustration } from '@/assets/illustrations';
import { varBounce, MotionContainer } from '@/components/animate';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function View500() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            500 Internal server error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
}
