import { CalendarPlus, Sparkles } from 'lucide-react';
import { CalendarGrid } from './components/calendar/CalendarGrid';
import { DateCounterCards } from './components/calendar/DateCounterCards';
import { EventList } from './components/calendar/EventList';
import { BottomNavigation } from './components/ui/BottomNavigation';
import { Button } from './components/ui/Button';
import { sampleCounters, sampleEvents } from './data/sampleData';
import { useTheme } from './hooks/useTheme';
import type { ThemeName } from './types';

const themes: { value: ThemeName; label: string }[] = [
  { value: 'natural', label: '내추럴' },
  { value: 'cute', label: '큐트' },
  { value: 'simple', label: '심플' },
  { value: 'dark', label: '다크' },
];

export function App() {
  const { theme, setTheme } = useTheme();
  const todayEvents = sampleEvents.filter((event) => event.date === '2026-07-27');

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="brand-mark" aria-hidden="true"><Sparkles size={18} /></div>
          <p className="eyebrow">Side by Day</p>
          <h1>둘의 하루를 나란히</h1>
          <p className="app-header__description">나와 상대, 그리고 함께하는 일정을 한곳에서 가볍게 기록해요.</p>
        </div>
        <Button aria-label="일정 추가"><CalendarPlus size={18} /> 일정 추가</Button>
      </header>

      <section className="theme-switcher" aria-labelledby="theme-heading">
        <div>
          <p className="eyebrow">테마</p>
          <h2 id="theme-heading">분위기를 골라보세요</h2>
        </div>
        <div className="segmented-control" role="group" aria-label="테마 선택">
          {themes.map((item) => (
            <button
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

      <main className="dashboard">
        <div className="dashboard__primary">
          <DateCounterCards counters={sampleCounters} />
          <CalendarGrid events={sampleEvents} />
        </div>
        <div className="dashboard__secondary">
          <EventList events={todayEvents} />
        </div>
      </main>

      <button className="floating-action" aria-label="새 일정 추가" type="button"><CalendarPlus size={24} /></button>
      <BottomNavigation />
    </div>
  );
}
