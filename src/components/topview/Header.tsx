'use client';

import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';

const AnimatedImage = animated(Image);

const Header: React.FC = () => {
  const [props, set] = useSpring(() => ({
    transform: 'rotate(0deg)',
  }));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <AnimatedImage
            src="/images/logo/logo-header.svg"  // パスを更新
            alt="Thoot Logo"
            width={100}
            height={50}
            style={props}
            onMouseEnter={() => set({ transform: 'rotate(360deg)' })}
            onMouseLeave={() => set({ transform: 'rotate(0deg)' })}
          />
        </Box>
        <Button color="primary" variant="contained" sx={{ mr: 2 }}>
          歯科医院の方
        </Button>
        <Button color="secondary" variant="contained">
          歯科スタッフの方
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;