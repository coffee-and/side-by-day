import type { AppSection } from '../../types';
import { SectionNavigation } from './SectionNavigation';

interface BottomNavigationProps {
  activeSection: AppSection;
  onChange: (section: AppSection) => void;
}

export function BottomNavigation({ activeSection, onChange }: BottomNavigationProps) {
  return (
    <SectionNavigation
      activeSection={activeSection}
      className="bottom-nav"
      onChange={onChange}
    />
  );
}
