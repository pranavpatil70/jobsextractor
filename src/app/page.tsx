import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Job Extractor</h1>
      <div className="space-x-4">
        <Link href="/upload" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Upload Resume
        </Link>
        <Link href="/dashboard" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          View Jobs
        </Link>
      </div>
    </div>
  );
}
