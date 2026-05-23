'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import blankBox from '/public/images/blank-box.png';
import Image from 'next/image';

const links = [
    { name: 'Item 1', href: '/' },
  {name: 'Item 2', href: '/' },
  {
    name: 'Item 3',
    href: '/'
    },
  {name: 'Item 4', href: '/'}
  
];

export default function FilteredProducts() {
    const pathname = usePathname();
  return (
    <>
          {links.map((link) => {
        
        return (
          <div className="" key={link.name}>
            
            <Link
            key={link.name}
            href={link.href}
            className={clsx(' text-brown',
              {
                'bg-brown text-beige': pathname === link.href,
              },
            )}
            >
              
            <p className=" text-2xl">{link.name}</p>
          </Link>
            </div>
        );
      })}
    </>
  );
}
