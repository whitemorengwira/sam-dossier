import { PresentationEditor } from '@/components/presentation/PresentationEditor';

export default function PresentationPage({ params }: { params: { documentId: string } }) {
  return (
    <div className="h-screen w-full">
      <PresentationEditor />
    </div>
  );
}
