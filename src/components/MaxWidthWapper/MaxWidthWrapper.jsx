import React from 'react';

const MaxWidthWrapper = ({ children }) => {
  return (
    <div className="flex pt-[30px] px-8">
      <main className="flex-1 w-full pt-[40px] min-h-[82vh] lg:ml-72">
        {children}
      </main>
    </div>
  );
};

export default MaxWidthWrapper;
