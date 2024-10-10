import { ReactNode } from 'react';

export default function Placeholder({ children }: { children?: ReactNode }) {
  return (
    <div className="h-96 overflow-hidden bg-neutral-900 sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
