import { FileText, Pin, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Memo } from '../../../types';

interface NotesViewProps {
  memos: Memo[];
  onAddMemo: (title: string, content: string) => void;
}

export function NotesView({ memos, onAddMemo }: NotesViewProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const orderedMemos = useMemo(
    () => [...memos].sort((left, right) => {
      if (left.pinned !== right.pinned) {
        return left.pinned ? -1 : 1;
      }
      return right.updatedAt.localeCompare(left.updatedAt);
    }),
    [memos],
  );

  function submitMemo() {
    onAddMemo(title, content);
    setTitle('');
    setContent('');
  }

  return (
    <section className="workspace-view" aria-labelledby="notes-view-heading">
      <header className="workspace-view__header">
        <div>
          <p className="eyebrow">메모</p>
          <h2 id="notes-view-heading">기억해둘 것</h2>
        </div>
        <span className="space-chip">내 공간</span>
      </header>

      <section className="productivity-section" aria-labelledby="memo-add-heading">
        <div className="productivity-section__heading">
          <div>
            <p className="eyebrow">빠른 작성</p>
            <h3 id="memo-add-heading">새 메모</h3>
          </div>
        </div>
        <div className="memo-editor">
          <label>
            <span>제목</span>
            <input
              onChange={(event) => setTitle(event.target.value)}
              placeholder="메모 제목"
              type="text"
              value={title}
            />
          </label>
          <label>
            <span>내용</span>
            <textarea
              onChange={(event) => setContent(event.target.value)}
              placeholder="기억해둘 내용을 적어두세요"
              rows={4}
              value={content}
            />
          </label>
          <button className="compact-action" onClick={submitMemo} type="button">
            <Plus aria-hidden="true" size={16} /> 저장
          </button>
        </div>
      </section>

      <section className="productivity-section" aria-labelledby="memo-list-heading">
        <div className="productivity-section__heading">
          <h3 id="memo-list-heading">내 메모</h3>
          <span className="count-badge">{orderedMemos.length}</span>
        </div>
        {orderedMemos.length ? (
          <div className="memo-card-list">
            {orderedMemos.map((memo) => (
              <article className="memo-card" key={memo.id}>
                <div className="memo-card__heading">
                  <FileText aria-hidden="true" size={17} />
                  <h3>{memo.title}</h3>
                  {memo.pinned ? <Pin aria-label="고정된 메모" size={14} /> : null}
                </div>
                <p>{memo.content || '내용이 없는 메모'}</p>
                {memo.linkedDate ? <time>연결 날짜 {memo.linkedDate}</time> : null}
              </article>
            ))}
          </div>
        ) : <p className="section-empty">저장된 메모가 아직 없어요.</p>}
      </section>
    </section>
  );
}
