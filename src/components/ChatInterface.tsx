import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Share2, Download, Sparkles, User, Bot } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TarotCards from './TarotCards';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  persona: string;
  onBack: () => void;
}

const ChatInterface = ({ persona, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTarot, setShowTarot] = useState(false);
  const [aiResponseMode, setAiResponseMode] = useState(true);
  const [pendingUserMessage, setPendingUserMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const personaConfig = {
    character: {
      name: '귀여운 AI 친구',
      greeting: '안녕! 나는 너의 새로운 AI 친구야! 오늘 기분이 어때? 😊✨',
      color: 'bg-pink-500',
      icon: '🥰'
    },
    counselor: {
      name: 'AI 상담사',
      greeting: '안녕하세요. 저는 당신의 AI 상담사입니다. 어떤 고민이 있으신지 편안하게 말씀해 주세요.',
      color: 'bg-blue-500',
      icon: '🤝'
    },
    tarot: {
      name: '타로 마스터',
      greeting: '신비로운 타로의 세계에 오신 것을 환영합니다... 별들이 당신의 운명을 속삭이고 있어요. 🔮✨',
      color: 'bg-purple-500',
      icon: '🔮'
    },
    professional: {
      name: '심리 상담 AI',
      greeting: '안녕하세요. 편안하게 대화해 보세요. 언제든지 말하고 싶은 것이 있으면 자유롭게 말씀해 주세요.',
      color: 'bg-teal-500',
      icon: '💙'
    }
  };

  const currentPersona = personaConfig[persona as keyof typeof personaConfig];

  useEffect(() => {
    // 초기 인사말 추가
    const greeting: Message = {
      id: '1',
      type: 'ai',
      content: currentPersona.greeting,
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, [persona]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    if (aiResponseMode) {
      // 자동 응답 모드
      generateAIResponse(currentMessage);
    } else {
      // 수동 응답 모드 - 사용자가 직접 AI 역할
      setPendingUserMessage(currentMessage);
      setIsTyping(true);
    }
    
    setCurrentMessage('');
  };

  const generateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      
      if (persona === 'character') {
        response = getCharacterResponse(userMessage);
      } else if (persona === 'counselor') {
        response = getCounselorResponse(userMessage);
      } else if (persona === 'tarot') {
        response = getTarotResponse(userMessage);
      } else if (persona === 'professional') {
        response = getProfessionalResponse(userMessage);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const getCharacterResponse = (message: string) => {
    const responses = [
      '와! 정말 재미있는 이야기네! 더 들려줄래? 😊',
      '그런 일이 있었구나! 나도 비슷한 경험이 있어! ✨',
      '힘들었겠다... 괜찮아, 나는 항상 네 편이야! 💝',
      '오늘도 너무 수고했어! 정말 대단해! 🎉',
      '그렇게 생각하는구나! 나는 조금 다르게 생각해봤어! 🤔💭'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getCounselorResponse = (message: string) => {
    const responses = [
      '당신의 감정을 이해합니다. 이런 상황에서 그렇게 느끼는 것은 자연스러운 반응입니다.',
      '더 자세히 설명해 주시겠습니까? 구체적인 상황을 알면 더 나은 조언을 드릴 수 있습니다.',
      '이 문제에 대해 다양한 관점에서 접근해볼 수 있습니다. 먼저 근본적인 원인을 찾아보는 것이 중요합니다.',
      '당신의 강점을 활용해서 이 상황을 극복할 수 있을 것입니다. 과거에 비슷한 어려움을 어떻게 해결하셨나요?',
      '충분히 이해할 만한 상황입니다. 단계별로 해결책을 모색해보는 것이 좋겠습니다.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getTarotResponse = (message: string) => {
    const responses = [
      '카드들이 당신의 에너지를 느끼고 있습니다... 타로 카드를 뽑아보시겠습니까? 🃏',
      '별들이 당신에게 중요한 메시지를 전하고 있어요... 운명의 카드를 선택해보세요 ✨',
      '신비로운 기운이 감지됩니다... 3장의 카드가 당신의 과거, 현재, 미래를 보여줄 것입니다 🔮',
      '우주의 에너지가 당신을 둘러싸고 있어요... 타로가 답을 알려줄 겁니다 🌟',
      '카드들이 속삭이고 있습니다... 당신의 질문에 대한 답을 찾아보겠습니다 🃏✨'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getProfessionalResponse = (message: string) => {
    const responses = [
      '말씀해 주셔서 고맙습니다. 그런 기분이 드는 것은 충분히 이해할 수 있어요.',
      '천천히 말씀해 주세요. 어떤 것이든 괜찮습니다.',
      '지금 느끼고 계신 감정이 어떤 것인지 더 자세히 들려주실 수 있나요?',
      '힘든 시간을 보내고 계시는군요. 언제든 편안하게 이야기해 주세요.',
      '당신의 생각과 감정은 모두 소중합니다. 더 말씀해 주시겠어요?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleManualAIResponse = () => {
    if (!currentMessage.trim()) return;

    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setCurrentMessage('');
    setIsTyping(false);
    setPendingUserMessage('');
  };

  const shareChat = () => {
    const chatUrl = `${window.location.origin}/chat/${persona}/${Date.now()}`;
    navigator.clipboard.writeText(chatUrl);
    toast({
      title: "링크 복사됨!",
      description: "친구들에게 이 챗봇을 공유하세요!",
    });
  };

  const downloadChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type === 'user' ? '사용자' : currentPersona.name}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Chat_${persona}_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${currentPersona.color} rounded-full flex items-center justify-center`}>
                <span className="text-lg">{currentPersona.icon}</span>
              </div>
              <div>
                <h2 className="font-semibold text-white">{currentPersona.name}</h2>
                <p className="text-sm text-white/70">온라인</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAiResponseMode(!aiResponseMode)}
              className="text-white hover:bg-white/20"
            >
              {aiResponseMode ? '자동 응답' : '수동 응답'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={shareChat}
              className="text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadChat}
              className="text-white hover:bg-white/20"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-4 h-96 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : currentPersona.color}`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-sm">{currentPersona.icon}</span>
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white'}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPersona.color}`}>
                      <span className="text-sm">{currentPersona.icon}</span>
                    </div>
                    <div className="bg-white/20 text-white rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </Card>

        {/* Tarot Cards (for tarot persona) */}
        {persona === 'tarot' && (
          <div className="mb-4">
            <TarotCards onCardSelect={(card) => {
              const tarotMessage: Message = {
                id: Date.now().toString(),
                type: 'ai',
                content: `🃏 ${card.name} 카드가 선택되었습니다.\n\n${card.meaning}\n\n이 카드는 ${card.interpretation}을 의미합니다. ✨`,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, tarotMessage]);
            }} />
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          {!aiResponseMode && isTyping && (
            <div className="mb-4 p-3 bg-yellow-500/20 rounded-lg">
              <p className="text-white text-sm">
                <strong>사용자 메시지:</strong> "{pendingUserMessage}"
              </p>
              <p className="text-white/80 text-xs mt-1">
                위 메시지에 대한 AI 응답을 입력하세요
              </p>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder={
                !aiResponseMode && isTyping 
                  ? "AI로서 답장을 입력하세요..." 
                  : "메시지를 입력하세요..."
              }
              className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/60"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (!aiResponseMode && isTyping) {
                    handleManualAIResponse();
                  } else {
                    handleSendMessage();
                  }
                }
              }}
            />
            <Button
              onClick={
                !aiResponseMode && isTyping 
                  ? handleManualAIResponse 
                  : handleSendMessage
              }
              disabled={!currentMessage.trim()}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-white/60">
            <span>
              응답 모드: {aiResponseMode ? '자동 (AI가 응답)' : '수동 (내가 AI 역할)'}
            </span>
            <span>{messages.length}개 메시지</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
