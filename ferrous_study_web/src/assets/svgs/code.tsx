import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function CodeIcon(props: Props) {

  return (
    <svg
      width="32px"
      height="32px"
      viewBox="-12.32 -12.32 40.64 40.64"
      fill="#ffff"
      id="svg"
      {...props}
    >
      <path d="M8.01005
0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z" ></path> <path d="M12.5 11.5L11.0858 10.0858L13.1716
8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z"></path> <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843
8Z"></path>
    </svg>
  );
}
/*
<svg width="64px" height="64px" viewBox="-12.32 -12.32 40.64 40.64" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"
  stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.01005
0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z" fill="#000000"></path> <path d="M12.5 11.5L11.0858 10.0858L13.1716
8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z" fill="#000000"></path> <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843
8Z" fill="#000000"></path> </g></svg>
*/