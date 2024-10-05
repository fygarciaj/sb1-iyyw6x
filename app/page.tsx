"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import DownloadHandler from '@/components/DownloadHandler';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">TikTok Video Downloader</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Enter TikTok video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Download Video
        </Button>
      </form>
      {isSubmitted && <DownloadHandler url={videoUrl} />}
    </div>
  );
}