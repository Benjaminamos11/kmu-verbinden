
import React from 'react';

export const IndustryLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swiss-red mx-auto"></div>
        <p className="mt-4 text-gray-600">Inhalte werden geladen...</p>
      </div>
    </div>
  );
};
