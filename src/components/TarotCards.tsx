
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  interpretation: string;
  reversed?: boolean;
}

interface TarotCardsProps {
  onCardSelect: (card: TarotCard) => void;
}

const TarotCards = ({ onCardSelect }: TarotCardsProps) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const tarotDeck: TarotCard[] = [
    {
      id: 1,
      name: "The Fool",
      meaning: "새로운 시작과 모험",
      interpretation: "무한한 가능성과 새로운 여정의 시작"
    },
    {
      id: 2,
      name: "The Magician",
      meaning: "의지력과 창조력",
      interpretation: "목표 달성을 위한 강한 의지와 능력"
    },
    {
      id: 3,
      name: "The High Priestess",
      meaning: "직감과 내면의 지혜",
      interpretation: "숨겨진 지식과 영적 통찰력"
    },
    {
      id: 4,
      name: "The Empress",
      meaning: "풍요와 창조성",
      interpretation: "모성애와 자연스러운 성장"
    },
    {
      id: 5,
      name: "The Emperor",
      meaning: "권위와 안정성",
      interpretation: "질서와 통제, 리더십"
    },
    {
      id: 6,
      name: "The Lovers",
      meaning: "사랑과 선택",
      interpretation: "중요한 관계와 결정의 순간"
    },
    {
      id: 7,
      name: "The Chariot",
      meaning: "승리와 의지력",
      interpretation: "목표 달성을 위한 강한 추진력"
    },
    {
      id: 8,
      name: "Strength",
      meaning: "내면의 힘과 용기",
      interpretation: "인내와 자제력을 통한 성공"
    },
    {
      id: 9,
      name: "The Hermit",
      meaning: "내적 성찰과 지혜",
      interpretation: "혼자만의 시간을 통한 깨달음"
    },
    {
      id: 10,
      name: "Wheel of Fortune",
      meaning: "운명과 변화",
      interpretation: "인생의 전환점과 새로운 기회"
    }
  ];

  const selectRandomCards = () => {
    const shuffled = [...Array(tarotDeck.length)].map((_, i) => i).sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    setSelectedCards(selected);
    setIsRevealed(false);
  };

  const revealCards = () => {
    setIsRevealed(true);
    if (selectedCards.length > 0) {
      const card = tarotDeck[selectedCards[0]];
      onCardSelect(card);
    }
  };

  const resetCards = () => {
    setSelectedCards([]);
    setIsRevealed(false);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
          <Sparkles className="w-6 h-6 mr-2" />
          신비로운 타로 카드
          <Sparkles className="w-6 h-6 ml-2" />
        </h3>
        <p className="text-white/80">
          3장의 카드를 선택하여 당신의 운명을 확인해보세요
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {selectedCards.length === 0 ? (
          // 카드 덱 표시
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-16 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg border-2 border-purple-400 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                }}
              >
                <Sparkles className="w-6 h-6 text-purple-200" />
              </div>
            ))}
          </div>
        ) : (
          // 선택된 카드들 표시
          <div className="flex space-x-4">
            {selectedCards.map((cardIndex, i) => (
              <div
                key={i}
                className={`w-32 h-48 rounded-lg border-2 transition-all duration-500 cursor-pointer ${
                  isRevealed 
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-300 transform rotate-0' 
                    : 'bg-gradient-to-br from-purple-600 to-purple-800 border-purple-400 hover:scale-105'
                }`}
                onClick={() => !isRevealed && revealCards()}
              >
                {isRevealed ? (
                  <div className="p-3 h-full flex flex-col justify-between text-center">
                    <div>
                      <h4 className="font-bold text-purple-900 text-sm mb-2">
                        {tarotDeck[cardIndex].name}
                      </h4>
                      <div className="w-full h-16 bg-white/20 rounded flex items-center justify-center mb-2">
                        <Sparkles className="w-8 h-8 text-purple-700" />
                      </div>
                    </div>
                    <p className="text-xs text-purple-800 font-medium">
                      {i === 0 ? '과거' : i === 1 ? '현재' : '미래'}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-purple-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        {selectedCards.length === 0 ? (
          <Button
            onClick={selectRandomCards}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            카드 뽑기
          </Button>
        ) : !isRevealed ? (
          <Button
            onClick={revealCards}
            className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 px-6 py-2 font-bold animate-pulse"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            카드 공개하기
          </Button>
        ) : (
          <Button
            onClick={resetCards}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            다시 뽑기
          </Button>
        )}
      </div>

      {isReveaved && selectedCards.length > 0 && (
        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <h4 className="font-bold text-white mb-2">카드 해석</h4>
          <p className="text-white/90 text-sm">
            선택된 카드들이 당신의 운명을 말해주고 있습니다... 
            각 카드의 의미를 깊이 새겨보세요. ✨
          </p>
        </div>
      )}
    </Card>
  );
};

export default TarotCards;
