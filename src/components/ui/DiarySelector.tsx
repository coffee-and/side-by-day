import { ChevronDown } from 'lucide-react';
import type { Workspace } from '../../features/workspace/hooks/useWorkspace';

interface DiarySelectorProps {
  workspace: Workspace;
  compact?: boolean;
}

export function DiarySelector({ workspace, compact = false }: DiarySelectorProps) {
  return (
    <details className={`diary-selector${compact ? ' diary-selector--compact' : ''}`}>
      <summary>
        <span>{workspace.activeSpace.name}</span>
        <ChevronDown aria-hidden="true" size={14} />
      </summary>
      <div className="diary-selector__menu">
        {workspace.availableSpaces.map((space) => (
          <button
            aria-current={workspace.activeSpaceId === space.id ? 'true' : undefined}
            className={workspace.activeSpaceId === space.id ? 'is-active' : ''}
            key={space.id}
            onClick={(event) => {
              workspace.selectSpace(space);
              event.currentTarget.closest('details')?.removeAttribute('open');
            }}
            type="button"
          >
            {space.name}
          </button>
        ))}
        <button aria-describedby="sharing-status" className="is-disabled" disabled type="button">
          <span>TOGETHER DIARY</span>
          <small>COMING LATER</small>
        </button>
        <button aria-describedby="sharing-status" className="invite-entry" disabled type="button">
          + INVITE
        </button>
        <p className="visually-hidden" id="sharing-status">
          친구 초대와 공유는 서버 기능이 준비된 뒤 제공됩니다.
        </p>
      </div>
    </details>
  );
}
