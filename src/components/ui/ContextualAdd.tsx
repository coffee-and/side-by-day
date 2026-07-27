import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import type { AppSection, WorkspaceEditorTarget } from '../../types';

interface ContextualAddProps {
  activeSection: AppSection;
  selectedDate: string;
  onSelect: (target: WorkspaceEditorTarget) => void;
}

const labels: Record<WorkspaceEditorTarget['kind'], string> = {
  event: 'EVENT',
  todo: 'TO DO',
  memo: 'NOTE',
  counter: 'D-DAY',
};

export function ContextualAdd({
  activeSection,
  selectedDate,
  onSelect,
}: ContextualAddProps) {
  const [isOpen, setIsOpen] = useState(false);
  const kinds: WorkspaceEditorTarget['kind'][] = activeSection === 'today'
    ? ['event', 'todo', 'memo', 'counter']
    : activeSection === 'calendar'
      ? ['event', 'todo', 'memo']
      : activeSection === 'todos'
        ? ['todo']
        : ['memo'];

  return (
    <div className="contextual-add">
      {isOpen ? (
        <div className="contextual-add__menu" role="menu">
          {kinds.map((kind) => (
            <button
              key={kind}
              onClick={() => {
                onSelect({
                  kind,
                  date: kind === 'counter' ? undefined : selectedDate,
                });
                setIsOpen(false);
              }}
              role="menuitem"
              type="button"
            >
              {labels[kind]}
            </button>
          ))}
        </div>
      ) : null}
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? '추가 메뉴 닫기' : '새 항목 추가'}
        className="contextual-add__trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" /> : <Plus aria-hidden="true" />}
      </button>
    </div>
  );
}
