import { useEffect, useState } from 'react';
import type { WorkspaceLayout } from '../../types';

function getLayout(): WorkspaceLayout {
  if (window.innerWidth < 768) {
    return 'mobile';
  }
  if (window.innerWidth < 1200) {
    return 'tablet';
  }
  return 'desktop';
}

export function useResponsiveLayout() {
  const [layout, setLayout] = useState<WorkspaceLayout>(getLayout);

  useEffect(() => {
    const tablet = window.matchMedia('(min-width: 768px)');
    const desktop = window.matchMedia('(min-width: 1200px)');
    const update = () => setLayout(desktop.matches ? 'desktop' : tablet.matches ? 'tablet' : 'mobile');

    tablet.addEventListener('change', update);
    desktop.addEventListener('change', update);
    return () => {
      tablet.removeEventListener('change', update);
      desktop.removeEventListener('change', update);
    };
  }, []);

  return layout;
}
