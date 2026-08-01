export const EVENT_ICON_CATEGORIES = [
  { id: 'work', label: '업무' },
  { id: 'life', label: '일상' },
  { id: 'health', label: '건강' },
  { id: 'learning', label: '학습' },
  { id: 'occasion', label: '기념일' },
  { id: 'travel', label: '이동' },
  { id: 'relationship', label: '관계' },
  { id: 'other', label: '기타' },
] as const;

export type EventIconCategory = typeof EVENT_ICON_CATEGORIES[number]['id'];

export interface EventIconDefinition {
  id: string;
  label: string;
  category: EventIconCategory;
  keywords: readonly string[];
  /** One or more SVG path descriptions, all drawn with the same house stroke. */
  paths: readonly string[];
  circles?: readonly [number, number, number][];
}

const icon = (
  id: string,
  label: string,
  category: EventIconCategory,
  keywords: readonly string[],
  paths: readonly string[],
  circles?: readonly [number, number, number][],
): EventIconDefinition => ({ id, label, category, keywords, paths, circles });

/**
 * Side by Day schedule symbols.
 *
 * Every glyph uses a 24×24 grid, a 1.8px round stroke and no fill. Keeping the
 * geometry here (instead of mixing icon packages or emoji) makes the set scale
 * and color as one visual family.
 */
export const EVENT_ICONS: readonly EventIconDefinition[] = [
  icon('meeting', '회의', 'work', ['회의', '미팅', '업무', '회사', '팀'], ['M7 8.5 12 5l5 3.5v6L12 18l-5-3.5z', 'M12 5v13']),
  icon('work', '업무', 'work', ['업무', '회사', '일', '문서'], ['M7 5.5h7l3 3v10H7z', 'M14 5.5v3h3', 'M9.5 12h5M9.5 15h4']),
  icon('project', '프로젝트', 'work', ['프로젝트', '기획', '협업'], ['M6 7h5v5H6zM13 12h5v5h-5z', 'M11 9.5h3.5v2.5M9 12v3h4']),
  icon('deadline', '마감', 'work', ['마감', '기한', '데드라인', '제출'], ['M7 5.5h10v13H7z', 'M9.5 9h5M9.5 12h5', 'm10 15 1.3 1.3 2.8-3']),
  icon('presentation', '발표', 'work', ['발표', '프레젠테이션', '피칭'], ['M6 6.5h12v8H6z', 'M12 14.5v4M9.5 18.5h5', 'm9 12 2-2 1.5 1 2.5-3']),
  icon('phone', '전화', 'work', ['전화', '통화', '콜', '연락'], ['M8.2 5.8 10.5 8 9 10c1.1 2.4 2.5 3.8 5 5l2-1.5 2.2 2.3-1.5 2.1c-.7.8-1.9.9-2.8.5-4.1-1.8-6.5-4.2-8.3-8.3-.4-.9-.3-2.1.5-2.8z']),
  icon('email', '이메일', 'work', ['이메일', '메일', '편지', '답장'], ['M5.5 7h13v10h-13z', 'm6 8 6 4.5L18 8']),
  icon('outside', '외근', 'work', ['외근', '출장', '방문', '현장'], ['M6 18 18 6', 'M11 6h7v7', 'M6 8v10h10']),

  icon('appointment', '약속', 'life', ['약속', '예약', '일정', '만남'], ['M7 6.5h10v11H7z', 'M9 4.5v4M15 4.5v4M7 10h10', 'm10 14 1.3 1.3 2.8-3']),
  icon('date', '데이트', 'life', ['데이트', '연인', '만남', '사랑'], ['M12 18s-6-3.6-6-8a3 3 0 0 1 5.3-1.9L12 9l.7-.9A3 3 0 0 1 18 10c0 4.4-6 8-6 8z']),
  icon('grocery', '장보기', 'life', ['장보기', '마트', '식료품', '시장'], ['M7 9h10l-1 9H8z', 'M9.5 9a2.5 2.5 0 0 1 5 0', 'M10 13h4']),
  icon('housework', '집안일', 'life', ['집안일', '청소', '정리', '집'], ['M5.5 11.5 12 6l6.5 5.5', 'M7.5 10v8h9v-8', 'M10.5 18v-4h3v4']),
  icon('rest', '휴식', 'life', ['휴식', '쉬기', '여유', '낮잠'], ['M6 15.5c2-3 4-3 6 0s4 3 6 0', 'M7 18h10', 'M9 8.5c.5-1.5 1.5-2.5 3-3M13 9c.4-1.2 1.2-2 2.4-2.4']),
  icon('meal', '식사', 'life', ['식사', '밥', '저녁', '점심', '맛집'], ['M8 5v6M6 5v4c0 1.2.8 2 2 2s2-.8 2-2V5M8 11v8', 'M15.5 5v14M15.5 5c2 1.3 2.5 4.8 0 7']),
  icon('cafe', '카페', 'life', ['카페', '커피', '차', '티'], ['M6 8h10v6.5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z', 'M16 10h1.2a1.8 1.8 0 0 1 0 3.6H16M8 5.5c.8-.8.8-1.5 0-2']),
  icon('shopping', '쇼핑', 'life', ['쇼핑', '구매', '백화점', '옷'], ['M7 8h10l1 10H6z', 'M9.5 9V7a2.5 2.5 0 0 1 5 0v2']),

  icon('hospital', '병원', 'health', ['병원', '건강', '진료', '의사', '예약'], ['M9.5 5.5h5v4h4v5h-4v4h-5v-4h-4v-5h4z']),
  icon('medicine', '약', 'health', ['약', '약국', '복용', '처방'], ['M7.2 16.8a3.5 3.5 0 0 1 0-5l4.6-4.6a3.5 3.5 0 0 1 5 5l-4.6 4.6a3.5 3.5 0 0 1-5 0z', 'm9.4 9.6 5 5']),
  icon('exercise', '운동', 'health', ['운동', '헬스', '피트니스', '체육'], ['M5 13h3M16 13h3', 'M8 10v6M16 10v6M10.5 13h3']),
  icon('walk', '산책', 'health', ['산책', '걷기', '러닝', '외출'], ['M6 16c3-5 6-5 12-8', 'm14 7 4 1-1 4', 'M8 18h3']),
  icon('sleep', '수면', 'health', ['수면', '잠', '취침', '기상'], ['M7 15.5a6 6 0 0 0 9-8 5.5 5.5 0 1 1-9 8z', 'M15 5h3l-3 3h3']),
  icon('checkup', '건강검진', 'health', ['건강검진', '검진', '건강', '진료'], ['M5.5 12h3l1.5-3 3 6 1.5-3h4', 'M7 6.5h3M14 6.5h3']),
  icon('dental', '치과', 'health', ['치과', '치아', '스케일링', '진료'], ['M8.2 6.5c1.5-1 2.5-.2 3.8-.2s2.3-.8 3.8.2c2.4 1.7.7 5-.1 7.2-.8 2.4-1 4.8-2.3 4.8-1.1 0-.5-4-1.4-4s-.3 4-1.4 4c-1.3 0-1.5-2.4-2.3-4.8-.8-2.2-2.5-5.5-.1-7.2z']),
  icon('salon', '미용실', 'health', ['미용실', '헤어', '커트', '염색'], ['M6 6.5 18 18M18 6.5 6 18', 'M7 5.5a2 2 0 1 1-2 2M17 5.5a2 2 0 1 0 2 2']),

  icon('study', '공부', 'learning', ['공부', '학습', '복습', '학교'], ['M6 6.5h8l3 3v8H6z', 'M14 6.5v3h3', 'M8.5 12h6M8.5 15h4']),
  icon('reading', '독서', 'learning', ['독서', '책', '읽기', '도서관'], ['M5.5 6.5h5a2 2 0 0 1 1.5.7 2 2 0 0 1 1.5-.7h5v11h-5a2 2 0 0 0-1.5.7 2 2 0 0 0-1.5-.7h-5z', 'M12 7.2v11']),
  icon('lecture', '강의', 'learning', ['강의', '수업', '교육', '세미나'], ['M6 6.5h12v8H6z', 'M9 18h6M12 14.5V18', 'M9 10h6']),
  icon('exam', '시험', 'learning', ['시험', '테스트', '평가', '고사'], ['M7 5.5h10v13H7z', 'M9.5 9h5M9.5 12h5M9.5 15h3']),
  icon('assignment', '과제', 'learning', ['과제', '숙제', '제출', '리포트'], ['M8 5.5h8v13H8z', 'M10 8h4M10 11h4M10 14h2', 'm13 15 1 1 2-2']),
  icon('coding', '코딩', 'learning', ['코딩', '개발', '프로그래밍', '컴퓨터'], ['m9.5 8-4 4 4 4M14.5 8l4 4-4 4', 'm13 6-2 12']),
  icon('record', '기록', 'learning', ['기록', '글쓰기', '일기', '노트'], ['M7 6h8l2 2v10H7z', 'M15 6v2h2', 'M9.5 11h5M9.5 14h5']),

  icon('birthday', '생일', 'occasion', ['생일', '축하', '촛불', '기념일'], ['M6.5 12h11v6h-11zM8 9.5h8V12', 'M12 8V5', 'm10.5 5 1.5-2 1.5 2']),
  icon('anniversary', '기념일', 'occasion', ['기념일', '축하', '결혼기념일'], ['M12 5.5 14 10l4.5.5-3.3 3 1 4.5-4.2-2.3L7.8 18l1-4.5-3.3-3L10 10z']),
  icon('party', '파티', 'occasion', ['파티', '축하', '모임', '행사'], ['m7 17 3-9 7 7z', 'M13 7.5 15 5M16 10l2-1M11 5.5 11.5 3']),
  icon('gift', '선물', 'occasion', ['선물', '기프트', '축하'], ['M6 10h12v8H6zM5.5 7h13v3h-13z', 'M12 7v11', 'M12 7c-3 0-4-3-2-3 1.5 0 2 3 2 3zm0 0c3 0 4-3 2-3-1.5 0-2 3-2 3z']),
  icon('performance', '공연', 'occasion', ['공연', '콘서트', '연극', '뮤지컬'], ['M7 6.5h10v11H7z', 'M10 6.5v11M14 6.5v11', 'M7 10h10M7 14h10']),
  icon('exhibition', '전시', 'occasion', ['전시', '미술관', '갤러리', '박물관'], ['M6 6h12v11H6z', 'm8 14 2.5-3 2 2 1.5-1.5 2 2.5', 'M9 9h.01']),
  icon('movie', '영화', 'occasion', ['영화', '시네마', '극장', '관람'], ['M6 7h12v10H6z', 'm11 10 4 2-4 2z', 'M6 9h12']),

  icon('travel', '여행', 'travel', ['여행', '휴가', '관광', '출장'], ['M5.5 13 18 6l-6 12-1-5-5-1z', 'm10.5 13 2 2']),
  icon('flight', '비행', 'travel', ['비행', '비행기', '항공', '공항'], ['M5 13 19 6l-5.5 11-4-1.5L7 17l-1.5-4z', 'm10 11 2 2']),
  icon('train', '기차', 'travel', ['기차', '철도', '열차', 'KTX'], ['M7 5.5h10v10H7z', 'M9 18.5l2-3M15 18.5l-2-3', 'M7 10h10'], [[10, 13, 0.8], [14, 13, 0.8]]),
  icon('car', '자동차', 'travel', ['자동차', '차', '운전', '주차'], ['M6 11 8 7h8l2 4v5H6z', 'M6 12h12', 'M8 16v2M16 16v2'], [[9, 14, 0.7], [15, 14, 0.7]]),
  icon('transit', '대중교통', 'travel', ['대중교통', '버스', '지하철', '교통'], ['M7 5.5h10v11H7z', 'M7 10h10M9 18.5l1.5-2M15 18.5l-1.5-2'], [[10, 13.5, 0.7], [14, 13.5, 0.7]]),
  icon('stay', '숙박', 'travel', ['숙박', '호텔', '펜션', '체크인'], ['M6 7v11M18 10v8M6 14h12', 'M8 10h4a2 2 0 0 1 2 2v2H8z']),
  icon('place', '장소', 'travel', ['장소', '위치', '지도', '약속장소'], ['M12 19s5-5.2 5-9a5 5 0 0 0-10 0c0 3.8 5 9 5 9z'], [[12, 10, 1.6]]),

  icon('family', '가족', 'relationship', ['가족', '부모님', '아이', '집'], ['M5.5 17c.5-3 2-4.5 4-4.5s3.5 1.5 4 4.5', 'M11 17c.4-2.3 1.6-3.5 3.3-3.5 1.8 0 3.2 1.2 4.2 3.5'], [[9.5, 8.5, 2.2], [15, 9.5, 1.7]]),
  icon('friend', '친구', 'relationship', ['친구', '우정', '지인', '만남'], ['M5.5 18c.5-3.5 2.4-5 5-5s4.5 1.5 5 5', 'M14 13c2 0 3.5 1.2 4.5 3.8'], [[10.5, 8.5, 2.5], [16, 9.5, 1.7]]),
  icon('lover', '연인', 'relationship', ['연인', '데이트', '사랑', '커플'], ['M12 18s-6-3.6-6-8a3 3 0 0 1 5.3-1.9L12 9l.7-.9A3 3 0 0 1 18 10c0 4.4-6 8-6 8z', 'M12 9v9']),
  icon('pet', '반려동물', 'relationship', ['반려동물', '고양이', '강아지', '펫', '동물병원'], ['M8.5 18c-2.2-1.5-1.4-4 .3-5.2 1.8-1.2 4.6-1.2 6.4 0 1.7 1.2 2.5 3.7.3 5.2-1.8 1.2-5.2 1.2-7 0z'], [[7, 9.5, 1.5], [10.3, 7.5, 1.5], [13.7, 7.5, 1.5], [17, 9.5, 1.5]]),
  icon('gathering', '모임', 'relationship', ['모임', '동호회', '회식', '그룹'], ['M5 18c.4-3 1.8-4.4 4-4.4s3.6 1.4 4 4.4M11 18c.4-3 1.8-4.4 4-4.4s3.6 1.4 4 4.4'], [[9, 9.2, 2.2], [15, 9.2, 2.2]]),
  icon('contact', '연락', 'relationship', ['연락', '메시지', '안부', '채팅'], ['M6 6.5h12v8H11l-4 3v-3H6z', 'M9 10.5h6']),

  icon('star', '별', 'other', ['별', '즐겨찾기', '특별'], ['m12 5.5 2 4 4.5.6-3.3 3 1 4.4-4.2-2.2-4.2 2.2 1-4.4-3.3-3 4.5-.6z']),
  icon('heart', '하트', 'other', ['하트', '사랑', '좋아함'], ['M12 18s-6-3.6-6-8a3 3 0 0 1 5.3-1.9L12 9l.7-.9A3 3 0 0 1 18 10c0 4.4-6 8-6 8z']),
  icon('check', '체크', 'other', ['체크', '완료', '확인'], ['m6.5 12.5 3.5 3.5 7.5-8']),
  icon('alert', '알림', 'other', ['알림', '리마인더', '벨', '공지'], ['M7 16h10l-1.2-2V10a3.8 3.8 0 0 0-7.6 0v4z', 'M10.5 18h3']),
  icon('important', '중요', 'other', ['중요', '주의', '필수', '긴급'], ['M12 5.5v8', 'M12 17.5h.01']),
  icon('memo', '메모', 'other', ['메모', '노트', '기록', '참고'], ['M7 5.5h10v13H7z', 'M9.5 9h5M9.5 12h5M9.5 15h3']),
  icon('repeat', '반복', 'other', ['반복', '정기', '루틴', '매주'], ['M7 8h8.5l-2-2M17 16H8.5l2 2', 'M17 8v3M7 16v-3']),
  icon('more', '기타', 'other', ['기타', '더보기', '일반'], ['M6 12h.01M12 12h.01M18 12h.01']),
] as const;

export const EVENT_ICON_BY_ID = new Map(EVENT_ICONS.map((item) => [item.id, item]));

export const RECOMMENDED_EVENT_ICON_IDS = [
  'meeting', 'appointment', 'hospital', 'exercise', 'meal', 'study', 'birthday', 'travel',
] as const;

export function searchEventIcons(query: string) {
  const normalized = query.trim().toLocaleLowerCase('ko-KR');
  if (!normalized) return EVENT_ICONS;

  return EVENT_ICONS.filter((item) => (
    item.label.toLocaleLowerCase('ko-KR').includes(normalized)
    || item.keywords.some((keyword) => keyword.toLocaleLowerCase('ko-KR').includes(normalized))
  ));
}

export function suggestEventIcons(title: string) {
  const normalized = title.trim().toLocaleLowerCase('ko-KR');
  if (!normalized) {
    return RECOMMENDED_EVENT_ICON_IDS.map((id) => EVENT_ICON_BY_ID.get(id)!);
  }

  const matches = EVENT_ICONS.filter((item) => (
    item.label && normalized.includes(item.label.toLocaleLowerCase('ko-KR'))
    || item.keywords.some((keyword) => normalized.includes(keyword.toLocaleLowerCase('ko-KR')))
  ));

  return (matches.length ? matches : RECOMMENDED_EVENT_ICON_IDS.map((id) => EVENT_ICON_BY_ID.get(id)!))
    .slice(0, 8);
}
