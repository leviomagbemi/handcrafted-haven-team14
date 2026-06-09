import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-tan bg-opacity-50 w-full min-h-[calc(100vh-200px)]">
      <div className="flex p-4 sm:p-8 lg:p-12 justify-center w-full">{children}</div>
    </div>
  );
}