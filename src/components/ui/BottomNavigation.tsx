import { CalendarDays, Heart, Home, Settings } from 'lucide-react';

const items = [
  { label: '오늘', icon: Home },
  { label: '캘린더', icon: CalendarDays },
  { label: '날짜', icon: Heart },
  { label: '설정', icon: Settings },
];

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {items.map(({ label, icon: Icon }, index) => (
        <button className={index === 0 ? 'bottom-nav__item is-active' : 'bottom-nav__item'} key={label}>
          <Icon aria-hidden="true" size={21} strokeWidth={2.2} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
