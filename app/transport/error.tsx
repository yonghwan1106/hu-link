'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TransportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Transport page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Bus className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">교통 정보를 불러올 수 없습니다</CardTitle>
          <CardDescription>
            실시간 버스 정보를 불러오는 중 문제가 발생했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-mono text-gray-700 break-all">
                {error.message}
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} className="flex-1">
              다시 시도
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                홈으로 이동
              </Button>
            </Link>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 text-center">
              서비스가 일시적으로 중단되었을 수 있습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
