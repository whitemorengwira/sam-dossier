'use client';

import { useState } from 'react';
import { DocumentUploadZone } from '../upload/DocumentUploadZone';
import { SigningRecipientManager } from './SigningRecipientManager';

export function SigningEnvelopeCreator() {
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState<any[]>([]);
  const [recipients, setRecipients] = useState([{ id: 1, name: '', email: '', role: 'Needs to Sign' }]);
  const [subject, setSubject] = useState('Please DocuSign: Document');
  const [message, setMessage] = useState('Please review and sign the attached documents.');

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="bg-white min-h-[800px] flex flex-col w-full max-w-5xl mx-auto shadow-2xl rounded-xl overflow-hidden mt-8">
      {/* Header Stepper */}
      <div className="bg-gray-50 border-b p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Send an Envelope</h1>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i}
              </div>
              <span className={`text-sm font-medium ${step >= i ? 'text-blue-600' : 'text-gray-400'} hidden md:block`}>
                {i === 1 ? 'Add Docs' : i === 2 ? 'Recipients' : i === 3 ? 'Message' : 'Review'}
              </span>
              {i < 4 && <div className="w-8 h-[2px] bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 bg-white overflow-y-auto">
        {step === 1 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-gray-800">1. Add Documents</h2>
            <p className="text-gray-500">Upload the documents you want to send out for signature.</p>
            <DocumentUploadZone 
               workspaceId="temp-workspace-id"
               onUploadComplete={(file) => setDocuments([...documents, file])} 
            />
            {documents.length > 0 && (
              <div className="mt-4 border rounded-lg divide-y">
                 {documents.map((d, i) => (
                   <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                     <div className="flex items-center gap-3">
                       <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                       <div>
                         <p className="font-semibold text-gray-700">{d.name}</p>
                         <p className="text-xs text-gray-500">{((d as File).size / 1024).toFixed(1)} KB</p>
                       </div>
                     </div>
                     <button className="text-red-500 hover:text-red-700 font-medium text-sm">Remove</button>
                   </div>
                 ))}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-gray-800">2. Add Recipients</h2>
            <p className="text-gray-500">Specify who needs to sign or receive a copy.</p>
            
            <div className="space-y-4">
               {recipients.map((r, i) => (
                 <div key={r.id} className="flex gap-4 items-start bg-gray-50 p-4 border rounded-lg">
                   <div className="w-8 h-8 shrink-0 bg-gray-800 text-white rounded flex items-center justify-center font-bold">
                     {i + 1}
                   </div>
                   <div className="flex-1 grid grid-cols-2 gap-4">
                     <input 
                       type="text" 
                       placeholder="Name" 
                       className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                     />
                     <input 
                       type="email" 
                       placeholder="Email Address" 
                       className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                     />
                   </div>
                   <select className="p-2 border rounded bg-white shrink-0 outline-none focus:ring-2 focus:ring-blue-500">
                     <option>Needs to Sign</option>
                     <option>Receives a Copy</option>
                   </select>
                 </div>
               ))}
            </div>
            
            <button 
              onClick={() => setRecipients([...recipients, { id: Date.now(), name: '', email: '', role: 'Needs to Sign' }])}
              className="px-4 py-2 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-gray-400 hover:text-gray-800 font-medium w-full"
            >
              + Add Recipient
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-gray-800">3. Email Message</h2>
            <p className="text-gray-500">Customize the email that recipients will receive.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Message</label>
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={6}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-gray-800">4. Review & Send</h2>
            <p className="text-gray-500">Place signature fields on the document, then send.</p>
            
            <div className="border rounded-lg bg-gray-50 flex items-center justify-center h-64 border-dashed border-2">
               <div className="text-center">
                 <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                 <p className="mt-2 text-sm text-gray-500">Advanced placement requires PDFViewer integration.</p>
                 <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded font-medium shadow-sm hover:bg-blue-700">
                   Send Envelope Now
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="bg-gray-50 border-t p-6 flex justify-between items-center">
        <button 
          onClick={handlePrev}
          disabled={step === 1}
          className="px-6 py-2.5 rounded font-medium border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        {step < 4 ? (
          <button 
            onClick={handleNext}
            className="px-6 py-2.5 rounded font-medium bg-blue-600 text-white shadow-sm hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button 
            className="px-6 py-2.5 rounded font-medium bg-green-600 text-white shadow-sm hover:bg-green-700"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}
