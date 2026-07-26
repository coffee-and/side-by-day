import { CalendarHeart, Sparkles } from 'lucide-react';
import { DateCounterCards } from './components/calendar/DateCounterCards';
import { BottomNavigation } from './components/ui/BottomNavigation';
import { sampleCounters, sampleEvents } from './data/sampleData';
import { CalendarWorkspace } from './features/calendar/CalendarWorkspace';
import { useTheme } from './hooks/useTheme';
import type { ThemeName } from './types';

const themes: { value: ThemeName; label: string }[] = [
  { value: 'natural', label: '내추럴' },
  { value: 'simple', label: '심플' },
  { value: 'cute', label: '큐트' },
  { value: 'dark', label: '다크' },
];

export function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <div className="brand-mark" aria-hidden="true"><Sparkles size={17} /></div>
          <div>
            <p className="eyebrow">Side by Day</p>
            <h1>둘의 하루를 나란히</h1>
            <p className="app-header__description">친구와 커플이 함께 쓰는 작고 선명한 공유 캘린더</p>
          </div>
        </div>
        <div className="app-status" aria-label="현재 제공 기능">
          <CalendarHeart aria-hidden="true" size={17} />
          대한민국 달력
        </div>
      </header>

      <section className="theme-switcher" id="settings-section" aria-labelledby="theme-heading">
        <div>
          <p className="eyebrow">테마</p>
          <h2 id="theme-heading">화면 분위기</h2>
        </div>
        <div className="segmented-control" role="group" aria-label="테마 선택">
          {themes.map((item) => (
            <button
              aria-pressed={theme === item.value}
              className={theme === item.value ? 'is-active' : ''}
              key={item.value}
              onClick={() => setTheme(item.value)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <main className="app-main">
        <div id="today-section">
          <DateCounterCards counters={sampleCounters} />
        </div>
        <div id="calendar-section">
          <CalendarWorkspace events={sampleEvents} />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
