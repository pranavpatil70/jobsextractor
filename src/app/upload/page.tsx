'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setError(null);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/user/123/resume', {  // Placeholder user_id
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setParsed(data.parsed);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Upload Resume</h1>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 text-gray-900"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {parsed && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Parsed Data</h2>
          <pre className="bg-white p-4 rounded-lg text-gray-900">{JSON.stringify(parsed, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}