'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Users, MapPin, CreditCard, Check } from 'lucide-react';
import type { Facility } from '@/lib/data/facilities';

interface BookingModalProps {
  facility: Facility;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ facility, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'datetime' | 'people' | 'transport' | 'confirm'> ('datetime');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedTransport, setSelectedTransport] = useState<'bus' | 'drt' | 'none'>('none');

  // 다음 7일간의 날짜 생성
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      label: `${date.getMonth() + 1}월 ${date.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]})`,
      short: `${date.getMonth() + 1}/${date.getDate()}`,
    };
  });

  // 운영 시간에 맞는 시간 슬롯 생성
  const availableTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  const handleNext = () => {
    if (step === 'datetime' && selectedDate && selectedTime) setStep('people');
    else if (step === 'people') setStep('transport');
    else if (step === 'transport') setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'people') setStep('datetime');
    else if (step === 'transport') setStep('people');
    else if (step === 'confirm') setStep('transport');
  };

  const handleConfirm = () => {
    // 실제로는 서버에 예약 요청을 보냄
    alert('예약이 완료되었습니다!');
    onClose();
    setStep('datetime');
    setSelectedDate('');
    setSelectedTime('');
    setPeopleCount(1);
    setSelectedTransport('none');
  };

  const transportCost = selectedTransport === 'bus' ? 1500 : selectedTransport === 'drt' ? 3000 : 0;
  const totalCost = facility.price * peopleCount + transportCost;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{facility.name} 예약하기</DialogTitle>
          <DialogDescription>원하시는 날짜와 시간을 선택하세요</DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {['날짜/시간', '인원', '교통편', '확인'].map((label, index) => {
            const stepNames = ['datetime', 'people', 'transport', 'confirm'];
            const currentIndex = stepNames.indexOf(step);
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;

            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[--primary] text-white'
                        : isCompleted
                        ? 'bg-[--success] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'text-gray-500'}`}>{label}</span>
                </div>
                {index < 3 && (
                  <div className={`h-0.5 flex-1 ${isCompleted ? 'bg-[--success]' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Date & Time Selection */}
        {step === 'datetime' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[--primary]" />
                날짜 선택
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {availableDates.map((date) => (
                  <Button
                    key={date.value}
                    variant={selectedDate === date.value ? 'default' : 'outline'}
                    onClick={() => setSelectedDate(date.value)}
                    className="h-auto py-3"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">{date.short}</div>
                      <div className="text-xs opacity-75">{date.label.split(' ')[2]}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-[--primary]" />
                시간 선택
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    onClick={() => setSelectedTime(time)}
                    size="sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: People Count */}
        {step === 'people' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-[--primary]" />
                인원 선택
              </h3>
              <div className="flex items-center justify-center gap-4 p-8 bg-gray-50 rounded-lg">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                  disabled={peopleCount <= 1}
                >
                  -
                </Button>
                <div className="text-4xl font-bold text-[--primary] min-w-[80px] text-center">{peopleCount}</div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setPeopleCount(Math.min(facility.capacity, peopleCount + 1))}
                  disabled={peopleCount >= facility.capacity}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">최대 {facility.capacity}명까지 예약 가능합니다</p>
            </div>
          </div>
        )}

        {/* Step 3: Transport Selection */}
        {step === 'transport' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[--primary]" />
              교통편 선택 (선택사항)
            </h3>

            <div className="grid gap-3">
              <Card
                className={`cursor-pointer transition-all ${
                  selectedTransport === 'none' ? 'border-[--primary] border-2 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTransport('none')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">교통편 없음</h4>
                      <p className="text-sm text-gray-600">직접 이동하시겠습니다</p>
                    </div>
                    <div className="text-xl font-bold text-[--primary]">무료</div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  selectedTransport === 'bus' ? 'border-[--primary] border-2 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTransport('bus')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        H버스
                        {facility.isAccessible && <Badge variant="success" className="text-xs">저상버스</Badge>}
                      </h4>
                      <p className="text-sm text-gray-600">동탄역에서 출발 (약 25분 소요)</p>
                    </div>
                    <div className="text-xl font-bold text-[--primary]">1,500원</div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  selectedTransport === 'drt' ? 'border-[--primary] border-2 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTransport('drt')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">DRT (수요응답형)</h4>
                      <p className="text-sm text-gray-600">집 앞에서 픽업 (약 15분 소요)</p>
                    </div>
                    <div className="text-xl font-bold text-[--primary]">3,000원</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirm' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[--primary]" />
                예약 내역 확인
              </h3>

              <Card className="bg-gray-50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">시설</span>
                    <span className="font-semibold text-right">{facility.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">날짜</span>
                    <span className="font-semibold">
                      {availableDates.find((d) => d.value === selectedDate)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">시간</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">인원</span>
                    <span className="font-semibold">{peopleCount}명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">교통편</span>
                    <span className="font-semibold">
                      {selectedTransport === 'bus' ? 'H버스' : selectedTransport === 'drt' ? 'DRT' : '없음'}
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">시설 이용료</span>
                      <span>{(facility.price * peopleCount).toLocaleString()}원</span>
                    </div>
                    {transportCost > 0 && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">교통비</span>
                        <span>{transportCost.toLocaleString()}원</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-[--primary] mt-4 pt-4 border-t">
                      <span>총 금액</span>
                      <span>{totalCost.toLocaleString()}원</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {step !== 'datetime' && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              이전
            </Button>
          )}
          {step === 'confirm' ? (
            <Button onClick={handleConfirm} className="flex-1">
              예약 확정하기
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1"
              disabled={
                (step === 'datetime' && (!selectedDate || !selectedTime))
              }
            >
              다음
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
