import IconCommonProps from "./IconCommonProps";
import React from "react";

const SearchIcon: React.FunctionComponent<IconCommonProps> = (props: IconCommonProps) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M17.153 15.094h-1.084l-.385-.37a8.88 8.88 0 002.155-5.805A8.92 8.92 0 008.919 0 8.92 8.92 0 000 8.92a8.92 8.92 0 008.92 8.919c2.209 0 4.24-.81 5.804-2.155l.37.385v1.084L21.955 24 24 21.955zm-8.234 0A6.167 6.167 0 012.744 8.92 6.167 6.167 0 018.92 2.744a6.167 6.167 0 016.175 6.175 6.167 6.167 0 01-6.175 6.175z" />
    </svg>
  );
};

export default SearchIcon;
