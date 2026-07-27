import { useMemo, useState } from 'react';
import {
  PERSONAL_SPACE_ID,
  sampleCounters,
  sampleEvents,
  sampleMemos,
  sampleSpaces,
  sampleTodos,
} from '../../../data/sampleData';
import type {
  CalendarEvent,
  DateCounter,
  Memo,
  Space,
  TodoItem,
} from '../../../types';

const STORAGE_KEY = 'side-by-day-workspace-v1';

interface StoredWorkspace {
  events: CalendarEvent[];
  todos: TodoItem[];
  memos: Memo[];
  counters: DateCounter[];
}

const initialWorkspace: StoredWorkspace = {
  events: sampleEvents,
  todos: sampleTodos,
  memos: sampleMemos,
  counters: sampleCounters,
};

function readWorkspace(): StoredWorkspace {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...initialWorkspace, ...JSON.parse(stored) } : initialWorkspace;
  } catch {
    return initialWorkspace;
  }
}

function createId(prefix: string) {
  const value = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${value}`;
}

function persist(next: StoredWorkspace) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export type EventInput = Omit<CalendarEvent, 'id'>;
export type TodoInput = Omit<TodoItem, 'id' | 'createdAt' | 'completedAt'>;
export type MemoInput = Omit<Memo, 'id' | 'updatedAt'>;
export type CounterInput = Omit<DateCounter, 'id'>;

export function useWorkspace() {
  const [activeSpaceId, setActiveSpaceId] = useState(PERSONAL_SPACE_ID);
  const [data, setData] = useState<StoredWorkspace>(readWorkspace);

  const activeSpace = sampleSpaces.find((space) => space.id === activeSpaceId)
    ?? sampleSpaces[0];
  const availableSpaces = sampleSpaces.filter((space) => space.kind === 'personal');

  const events = useMemo(
    () => data.events.filter((item) => item.spaceId === activeSpace.id),
    [activeSpace.id, data.events],
  );
  const todos = useMemo(
    () => data.todos.filter((item) => item.spaceId === activeSpace.id),
    [activeSpace.id, data.todos],
  );
  const memos = useMemo(
    () => data.memos.filter((item) => item.spaceId === activeSpace.id),
    [activeSpace.id, data.memos],
  );
  const counters = useMemo(
    () => data.counters.filter((item) => item.spaceId === activeSpace.id),
    [activeSpace.id, data.counters],
  );

  function updateData(updater: (current: StoredWorkspace) => StoredWorkspace) {
    setData((current) => persist(updater(current)));
  }

  function createEvent(input: EventInput) {
    updateData((current) => ({
      ...current,
      events: [{ ...input, id: createId('event') }, ...current.events],
    }));
  }

  function updateEvent(id: string, input: EventInput) {
    updateData((current) => ({
      ...current,
      events: current.events.map((item) => item.id === id ? { ...input, id } : item),
    }));
  }

  function deleteEvent(id: string) {
    updateData((current) => ({
      ...current,
      events: current.events.filter((item) => item.id !== id),
    }));
  }

  function createTodo(input: TodoInput) {
    updateData((current) => ({
      ...current,
      todos: [{
        ...input,
        id: createId('todo'),
        createdAt: new Date().toISOString(),
      }, ...current.todos],
    }));
  }

  function updateTodo(id: string, input: TodoInput) {
    updateData((current) => ({
      ...current,
      todos: current.todos.map((item) => (
        item.id === id ? { ...item, ...input } : item
      )),
    }));
  }

  function deleteTodo(id: string) {
    updateData((current) => ({
      ...current,
      todos: current.todos.filter((item) => item.id !== id),
    }));
  }

  function toggleTodo(id: string) {
    updateData((current) => ({
      ...current,
      todos: current.todos.map((item) => (
        item.id === id
          ? { ...item, completedAt: item.completedAt ? undefined : new Date().toISOString() }
          : item
      )),
    }));
  }

  function createMemo(input: MemoInput) {
    updateData((current) => ({
      ...current,
      memos: [{
        ...input,
        id: createId('memo'),
        updatedAt: new Date().toISOString(),
      }, ...current.memos],
    }));
  }

  function updateMemo(id: string, input: MemoInput) {
    updateData((current) => ({
      ...current,
      memos: current.memos.map((item) => (
        item.id === id
          ? { ...item, ...input, updatedAt: new Date().toISOString() }
          : item
      )),
    }));
  }

  function deleteMemo(id: string) {
    updateData((current) => ({
      ...current,
      memos: current.memos.filter((item) => item.id !== id),
    }));
  }

  function toggleMemoPin(id: string) {
    updateData((current) => ({
      ...current,
      memos: current.memos.map((item) => (
        item.id === id ? { ...item, pinned: !item.pinned } : item
      )),
    }));
  }

  function createCounter(input: CounterInput) {
    updateData((current) => ({
      ...current,
      counters: [{ ...input, id: createId('counter') }, ...current.counters],
    }));
  }

  function updateCounter(id: string, input: CounterInput) {
    updateData((current) => ({
      ...current,
      counters: current.counters.map((item) => item.id === id ? { ...input, id } : item),
    }));
  }

  function deleteCounter(id: string) {
    updateData((current) => ({
      ...current,
      counters: current.counters.filter((item) => item.id !== id),
    }));
  }

  function toggleCounterPin(id: string) {
    updateData((current) => ({
      ...current,
      counters: current.counters.map((item) => (
        item.id === id ? { ...item, pinned: !item.pinned } : item
      )),
    }));
  }

  function selectSpace(space: Space) {
    if (space.kind === 'personal') {
      setActiveSpaceId(space.id);
    }
  }

  return {
    spaces: sampleSpaces,
    availableSpaces,
    activeSpace,
    activeSpaceId,
    events,
    todos,
    memos,
    counters,
    selectSpace,
    createEvent,
    updateEvent,
    deleteEvent,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    createMemo,
    updateMemo,
    deleteMemo,
    toggleMemoPin,
    createCounter,
    updateCounter,
    deleteCounter,
    toggleCounterPin,
  };
}

export type Workspace = ReturnType<typeof useWorkspace>;
