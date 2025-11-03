'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:8000/user/123/resume', {  // Placeholder user_id
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setParsed(data.parsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Resume</h1>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Upload
      </button>
      {parsed && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Parsed Data</h2>
          <pre className="bg-white p-4 rounded-lg">{JSON.stringify(parsed, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}