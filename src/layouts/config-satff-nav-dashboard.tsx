import { Icon } from '@iconify/react';
import { paths } from '@/routes/paths';
import { CONFIG } from '@/config-global';
import { SvgColor } from '@/components/svg-color';

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  matching: <Icon icon="mdi:handshake" />,
};

export const navData = [
  {
    items: [
      { title: 'トップページ', path: '/dashboard/staff', icon: ICONS.dashboard },
      { title: '勤怠カレンダー', path: '/dashboard/staff/attendance', icon: ICONS.calendar },
      { title: '報酬管理', path: '/dashboard/staff/rewards', icon: ICONS.banking },
      {
        title: 'マッチング管理',
        path: '/dashboard/staff/matching',
        icon: ICONS.matching,
        children: [
          { title: 'オファー受信', path: '/dashboard/staff/matching/offers' },
          { title: 'マッチング成立中', path: '/dashboard/staff/matching/active' },
          { title: '勤務完了リクエスト', path: '/dashboard/staff/matching/completion-request' },
          { title: 'マッチング済', path: '/dashboard/staff/matching/completed' },
        ],
      },
      {
        title: 'マイページ',
        path: '/dashboard/staff/mypage',
        icon: ICONS.user,
        children: [
          { title: 'プロフィール', path: '/dashboard/staff/mypage/profile' },
          { title: 'スキル・経歴', path: '/dashboard/staff/mypage/skills-experience' },
          { title: 'マッチ条件', path: '/dashboard/staff/mypage/matching-conditions' },
          { title: '通知設定', path: '/dashboard/staff/mypage/notification-settings' },
          { title: 'メールアドレス・PW設定', path: '/dashboard/staff/mypage/account-settings' },
        ],
      },
    ],
  },
];