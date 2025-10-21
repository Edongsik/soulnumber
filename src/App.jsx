// src/App.jsx

import { useState } from 'react';
import './App.css'; 

// ⭐️ 변경점 1: 객체 내의 이미지 경로에서 맨 앞의 슬래시(/)를 제거합니다.
const tarotCards = {
    1: { name: "마법사 (The Magician)", image: "images/1.png", meaning: "의지력, 창조력, 새로운 시작의 힘을 가진 당신" },
    2: { name: "여교황 (The High Priestess)", image: "images/2.png", meaning: "직감과 내면의 지혜, 신비로운 통찰력을 지닌 당신" },
    3: { name: "여황제 (The Empress)", image: "images/3.png", meaning: "풍요로움과 창조성, 모성애와 자연의 힘을 가진 당신" },
    4: { name: "황제 (The Emperor)", image: "images/4.png", meaning: "권위와 안정성, 강한 리더십과 질서를 추구하는 당신" },
    5: { name: "교황 (The Hierophant)", image: "images/5.png", meaning: "전통과 지혜, 영적 가르침과 도덕성을 중시하는 당신" },
    6: { name: "연인 (The Lovers)", image: "images/6.png", meaning: "사랑과 조화, 선택과 관계에서 균형을 찾는 당신" },
    7. { name: "전차 (The Chariot)", image: "images/7.png", meaning: "의지력과 승리, 목표를 향한 강한 추진력을 가진 당신" },
    8: { name: "힘 (Strength)", image: "images/8.png", meaning: "내면의 힘과 용기, 부드러움으로 강함을 다스리는 당신" },
    9: { name: "은둔자 (The Hermit)", image: "images/9.png", meaning: "내면의 탐구와 지혜, 홀로서기와 성찰을 통한 깨달음을 얻는 당신" }
};

// ... (customStyles 변수 삭제 및 index.css로 이동한 것은 이전과 동일) ...

function App() {
  const [inputs, setInputs] = useState({ year: '', month: '', day: '' });
  const [resultData, setResultData] = useState(null);

  const handleInputChange = (e) => {
    // ... (함수 내용 동일)
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    // ... (함수 내용 동일)
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
    // ... (함수 내용 동일)
    setResultData(null);
    setInputs({ year: '', month: '', day: '' });
  };

  const tarotCard = resultData ? tarotCards[resultData.sum] : null;

  return (
    <>
      {/* <style> 태그는 index.css로 이동했으므로 여기 없습니다. */}
      <div className="min-h-screen py-8 flex items-center justify-center">
        
        {!resultData && (
          <main id="inputPage" className="container mx-auto px-4">
            {/* ... (입력 폼 UI 부분은 동일) ... */}
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
                    // ... (나머지 속성 동일)
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-colors text-lg shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700 mb-2">태어난 월</label>
                  <input
                    type="number"
                    id="birthMonth"
                    // ... (나머지 속성 동일)
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-colors text-lg shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthDay" className="block text-sm font-medium text-gray-700 mb-2">태어난 일</label>
                  <input
                    type="number"
                    id="birthDay"
                    // ... (나머지 속성 동일)
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
              {/* ... (결과 헤더, 계산 과정 UI 동일) ... */}
              <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ 당신의 소울 넘버</h1>
                <p className="text-gray-600">계산이 완료되었습니다!</p>
              </header>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                 {/* ... (계산 과정 내용 동일) ... */}
              </div>

              <div className="flex flex-col items-center mb-6">
                 {/* ... (소울 넘버 원형 UI 동일) ... */}
                <p className="text-gray-600 mb-6 text-lg">당신의 소울 넘버입니다!</p>
                
                <div id="tarotCard" className="bg-white rounded-lg p-6 border-2 border-purple-300 shadow-lg text-center w-full">
                  <div className="mb-4" id="tarotImageContainer">
                    
                    {/* ⭐️ 변경점 2: src 속성에 import.meta.env.BASE_URL을 추가합니다. */}
                    <img
                      src={`${import.meta.env.BASE_URL}${tarotCard.image}`}
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
                // ... (버튼 속성 동일)
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