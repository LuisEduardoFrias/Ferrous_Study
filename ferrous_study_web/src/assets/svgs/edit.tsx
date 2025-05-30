import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function EditIcon(props: Props) {

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      transform="matrix(1, 0, 0, -1, 0, 0)"
      fill="#ffff"
      id="svg"
      {...props}
    >
      <path fill="none" d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" stroke="#ffff" strokeWidth="2"></path>
      <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#ffff" strokeWidth="2"></polygon>
    </svg>
  );
}
/*
<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g>
  <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
  <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
</g> </g> </g> </g></svg>
*/