const adjectives = [
  "가느다란",
  "가는",
  "가벼운",
  "가상의",
  "강력한",
  "강한",
  "거북한",
  "거친",
  "건강한",
  "고마운",
  "고요한",
  "귀여운",
  "귀중한",
  "귀찮은",
  "근사한",
  "근심한",
  "기름진",
  "기분좋은",
  "기뻐하는",
  "기쁜",
  "긴",
  "길고",
  "깊은",
  "까만",
  "깔끔한",
  "깨끗한",
  "깨어있는",
  "꾸준한",
  "끈끈한",
  "끈질긴",
  "나쁜",
  "난처한",
  "날렵한",
  "날카로운",
  "낯선",
  "냄새나는",
  "넓은",
  "노란",
  "노련한",
  "느린",
  "단단한",
  "단호한",
  "달콤한",
  "당당한",
  "당혹한",
  "당황한",
  "더러운",
  "도심의",
  "도전적인",
  "독특한",
  "동적인",
  "두꺼운",
  "따뜻한",
  "따스한",
  "똑똑한",
  "뜨거운",
  "많은",
  "매력적인",
  "맵고",
  "멋스러운",
  "멋진",
  "멍청한",
  "명랑한",
  "모험적인",
  "무거운",
  "무딘",
  "무뚝뚝한",
  "무서운",
  "무심한",
  "문제적인",
  "미묘한",
  "미지근한",
  "미친",
  "바보같은",
  "바쁜",
  "반박하는",
  "발전된",
  "밝은",
  "배고픈",
  "배우자",
  "별로없는",
  "보람찬",
  "보통의",
  "부끄러운",
  "부드러운",
  "부드럽고",
  "분노한",
  "붉은",
  "비싼",
  "빛나는",
  "빠른",
  "사나운",
  "사랑하는",
  "사실적인",
  "상쾌한",
  "서늘한",
  "성가신",
  "성실한",
  "섹시한",
  "소중한",
  "슬픈",
  "시끄러운",
  "시원한",
  "신비로운",
  "신선한",
  "싫어하는",
  "싱거운",
  "아름다운",
  "안전한",
  "안정된",
  "야한",
  "약한",
  "얌전한",
  "얕은",
  "어두운",
  "어려운",
  "엄청난",
  "열심인",
  "영감주는",
  "영리한",
  "예민한",
  "예쁜",
  "외로운",
  "용감한",
  "우아한",
  "우울한",
  "울고있는",
  "웅크린",
  "유리한",
  "유명한",
  "유연한",
  "유쾌한",
  "이상한",
  "인위적인",
  "인기있는",
  "일상적인",
  "자연의",
  "작은",
  "잔인한",
  "잔잔한",
  "잘못된",
  "잘생긴",
  "재미있는",
  "정신없는",
  "정적인",
  "정확한",
  "조용한",
  "졸린",
  "좁은",
  "좋아하는",
  "중요한",
  "즐거운",
  "지루한",
  "지저분한",
  "지혜로운",
  "짙은",
  "짜게",
  "짜릿한",
  "짧은",
  "차가운",
  "차분한",
  "착한",
  "창피한",
  "천연의",
  "총명한",
  "최선의",
  "추운",
  "친절한",
  "쾌적한",
  "큰",
  "특별한",
  "튼튼한",
  "파란",
  "평범한",
  "평화로운",
  "푸른",
  "피곤한",
  "행복한",
  "험한",
  "화나는",
  "화난",
  "화려한",
  "환상적인",
  "활기찬",
  "활발한",
  "효과적인",
  "흉내낸",
  "흉악한",
  "흥겨운",
  "희귀한",
  "희미한",
  "힘든",
  "힘찬",
];

const nouns = [
  "가젤",
  "갈매기",
  "강아지",
  "개구리",
  "개미",
  "개미핥기",
  "거미",
  "거북이",
  "거위",
  "게",
  "고래",
  "고릴라",
  "고슴도치",
  "고양이",
  "곰",
  "구라미",
  "기니피그",
  "기러기",
  "기린",
  "꽃게",
  "나무늘보",
  "나비",
  "낙타",
  "너구리",
  "늑대",
  "다람쥐",
  "닭",
  "독수리",
  "돌고래",
  "돼지",
  "두더지",
  "마도로스",
  "마모트",
  "말",
  "말똥가리",
  "매",
  "문어",
  "물개",
  "물범",
  "물소",
  "미어캣",
  "바다사자",
  "바다소",
  "박쥐",
  "백조",
  "뱀",
  "부엉이",
  "북극곰",
  "비둘기",
  "사막여우",
  "사슴",
  "사자",
  "살모사",
  "상어",
  "소",
  "송아지",
  "수달",
  "순록",
  "악어",
  "앵무새",
  "양",
  "얼룩말",
  "여우",
  "영양",
  "오리",
  "오소리",
  "원숭이",
  "장수말",
  "저어새",
  "전갈",
  "쥐",
  "참새",
  "치타",
  "침팬지",
  "코끼리",
  "코알라",
  "토끼",
  "팬더",
  "펭귄",
  "표범",
  "하마",
  "하이에나",
  "해마",
  "햄스터",
  "호랑나비",
  "호랑이",
  "간장게장",
  "갈비",
  "갈비찜",
  "갈비탕",
  "감자튀김",
  "고추장",
  "곱창",
  "국밥",
  "굴국밥",
  "김밥",
  "김치",
  "꼬막",
  "닭갈비",
  "도넛",
  "돈까스",
  "된장찌개",
  "딤섬",
  "떡국",
  "떡볶이",
  "라멘",
  "라면",
  "랍스터",
  "마라탕",
  "만두",
  "미소스프",
  "버거",
  "볶음밥",
  "볶음요리",
  "부침개",
  "불고기",
  "비빔밥",
  "삼겹살",
  "삼계탕",
  "삼색만두",
  "새우",
  "샌드위치",
  "샐러드",
  "소고기",
  "소떡소떡",
  "수제비",
  "스시",
  "스테이크",
  "쌀국수",
  "알밥",
  "애플파이",
  "양꼬치",
  "오뎅",
  "오믈렛",
  "짬뽕",
  "찌개",
  "찜닭",
  "초밥",
  "치즈",
  "치킨",
  "카레",
  "케이크",
  "콩나물",
  "쿠키",
  "타코",
  "탕수육",
  "토스트",
  "티라미수",
  "파스타",
  "팟타이",
  "팥빙수",
  "팬케이크",
  "포",
  "피자",
  "호떡",
  "훈제오리",
  "훠궈",
  "가방",
  "구두",
  "눈",
  "모자",
  "문",
  "빵",
  "삽",
  "선글라스",
  "손",
  "손수건",
  "스마트폰",
  "시계",
  "식탁",
  "신발",
  "연필",
  "음식",
  "의자",
  "자동차",
  "집",
  "책",
  "책상",
  "침대",
  "카드",
  "카메라",
  "칼",
  "컴퓨터",
  "컵",
  "키",
  "토막",
  "펜",
  "고스트",
  "골렘",
  "드래곤",
  "뱀파이어",
  "와이번",
  "웨어울프",
  "좀비",
  "크루거",
];

function getRandomElementFromArray(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function getRandomNickname(): string {
  const adjective = getRandomElementFromArray(adjectives);
  const noun = getRandomElementFromArray(nouns);

  const nickname = `나의${adjective}${noun}`;
  if (nickname.length > 9) {
    return getRandomNickname();
  }

  return nickname;
}
