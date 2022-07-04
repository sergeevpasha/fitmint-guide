import * as React from 'react';
import { SVGProps } from 'react';

function SwapSvg(props: SVGProps<SVGSVGElement>): React.ReactElement {
    return (
        <svg height={512} viewBox="0 0 64 64" width={512} xmlns="http://www.w3.org/2000/svg" {...props}>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1={9.276} x2={53.276} y1={43.972} y2={43.972}>
                <stop offset={0} stopColor="#ffeb73" />
                <stop offset={1} stopColor="#fcf09c" />
            </linearGradient>
            <linearGradient id="b" gradientUnits="userSpaceOnUse" x1={10.725} x2={54.725} y1={20.028} y2={20.028}>
                <stop offset={0} stopColor="#6bc993" />
                <stop offset={1} stopColor="#8fe5b6" />
            </linearGradient>
            <path
                d="m52.748 43.737-6.057-6.057-3.137-3.146c-1.112-1.102-2.996-.311-2.996 1.253l.867 4.512H26.528a5.652 5.652 0 0 1-3.997-1.655l-5.278-5.278A4.66 4.66 0 0 0 13.937 32c-1.453 0-2.92.667-3.861 2.019-1.314 1.887-.956 4.478.67 6.104l1.411 1.411 5.38 5.38a9.42 9.42 0 0 0 6.661 2.759h17.227l-.867 4.512c0 1.564 1.884 2.346 2.996 1.243l3.137-3.137 6.057-6.067c.349-.349.528-.791.528-1.243 0-.443-.179-.895-.528-1.244z"
                fill="url(#a)"
            />
            <path
                d="m11.252 20.263 6.057 6.057 3.137 3.146c1.112 1.102 2.996.311 2.996-1.253l-.867-4.512h14.898c1.499 0 2.937.595 3.997 1.655l5.278 5.278A4.656 4.656 0 0 0 50.063 32c1.453 0 2.92-.667 3.861-2.019 1.314-1.887.956-4.478-.67-6.104l-1.411-1.411-5.38-5.38a9.42 9.42 0 0 0-6.661-2.759H22.575l.867-4.512c0-1.564-1.884-2.346-2.996-1.243l-3.137 3.137-6.057 6.067a1.749 1.749 0 0 0-.528 1.243c0 .443.179.895.528 1.244z"
                fill="url(#b)"
            />
        </svg>
    );
}

export default SwapSvg;
