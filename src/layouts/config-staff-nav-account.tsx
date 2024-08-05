import { Iconify } from '@/components/iconify';
import SvgIcon from '@mui/material/SvgIcon';

export const _staffAccount = [
  {
    label: 'ホーム',
    href: '/dashboard/staff',
    icon: <Iconify icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'マイページ',
    href: '/dashboard/staff/mypage/profile',
    icon: (
      <SvgIcon>
        <path
          opacity="0.5"
          d="M2.28099 19.6575C2.36966 20.5161 2.93261 21.1957 3.77688 21.3755C5.1095 21.6592 7.6216 22 12 22C16.3784 22 18.8905 21.6592 20.2232 21.3755C21.0674 21.1957 21.6303 20.5161 21.719 19.6575C21.8505 18.3844 22 16.0469 22 12C22 7.95305 21.8505 5.6156 21.719 4.34251C21.6303 3.48389 21.0674 2.80424 20.2231 2.62451C18.8905 2.34081 16.3784 2 12 2C7.6216 2 5.1095 2.34081 3.77688 2.62451C2.93261 2.80424 2.36966 3.48389 2.28099 4.34251C2.14952 5.6156 2 7.95305 2 12C2 16.0469 2.14952 18.3844 2.28099 19.6575Z"
          fill="currentColor"
        />
        <path
          d="M13.9382 13.8559C15.263 13.1583 16.1663 11.7679 16.1663 10.1666C16.1663 7.8655 14.3008 6 11.9996 6C9.69841 6 7.83291 7.8655 7.83291 10.1666C7.83291 11.768 8.73626 13.1584 10.0612 13.856C8.28691 14.532 6.93216 16.1092 6.51251 18.0529C6.45446 18.3219 6.60246 18.5981 6.87341 18.6471C7.84581 18.8231 9.45616 19 12.0006 19C14.545 19 16.1554 18.8231 17.1278 18.6471C17.3977 18.5983 17.5454 18.3231 17.4876 18.0551C17.0685 16.1103 15.7133 14.5321 13.9382 13.8559Z"
          fill="currentColor"
        />
      </SvgIcon>
    ),
  },
  {
    label: 'メールアドレス変更',
    href: '/dashboard/staff/mypage/account-settings',
    icon: <Iconify icon="solar:letter-bold-duotone" />,
  },
  {
    label: 'パスワード変更',
    href: '/dashboard/staff/mypage/account-settings',
    icon: <Iconify icon="ic:round-vpn-key" />,
  },
  {
    label: 'メール通知設定',
    href: '/dashboard/staff/mypage/notification-settings',
    icon: <Iconify icon="mdi:bell-ring-outline" />,
  },
  {
    label: '利用規約・ヘルプ',
    href: '#',
    icon: <Iconify icon="mdi:help-circle-outline" />,
  },
  {
    label: '退会する',
    href: '#',
    icon: <Iconify icon="mdi:account-remove-outline" />,
  },
];