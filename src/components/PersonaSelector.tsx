
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Star, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

interface PersonaSelectorProps {
  onPersonaSelect: (persona: string) => void;
}

const PersonaSelector = ({ onPersonaSelect }: PersonaSelectorProps) => {
  const personas = [
    {
      id: 'professional',
      title: '전문가 심리 치료 전용 모드',
      description: '심리상담사를 위한 내담자 소통 도구',
      icon: UserCheck,
      color: 'bg-teal-500',
      examples: [
        '안전하고 편안한 대화 환경 제공',
        '대화 기록 저장 및 분석 기능',
        '심리적 안정감을 주는 AI 응답 학습'
      ],
      isSpecial: true
    },
    {
      id: 'character',
      title: '캐릭터 모드',
      description: '귀여운 말투로 대화하는 친근한 AI',
      icon: Heart,
      color: 'bg-pink-500',
      examples: [
        '안녕! 오늘 기분이 어때? 😊',
        '와! 정말 대단하구나! 🎉',
        '힘들 때는 나에게 말해줘! 💝'
      ]
    },
    {
      id: 'counselor',
      title: '상담 모드',
      description: 'GPT-4 스타일의 전문적인 상담 AI',
      icon: MessageCircle,
      color: 'bg-blue-500',
      examples: [
        '당신의 고민을 자세히 들어보겠습니다.',
        '이런 상황에서는 다음과 같은 접근을 권장합니다.',
        '더 구체적으로 설명해 주시겠습니까?'
      ]
    },
    {
      id: 'tarot',
      title: '타로 모드',
      description: '신비로운 타로 카드 리딩 AI',
      icon: Star,
      color: 'bg-purple-500',
      examples: [
        '카드들이 당신에게 말하고 있습니다...',
        '오늘의 운세를 점쳐드리겠습니다.',
        '별들이 보여주는 당신의 미래는...'
      ]
    },
    {
      id: 'letter',
      title: '편지 모드',
      description: '감동적인 기념일 메시지 AI',
      icon: Sparkles,
      color: 'bg-yellow-500',
      examples: [
        '소중한 당신에게 전하는 마음...',
        '이 특별한 날을 축하합니다.',
        '함께한 시간들이 얼마나 소중한지...'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          어떤 AI 캐릭터를 만들까요?
        </h2>
        <p className="text-white/80 text-lg">
          원하는 페르소나를 선택하고 나만의 챗봇을 만들어보세요
        </p>
      </div>

      <div className="space-y-6">
        {/* Professional Mode - Featured */}
        {personas.filter(p => p.isSpecial).map((persona) => {
          const IconComponent = persona.icon;
          return (
            <Card 
              key={persona.id}
              className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 backdrop-blur-sm border-teal-300/30 text-white hover:from-teal-500/30 hover:to-blue-500/30 transition-all duration-300 cursor-pointer group"
              onClick={() => onPersonaSelect(persona.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${persona.color} rounded-full flex items-center justify-center ring-4 ring-white/20`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{persona.title}</CardTitle>
                      <CardDescription className="text-white/70 text-lg">
                        {persona.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-white/80 font-medium">주요 기능:</p>
                  {persona.examples.map((example, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-3">
                      <p className="text-sm text-white/90">• {example}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white text-lg py-3"
                >
                  전문가 모드 시작하기
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {/* Regular Personas */}
        <div className="grid md:grid-cols-2 gap-6">
          {personas.filter(p => !p.isSpecial).map((persona) => {
            const IconComponent = persona.icon;
            return (
              <Card 
                key={persona.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => onPersonaSelect(persona.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${persona.color} rounded-full flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{persona.title}</CardTitle>
                        <CardDescription className="text-white/70">
                          {persona.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-white/80 font-medium">예시 대화:</p>
                    {persona.examples.map((example, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3">
                        <p className="text-sm text-white/90">"{example}"</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                    variant="outline"
                  >
                    이 캐릭터 선택하기
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonaSelector;
