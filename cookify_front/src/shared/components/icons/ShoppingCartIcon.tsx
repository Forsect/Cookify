import React from "react";
import IconCommonProps from "./IconCommonProps";

const ShoppingCartIcon: React.FC<IconCommonProps> = (props: IconCommonProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M144 336h304a8 8 0 007.832-6.368l40-192A8 8 0 00488 128H105.159L87.787 54.167A8 8 0 0080 48H24a8 8 0 000 16h49.664l60.593 257.522A32.053 32.053 0 00112 352v16a32.036 32.036 0 0032 32h.022a40 40 0 1063.956 0h160.044a40 40 0 1063.956 0H464a8 8 0 000-16H144a16.019 16.019 0 01-16-16v-16a16.019 16.019 0 0116-16zm6.336-16l-7.529-32h44.131l4 32h-40.6zm173.324-80l-1.334 32h-52.652l-1.334-32zm-55.986-16l-1.334-32h59.32l-1.334 32zm-14.014 48h-52.6l-4-32h55.264zm.666 16l1.334 32h-48.6l-4-32zm16.014 0h51.32l-1.334 32h-48.652zm67.334 0h51.264l-4 32h-48.6zm.666-16l1.334-32h55.264l-4 32zm72.722-32h47.1l-6.662 32h-44.438zm2-16l4-32h51.1l-6.662 32zm-16.124 0h-56.6l1.334-32h59.264zm-54.6-48l1.334-32h63.264l-4 32zm-16.014 0h-60.65l-1.334-32h63.32zm-76.666 0h-60.6l-4-32h63.264zm.666 16l1.334 32h-56.6l-4-32zm-71.388 32h-51.19l-7.529-32h54.719zm2 16l4 32h-45.9l-7.529-32zM441.5 320h-40.438l4-32h43.1zm30-144h-52.438l4-32h55.1zm-302.562-32l4 32h-56.484l-7.529-32zM200 424a24 24 0 11-24-24 24.028 24.028 0 0124 24zm224 0a24 24 0 11-24-24 24.028 24.028 0 0124 24z" />
      <circle cx={176} cy={424} r={8} />
      <circle cx={400} cy={424} r={8} />
    </svg>
  );
};

export default ShoppingCartIcon;