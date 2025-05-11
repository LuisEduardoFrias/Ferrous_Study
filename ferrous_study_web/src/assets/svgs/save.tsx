import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export default function SaveIcon(props: Props) {

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="#ffff"
      id="svg"
      {...props}
    >
      <path d="M16.765
2c1.187 0 1.363.06 1.51.168L21.662 4.7a.845.845 0 0 1 .339.677v15.78a.844.844 0 0 1-.844.844H2.844A.844.844 0 0 1 2 21.156V2.844A.844.844 0 0 1 2.844
2zM17 21v-7H7v7zM14 3v3h1V3zM7 3v6h10V3h-1v4h-3V3zM3 21h3v-8h12v8h3V5.452l-3-2.278v6.17a.769.769 0 0 1-.844.656H6.844A.769.769 0 0 1 6
9.344V3H3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ></path><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M0 0h24v24H0z"></path>
    </svg>
  );
}

/*
<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier"
stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.765
2c1.187 0 1.363.06 1.51.168L21.662 4.7a.845.845 0 0 1 .339.677v15.78a.844.844 0 0 1-.844.844H2.844A.844.844 0 0 1 2 21.156V2.844A.844.844 0 0 1 2.844
2zM17 21v-7H7v7zM14 3v3h1V3zM7 3v6h10V3h-1v4h-3V3zM3 21h3v-8h12v8h3V5.452l-3-2.278v6.17a.769.769 0 0 1-.844.656H6.844A.769.769 0 0 1 6
9.344V3H3z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
*/