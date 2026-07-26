import { CalendarDays } from 'lucide-react';
import { DateCounterCards } from './components/calendar/DateCounterCards';
import { BottomNavigation } from './components/ui/BottomNavigation';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { sampleCounters, sampleDayDecorations, sampleEvents } from './data/sampleData';
import { CalendarWorkspace } from './features/calendar/CalendarWorkspace';
import { useTheme } from './hooks/useTheme';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <header className="app-header" id="settings-section">
        <div className="app-header__brand">
          <span className="brand-mark" aria-hidden="true">
            <CalendarDays size={19} strokeWidth={2} />
          </span>
          <div>
            <h1>Side by Day</h1>
            <p className="app-header__description">우리의 일정을 나란히</p>
          </div>
        </div>

        <ThemeToggle onToggle={toggleTheme} theme={theme} />
      </header>

      <main className="app-main">
        <div id="today-section">
          <DateCounterCards counters={sampleCounters} />
        </div>
        <div id="calendar-section">
          <CalendarWorkspace dayDecorations={sampleDayDecorations} events={sampleEvents} />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
