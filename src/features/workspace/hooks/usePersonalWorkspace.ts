import { useMemo, useState } from 'react';
import {
  PERSONAL_SPACE_ID,
  sampleCounters,
  sampleEvents,
  sampleMemos,
  sampleSpaces,
  sampleTodos,
} from '../../../data/sampleData';
import type { DateCounter, Memo, TodoItem } from '../../../types';

function createId(prefix: string) {
  const value = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${value}`;
}

export function usePersonalWorkspace() {
  const [todos, setTodos] = useState<TodoItem[]>(sampleTodos);
  const [memos, setMemos] = useState<Memo[]>(sampleMemos);
  const [counters, setCounters] = useState<DateCounter[]>(sampleCounters);

  const personalSpace = sampleSpaces.find((space) => space.id === PERSONAL_SPACE_ID) ?? sampleSpaces[0];
  const events = useMemo(
    () => sampleEvents.filter((event) => event.spaceId === personalSpace.id),
    [personalSpace.id],
  );
  const personalTodos = todos.filter((todo) => todo.spaceId === personalSpace.id);
  const personalMemos = memos.filter((memo) => memo.spaceId === personalSpace.id);
  const personalCounters = counters.filter((counter) => counter.spaceId === personalSpace.id);

  function addTodo(title: string, dueDate?: string) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      return;
    }

    setTodos((current) => [
      {
        id: createId('todo'),
        spaceId: personalSpace.id,
        title: normalizedTitle,
        dueDate: dueDate || undefined,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  }

  function toggleTodo(todoId: string) {
    setTodos((current) => current.map((todo) => (
      todo.id === todoId
        ? { ...todo, completedAt: todo.completedAt ? undefined : new Date().toISOString() }
        : todo
    )));
  }

  function addMemo(title: string, content: string) {
    const normalizedTitle = title.trim();
    const normalizedContent = content.trim();
    if (!normalizedTitle && !normalizedContent) {
      return;
    }

    setMemos((current) => [
      {
        id: createId('memo'),
        spaceId: personalSpace.id,
        title: normalizedTitle || '제목 없는 메모',
        content: normalizedContent,
        pinned: false,
        updatedAt: new Date().toISOString(),
      },
      ...current,
    ]);
  }

  function addCounter(title: string, targetDate: string, mode: DateCounter['mode']) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle || !targetDate) {
      return;
    }

    setCounters((current) => [
      {
        id: createId('counter'),
        spaceId: personalSpace.id,
        title: normalizedTitle,
        targetDate,
        mode,
        pinned: true,
      },
      ...current,
    ]);
  }

  return {
    spaces: sampleSpaces,
    personalSpace,
    events,
    todos: personalTodos,
    memos: personalMemos,
    counters: personalCounters,
    addTodo,
    toggleTodo,
    addMemo,
    addCounter,
  };
}
