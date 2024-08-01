'use client';

import { createContext } from 'react';

import type { AuthContextValue } from '../types';

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthConsumer = AuthContext.Consumer;

///auth-contextは認証状態を管理し、アプリケーション全体で利用可能にする
