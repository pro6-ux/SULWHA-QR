/**
 * app.js
 * 오늘의 속성 운세 - 프론트엔드 비즈니스 로직 및 운세 엔진
 * (초보자용 한국어 설명 주석 완비)
 */

// 1. 운세 텍스트 데이터베이스 정의
const fortuneDatabase = {
  // 종합 운세 메시지 풀 (풍부한 예측 제공)
  general: [
    "오늘은 예상치 못한 뜻밖의 행운이 조용히 찾아오는 날입니다. 마음을 열고 기회를 맞이하세요.",
    "조급함을 버리고 한 걸음 쉬어갈 때 더 큰 시야가 열립니다. 오늘만큼은 느림의 미학을 즐겨보세요.",
    "새로운 인연이나 반가운 연락이 마음을 설레게 할 징조입니다. 밝은 미소로 응대해 보세요.",
    "그동안 마음 졸이며 공들였던 일들이 멋진 결과로 이어집니다. 당신의 노력이 빛을 발할 것입니다.",
    "사소한 대화 속에서 인생의 중요한 실마리를 얻게 되는 하루입니다. 경청하는 태도가 핵심입니다.",
    "당신의 숨겨진 재능이 타인에게 인정받고 신뢰를 한 몸에 받는 기분 좋은 바람이 불어옵니다.",
    "선택의 기로에서 마음속 깊은 직관이 올바른 방향을 가리킵니다. 스스로의 결정을 믿으셔도 좋습니다.",
    "주변 사람들에게 베푼 작은 친절이 배가 되어 따뜻한 행복으로 돌아오는 훈훈한 날입니다.",
    "안개 속에 가려져 있던 고민거리가 말끔히 해소되며 홀가분한 시작을 선언하게 될 것입니다.",
    "체력과 활력이 솟구치는 역동적인 날입니다. 미뤄두었던 계획이 있다면 지금 도전해 보세요."
  ],

  // 각 속성별 오늘의 특별한 조언 메시지
  elementSpecific: {
    "🔥 불": [
      "열정의 에너지가 타오르는 날입니다. 과감하게 아이디어를 개진하면 주도권을 잡게 될 것입니다.",
      "마음속 불꽃이 창의적인 영감을 피워냅니다. 머뭇거리지 말고 실행에 옮겨 주변을 매료시키세요.",
      "용기가 가득 차올라 난관을 가볍게 돌파할 수 있습니다. 단, 과도한 승부욕은 조율이 필요합니다."
    ],
    "💧 물": [
      "막힘없이 흐르는 강물처럼 유연한 처세가 돋보이는 날입니다. 곤란한 상황도 지혜롭게 피해 갈 것입니다.",
      "지친 마음이 치유되고 평온함을 되찾는 치유의 기운이 돕습니다. 차분한 사색이 큰 행운을 부릅니다.",
      "주변의 흐름을 경청하고 조화롭게 녹아들 때, 갈등이 해소되고 최선의 결과가 도출될 것입니다."
    ],
    "🌳 나무": [
      "뿌리가 굳건해지고 싹이 트는 성장의 시기입니다. 끈기 있게 추진해 온 일이 마침내 자리를 잡습니다.",
      "싱그러운 초록의 생명력이 당신을 채웁니다. 새로운 배움이나 투자가 매우 긍정적인 하루입니다.",
      "협력과 조화가 최고의 성과를 냅니다. 타인과 함께 프로젝트를 도모하기에 안성맞춤인 날입니다."
    ],
    "🪨 땅": [
      "대지처럼 든든하고 흔들림 없는 안정이 유지되는 날입니다. 성실한 태도가 신뢰를 공고히 다집니다.",
      "오랫동안 공들여 준비한 기획이나 노력이 마침내 묵직한 결실의 수확으로 보상받게 되는 날입니다.",
      "서두르지 않고 꼼꼼하게 기초를 다질 때 더 높은 도약이 가능해집니다. 계약이나 문서운이 길합니다."
    ],
    "💨 바람": [
      "구름을 흩뜨리는 상쾌한 바람처럼 막혔던 흐름이 시원하게 뚫리고 활력을 얻게 됩니다.",
      "자유롭고 넓은 네트워크 속에서 흥미로운 소식이나 중요한 정보가 날아드는 소통의 날입니다.",
      "발상의 전환과 기발한 유머 감각이 미팅이나 인간관계에서 최고의 무기가 되어 줄 것입니다."
    ]
  },

  // 행운 가이드 구성 요소
  luckyColors: ["정열적인 버건디 레드", "차분한 딥 오션 블루", "싱그러운 포레스트 그린", "클래식한 미드나잇 블랙", "밝고 찬란한 샴페인 골드", "신비로운 오로라 퍼플", "포근한 바닐라 크림", "활기찬 애프터눈 오렌지"],
  luckyItems: ["무선 이어폰", "손수건", "향수 또는 바디미스트", "선글라스", "가죽 지갑", "직접 쓴 메모장", "텀블러", "행운의 열쇠고리", "작은 거울"],
  luckyTimes: ["오전 08시 ~ 10시 (활기찬 오전)", "오전 11시 ~ 오후 1시 (성공의 정오)", "오후 2시 ~ 4시 (영감의 시간)", "오후 6시 ~ 8시 (치유의 저녁)", "오후 9시 ~ 11시 (차분한 밤)"],
  luckyAvoids: ["지나친 카페인 섭취", "늦은 밤 충동적인 온라인 쇼핑", "부정적인 혼잣말", "약속 시간 직전에 급하게 이동하기", "차가운 음료 급하게 마시기", "스마트폰 오래 보며 걷기"]
};

// 2. 전역 상태 관리 변수
let selectedElementGlobal = "";

/**
 * 3. 단계별 화면 이동 처리 함수
 * @param {number} stepNum - 이동할 단계 번호 (1: 입력, 2: 속성선택, 3: 로딩, 4: 결과)
 */
function goToStep(stepNum) {
  // 1단계에서 2단계로 넘어갈 때 필수 유효성 검사 수행
  if (stepNum === 2) {
    const name = document.getElementById("userName").value.trim();
    const birth = document.getElementById("userBirth").value;

    if (!name) {
      alert("주인님, 이름을 입력해 주셔야 운명의 실타래를 풀 수 있습니다. 😊");
      document.getElementById("userName").focus();
      return;
    }
    if (!birth) {
      alert("주인님, 생년월일을 선택해 주셔야 더 정확한 운세 산출이 가능합니다. 📅");
      document.getElementById("userBirth").focus();
      return;
    }
  }

  // 모든 단계를 비활성화한 뒤 지정된 단계만 활성화
  const steps = document.querySelectorAll(".form-step");
  steps.forEach(step => step.classList.remove("active"));

  let targetId = "";
  if (stepNum === 1) targetId = "step-input";
  else if (stepNum === 2) targetId = "step-element";
  else if (stepNum === 3) targetId = "step-loading";
  else if (stepNum === 4) targetId = "step-result";

  const targetStep = document.getElementById(targetId);
  if (targetStep) {
    targetStep.classList.add("active");
  }
}

/**
 * 4. 문자열 기반 해시 생성 함수 (이름, 생일, 날짜를 고유한 숫자로 결합)
 * @param {string} str - 해시를 생성할 결합 텍스트
 * @returns {number} 32비트 고유 정수값
 */
function getHashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32비트 정수로 변환
  }
  return Math.abs(hash);
}

/**
 * 5. 특정 범위의 의사 난수(Seed 기반) 반환 함수
 * @param {number} seed - 해시 시드값
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @returns {number} 범위 내의 정수
 */
function getSeedRandom(seed, min, max) {
  // 간단한 LCG(선형 합동 생성기) 알고리즘을 이용한 의사 난수 생성
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x);
  return Math.floor(rand * (max - min + 1)) + min;
}

/**
 * 6. 속성 카드 선택 핸들러
 * @param {string} element - 선택한 속성 이름 (예: "🔥 불", "💧 물" 등)
 */
function selectElement(element) {
  selectedElementGlobal = element;

  // 3단계 로딩 화면으로 전환
  goToStep(3);

  // 약 1.5초(1500ms) 동안 신비로운 로딩 애니메이션 연출 후 결과 표시
  setTimeout(() => {
    showFortuneResult();
  }, 1500);
}

/**
 * 7. 실제 운세 매커니즘 연산 및 결과 화면 매핑 함수
 */
function showFortuneResult() {
  const name = document.getElementById("userName").value.trim();
  const birth = document.getElementById("userBirth").value;
  
  // 성별 라디오 버튼 값 가져오기
  const genderRadio = document.querySelector('input[name="userGender"]:checked');
  const gender = genderRadio ? genderRadio.value : "선택 안 함";

  // 오늘 날짜 추출 (형식: YYYY-MM-DD)
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  // 이름 + 생일 + 오늘날짜 + 속성명을 합쳐 고유 시드값 생성
  // 이를 통해 "오늘 하루 동안 같은 정보를 넣으면 무조건 같은 운세 결과"가 나옵니다.
  const seedString = `${name}_${birth}_${dateStr}_${selectedElementGlobal}`;
  const seed = getHashCode(seedString);

  // --- Seed Random 기반 데이터 추출 ---

  // 1) 종합 운세 지수 (70% ~ 99% 사이로 긍정적인 운세 제공)
  const totalScore = getSeedRandom(seed + 1, 70, 99);

  // 2) 종합 운세 메시지 인덱스 선택
  const generalIndex = getSeedRandom(seed + 2, 0, fortuneDatabase.general.length - 1);
  const generalText = fortuneDatabase.general[generalIndex];

  // 3) 속성별 스페셜 조언 인덱스 선택
  const elementArray = fortuneDatabase.elementSpecific[selectedElementGlobal] || fortuneDatabase.elementSpecific["🔥 불"];
  const elementIndex = getSeedRandom(seed + 3, 0, elementArray.length - 1);
  const elementText = elementArray[elementIndex];

  // 4) 재물, 연애, 성공 스타 점수 (3 ~ 5개 스타)
  const moneyStarsNum = getSeedRandom(seed + 4, 3, 5);
  const loveStarsNum = getSeedRandom(seed + 5, 3, 5);
  const successStarsNum = getSeedRandom(seed + 6, 3, 5);

  const moneyStars = "⭐".repeat(moneyStarsNum) + "☆".repeat(5 - moneyStarsNum);
  const loveStars = "⭐".repeat(loveStarsNum) + "☆".repeat(5 - loveStarsNum);
  const successStars = "⭐".repeat(successStarsNum) + "☆".repeat(5 - successStarsNum);

  // 5) 행운 요소 선택
  const luckyColorIdx = getSeedRandom(seed + 7, 0, fortuneDatabase.luckyColors.length - 1);
  const luckyItemIdx = getSeedRandom(seed + 8, 0, fortuneDatabase.luckyItems.length - 1);
  const luckyTimeIdx = getSeedRandom(seed + 9, 0, fortuneDatabase.luckyTimes.length - 1);
  const luckyAvoidIdx = getSeedRandom(seed + 10, 0, fortuneDatabase.luckyAvoids.length - 1);

  const luckyColor = fortuneDatabase.luckyColors[luckyColorIdx];
  const luckyItem = fortuneDatabase.luckyItems[luckyItemIdx];
  const luckyTime = fortuneDatabase.luckyTimes[luckyTimeIdx];
  const luckyAvoid = fortuneDatabase.luckyAvoids[luckyAvoidIdx];

  // --- HTML 결과 엘리먼트 데이터 채우기 ---

  // 이름 & 날짜 매핑
  document.getElementById("res-name").textContent = name;
  
  const displayDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  document.getElementById("res-date").textContent = `${displayDate} (${gender})`;

  // 속성 배지 클래스 변경 및 텍스트 매핑
  const resBadge = document.getElementById("res-badge");
  resBadge.textContent = `${selectedElementGlobal}의 기운`;
  
  // 기존 속성 배지 색상 클래스 초기화 후 신규 적용
  resBadge.className = "selected-badge";
  if (selectedElementGlobal.includes("불")) resBadge.classList.add("badge-fire");
  else if (selectedElementGlobal.includes("물")) resBadge.classList.add("badge-water");
  else if (selectedElementGlobal.includes("나무")) resBadge.classList.add("badge-wood");
  else if (selectedElementGlobal.includes("땅")) resBadge.classList.add("badge-earth");
  else if (selectedElementGlobal.includes("바람")) resBadge.classList.add("badge-wind");

  // 게이지 바 애니메이션을 위해 0%로 세팅 후 약간의 딜레이를 주어 채워지는 애니메이션 구현
  const gaugeFill = document.getElementById("res-gauge");
  gaugeFill.style.width = "0%";
  document.getElementById("res-score").textContent = "0%";

  // 종합 운세 및 속성 코멘트 결합 출력
  document.getElementById("res-quote").innerHTML = `"${generalText}"<br><br><span style="color: #7b61ff; font-weight: bold;">[속성 수호 메시지]</span> ${elementText}`;

  // 상세 별점 적용
  document.getElementById("res-star-money").textContent = moneyStars;
  document.getElementById("res-star-love").textContent = loveStars;
  document.getElementById("res-star-success").textContent = successStars;

  // 행운 가이드 채우기
  document.getElementById("res-lucky-color").textContent = luckyColor;
  document.getElementById("res-lucky-item").textContent = luckyItem;
  document.getElementById("res-lucky-time").textContent = luckyTime;
  document.getElementById("res-lucky-avoid").textContent = luckyAvoid;

  // 4단계 결과 화면으로 이동
  goToStep(4);

  // 게이지 차오르는 애니메이션 동작 (렌더링 큐 확보 후 실행)
  setTimeout(() => {
    gaugeFill.style.width = `${totalScore}%`;
    document.getElementById("res-score").textContent = `${totalScore}%`;
  }, 100);
}

/**
 * 8. 초기화 및 다시하기 제어 함수
 * @param {boolean} keepInfo - 사용자 입력 정보(이름, 생일, 성별)를 남겨둘지 여부
 */
function resetFortune(keepInfo) {
  if (keepInfo) {
    // 입력된 이름과 생일은 보존하고 2단계 속성 선택 화면으로 복귀
    goToStep(2);
  } else {
    // 모든 정보를 초기화하고 1단계 폼으로 복귀
    document.getElementById("userName").value = "";
    document.getElementById("userBirth").value = "";
    document.getElementById("gender-male").checked = true;
    goToStep(1);
  }
}
