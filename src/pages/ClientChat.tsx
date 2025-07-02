
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ClientChat = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
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

    // 실시간 메시지 수신을 위한 이벤트 리스너 설정
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `counselor_message_${sessionId}`) {
        const newMessage = JSON.parse(e.newValue || '{}');
        if (newMessage.id) {
          setMessages(prev => [...prev, newMessage]);
          setIsWaitingForResponse(false);
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

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // 상담사에게 메시지 전송
    localStorage.setItem(`client_message_${sessionId}`, JSON.stringify(userMessage));
    
    setCurrentMessage('');
    setIsWaitingForResponse(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-300 to-teal-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-lg">💙</span>
            </div>
            <div>
              <h2 className="font-semibold text-white">심리 상담 AI</h2>
              <p className="text-sm text-white/70">온라인</p>
            </div>
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
              
              {isWaitingForResponse && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal-500">
                      <span className="text-sm">💙</span>
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

        {/* Input Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/60"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-white/60">
            <span>AI 상담사와 대화 중</span>
            <span>{messages.length}개 메시지</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
