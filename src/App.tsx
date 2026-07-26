import { CalendarDays, Moon, Sun } from 'lucide-react';
import { DateCounterCards } from './components/calendar/DateCounterCards';
import { BottomNavigation } from './components/ui/BottomNavigation';
import { sampleCounters, sampleDayDecorations, sampleEvents } from './data/sampleData';
import { CalendarWorkspace } from './features/calendar/CalendarWorkspace';
import { useTheme } from './hooks/useTheme';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

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

        <button
          aria-label={isDark ? '라이트 테마로 변경' : '다크 테마로 변경'}
          aria-pressed={isDark}
          className="theme-toggle"
          id="app-theme-toggle"
          onClick={toggleTheme}
          type="button"
        >
          {isDark ? <Sun aria-hidden="true" size={17} /> : <Moon aria-hidden="true" size={17} />}
          <span>{isDark ? '라이트' : '다크'}</span>
        </button>
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
