import { NexusEditor } from '@/components/editor/NexusEditor';

export default function EditorPage({ params }: { params: { documentId: string } }) {
  // In a real app we would fetch initial document content from Supabase here
  return (
    <div className="h-screen w-full">
      <NexusEditor documentId={params.documentId} />
    </div>
  );
}
