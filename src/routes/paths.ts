// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    rewardManagement: `${ROOTS.DASHBOARD}/reward-management`,
    matching: {
      root: `${ROOTS.DASHBOARD}/matching`,
      offer: `${ROOTS.DASHBOARD}/matching/offer`,
      paymentPending: `${ROOTS.DASHBOARD}/matching/payment-pending`,
      active: `${ROOTS.DASHBOARD}/matching/active`,
      completionRequest: `${ROOTS.DASHBOARD}/matching/completion-request`,
      completed: `${ROOTS.DASHBOARD}/matching/completed`,
    },
    mypage: {
      root: `${ROOTS.DASHBOARD}/mypage`,
      profile: `${ROOTS.DASHBOARD}/mypage/profile`,
      clinicDetails: `${ROOTS.DASHBOARD}/mypage/clinic-details`,
      thootPerformance: `${ROOTS.DASHBOARD}/mypage/thoot-performance`,
      notificationSettings: `${ROOTS.DASHBOARD}/mypage/notification-settings`,
      accountSettings: `${ROOTS.DASHBOARD}/mypage/account-settings`,
    },
  },
}