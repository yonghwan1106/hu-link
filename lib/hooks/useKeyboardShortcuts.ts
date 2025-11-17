'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const shortcuts: KeyboardShortcut[] = [
      // Navigation shortcuts
      {
        key: 'h',
        altKey: true,
        action: () => router.push('/'),
        description: '홈으로 이동',
      },
      {
        key: 'f',
        altKey: true,
        action: () => router.push('/facilities'),
        description: '시설 찾기',
      },
      {
        key: 't',
        altKey: true,
        action: () => router.push('/transport'),
        description: '교통 정보',
      },
      {
        key: 'm',
        altKey: true,
        action: () => router.push('/my'),
        description: '마이 페이지',
      },
      {
        key: 'k',
        altKey: true,
        action: () => router.push('/with-kids'),
        description: '아이와 함께',
      },
      // Utility shortcuts
      {
        key: '/',
        ctrlKey: true,
        action: () => {
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        },
        description: '검색 포커스',
      },
      {
        key: 'Escape',
        action: () => {
          // Close modals, clear focus
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement) {
            activeElement.blur();
          }
        },
        description: '포커스 해제',
      },
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(
        (s) =>
          s.key.toLowerCase() === event.key.toLowerCase() &&
          (s.ctrlKey === undefined || s.ctrlKey === event.ctrlKey) &&
          (s.shiftKey === undefined || s.shiftKey === event.shiftKey) &&
          (s.altKey === undefined || s.altKey === event.altKey) &&
          (s.metaKey === undefined || s.metaKey === event.metaKey)
      );

      if (shortcut) {
        // Don't trigger if user is typing in input/textarea
        const target = event.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          return;
        }

        event.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return {
    shortcuts: [
      { key: 'Alt + H', description: '홈으로 이동' },
      { key: 'Alt + F', description: '시설 찾기' },
      { key: 'Alt + T', description: '교통 정보' },
      { key: 'Alt + M', description: '마이 페이지' },
      { key: 'Alt + K', description: '아이와 함께' },
      { key: 'Ctrl + /', description: '검색 포커스' },
      { key: 'Esc', description: '포커스 해제' },
    ],
  };
}
