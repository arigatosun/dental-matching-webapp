import type { StackProps } from '@mui/material/Stack';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export function NavThootChara({ sx, ...other }: StackProps) {
  return (
    <Stack sx={{ px: 2, py: 5, textAlign: 'center', ...sx }} {...other}>
      <Stack alignItems="center">
        <Box sx={{ position: 'relative', width: 200, height: 200 }}>
          <Image 
            src="/images/logo/thoot-chara.svg" 
            alt="App Character" 
            layout="fill"
            objectFit="contain"
          />
        </Box>

        <Button 
          variant="contained" 
          href="#" 
          sx={{ mt: 3 }}
        >
          新着情報を確認
        </Button>
      </Stack>
    </Stack>
  );
}

NavThootChara.displayName = 'NavThootChara';

// ----------------------------------------------------------------------

export function UpgradeBlock({ sx, ...other }: StackProps) {
  // ... (元のコードをそのまま維持)
}

UpgradeBlock.displayName = 'UpgradeBlock';