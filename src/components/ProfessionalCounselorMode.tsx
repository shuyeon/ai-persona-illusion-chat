
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, MessageSquare, BarChart3, Share2 } from 'lucide-react';

interface ProfessionalCounselorModeProps {
  onStartSession: () => void;
  onViewAnalytics: () => void;
  onShareLink: () => void;
}

const ProfessionalCounselorMode = ({ onStartSession, onViewAnalytics, onShareLink }: ProfessionalCounselorModeProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          전문가 심리 치료 전용 모드
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          심리상담사 이시현 님을 위한 전문 모드입니다. 
          내담자와의 자연스러운 소통을 위해 설계되었습니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>대화 세션 시작</CardTitle>
                <CardDescription className="text-white/70">
                  내담자와의 안전한 대화 환경 제공
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-white/80 space-y-2 mb-4">
              <li>• 심리적 안정감을 주는 AI 응답</li>
              <li>• 수동/자동 모드 전환 가능</li>
              <li>• 실시간 대화 기록 저장</li>
            </ul>
            <Button 
              onClick={onStartSession}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              세션 시작하기
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>내담자 링크 공유</CardTitle>
                <CardDescription className="text-white/70">
                  내담자가 접속할 수 있는 전용 링크 생성
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-white/80 space-y-2 mb-4">
              <li>• 익명성 보장된 접속 환경</li>
              <li>• AI 챗봇으로 인식되는 인터페이스</li>
              <li>• 대인기피증 내담자도 편안하게 사용</li>
            </ul>
            <Button 
              onClick={onShareLink}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              링크 생성 및 공유
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle>대화 분석 및 기록</CardTitle>
                  <CardDescription className="text-white/70">
                    내담자와의 대화 내용을 분석하여 상담에 활용
                  </CardDescription>
                </div>
              </div>
              <Button 
                onClick={onViewAnalytics}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
              >
                분석 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/90 font-medium">감정 분석</p>
                <p className="text-white/70">대화 중 감정 변화 추적</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/90 font-medium">키워드 추출</p>
                <p className="text-white/70">주요 관심사 및 고민 파악</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/90 font-medium">진행도 측정</p>
                <p className="text-white/70">상담 효과 및 개선점 분석</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalCounselorMode;
