import type { AppSection } from '../../types';

export const SECTION_ITEMS: { label: string; value: AppSection }[] = [
  { label: 'TODAY', value: 'today' },
  { label: 'CALENDAR', value: 'calendar' },
  { label: 'TO DO', value: 'todos' },
  { label: 'NOTES', value: 'notes' },
];

interface SectionNavigationProps {
  activeSection: AppSection;
  className?: string;
  onChange: (section: AppSection) => void;
}

export function SectionNavigation({
  activeSection,
  className = '',
  onChange,
}: SectionNavigationProps) {
  return (
    <nav className={`section-navigation ${className}`} aria-label="주요 메뉴">
      {SECTION_ITEMS.map((item) => (
        <button
          aria-current={activeSection === item.value ? 'page' : undefined}
          className={activeSection === item.value ? 'is-active' : ''}
          key={item.value}
          onClick={() => onChange(item.value)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
