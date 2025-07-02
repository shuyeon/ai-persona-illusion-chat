
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Trash2 } from 'lucide-react';

interface ChatSession {
  id: string;
  persona: string;
  date: Date;
  messageCount: number;
  lastMessage: string;
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  onViewSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onDownloadSession: (sessionId: string) => void;
}

const ChatHistory = ({ sessions, onViewSession, onDeleteSession, onDownloadSession }: ChatHistoryProps) => {
  const personaNames = {
    character: '캐릭터 모드',
    counselor: '상담 모드',
    tarot: '타로 모드',
    letter: '편지 모드'
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white mb-6">대화 기록</h3>
      
      {sessions.length === 0 ? (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-6 text-center">
            <p className="text-white/70">아직 저장된 대화가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        sessions.map((session) => (
          <Card key={session.id} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {personaNames[session.persona as keyof typeof personaNames]}
                  </CardTitle>
                  <p className="text-white/70 text-sm">
                    {session.date.toLocaleDateString()} • {session.messageCount}개 메시지
                  </p>
                  <p className="text-white/60 text-sm mt-1 truncate max-w-md">
                    "{session.lastMessage}"
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewSession(session.id)}
                    className="text-white hover:bg-white/20"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDownloadSession(session.id)}
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteSession(session.id)}
                    className="text-white hover:bg-white/20 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))
      )}
    </div>
  );
};

export default ChatHistory;
