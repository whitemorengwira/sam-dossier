import { SignerPortal } from '@/components/signing/SignerPortal';

export default function SignTokenPage({ params }: { params: { token: string } }) {
  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
      <SignerPortal />
    </div>
  );
}
