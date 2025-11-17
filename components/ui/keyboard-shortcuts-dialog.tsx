'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Keyboard } from 'lucide-react';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';

export function KeyboardShortcutsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { shortcuts } = useKeyboardShortcuts();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
        aria-label="키보드 단축키"
      >
        <Keyboard className="h-4 w-4" />
        <span className="hidden md:inline">단축키</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              키보드 단축키
            </DialogTitle>
            <DialogDescription>
              빠른 네비게이션을 위한 키보드 단축키를 확인하세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {shortcut.description}
                </span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center">
            <p className="text-xs text-gray-500">
              입력 필드에 포커스되어 있을 때는 단축키가 비활성화됩니다
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
