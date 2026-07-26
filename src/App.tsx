import { CalendarPlus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { CalendarGrid } from './components/calendar/CalendarGrid';
import { DateCounterCards } from './components/calendar/DateCounterCards';
import { DayDetails } from './components/calendar/DayDetails';
import { BottomNavigation } from './components/ui/BottomNavigation';
import { Button } from './components/ui/Button';
import { sampleCounters, sampleEvents } from './data/sampleData';
import { useTheme } from './hooks/useTheme';
import { toIsoDate } from './services/calendarService';
import type { ThemeName } from './types';

const themes: { value: ThemeName; label: string }[] = [
  { value: 'natural', label: '내추럴' },
  { value: 'simple', label: '심플' },
  { value: 'cute', label: '큐트' },
  { value: 'dark', label: '다크' },
];

export function App() {
  const { theme, setTheme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(() => toIsoDate(new Date()));

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="brand-mark" aria-hidden="true"><Sparkles size={17} /></div>
          <p className="eyebrow">Side by Day</p>
          <h1>둘의 하루를 나란히</h1>
          <p className="app-header__description">개인 일정, 함께하는 약속, 대한민국 공휴일과 기념일을 한 달력에서 확인해요.</p>
        </div>
        <Button aria-label="일정 추가"><CalendarPlus size={17} /> 일정 추가</Button>
      </header>

      <section className="theme-switcher" aria-labelledby="theme-heading">
        <div><p className="eyebrow">테마</p><h2 id="theme-heading">화면 분위기</h2></div>
        <div className="segmented-control" role="group" aria-label="테마 선택">
          {themes.map((item) => (
            <button className={theme === item.value ? 'is-active' : ''} key={item.value} onClick={() => setTheme(item.value)} type="button">{item.label}</button>
          ))}
        </div>
      </section>

      <main className="dashboard">
        <div className="dashboard__primary">
          <DateCounterCards counters={sampleCounters} />
          <CalendarGrid events={sampleEvents} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </div>
        <div className="dashboard__secondary"><DayDetails events={sampleEvents} selectedDate={selectedDate} /></div>
      </main>

      <button className="floating-action" aria-label="새 일정 추가" type="button"><CalendarPlus size={22} /></button>
      <BottomNavigation />
    </div>
  );
}
