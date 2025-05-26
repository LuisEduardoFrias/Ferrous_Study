import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function ListIcon(props: Props) {

   return (
      <svg
         width="24px"
         height="24px"
         viewBox="0 -2 16 16"
         fill="none"
         id="svg"
         {...props}
      >
         <path d="M3 1H1V3H3V1Z" fill="#ffffff"></path><path d="M15 1H5V3H15V1Z" fill="#ffffff"></path>
         <path d="M3 5H1V7H3V5Z" fill="#ffffff"></path><path d="M15 5H5V7H15V5Z" fill="#ffffff"></path>
         <path d="M3 9H3V11H1V9Z" fill="#ffffff"></path><path d="M15 9H15V11H5V9Z" fill="#ffffff"></path>
      </svg>
   );
}
/*
<svg width="64px" height="64px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
<path d="M3 1H1V3H3V1Z" fill="#ffffff"></path> <path d="M3 5H1V7H3V5Z" fill="#ffffff"></path> 
<path d="M1 9H3V11H1V9Z" fill="#ffffff"></path> <path d="M3 13H1V15H3V13Z" fill="#ffffff"></path> 
<path d="M15 1H5V3H15V1Z" fill="#ffffff"></path> <path d="M15 5H5V7H15V5Z" fill="#ffffff"></path> 
<path d="M5 9H15V11H5V9Z" filbl="#ffffff"></path> <path d="M15 13H5V15H15V13Z" fill="#ffffff"></path> 
</g></svg>
*/