// src/App.jsx

import { useState } from 'react';
import './App.css'; 

// ⭐️ 오타 수정: 4번, 7번 항목을 콜론(:)으로 수정
const tarotCards = {
    1: { name: "마법사 (The Magician)", image: "/images/1.png", meaning: "의지력, 창조력, 새로운 시작의 힘을 가진 당신" },
    2: { name: "여교황 (The High Priestess)", image: "/images/2.png", meaning: "직감과 내면의 지혜, 신비로운 통찰력을 지닌 당신" },
    3: { name: "여황제 (The Empress)", image: "/images/3.png", meaning: "풍요로움과 창조성, 모성애와 자연의 힘을 가진 당신" },
    4: { name: "황제 (The Emperor)", image: "/images/4.png", meaning: "권위와 안정성, 강한 리더십과 질서를 추구하는 당신" },
    5: { name: "교황 (The Hierophant)", image: "/images/5.png", meaning: "전통과 지혜, 영적 가르침과 도덕성을 중시하는 당신" },
    6: { name: "연인 (The Lovers)", image: "/images/6.png", meaning: "사랑과 조화, 선택과 관계에서 균형을 찾는 당신" },
    7: { name: "전차 (The Chariot)", image: "/images/7.png", meaning: "의지력과 승리, 목표를 향한 강한 추진력을 가진 당신" },
    8: { name: "힘 (Strength)", image: "/images/8.png", meaning: "내면의 힘과 용기, 부드러움으로 강함을 다스리는 당신" },
    9: { name: "은둔자 (The Hermit)", image: "/images/9.png", meaning: "내면의 탐구와 지혜, 홀로서기와 성찰을 통한 깨달음을 얻는 당신" }
};

const customStyles = `
  .gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .result-animation {
    animation: fadeInScale 0.5s ease-out;
  }
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
`;

function App() {
  const [inputs, setInputs] = useState({ year: '', month: '', day: '' });
  const [resultData, setResultData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { year, month, day } = inputs;
    if (!year || !month || !day) return;

    const allDigits = year + month.padStart(2, '0') + day.padStart(2, '0');
    const digits = allDigits.split('').map(Number);
    let sum = digits.reduce((acc, digit) => acc + digit, 0);
    
    let steps = `${year}년 ${month}월 ${day}일<br>`;
    steps += `${digits.join(' + ')} = ${sum}`;

    while (sum > 9) {
        const newDigits = sum.toString().split('').map(Number);
        const newSum = newDigits.reduce((acc, digit) => acc + digit, 0);
        steps += `<br>${newDigits.join(' + ')} = ${newSum}`;
        sum = newSum;
    }

    setResultData({ sum, steps });
  };

  const handleReset = () => {
    setResultData(null);
    setInputs({ year: '', month: '', day: '' });
  };

  const tarotCard = resultData ? tarotCards[resultData.sum] : null;

  return (
    <>
      <style>{customStyles}</style>
      {/* ⭐️ 가장 바깥쪽 div: 보라색 그라데이션 배경, 전체 화면, 카드 중앙 정렬 */}
      <div className="gradient-bg min-h-screen py-8 flex items-center justify-center">
        
        {!resultData && (
          <main id="inputPage" className="container mx-auto px-4">
            {/* ⭐️ 하얀색 카드: bg-white를 다시 추가! */}
            <div className="max-w-md mx-auto rounded-2xl shadow-2xl p-8 result-animation bg-white"> 
              <header className="text-center mb-8">
                {/* 글자색은 다시 어두운 색으로 */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ 소울 넘버 찾기</h1>
                {/* ⭐️ 텍스트 수정 */}
                <p className="text-gray-600">생년월일을 입력하세요</p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-2">태어난 연도</label>
                  <input
                    type="number"
                    id="birthYear"
                    name="year"
                    value={inputs.year}
                    onChange={handleInputChange}
                    placeholder="예: 1990"
                    min="1900"
                    max="2024"
                    /* ⭐️ 입력창 스타일: 다시 원래대로 (흰 배경, 어두운 글씨) */
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700 mb-2">태어난 월</label>
                  <input
                    type="number"
                    id="birthMonth"
                    name="month"
                    value={inputs.month}
                    onChange={handleInputChange}
                    placeholder="예: 7"
                    min="1"
                    max="12"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthDay" className="block text-sm font-medium text-gray-700 mb-2">태어난 일</label>
                  <input
                    type="number"
                    id="birthDay"
                    name="day"
                    value={inputs.day}
                    onChange={handleInputChange}
                    placeholder="예: 24"
                    min="1"
                    max="31"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  ✨ 계산하기
                </button>
              </form>
              {/* ⭐️ 예시 텍스트는 삭제됨 */}
            </div>
          </main>
        )}

        {resultData && (
          <main id="resultPage" className="container mx-auto px-4 result-animation">
            {/* ⭐️ 하얀색 카드: bg-white 유지 */}
            <div className="max-w-md mx-auto rounded-2xl shadow-2xl p-8 bg-white">
              <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ 당신의 소울 넘버</h1>
                <p className="text-gray-600">계산이 완료되었습니다!</p>
              </header>

              {/* 계산 과정 박스 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">계산 과정</h2>
                <div 
                  id="calculationSteps" 
                  className="text-sm text-gray-600 mb-4 text-center"
                  dangerouslySetInnerHTML={{ __html: resultData.steps }}
                ></div>
              </div>

              {/* 결과 카드 */}
              <div className="flex flex-col items-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
                  <span id="finalResult" className="text-4xl font-bold">{resultData.sum}</span>
                </div>
                <p className="text-gray-600 mb-6 text-lg">당신의 소울 넘버입니다!</p>
                
                <div id="tarotCard" className="bg-white rounded-lg p-6 border-2 border-purple-300 shadow-lg text-center w-full">
                  <div className="mb-4" id="tarotImageContainer">
                    <img
                      src={tarotCard.image}
                      alt={tarotCard.name}
                      className="w-full h-auto rounded-lg shadow-md mx-auto"
                      style={{ maxWidth: '250px' }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 mb-3" id="tarotName">{tarotCard.name}</h3>
                  <p className="text-gray-600 leading-relaxed" id="tarotMeaning">{tarotCard.meaning}</p>
                </div>
              </div>

              {/* 다시하기 버튼 */}
              <button
                id="backButton"
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🔄 다시 계산하기
              </button>
            </div>
          </main>
        )}

      </div>
    </>
  );
}

export default App;