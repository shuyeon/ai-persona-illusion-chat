
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Sparkles, Heart, Star, Share2 } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import PersonaSelector from '@/components/PersonaSelector';
import TarotCards from '@/components/TarotCards';

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const startCreating = () => {
    setIsCreating(true);
  };

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona);
    setShowChat(true);
  };

  if (showChat && selectedPersona) {
    return (
      <ChatInterface 
        persona={selectedPersona}
        onBack={() => {
          setShowChat(false);
          setSelectedPersona(null);
        }}
      />
    );
  }

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-purple-600 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">AI 챗봇 생성기</h1>
            <Button 
              variant="secondary" 
              onClick={() => setIsCreating(false)}
              className="bg-white/20 text-white hover:bg-white/30"
            >
              뒤로가기
            </Button>
          </div>
          
          <PersonaSelector onPersonaSelect={handlePersonaSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-purple-600">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <MessageCircle className="w-20 h-20 text-white animate-bounce" />
                <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI 챗봇 <span className="text-yellow-300">장난치기</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              친구들을 속이는 가짜 AI 챗봇을 만들어보세요! 
              <br />실제 GPT처럼 보이는 완벽한 채팅 인터페이스
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={startCreating}
                className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                챗봇 만들기 시작
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-full"
              >
                <Share2 className="w-5 h-5 mr-2" />
                예시 보기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              어떤 AI 캐릭터를 만들까요?
            </h2>
            <p className="text-xl text-white/80">
              다양한 페르소나로 친구들을 놀라게 해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>캐릭터 모드</CardTitle>
                <CardDescription className="text-white/70">
                  귀여운 말투로 아이 설득하기
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80">
                  "오늘 숙제 다 했어? 대단해! 🎉"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>상담 모드</CardTitle>
                <CardDescription className="text-white/70">
                  GPT-4 스타일 진지한 상담
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80">
                  전문적이고 신뢰할 수 있는 조언 제공
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle>타로 모드</CardTitle>
                <CardDescription className="text-white/70">
                  신비로운 타로 카드 리딩
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80">
                  카드 조작으로 원하는 결과 연출
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>편지 모드</CardTitle>
                <CardDescription className="text-white/70">
                  감동적인 기념일 메시지
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80">
                  생일, 기념일 맞춤 편지 작성
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              어떻게 작동하나요?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">페르소나 선택</h3>
              <p className="text-white/80">
                원하는 AI 캐릭터를 선택하고 설정을 커스터마이징하세요
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">대화 시작</h3>
              <p className="text-white/80">
                실시간으로 AI인 척 대답하거나 사전 설정된 응답을 사용하세요
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">공유하기</h3>
              <p className="text-white/80">
                생성된 챗봇 링크를 친구들에게 공유하고 반응을 확인하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
