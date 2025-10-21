// src/App.jsx

import { useState } from 'react';
import './App.css'; // App.css를 사용해도 되고, index.css를 사용해도 됩니다.

// 1. 타로카드 데이터를 컴포넌트 밖에 정의합니다.
// ⭐️ 중요: 이미지 경로를 '/images/1.jpg' 처럼 /로 시작하게 바꿔야 합니다.
const tarotCards = {
    1: { name: "마법사 (The Magician)", image: "/images/1.png", meaning: "의지력, 창조력, 새로운 시작의 힘을 가진 당신" },
    2: { name: "여교황 (The High Priestess)", image: "/images/2.png", meaning: "직감과 내면의 지혜, 신비로운 통찰력을 지닌 당신" },
    3: { name: "여황제 (The Empress)", image: "/images/3.png", meaning: "풍요로움과 창조성, 모성애와 자연의 힘을 가진 당신" },
    4: { name: "황제 (The Emperor)", image: "/images/4.png", meaning: "권위와 안정성, 강한 리더십과 질서를 추구하는 당신" },
    5: { name: "교황 (The Hierophant)", image: "/images/5.png", meaning: "전통과 지혜, 영적 가르침과 도덕성을 중시하는 당신" },
    6: { name: "연인 (The Lovers)", image: "/images/6.png", meaning: "사랑과 조화, 선택과 관계에서 균형을 찾는 당신" },
    7: { name: "전차 (The Chariot)", image: "/images/7.png", meaning: "의지력과 승리, 목표를 향한 강한 추진력을 가진 당신" }, // <--- 콜론으로 수정!
    8: { name: "힘 (Strength)", image: "/images/8.png", meaning: "내면의 힘과 용기, 부드러움으로 강함을 다스리는 당신" },
    9: { name: "은둔자 (The Hermit)", image: "/images/9.png", meaning: "내면의 탐구와 지혜, 홀로서기와 성찰을 통한 깨달음을 얻는 당신" }
};

// 2. 애니메이션을 위한 CSS (public/index.html의 style 태그 내용)
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
  // 3. React 상태(state) 사용
  const [inputs, setInputs] = useState({ year: '', month: '', day: '' });
  const [resultData, setResultData] = useState(null); // null이면 입력폼, 값이 있으면 결과

  // 4. 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // 5. 계산 로직 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    
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

    // 결과 데이터를 state에 저장 -> 이 순간 React가 화면을 다시 그립니다.
    setResultData({ sum, steps });
  };

  // 6. '다시하기' 핸들러
  const handleReset = () => {
    setResultData(null); // 결과를 null로
    setInputs({ year: '', month: '', day: '' }); // 입력창 초기화
  };

  // 7. 타로카드 정보 가져오기 (결과가 있을 때만)
  const tarotCard = resultData ? tarotCards[resultData.sum] : null;

  return (
    <>
      <style>{customStyles}</style>
      <div className="gradient-bg min-h-screen py-8">
        
        {/* 8. 조건부 렌더링: resultData가 없으면(null) 입력 폼을 보여줌 */}
        {!resultData && (
          <main id="inputPage" className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 result-animation">
              <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ 소울 넘버 찾기</h1>
                <p className="text-gray-600">생년월일의 각 자릿수를 더해서<br/>1~9 사이의 숫자를 계산해요</p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-2">태어난 연도</label>
                  <input
                    type="number"
                    id="birthYear"
                    name="year" // name 속성 추가
                    value={inputs.year} // state와 연결
                    onChange={handleInputChange} // state 변경 함수 연결
                    placeholder="예: 1990"
                    min="1900"
                    max="2024"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700 mb-2">태어난 월</label>
                  <input
                    type="number"
                    id="birthMonth"
                    name="month" // name 속성 추가
                    value={inputs.month} // state와 연결
                    onChange={handleInputChange} // state 변경 함수 연결
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
                    name="day" // name 속성 추가
                    value={inputs.day} // state와 연결
                    onChange={handleInputChange} // state 변경 함수 연결
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
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  💡 예시: 1990년 7월 24일 → 1+9+9+0+7+2+4 = 32 → 3+2 = 5
                </p>
              </div>
            </div>
          </main>
        )}

        {/* 9. 조건부 렌더링: resultData가 있으면 결과 페이지를 보여줌 */}
        {resultData && (
          <main id="resultPage" className="container mx-auto px-4 result-animation">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
              <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ 당신의 소울 넘버</h1>
                <p className="text-gray-600">계산이 완료되었습니다!</p>
              </header>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">계산 과정</h2>
                {/* React는 XSS 공격을 방지하기 위해 기본적으로 HTML을 렌더링하지 않습니다.
                  <br> 태그를 사용했기 때문에 dangerouslySetInnerHTML을 사용해야 합니다.
                */}
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
                    <img
                      src={tarotCard.image}
                      alt={tarotCard.name}
                      className="w-full h-auto rounded-lg shadow-md mx-auto"
                      style={{ maxWidth: '250px' }} // style은 {{}} 객체로 전달
                    />
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 mb-3" id="tarotName">{tarotCard.name}</h3>
                  <p className="text-gray-600 leading-relaxed" id="tarotMeaning">{tarotCard.meaning}</p>
                </div>
              </div>

              <button
                id="backButton"
                onClick={handleReset} // '다시하기' 함수 연결
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