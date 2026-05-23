import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-tan bg-opacity-50 overflow-hidden ">
     
      <div className="flex p-12 justify-center overflow-auto">{children}</div>
    </div>
  );
}