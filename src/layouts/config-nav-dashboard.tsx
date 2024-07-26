import { Icon } from '@iconify/react';
import { paths } from '@/routes/paths';
import { CONFIG } from '@/config-global';
import { SvgColor } from '@/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  matching: <Icon icon="mdi:handshake" />, // マッチングを表すアイコン
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    items: [
      { title: 'ホーム', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: '報酬管理', path: paths.dashboard.rewardManagement, icon: ICONS.ecommerce },
      {
        title: 'マッチング管理',
        path: paths.dashboard.matching.root,
        icon: ICONS.matching,
        children: [
          { title: 'オファー中', path: paths.dashboard.matching.offer },
          { title: '決済待ちオファー', path: paths.dashboard.matching.paymentPending },
          { title: 'マッチング成立中', path: paths.dashboard.matching.active },
          { title: '勤務完了リクエスト', path: paths.dashboard.matching.completionRequest },
          { title: 'マッチング済', path: paths.dashboard.matching.completed },
        ],
      },
      {
        title: 'マイページ',
        path: paths.dashboard.mypage.root,
        icon: ICONS.user,
        children: [
          { title: 'プロフィール', path: '/dashboard/clinic/mypage/profile' },
          { title: '医院詳細', path: '/dashboard/clinic/mypage/clinic-details' },
          { title: 'thoot実績', path: '/dashboard/clinic/mypage/thoot-performance' },
          { title: '通知設定', path: '/dashboard/clinic/mypage/notification-settings' },
          { title: 'メールアドレス・PW設定', path: '/dashboard/clinic/mypage/account-settings' },
        ],
      },
    ],
  },
];
