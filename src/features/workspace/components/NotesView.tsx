import { Pin, PinOff, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Memo, WorkspaceEditorTarget } from '../../../types';

interface NotesViewProps {
  memos: Memo[];
  onEdit: (target: WorkspaceEditorTarget) => void;
  onTogglePin: (id: string) => void;
}

export function NotesView({ memos, onEdit, onTogglePin }: NotesViewProps) {
  const [query, setQuery] = useState('');
  const filteredMemos = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    const matching = normalized
      ? memos.filter((memo) => `${memo.title} ${memo.content}`.toLocaleLowerCase().includes(normalized))
      : memos;
    return [...matching].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }, [memos, query]);
  const pinned = filteredMemos.filter((memo) => memo.pinned);
  const recent = filteredMemos.filter((memo) => !memo.pinned);

  return (
    <section className="workspace-view notes-view" aria-labelledby="notes-view-heading">
      <header className="screen-heading">
        <h2 id="notes-view-heading">NOTES</h2>
      </header>

      <label className="note-search">
        <Search aria-hidden="true" size={17} />
        <span className="visually-hidden">메모 검색</span>
        <input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="SEARCH NOTES"
          type="search"
          value={query}
        />
      </label>

      <NoteGroup
        memos={pinned}
        onEdit={onEdit}
        onTogglePin={onTogglePin}
        title="PINNED NOTES"
      />
      <NoteGroup
        memos={recent}
        onEdit={onEdit}
        onTogglePin={onTogglePin}
        title="RECENT NOTES"
      />
    </section>
  );
}

function NoteGroup({
  title,
  memos,
  onEdit,
  onTogglePin,
}: {
  title: string;
  memos: Memo[];
  onEdit: (target: WorkspaceEditorTarget) => void;
  onTogglePin: (id: string) => void;
}) {
  return (
    <section className="productivity-section">
      <div className="productivity-section__heading">
        <h3>{title}</h3>
        <span>{memos.length}</span>
      </div>
      {memos.length ? (
        <div className="memo-card-list">
          {memos.map((memo) => (
            <article className="memo-card" key={memo.id}>
              <button
                className="memo-card__content"
                onClick={() => onEdit({ kind: 'memo', id: memo.id })}
                type="button"
              >
                <h3>{memo.title}</h3>
                <p>{memo.content || '내용이 없는 메모'}</p>
                {memo.linkedDate ? <time>{memo.linkedDate}</time> : null}
              </button>
              <button
                aria-label={memo.pinned ? `${memo.title} 고정 해제` : `${memo.title} 고정`}
                className="row-action"
                onClick={() => onTogglePin(memo.id)}
                type="button"
              >
                {memo.pinned
                  ? <PinOff aria-hidden="true" size={15} />
                  : <Pin aria-hidden="true" size={15} />}
              </button>
            </article>
          ))}
        </div>
      ) : <p className="section-empty">메모가 없습니다.</p>}
    </section>
  );
}
