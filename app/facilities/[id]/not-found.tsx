import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowLeft } from 'lucide-react';

export default function FacilityNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[--primary] to-[--secondary] rounded-full flex items-center justify-center">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">시설을 찾을 수 없습니다</CardTitle>
          <CardDescription className="text-base mt-2">
            요청하신 시설이 존재하지 않거나 삭제되었을 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              다른 시설을 찾아보시거나 시설 목록 페이지로 이동해주세요.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/facilities" className="flex-1">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                시설 목록으로
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                홈으로 이동
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
