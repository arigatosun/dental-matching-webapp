import type { ColorSystemOptions } from '@mui/material/styles';

import { varAlpha, createPaletteChannel } from '../styles';

// ----------------------------------------------------------------------

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    black: string;
    white: string;
    blackChannel: string;
    whiteChannel: string;
  }
  interface TypeText {
    disabledChannel: string;
  }
  interface TypeBackground {
    neutral: string;
    neutralChannel: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
    lighterChannel: string;
    darkerChannel: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    lighterChannel: string;
    darkerChannel: string;
  }
}

export type ColorType = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'common';

// 新しい色の定義
const CUSTOM_COLORS = {
  primaryPink: {
    main: '#F8A1A7',
    light: '#FFC1C5',
    dark: '#E57F85',
  },
  secondaryBlue: {
    main: '#0051A2',
    light: '#1A6FBF',
    dark: '#003D7A',
  },
  lightPink: '#FFF0F3',
};

// Primary (濃いピンク)
export const primary = createPaletteChannel(CUSTOM_COLORS.primaryPink);

// Secondary (濃い青)
export const secondary = createPaletteChannel(CUSTOM_COLORS.secondaryBlue);

// Info
export const info = createPaletteChannel({
  main: '#2196F3',
  light: '#64B6F7',
  dark: '#0B79D0',
});

// Success, Warning, Error
export const success = createPaletteChannel({
  main: '#4CAF50',
  light: '#7BC67E',
  dark: '#3B873E',
});

export const warning = createPaletteChannel({
  main: '#FFC107',
  light: '#FFD54F',
  dark: '#FFA000',
});

export const error = createPaletteChannel({
  main: '#FF4842',
  light: '#FFA48D',
  dark: '#B72136',
});

// Grey
export const grey = createPaletteChannel({
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
});

// Common
export const common = createPaletteChannel({
  black: '#000000',
  white: '#FFFFFF',
});

// Text
export const text = {
  light: createPaletteChannel({ 
    primary: grey[800], 
    secondary: grey[600], 
    disabled: grey[500] 
  }),
  dark: createPaletteChannel({ 
    primary: '#FFFFFF', 
    secondary: grey[500], 
    disabled: grey[600] 
  }),
};

// Background
export const background = {
  light: createPaletteChannel({ 
    paper: '#FFFFFF', 
    default: CUSTOM_COLORS.lightPink, 
    neutral: grey[200] 
  }),
  dark: createPaletteChannel({ 
    paper: grey[800], 
    default: grey[900], 
    neutral: '#28323D' 
  }),
};

// Action
export const baseAction = {
  hover: varAlpha(primary.mainChannel, 0.08),
  selected: varAlpha(primary.mainChannel, 0.16),
  focus: varAlpha(primary.mainChannel, 0.24),
  disabled: varAlpha(grey['500Channel'], 0.8),
  disabledBackground: varAlpha(grey['500Channel'], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

export const action = {
  light: { ...baseAction, active: primary.dark },
  dark: { ...baseAction, active: primary.light },
};

// Base palette
export const basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: varAlpha(grey['500Channel'], 0.2),
  action,
};

export const lightPalette = {
  ...basePalette,
  mode: 'light' as const,
  text: text.light,
  background: background.light,
  action: action.light,
};

export const darkPalette = {
  ...basePalette,
  mode: 'dark' as const,
  text: text.dark,
  background: background.dark,
  action: action.dark,
};

export const colorSchemes: Partial<Record<'dark' | 'light', ColorSystemOptions>> = {
  light: { palette: lightPalette },
  dark: { palette: darkPalette },
};