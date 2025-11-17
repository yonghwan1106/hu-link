'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleShare = async () => {
    // Web Share API 지원 여부 확인
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (error) {
        // 사용자가 공유를 취소한 경우 등
        console.log('Share cancelled');
      }
    } else {
      // Web Share API 미지원 시 URL 복사
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link', error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        공유하기
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className={`gap-2 ${copied ? 'bg-green-50 border-green-500 text-green-700' : ''}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            복사됨
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" />
            링크 복사
          </>
        )}
      </Button>
    </div>
  );
}
