'use client';

import { useRef, useEffect, useCallback } from 'react';

export default function VideoPlayer({ videoUrl, onProgress, onComplete, initialProgress = 0 }) {
  const iframeRef = useRef(null);
  const progressInterval = useRef(null);
  const watchStartTime = useRef(Date.now());

  // Extract YouTube embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Already an embed URL
    if (url.includes('youtube.com/embed/')) return url;

    // Standard YouTube URL
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&enablejsapi=1`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  const handleProgressUpdate = useCallback(() => {
    if (!onProgress) return;
    const watchTimeSeconds = Math.floor((Date.now() - watchStartTime.current) / 1000);
    onProgress({ watchTimeSeconds });
  }, [onProgress]);

  useEffect(() => {
    watchStartTime.current = Date.now();

    // Report progress every 30 seconds
    progressInterval.current = setInterval(handleProgressUpdate, 30000);

    return () => {
      clearInterval(progressInterval.current);
      // Final progress report on unmount
      handleProgressUpdate();
    };
  }, [handleProgressUpdate]);

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-dark-card border border-dark-border rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-text-secondary">Видео будет доступно скоро</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-dark-border">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video lesson"
      />
    </div>
  );
}
