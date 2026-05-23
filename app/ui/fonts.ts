import { Quattrocento, Roboto, Shadows_Into_Light } from 'next/font/google';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
const shadows = Shadows_Into_Light({ weight: '400', subsets: ['latin'] });
const quattrocento = Quattrocento({ weight: ['400', '700'], subsets: ['latin'] });

export { quattrocento, roboto, shadows };
