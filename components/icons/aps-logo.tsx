import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import apsLogo from '@components/images/APSLogoTag-WHT.png';

type Props = {
  color: string;
  width?: number | string;
  height?: number | string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function APSLogo({ color, width = 123, height = 54 }: Props) {
  return (
    <div style={{ width, height }}>
      <Image alt="APS Logo" src={apsLogo} className="h-full w-full" />
    </div>
  );
}
