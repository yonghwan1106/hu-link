'use client';

import Link from 'next/link';
import { Home, MapPin, Calendar, User, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NotificationDropdown } from './notification-dropdown';
import { ThemeToggle } from './theme-toggle';
import { KeyboardShortcutsDialog } from '@/components/ui/keyboard-shortcuts-dialog';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  useKeyboardShortcuts(); // Enable keyboard shortcuts

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/facilities?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[--border] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[--primary] to-[--primary-light]">
              <span className="text-xl font-bold text-white">HU</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">HU-Link</span>
              <span className="text-[10px] text-gray-500">화성 통합 플랫폼</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Home className="h-4 w-4" />
                <span>홈</span>
              </Button>
            </Link>
            <Link href="/facilities">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>시설</span>
              </Button>
            </Link>
            <Link href="/transport">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>교통</span>
              </Button>
            </Link>
            <Link href="/my">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                <span>마이</span>
              </Button>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="검색"
            >
              <Search className="h-5 w-5" />
            </Button>

            <KeyboardShortcutsDialog />

            <ThemeToggle />

            <NotificationDropdown />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="hidden md:flex items-center space-x-2">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">포인트</span>
                <span className="text-sm font-semibold text-[--primary]">15,800P</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-[--border] py-4">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="시설 이름을 검색하세요..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary] text-gray-900 font-medium bg-white"
                  autoFocus
                />
              </div>
              <Button type="submit" size="sm">
                검색
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                aria-label="검색 닫기"
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[--border] py-4 space-y-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
                <Home className="h-5 w-5" />
                <span>홈</span>
              </div>
            </Link>
            <Link href="/facilities" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
                <MapPin className="h-5 w-5" />
                <span>시설 찾기</span>
              </div>
            </Link>
            <Link href="/transport" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
                <Calendar className="h-5 w-5" />
                <span>교통 정보</span>
              </div>
            </Link>
            <Link href="/my" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
                <User className="h-5 w-5" />
                <span>마이 페이지</span>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
