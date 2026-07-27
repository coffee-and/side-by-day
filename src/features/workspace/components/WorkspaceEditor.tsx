import { Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_EVENT_COLOR, EVENT_COLOR_TOKENS, getEventColorToken } from '../../events/eventPalette';
import type { Workspace } from '../hooks/useWorkspace';
import type {
  DateCounter,
  EventAppearanceVariant,
  RepeatFrequency,
  WorkspaceEditorTarget,
} from '../../../types';

interface WorkspaceEditorProps {
  target: WorkspaceEditorTarget;
  workspace: Workspace;
  onClose: () => void;
}

const titles: Record<WorkspaceEditorTarget['kind'], string> = {
  event: 'EVENT',
  todo: 'TO DO',
  memo: 'NOTE',
  counter: 'D-DAY',
};

function optionalRepeat(frequency: string) {
  return frequency
    ? { frequency: frequency as RepeatFrequency, interval: 1 }
    : undefined;
}

export function WorkspaceEditor({ target, workspace, onClose }: WorkspaceEditorProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentEvent = target.kind === 'event'
    ? workspace.events.find((item) => item.id === target.id)
    : undefined;
  const currentTodo = target.kind === 'todo'
    ? workspace.todos.find((item) => item.id === target.id)
    : undefined;
  const currentMemo = target.kind === 'memo'
    ? workspace.memos.find((item) => item.id === target.id)
    : undefined;
  const currentCounter = target.kind === 'counter'
    ? workspace.counters.find((item) => item.id === target.id)
    : undefined;
  const isEditing = Boolean(target.id);

  const [spaceId, setSpaceId] = useState(
    currentEvent?.spaceId
      ?? currentTodo?.spaceId
      ?? currentMemo?.spaceId
      ?? currentCounter?.spaceId
      ?? workspace.activeSpaceId,
  );
  const [title, setTitle] = useState(
    currentEvent?.title ?? currentTodo?.title ?? currentMemo?.title ?? currentCounter?.title ?? '',
  );

  const [eventDate, setEventDate] = useState(currentEvent?.date ?? target.date ?? '');
  const [time, setTime] = useState(currentEvent?.time ?? '');
  const [endTime, setEndTime] = useState(currentEvent?.endTime ?? '');
  const [allDay, setAllDay] = useState(currentEvent?.allDay ?? false);
  const [note, setNote] = useState(currentEvent?.note ?? '');
  const [appearance, setAppearance] = useState<EventAppearanceVariant>(
    currentEvent?.appearance?.variant ?? 'underline',
  );
  const [accentColor, setAccentColor] = useState(
    currentEvent?.appearance?.accentColor ?? DEFAULT_EVENT_COLOR.accent,
  );
  const [eventRepeat, setEventRepeat] = useState(currentEvent?.repeat?.frequency ?? '');
  const [alertMinutes, setAlertMinutes] = useState(
    currentEvent?.alerts?.[0]?.minutesBefore?.toString() ?? '',
  );

  const [dueDate, setDueDate] = useState(currentTodo?.dueDate ?? target.date ?? '');
  const [important, setImportant] = useState(currentTodo?.important ?? false);
  const [todoRepeat, setTodoRepeat] = useState(currentTodo?.repeat?.frequency ?? '');

  const [content, setContent] = useState(currentMemo?.content ?? '');
  const [linkedDate, setLinkedDate] = useState(currentMemo?.linkedDate ?? target.date ?? '');
  const [memoPinned, setMemoPinned] = useState(currentMemo?.pinned ?? false);

  const [targetDate, setTargetDate] = useState(currentCounter?.targetDate ?? '');
  const [counterMode, setCounterMode] = useState<DateCounter['mode']>(
    currentCounter?.mode ?? 'countdown',
  );
  const [counterPinned, setCounterPinned] = useState(currentCounter?.pinned ?? true);
  const [yearlyRepeat, setYearlyRepeat] = useState(currentCounter?.yearlyRepeat ?? false);
  const [icon, setIcon] = useState(currentCounter?.icon ?? '');
  const [counterColor, setCounterColor] = useState(
    currentCounter?.color ?? DEFAULT_EVENT_COLOR.accent,
  );

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      return;
    }

    if (target.kind === 'event' && eventDate) {
      const token = getEventColorToken(accentColor);
      const input = {
        spaceId,
        title: normalizedTitle,
        date: eventDate,
        time: allDay ? undefined : time || undefined,
        endTime: allDay ? undefined : endTime || undefined,
        allDay,
        note: note.trim() || undefined,
        appearance: {
          variant: appearance,
          accentColor: token.accent,
          textColor: token.text,
        },
        repeat: optionalRepeat(eventRepeat),
        alerts: alertMinutes ? [{ minutesBefore: Number(alertMinutes) }] : undefined,
      };
      if (target.id) workspace.updateEvent(target.id, input);
      else workspace.createEvent(input);
    }

    if (target.kind === 'todo') {
      const input = {
        spaceId,
        title: normalizedTitle,
        dueDate: dueDate || undefined,
        important,
        repeat: optionalRepeat(todoRepeat),
      };
      if (target.id) workspace.updateTodo(target.id, input);
      else workspace.createTodo(input);
    }

    if (target.kind === 'memo') {
      const input = {
        spaceId,
        title: normalizedTitle,
        content: content.trim(),
        linkedDate: linkedDate || undefined,
        pinned: memoPinned,
      };
      if (target.id) workspace.updateMemo(target.id, input);
      else workspace.createMemo(input);
    }

    if (target.kind === 'counter' && targetDate) {
      const input = {
        spaceId,
        title: normalizedTitle,
        targetDate,
        mode: counterMode,
        pinned: counterPinned,
        yearlyRepeat,
        icon: icon.trim() || undefined,
        color: counterColor,
      };
      if (target.id) workspace.updateCounter(target.id, input);
      else workspace.createCounter(input);
    }

    onClose();
  }

  function remove() {
    if (!target.id || !window.confirm(`${titles[target.kind]} 항목을 삭제할까요?`)) {
      return;
    }
    if (target.kind === 'event') workspace.deleteEvent(target.id);
    if (target.kind === 'todo') workspace.deleteTodo(target.id);
    if (target.kind === 'memo') workspace.deleteMemo(target.id);
    if (target.kind === 'counter') workspace.deleteCounter(target.id);
    onClose();
  }

  return (
    <dialog
      aria-labelledby="editor-title"
      className="workspace-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      ref={dialogRef}
    >
      <form className="workspace-editor" onSubmit={submit}>
        <header>
          <div>
            <p className="eyebrow">{isEditing ? 'EDIT' : 'NEW'}</p>
            <h2 id="editor-title">{titles[target.kind]}</h2>
          </div>
          <button aria-label="닫기" className="icon-button" onClick={onClose} type="button">
            <X aria-hidden="true" size={19} />
          </button>
        </header>

        <label>
          <span>DIARY</span>
          <select onChange={(event) => setSpaceId(event.target.value)} value={spaceId}>
            {workspace.availableSpaces.map((space) => (
              <option key={space.id} value={space.id}>{space.name}</option>
            ))}
            <option disabled value="shared-space-placeholder">TOGETHER DIARY · COMING LATER</option>
          </select>
        </label>

        <label>
          <span>TITLE</span>
          <input
            autoFocus
            onChange={(event) => setTitle(event.target.value)}
            required
            type="text"
            value={title}
          />
        </label>

        {target.kind === 'event' ? (
          <>
            <label>
              <span>START DATE</span>
              <input
                onChange={(event) => setEventDate(event.target.value)}
                required
                type="date"
                value={eventDate}
              />
            </label>
            <label className="check-field">
              <input checked={allDay} onChange={(event) => setAllDay(event.target.checked)} type="checkbox" />
              <span>ALL-DAY EVENT</span>
            </label>
            {!allDay ? (
              <div className="field-row">
                <label>
                  <span>START TIME</span>
                  <input onChange={(event) => setTime(event.target.value)} type="time" value={time} />
                </label>
                <label>
                  <span>END TIME · OPTIONAL</span>
                  <input onChange={(event) => setEndTime(event.target.value)} type="time" value={endTime} />
                </label>
              </div>
            ) : null}
            <label>
              <span>NOTE</span>
              <textarea onChange={(event) => setNote(event.target.value)} rows={3} value={note} />
            </label>
            <div className="field-row">
              <label>
                <span>APPEARANCE</span>
                <select
                  onChange={(event) => setAppearance(event.target.value as EventAppearanceVariant)}
                  value={appearance}
                >
                  <option value="underline">UNDERLINE</option>
                  <option value="fill">FILL</option>
                </select>
              </label>
              <label>
                <span>REPEAT</span>
                <RepeatSelect onChange={setEventRepeat} value={eventRepeat} />
              </label>
            </div>
            <fieldset className="color-field">
              <legend>COLOR</legend>
              <div>
                {EVENT_COLOR_TOKENS.map((token) => (
                  <button
                    aria-label={`색상 ${token.accent}`}
                    aria-pressed={accentColor === token.accent}
                    className={accentColor === token.accent ? 'is-selected' : ''}
                    key={token.accent}
                    onClick={() => setAccentColor(token.accent)}
                    style={{ background: token.accent }}
                    type="button"
                  />
                ))}
              </div>
            </fieldset>
            <label>
              <span>ALERT</span>
              <select onChange={(event) => setAlertMinutes(event.target.value)} value={alertMinutes}>
                <option value="">NONE</option>
                <option value="0">AT START TIME</option>
                <option value="10">10 MINUTES BEFORE</option>
                <option value="60">1 HOUR BEFORE</option>
                <option value="1440">1 DAY BEFORE</option>
              </select>
            </label>
          </>
        ) : null}

        {target.kind === 'todo' ? (
          <>
            <label>
              <span>DUE DATE · OPTIONAL</span>
              <input onChange={(event) => setDueDate(event.target.value)} type="date" value={dueDate} />
            </label>
            <label>
              <span>REPEAT</span>
              <RepeatSelect onChange={setTodoRepeat} value={todoRepeat} />
            </label>
            <label className="check-field">
              <input checked={important} onChange={(event) => setImportant(event.target.checked)} type="checkbox" />
              <span>IMPORTANT</span>
            </label>
          </>
        ) : null}

        {target.kind === 'memo' ? (
          <>
            <label>
              <span>CONTENT</span>
              <textarea onChange={(event) => setContent(event.target.value)} rows={7} value={content} />
            </label>
            <label>
              <span>LINKED DATE · OPTIONAL</span>
              <input onChange={(event) => setLinkedDate(event.target.value)} type="date" value={linkedDate} />
            </label>
            <label className="check-field">
              <input checked={memoPinned} onChange={(event) => setMemoPinned(event.target.checked)} type="checkbox" />
              <span>PIN NOTE</span>
            </label>
          </>
        ) : null}

        {target.kind === 'counter' ? (
          <>
            <label>
              <span>TARGET DATE</span>
              <input onChange={(event) => setTargetDate(event.target.value)} required type="date" value={targetDate} />
            </label>
            <div className="field-row">
              <label>
                <span>MODE</span>
                <select
                  onChange={(event) => setCounterMode(event.target.value as DateCounter['mode'])}
                  value={counterMode}
                >
                  <option value="countdown">COUNTDOWN</option>
                  <option value="countup">COUNT UP</option>
                </select>
              </label>
              <label>
                <span>ICON · OPTIONAL</span>
                <input maxLength={2} onChange={(event) => setIcon(event.target.value)} value={icon} />
              </label>
            </div>
            <label>
              <span>COLOR</span>
              <select onChange={(event) => setCounterColor(event.target.value)} value={counterColor}>
                {EVENT_COLOR_TOKENS.map((token) => (
                  <option key={token.accent} value={token.accent}>{token.accent}</option>
                ))}
              </select>
            </label>
            <label className="check-field">
              <input checked={counterPinned} onChange={(event) => setCounterPinned(event.target.checked)} type="checkbox" />
              <span>PIN D-DAY</span>
            </label>
            <label className="check-field">
              <input checked={yearlyRepeat} onChange={(event) => setYearlyRepeat(event.target.checked)} type="checkbox" />
              <span>REPEAT YEARLY</span>
            </label>
          </>
        ) : null}

        <footer>
          {isEditing ? (
            <button className="danger-button" onClick={remove} type="button">
              <Trash2 aria-hidden="true" size={16} />
              DELETE
            </button>
          ) : <span />}
          <button className="primary-button" type="submit">
            {isEditing ? 'SAVE CHANGES' : `ADD ${titles[target.kind]}`}
          </button>
        </footer>
      </form>
    </dialog>
  );
}

function RepeatSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select onChange={(event) => onChange(event.target.value)} value={value}>
      <option value="">NONE</option>
      <option value="daily">DAILY</option>
      <option value="weekly">WEEKLY</option>
      <option value="monthly">MONTHLY</option>
      <option value="yearly">YEARLY</option>
    </select>
  );
}
