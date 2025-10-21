// src/App.jsx

import { useState } from 'react';
import './App.css'; 

// ⭐️ 변경점: 4번, 7번 항목의 오타(.)를 콜론(:)으로 수정했습니다.
const tarotCards = {
    1: { name: "마법사 (The Magician)", image: "images/1.png", meaning: "의지력, 창조력, 새로운 시작의 힘을 가진 당신" },
    2: { name: "여교황 (The High Priestess)", image: "images/2.png", meaning: "직감과 내면의 지혜, 신비로운 통찰력을 지닌 당신" },
    3: { name: "여황제 (The Empress)", image: "images/3.png", meaning: "풍요로움과 창조성, 모성애와 자연의 힘을 가진 당신" },
    4: { name: "황제 (The Emperor)", image: "images/4.png", meaning: "권위와 안정성, 강한 리더십과 질서를 추구하는 당신" },
    5: { name: "교황 (The Hierophant)", image: "images/5.png", meaning: "전통과 지혜, 영적 가르침과 도덕성을 중시하는 당신" },
    6: { name: "연인 (The Lovers)", image: "images/6.png", meaning: "사랑과 조화, 선택과 관계에서 균형을 찾는 당신" },
    7: { name: "전차 (The Chariot)", image: "images/7.png", meaning: "의지력과 승리, 목표를 향한 강한 추진력을 가진 당신" },
    8: { name: "힘 (Strength)", image: "images/8.png", meaning: "내면의 힘과 용기, 부드러움으로 강함을 다스리는 당신" },
    9: { name: "은둔자 (The Hermit)", image: "images/9.png", meaning: "내면의 탐구와 지혜, 홀로서기와 성찰을 통한 깨달음을 얻는 당신" }
};

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

  // ⭐️ 변경점: 경로 문제를 해결한 src를 사용합니다.
  const getImageUrl = (imagePath) => {
    // import.meta.env.BASE_URL은 vite.config.js의 base 값을 자동으로 가져옵니다.
    return `${import.meta.env.BASE_URL}${imagePath}`;
  }

  return (
    <>
      {/* <style> 태그는 index.css로 이동했습니다. */}
      <div className="min-h-screen py-8 flex items-center justify-center">
        
        {!resultData && (
          <main id="inputPage" className="container mx-auto px-4">
            <div className="max-w-md mx-auto rounded-2xl shadow-2xl p-8 result-animation bg-white"> 
              <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ 소울 넘버 찾기</h1>
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
                    /* ⭐️ 변경점: 입력창 스타일 (회색 배경, 그림자) */
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-colors text-lg shadow-sm"
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
                    /* ⭐️ 변경점: 입력창 스타일 (회색 배경, 그림자) */
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-colors text-lg shadow-sm"
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
                    /* ⭐️ 변경점: 입력창 스타일 (회색 배경, 그림자) */
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-colors text-lg shadow-sm"
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
            </div>
          </main>
        )}

        {resultData && (
          <main id="resultPage" className="container mx-auto px-4 result-animation">
            <div className="max-w-md mx-auto rounded-2xl shadow-2xl p-8 bg-white">
              <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ 당신의 소울 넘버</h1>
                <p className="text-gray-600">계산이 완료되었습니다!</p>
              </header>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">계산 과정</h2>
                <div 
                  id="calculationSteps" 
                  className="text-sm text-gray-600 mb-4 text-center"
                  dangerouslySetInnerHTML={{ __html: resultData.steps }}
                ></div>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
                  <span id="finalResult" className="text-4xl font-bold">{resultData.sum}</span>
                </div>
                <p className="text-gray-600 mb-6 text-lg">당신의 소울 넘버입니다!</p>
                
                <div id="tarotCard" className="bg-white rounded-lg p-6 border-2 border-purple-300 shadow-lg text-center w-full">
                  <div className="mb-4" id="tarotImageContainer">
                    
                    {/* ⭐️ 변경점: getImageUrl 함수를 사용해 이미지 경로 설정 */}
                    <img
                      src={getImageUrl(tarotCard.image)}
                      alt={tarotCard.name}
                      className="w-full h-auto rounded-lg shadow-md mx-auto"
                      style={{ maxWidth: '250px' }}
                    />

                  </div>
                  <h3 className="text-xl font-bold text-purple-800 mb-3" id="tarotName">{tarotCard.name}</h3>
                  <p className="text-gray-600 leading-relaxed" id="tarotMeaning">{tarotCard.meaning}</p>
                </div>
              </div>

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