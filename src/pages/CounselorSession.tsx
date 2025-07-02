
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Download, User, Bot, Copy } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const CounselorSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [pendingClientMessage, setPendingClientMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 초기 인사말 추가
    const greeting: Message = {
      id: '1',
      type: 'ai',
      content: '안녕하세요. 편안하게 대화해 보세요. 언제든지 말하고 싶은 것이 있으면 자유롭게 말씀해 주세요.',
      timestamp: new Date()
    };
    setMessages([greeting]);

    // 내담자 메시지 수신을 위한 이벤트 리스너 설정
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `client_message_${sessionId}`) {
        const newMessage = JSON.parse(e.newValue || '{}');
        if (newMessage.id) {
          setMessages(prev => [...prev, newMessage]);
          setPendingClientMessage(newMessage);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendAIResponse = () => {
    if (!currentMessage.trim()) return;

    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    
    // 내담자에게 메시지 전송
    localStorage.setItem(`counselor_message_${sessionId}`, JSON.stringify(aiMessage));
    
    setCurrentMessage('');
    setPendingClientMessage(null);
  };

  const copyClientLink = () => {
    const clientUrl = `${window.location.origin}/client/${sessionId}`;
    navigator.clipboard.writeText(clientUrl);
    toast({
      title: "링크 복사됨!",
      description: "내담자용 링크가 클립보드에 복사되었습니다.",
    });
  };

  const downloadChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type === 'user' ? '내담자' : 'AI 상담사'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `심리상담_기록_${sessionId}_${new Date().getTime()}.txt`;
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
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-lg">💙</span>
              </div>
              <div>
                <h2 className="font-semibold text-white">상담사 모드 - 세션 #{sessionId}</h2>
                <p className="text-sm text-white/70">AI 역할로 내담자와 대화</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyClientLink}
              className="text-white hover:bg-white/20"
            >
              <Copy className="w-4 h-4 mr-2" />
              내담자 링크 복사
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : 'bg-teal-500'}`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-sm">💙</span>
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
              <div ref={messagesEndRef} />
            </div>
          </div>
        </Card>

        {/* Input Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          {pendingClientMessage && (
            <div className="mb-4 p-3 bg-blue-500/20 rounded-lg">
              <p className="text-white text-sm">
                <strong>내담자 메시지:</strong> "{pendingClientMessage.content}"
              </p>
              <p className="text-white/80 text-xs mt-1">
                위 메시지에 대한 AI 상담사 응답을 입력하세요
              </p>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="AI 상담사로서 응답을 입력하세요..."
              className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/60"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendAIResponse();
                }
              }}
            />
            <Button
              onClick={handleSendAIResponse}
              disabled={!currentMessage.trim()}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-white/60">
            <span>상담사가 AI 역할을 담당하는 모드</span>
            <span>{messages.length}개 메시지</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorSession;
