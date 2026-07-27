import { CalendarDays, CheckSquare2, Home, StickyNote } from 'lucide-react';
import type { AppSection } from '../../types';

const items: { label: string; icon: typeof Home; value: AppSection }[] = [
  { label: '오늘', icon: Home, value: 'today' },
  { label: '캘린더', icon: CalendarDays, value: 'calendar' },
  { label: '할 일', icon: CheckSquare2, value: 'todos' },
  { label: '메모', icon: StickyNote, value: 'notes' },
];

interface BottomNavigationProps {
  activeSection: AppSection;
  onChange: (section: AppSection) => void;
}

export function BottomNavigation({ activeSection, onChange }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {items.map(({ label, icon: Icon, value }) => (
        <button
          aria-current={activeSection === value ? 'page' : undefined}
          className={activeSection === value ? 'bottom-nav__item is-active' : 'bottom-nav__item'}
          key={value}
          onClick={() => onChange(value)}
          type="button"
        >
          <Icon aria-hidden="true" size={20} strokeWidth={2.1} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
