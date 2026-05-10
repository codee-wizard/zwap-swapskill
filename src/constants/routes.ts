export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  DISCOVER: '/discover',
  CONNECTIONS: '/connections',
  MESSAGES: '/messages',
  MESSAGE_THREAD: (swapId: string) => `/messages/${swapId}`,
  PROFILE: (userId: string) => `/profile/${userId}`,
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
} as const;
