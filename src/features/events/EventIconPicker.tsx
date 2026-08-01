import { Check, ChevronLeft, Search, Star, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EventIcon } from './EventIcon';
import {
  EVENT_ICON_BY_ID,
  EVENT_ICON_CATEGORIES,
  EVENT_ICONS,
  searchEventIcons,
  suggestEventIcons,
  type EventIconCategory,
  type EventIconDefinition,
} from './eventIcons';

const RECENT_ICONS_KEY = 'side-by-day-recent-event-icons';
const FAVORITE_ICONS_KEY = 'side-by-day-favorite-event-icons';

function readStoredIds(key: string) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function IconOption({
  definition,
  selected,
  favorite,
  onSelect,
  onFavorite,
}: {
  definition: EventIconDefinition;
  selected: boolean;
  favorite: boolean;
  onSelect: () => void;
  onFavorite: () => void;
}) {
  return (
    <div className={`event-icon-option ${selected ? 'is-selected' : ''}`}>
      <button
        aria-label={`${definition.label} 아이콘 선택`}
        aria-pressed={selected}
        className="event-icon-option__select"
        onClick={onSelect}
        type="button"
      >
        <span className="event-icon-option__tile">
          <EventIcon iconId={definition.id} size={21} />
          {selected ? <Check className="event-icon-option__check" size={10} strokeWidth={3} /> : null}
        </span>
        <span>{definition.label}</span>
      </button>
      <button
        aria-label={`${definition.label} ${favorite ? '즐겨찾기 해제' : '즐겨찾기'}`}
        aria-pressed={favorite}
        className="event-icon-option__favorite"
        onClick={onFavorite}
        type="button"
      >
        <Star fill={favorite ? 'currentColor' : 'none'} size={11} />
      </button>
    </div>
  );
}

export function EventIconPicker({
  selectedIconId,
  title,
  accentColor,
  onSelect,
  onClose,
}: {
  selectedIconId?: string;
  title: string;
  accentColor: string;
  onSelect: (iconId?: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<EventIconCategory | 'frequent' | 'all'>('frequent');
  const [recentIds, setRecentIds] = useState<string[]>(() => readStoredIds(RECENT_ICONS_KEY));
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readStoredIds(FAVORITE_ICONS_KEY));

  const recommendations = useMemo(() => suggestEventIcons(title), [title]);
  const filteredIcons = useMemo(() => {
    const searched = searchEventIcons(query);
    if (query.trim()) return searched;
    if (category === 'frequent') {
      const ids = [...favoriteIds, ...recentIds, ...recommendations.map((item) => item.id)];
      return [...new Set(ids)].map((id) => EVENT_ICON_BY_ID.get(id)).filter(Boolean) as EventIconDefinition[];
    }
    return category === 'all' ? searched : searched.filter((item) => item.category === category);
  }, [category, favoriteIds, query, recentIds, recommendations]);

  function select(iconId?: string) {
    onSelect(iconId);
    if (iconId) {
      const next = [iconId, ...recentIds.filter((id) => id !== iconId)].slice(0, 8);
      setRecentIds(next);
      localStorage.setItem(RECENT_ICONS_KEY, JSON.stringify(next));
    }
    onClose();
  }

  function toggleFavorite(iconId: string) {
    const next = favoriteIds.includes(iconId)
      ? favoriteIds.filter((id) => id !== iconId)
      : [iconId, ...favoriteIds];
    setFavoriteIds(next);
    localStorage.setItem(FAVORITE_ICONS_KEY, JSON.stringify(next));
  }

  return (
    <section
      aria-label="일정 아이콘 선택"
      className="event-icon-picker"
      style={{ '--picker-accent': accentColor } as React.CSSProperties}
    >
      <header className="event-icon-picker__header">
        <button aria-label="아이콘 선택 닫기" className="event-icon-picker__back" onClick={onClose} type="button">
          <ChevronLeft aria-hidden="true" size={19} />
        </button>
        <div>
          <h3>일정 아이콘</h3>
          <p>일정을 빠르게 알아볼 작은 표시를 선택하세요</p>
        </div>
        <button aria-label="아이콘 선택 닫기" className="event-icon-picker__close" onClick={onClose} type="button">
          <X aria-hidden="true" size={18} />
        </button>
      </header>

      <label className="event-icon-search">
        <Search aria-hidden="true" size={16} />
        <input
          autoFocus
          onChange={(event) => setQuery(event.target.value)}
          placeholder="병원, 운동, 회의처럼 검색"
          type="search"
          value={query}
        />
        {query ? <span>{filteredIcons.length}</span> : null}
      </label>

      {!query ? (
        <div className="event-icon-tabs" role="tablist" aria-label="아이콘 카테고리">
          <button
            aria-selected={category === 'frequent'}
            className={category === 'frequent' ? 'is-active' : ''}
            onClick={() => setCategory('frequent')}
            role="tab"
            type="button"
          >
            자주 사용
          </button>
          <button
            aria-selected={category === 'all'}
            className={category === 'all' ? 'is-active' : ''}
            onClick={() => setCategory('all')}
            role="tab"
            type="button"
          >
            전체
          </button>
          {EVENT_ICON_CATEGORIES.map((item) => (
            <button
              aria-selected={category === item.id}
              className={category === item.id ? 'is-active' : ''}
              key={item.id}
              onClick={() => setCategory(item.id)}
              role="tab"
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="event-icon-picker__content">
        {!query && category === 'frequent' && recommendations.length ? (
          <div className="event-icon-recommendation">
            <span>제목에 어울리는 추천</span>
            <div>
              {recommendations.slice(0, 6).map((item) => (
                <button key={item.id} onClick={() => select(item.id)} type="button">
                  <EventIcon iconId={item.id} size={17} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="event-icon-grid">
          <button
            aria-label="아이콘 없음"
            aria-pressed={!selectedIconId}
            className={`event-icon-none ${!selectedIconId ? 'is-selected' : ''}`}
            onClick={() => select(undefined)}
            type="button"
          >
            <span className="event-icon-option__tile"><X size={17} /></span>
            <span>아이콘 없음</span>
          </button>
          {filteredIcons.map((item) => (
            <IconOption
              definition={item}
              favorite={favoriteIds.includes(item.id)}
              key={item.id}
              onFavorite={() => toggleFavorite(item.id)}
              onSelect={() => select(item.id)}
              selected={selectedIconId === item.id}
            />
          ))}
        </div>
        {!filteredIcons.length ? (
          <div className="event-icon-empty">
            <Search aria-hidden="true" size={22} />
            <strong>검색 결과가 없어요</strong>
            <span>다른 의미의 단어로 검색해 보세요</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
