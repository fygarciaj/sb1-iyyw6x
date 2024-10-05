"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface DownloadHandlerProps {
  url: string;
}

export default function DownloadHandler({ url }: DownloadHandlerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const downloadVideo = async () => {
      try {
        const response = await axios.post('/api/download', { url });
        const downloadUrl = response.data.videoUrl;
        
        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'tiktok_video.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setMessage('Video downloaded successfully!');
        setIsError(false);
      } catch (error) {
        setMessage('Failed to download the video. Please try again.');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    downloadVideo();
  }, [url]);

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Processing...
      </div>
    );
  }

  return (
    <div className={`mt-4 p-2 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
      {message}
    </div>
  );
}