// icon:bxs-trash-alt | Boxicons https://boxicons.com/ | Atisa
import * as React from "react";

function IconTrash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}>
      <path d="M6 7H5v13a2 2 0 002 2h10a2 2 0 002-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z" />
    </svg>
  );
}

export default IconTrash;
