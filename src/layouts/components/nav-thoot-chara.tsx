import type { StackProps } from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export function NavThootChara({ sx, ...other }: StackProps) {
  return (
    <Stack sx={{ px: 2, py: 5, textAlign: 'center', ...sx }} {...other}>
      <Stack alignItems="center">
        <Box sx={{ position: 'relative', width: 200, height: 200 }}>
          <img 
            src="/images/logo/thoot-chara.svg" 
            alt="App Character" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' // 画像のアスペクト比を保持しつつ、Box内に収まるようにします
            }} 
          />
        </Box>

        <Button 
          variant="contained" 
          href="#" 
          sx={{ mt: 3 }} // マージンを少し大きくして、ボタンとロゴの間隔を調整
        >
          新着情報を確認
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

// UpgradeBlock 関数は変更なしのため、そのまま残しています
export function UpgradeBlock({ sx, ...other }: StackProps) {
  // ... (元のコードをそのまま維持)
}