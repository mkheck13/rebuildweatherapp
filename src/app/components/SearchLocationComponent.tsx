"use client";
import React from "react";

interface SearchLocationProps {
  onClose: () => void;
}

const SearchLocationComponent: React.FC<SearchLocationProps> = ({ onClose }) => {
  return (
    <div className="text-gray-150">
      <div className="text-right">
        <button className="text-2xl" onClick={onClose}>x
          <i className="fas fa-times"></i>
        </button>
      </div>



      <div className="mt-20">
        <button className="hover:border border-gray-250 px-4 py-6 w-full flex justify-between">
          <p>London</p>
          <i className="fas fa-chevron-right text-gray-350"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchLocationComponent;