import { PDFEditor } from '@/components/pdf/PDFEditor';

export default function PDFEditorPage({ params }: { params: { documentId: string } }) {
  // In a real app we would fetch the R2 presigned URL using the documentId here
  const samplePdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

  return (
    <div className="h-screen w-full">
      <PDFEditor documentId={params.documentId} pdfUrl={samplePdfUrl} />
    </div>
  );
}
