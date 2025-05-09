import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function CopyIcon(props: Props) {

  return (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 24.00 24.00"
      fill="#ffff"
      id="svg"
      {...props}
    >
      <path d="M9 2h7v4h4v10h-3v1h4V4.6L17.4 1H8v5h1zm8 0h.31L20 4.69V5h-3zM5 19h7v1H5zm-2 4h13V10.6L12.4 7H3zm9-15h.31L15 10.69V11h-3zM4 8h7v4h4v10H4zm1 5h9v1H5zm4 3h5v1H5v-1z"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>
  );
}
/*
<svg width="64px" height="64px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier"
  stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9
2h7v4h4v10h-3v1h4V4.6L17.4 1H8v5h1zm8 0h.31L20 4.69V5h-3zM5 19h7v1H5zm-2 4h13V10.6L12.4 7H3zm9-15h.31L15 10.69V11h-3zM4 8h7v4h4v10H4zm1 5h9v1H5zm4
3h5v1H5v-1z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
*/