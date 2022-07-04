import * as React from 'react';
import { SVGProps } from 'react';

function SpendSvg(props: SVGProps<SVGSVGElement>): React.ReactElement {
    return (
        <svg height={512} viewBox="0 0 64 64" width={512} xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M9 24 28.416 6.988C31.016 4.71 35 6.624 35 10.15V24z" fill="#44bc59" />
            <path d="m17 24 21.057-10.5c2.667-1.456 5.943.44 5.943 3.438V24z" fill="#2d9739" />
            <path d="M57 49v7a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6h43a6 6 0 0 1 6 6v7z" fill="#624434" />
            <path
                d="M47.567 62H51a6 6 0 0 0 6-6V30a6 6 0 0 0-6-6H15c0 18.526 13.915 34.023 32.567 38z"
                fill="#755640"
            />
            <path d="M58 49H46c-3.314 0-4-2.686-4-6s.686-6 4-6h12a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4z" fill="#624434" />
            <circle cx={49} cy={43} fill="#f2f2f2" r={3} />
            <path
                d="M52.981 10a7.214 7.214 0 0 1-3.357 7.625L49 18l4 3 .176-.117A13.082 13.082 0 0 0 59 10h2.281a.704.704 0 0 0 .498-1.202l-4.6-6.188a1.491 1.491 0 0 0-2.394.001l-4.572 6.157a.721.721 0 0 0 .51 1.232h2.258l.019.046z"
                fill="#ffc239"
            />
            <path
                d="m57.482 3.019-4.269 5.749a.721.721 0 0 0 .51 1.232h2.258a7.212 7.212 0 0 1-3.357 7.625L52 18l2.497 1.873A13.08 13.08 0 0 0 59 10h2.281a.704.704 0 0 0 .498-1.202z"
                fill="#ffd55d"
            />
        </svg>
    );
}

export default SpendSvg;
