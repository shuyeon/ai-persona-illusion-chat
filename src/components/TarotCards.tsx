
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  interpretation: string;
  image: string;
}

interface TarotCardsProps {
  onCardSelect: (card: TarotCard) => void;
}

const TarotCards = ({ onCardSelect }: TarotCardsProps) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const tarotCards: TarotCard[] = [
    {
      id: 1,
      name: "연인 (The Lovers)",
      meaning: "사랑과 관계의 선택",
      interpretation: "새로운 만남이나 중요한 결정",
      image: "💕"
    },
    {
      id: 2,
      name: "별 (The Star)",
      meaning: "희망과 영감",
      interpretation: "밝은 미래와 새로운 가능성",
      image: "⭐"
    },
    {
      id: 3,
      name: "태양 (The Sun)",
      meaning: "성공과 기쁨",
      interpretation: "행복한 결과와 성취",
      image: "☀️"
    },
    {
      id: 4,
      name: "달 (The Moon)",
      meaning: "직감과 신비",
      interpretation: "숨겨진 진실이 드러남",
      image: "🌙"
    },
    {
      id: 5,
      name: "세계 (The World)",
      meaning: "완성과 성취",
      interpretation: "목표 달성과 새로운 시작",
      image: "🌍"
    },
    {
      id: 6,
      name: "마법사 (The Magician)",
      meaning: "의지와 창조력",
      interpretation: "능력을 발휘할 때",
      image: "🎩"
    }
  ];

  const selectRandomCards = () => {
    const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3).map(card => card.id);
    setSelectedCards(selected);
    setIsRevealed(false);
  };

  const revealCards = () => {
    setIsRevealed(true);
    selectedCards.forEach((cardId, index) => {
      const card = tarotCards.find(c => c.id === cardId);
      if (card) {
        setTimeout(() => {
          onCardSelect(card);
        }, index * 1000);
      }
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center">
          <Sparkles className="w-5 h-5 mr-2" />
          신비로운 타로 카드
        </h3>
        <p className="text-white/70">3장의 카드를 뽑아 운명을 확인해보세요</p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {selectedCards.length > 0 ? (
          selectedCards.map((cardId, index) => {
            const card = tarotCards.find(c => c.id === cardId);
            return (
              <Card key={index} className="w-24 h-36 bg-purple-600 border-purple-400 cursor-pointer transform hover:scale-105 transition-transform">
                <CardContent className="p-2 h-full flex flex-col items-center justify-center">
                  {isRevealed && card ? (
                    <>
                      <div className="text-2xl mb-2">{card.image}</div>
                      <p className="text-white text-xs text-center">{card.name}</p>
                    </>
                  ) : (
                    <div className="text-4xl text-purple-300">🎴</div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          [1, 2, 3].map((index) => (
            <Card key={index} className="w-24 h-36 bg-purple-600/50 border-purple-400 border-dashed">
              <CardContent className="p-2 h-full flex items-center justify-center">
                <div className="text-4xl text-purple-300/50">🎴</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={selectRandomCards}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          카드 뽑기
        </Button>
        {selectedCards.length > 0 && !isRevealed && (
          <Button
            onClick={revealCards}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            카드 공개
          </Button>
        )}
      </div>
    </div>
  );
};

export default TarotCards;
