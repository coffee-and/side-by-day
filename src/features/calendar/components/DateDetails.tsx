import { CalendarDays, Flag, MoonStar, Users } from 'lucide-react';
import { useMemo } from 'react';
import type { CalendarEvent } from '../../../types';
import { formatLongDate, toDateKey } from '../lib/dateUtils';
import {
  hasOfficialHolidayData,
  OFFICIAL_HOLIDAY_DATA_RANGE,
} from '../services/koreanCalendarService';
import { getKoreanLunarDate } from '../services/lunarCalendarService';
import type { KoreanCalendarEvent } from '../types';
import {
  getEventAppearanceClassName,
  getEventAppearanceStyle,
} from './EventLabel';

const ownerLabel = {
  mine: '나',
  partner: '상대',
  together: '함께',
} as const;

interface DateDetailsProps {
  date: Date;
  events: CalendarEvent[];
  koreanEvents: KoreanCalendarEvent[];
  isCalendarDataLoading: boolean;
  hasCalendarDataError: boolean;
}

export function DateDetails({
  date,
  events,
  koreanEvents,
  isCalendarDataLoading,
  hasCalendarDataError,
}: DateDetailsProps) {
  const dateKey = toDateKey(date);
  const lunar = useMemo(() => getKoreanLunarDate(date), [dateKey]);
  const dayEvents = events.filter((event) => event.date === dateKey);
  const dayKoreanEvents = koreanEvents.filter((event) => event.date === dateKey);
  const isOfficialHolidayYearSupported = hasOfficialHolidayData(date.getFullYear());

  const emptyKoreanCalendarMessage = isCalendarDataLoading
    ? '공휴일 정보를 확인하고 있어요'
    : hasCalendarDataError
      ? '공휴일 정보를 불러오지 못했어요. 주요 기념일만 표시합니다.'
      : isOfficialHolidayYearSupported
        ? '등록된 공휴일·기념일이 없어요'
        : `공식 공휴일 데이터는 ${OFFICIAL_HOLIDAY_DATA_RANGE.start}–${OFFICIAL_HOLIDAY_DATA_RANGE.end}년을 지원해요`;

  return (
    <aside className="date-details" aria-labelledby="date-details-heading">
      <header className="date-details__header">
        <div>
          <p className="eyebrow">선택한 날짜</p>
          <h2 id="date-details-heading">{formatLongDate(date)}</h2>
        </div>
        <CalendarDays aria-hidden="true" size={20} />
      </header>

      <div className="date-facts">
        <div className="date-fact">
          <MoonStar aria-hidden="true" size={17} />
          <div>
            <span>음력</span>
            <strong>{lunar?.label ?? '지원 범위를 벗어난 날짜예요'}</strong>
            {lunar?.gapja ? <small>{lunar.gapja}</small> : null}
          </div>
        </div>

        <div className="date-fact">
          <Flag aria-hidden="true" size={17} />
          <div>
            <span>대한민국 달력</span>
            {dayKoreanEvents.length ? (
              <ul className="korean-event-list">
                {dayKoreanEvents.map((event) => (
                  <li key={event.id}>
                    <span className={`calendar-event-badge calendar-event-badge--${event.type}`}>
                      {event.type === 'public' ? '공휴일' : event.type === 'commemoration' ? '기념일' : '행사'}
                    </span>
                    <strong>{event.name}</strong>
                    {event.substitute ? <small>대체공휴일</small> : null}
                  </li>
                ))}
              </ul>
            ) : <strong>{emptyKoreanCalendarMessage}</strong>}
          </div>
        </div>
      </div>

      <section className="selected-agenda" aria-labelledby="selected-agenda-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">공유 일정</p>
            <h3 id="selected-agenda-heading">둘의 일정</h3>
          </div>
          <span className="count-badge">{dayEvents.length}</span>
        </div>

        {dayEvents.length ? (
          <div className="event-list">
            {dayEvents.map((event) => (
              <article
                className={`event-card event-card--${event.owner} ${getEventAppearanceClassName(event.appearance)}`}
                key={event.id}
                style={getEventAppearanceStyle(event.appearance)}
              >
                <div className="event-card__body">
                  <div className="event-card__topline">
                    <span className={`owner-badge owner-badge--${event.owner}`}>
                      <i className="owner-badge__dot" aria-hidden="true" />
                      {ownerLabel[event.owner]}
                    </span>
                    <time>{event.time ?? '종일'}</time>
                  </div>
                  <h3>{event.title}</h3>
                  {event.note ? <p>{event.note}</p> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-agenda">
            <Users aria-hidden="true" size={19} />
            <p>이 날짜에는 아직 공유 일정이 없어요.</p>
          </div>
        )}
      </section>
    </aside>
  );
}
