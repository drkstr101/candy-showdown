import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import apsLogo from '@components/images/APSLogo-WHT.png';

export interface IconLogoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  backgroundColor?: string;
  foregroundColor?: string;
}

export default function IconLogo({
  backgroundColor = 'transparent',
  foregroundColor = 'var(--accents-1)',
  ...props
}: IconLogoProps) {
  return (
    <div style={{ width: 40, height: 30 }} {...props}>
      <Image alt="APS Logo" className="mt-0.5 h-full w-full" src={apsLogo} />
    </div>
  );
}
