import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, MapPin, Bus, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-[--primary] to-[--secondary] rounded-full flex items-center justify-center">
            <SearchX className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-4xl mb-2">404</CardTitle>
          <CardTitle className="text-2xl">페이지를 찾을 수 없습니다</CardTitle>
          <CardDescription className="text-base mt-2">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/" className="block">
              <div className="p-6 border-2 border-transparent hover:border-[--primary] rounded-lg bg-sky-50 dark:bg-sky-950/20 transition-all hover:shadow-lg group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-[--primary]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Home className="h-6 w-6 text-[--primary]" />
                  </div>
                  <h3 className="font-semibold">홈으로</h3>
                  <p className="text-xs text-gray-600">메인 페이지로 이동</p>
                </div>
              </div>
            </Link>

            <Link href="/facilities" className="block">
              <div className="p-6 border-2 border-transparent hover:border-[--primary] rounded-lg bg-blue-50 dark:bg-blue-950/20 transition-all hover:shadow-lg group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-[--primary]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-[--primary]" />
                  </div>
                  <h3 className="font-semibold">시설 찾기</h3>
                  <p className="text-xs text-gray-600">공공시설 둘러보기</p>
                </div>
              </div>
            </Link>

            <Link href="/transport" className="block">
              <div className="p-6 border-2 border-transparent hover:border-[--primary] rounded-lg bg-teal-50 dark:bg-teal-950/20 transition-all hover:shadow-lg group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-[--secondary]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bus className="h-6 w-6 text-[--secondary]" />
                  </div>
                  <h3 className="font-semibold">교통 정보</h3>
                  <p className="text-xs text-gray-600">실시간 버스 위치</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Help Text */}
          <div className="pt-4 border-t text-center">
            <p className="text-sm text-gray-600">
              찾으시는 페이지가 있으신가요?
            </p>
            <Link href="/">
              <Button className="mt-4">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
