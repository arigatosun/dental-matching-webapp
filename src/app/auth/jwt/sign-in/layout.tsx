import { GuestGuard } from '@/auth/guard';
import { AuthSplitLayout } from '@/layouts/auth-split';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout >{children}</AuthSplitLayout>
    </GuestGuard>
  );
}

///GuestGuardでは、認証されていないユーザー（ゲスト）のみがアクセスできるようにするためのガードで
///認証済みのユーザーがこのページにアクセスしようとすると、指定されたリダイレクトパスに自動的に転送されます