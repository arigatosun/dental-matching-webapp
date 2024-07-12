import { paths } from '@/routes/paths';

import { CONFIG } from '@/config-global';

import { SvgColor } from '@/components/svg-color';
import { Icon } from '@iconify/react';
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
          { title: 'プロフィール', path: paths.dashboard.mypage.profile },
          { title: '医院詳細', path: paths.dashboard.mypage.clinicDetails },
          { title: 'thoot実績', path: paths.dashboard.mypage.thootPerformance },
          { title: '通知設定', path: paths.dashboard.mypage.notificationSettings },
          { title: 'メールアドレス・PW設定', path: paths.dashboard.mypage.accountSettings },
        ],
      },
    ],
  },
];
