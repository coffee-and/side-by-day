import { CalendarDays, Heart, Home, Settings } from 'lucide-react';
import { useState } from 'react';

const items = [
  { label: '오늘', icon: Home, target: 'today-section' },
  { label: '캘린더', icon: CalendarDays, target: 'calendar-section' },
  { label: '날짜', icon: Heart, target: 'date-details-heading' },
  { label: '설정', icon: Settings, target: 'settings-section' },
];

export function BottomNavigation() {
  const [activeTarget, setActiveTarget] = useState('calendar-section');

  function navigate(target: string) {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveTarget(target);
  }

  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {items.map(({ label, icon: Icon, target }) => (
        <button
          aria-current={activeTarget === target ? 'page' : undefined}
          className={activeTarget === target ? 'bottom-nav__item is-active' : 'bottom-nav__item'}
          key={label}
          onClick={() => navigate(target)}
          type="button"
        >
          <Icon aria-hidden="true" size={20} strokeWidth={2.1} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
