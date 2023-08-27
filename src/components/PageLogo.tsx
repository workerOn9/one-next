import React, { SVGProps } from "react";


export const PageLogo = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
            viewBox="0 0 500 500"
            {...props}
        >
            <path d="M279.3 59.1c-.7.7-1.3 2.7-1.3 4.5 0 2.4.8 3.8 3.5 5.8 2.3 1.8 3.5 3.5 3.5 5.1 0 2.1.3 2.3 2.3 1.6 3.7-1.4 3.2-4-1.6-9-2.5-2.5-4.7-5.6-4.9-6.9-.2-1.9-.5-2.1-1.5-1.1zM211 61.9c0 .7-2.1 3.2-4.6 5.6-3.7 3.4-4.5 4.6-3.9 6.4.6 2.1.9 1.9 4.8-2.5 5.5-6.2 6-7.1 4.8-9.2-.7-1.1-1-1.2-1.1-.3zM230 70.7c0 .4 1.4 2.1 3.1 3.9 3.6 3.7 4.8 8.4 3.7 13.9-1.8 9-10.4 15.1-31.3 22.6-17.8 6.4-28.7 12.1-35.6 18.9-9.8 9.6-14.5 22.8-10.3 28.8 2.7 3.9 4.1 2.7 4.1-3.6 0-7.2 1.9-10.9 9-17.5 4.5-4.3 17.6-13.7 18.9-13.7.2 0 2.8-1.1 5.8-2.5s5.8-2.5 6.1-2.5c1.7 0 19.4-7.6 24-10.3 6.5-3.8 9.3-6.4 11.6-10.9 4.2-8.2 3.4-15.9-2.3-22.4-3.1-3.5-6.8-6.1-6.8-4.7zM257 74.7c-2.9 3.7-6 11.5-6 15.6 0 4.3 2.5 10 6.3 14.3 4.4 5 9.7 8 20.2 11.4 18.1 5.8 29 12.4 39.7 23.8 5.5 5.9 7.3 11 6 16.8-1.4 6-.1 7.2 3.3 3.3 2.4-3 2.7-3.9 2.3-9.1-.4-4.9-1.1-6.8-5.2-12.8-2.7-3.9-6.8-8.7-9.1-10.8-7-6.1-19.2-12.4-32.8-16.9-15.3-5-19.9-7.5-23.1-12.2-4.7-7-4.3-13.4 1.4-22.4 3.7-5.8 1.6-6.5-3-1zM236.5 104c-1.5 2.5.6 5.9 4.9 8 4 1.9 4.7 2 7.8.7 4.2-1.8 6-4 5.6-6.9-.3-2.2-.8-2.3-9-2.6-5.5-.2-8.9.1-9.3.8zM48.8 215.6c-.4.3.5 2.2 1.8 4.1 2.8 4.2 3.1 9.1.9 15.3-2 5.7-1.9 9.6.6 19.3 3.4 13.2 1.5 21-7.7 32.2-6.1 7.5-8.4 12-8.4 16.3 0 5.7 2.6 9.2 6.8 9.2 2.6 0 2.8-.7.5-3.2-2.7-3-1.8-7.3 3.1-14.1 2.4-3.4 5.7-7.6 7.2-9.2 7.3-8.1 9-18.4 5.8-34.1-1.2-5.9-1.5-10-.9-15.9 1.3-14 .6-16.7-5-19.1-3.9-1.6-4-1.6-4.7-.8zM206.3 215.7c-6.1 1.2-7.7 9-4.8 23 1.4 6.6 1.4 8-.1 14.5-4 17.3-2.9 23.9 5.2 32.5 2.9 3 7 8.9 9.1 12.9 3 5.9 4.3 7.4 6.1 7.4 1.7 0 2.2-.6 2.2-2.4 0-3-4.9-12.5-9.9-19.1-6.5-8.6-7.4-11-6.7-18.4 1.8-19.9 1.8-24.7.2-31.4-2.4-10.1-2.1-12.6 1.6-16.4 3.4-3.5 3-3.7-2.9-2.6zM99.1 231.4c-3.5 1.9-5 5.4-5.1 11.3 0 4.4.5 5.8 3.1 8.8 8.2 9.3 20.4-.4 16.9-13.5-1.8-6.6-9.1-9.8-14.9-6.6zM148.7 232.1c-3.1 2.3-5.1 8.8-4.2 13 1 4.6 5.2 8.9 8.5 8.9 6.9 0 11-4.7 11-12.5 0-5.1-2-9.9-4.5-10.9-3.3-1.2-8.3-.6-10.8 1.5zM355.1 231.4c-3.5 1.9-5 5.4-5.1 11.3 0 4.4.5 5.8 3.1 8.8 8.2 9.3 20.4-.4 16.9-13.5-1.8-6.6-9.1-9.8-14.9-6.6zM404.7 232.1c-3.1 2.3-5.1 8.8-4.2 13 1 4.6 5.2 8.9 8.5 8.9 6.9 0 11-4.7 11-12.5 0-5.1-2-9.9-4.5-10.9-3.3-1.2-8.3-.6-10.8 1.5zM123.3 253.8c-2.3.3-3.1 3.5-1.5 5.8s5.8 4.4 8.8 4.4c5.7 0 12.4-7.9 8.2-9.5-1.7-.6-12.7-1.1-15.5-.7zM379.3 253.8c-2.3.3-3.1 3.5-1.5 5.8s5.8 4.4 8.8 4.4c5.7 0 12.4-7.9 8.2-9.5-1.7-.6-12.7-1.1-15.5-.7zM375.3 267.9c.9 2.5.7 3.5-2.3 8-2 3.2-2.9 5.6-2.4 6.1.6.6 3.7-.5 7.9-2.7 7.9-4.1 13.9-4.7 19.3-1.9 9 4.7 9.5 22.1.9 30.8-4.3 4.2-9.1 6.2-22.6 9.2-13.6 3-16.7 4.6-27.4 13.3-9 7.3-17.1 12.7-22.3 14.9-3.9 1.6-3.8 1.4-2.2 4.9 2.1 4.7 6.2 2.4 27.1-14.7 11.3-9.3 12.4-9.9 15.7-9.4 9.4 1.4 24.3 1.7 32.9.7l9.4-1.2 5.1 3.5c2.8 2 8.7 6.5 13.1 10.2 13.9 11.4 25.1 15.7 35.8 13.4 2.9-.6 6.6-2.2 8.2-3.6l3-2.5-3 .8c-1.6.4-7 .8-12 .8-11.9 0-16.5-2.2-31.4-14.8-12.6-10.6-18.9-14.3-26.2-15.3l-4.8-.6 5.4-5c7.2-6.5 9.5-11.5 9.5-20.4 0-9-3.3-16.3-9.2-20.2-4.6-3-13.7-4.1-19-2.3-2.5.9-3.4.9-3.7 0-.5-1.6-3.9-4.9-5-4.9-.5 0-.4 1.3.2 2.9zM212.4 373c-4.2 1.7-6.4 5.8-6.4 11.9 0 6.8 2.6 11.6 7.3 13.6 4.3 1.8 7.9.9 11.3-2.6 3.5-3.7 4.6-12.8 2-17.7-2.7-5.1-8.8-7.4-14.2-5.2zM266.2 373.6c-6.8 4.7-7 19.8-.3 23.4 3.8 2 8.9 1.2 12.3-1.9 2.9-2.6 3.3-3.5 3.6-9.8.4-6.3.2-7.2-2.3-10.1-2.2-2.7-3.4-3.2-6.9-3.2-2.3 0-5.2.7-6.4 1.6zM235.5 399.1c-2.3 3.6 4 9.9 9.8 9.9 6 0 12.4-6.2 9.7-9.5-.9-1.1-3.4-1.5-10.1-1.5-5.1 0-9.1.4-9.4 1.1z" />
        </svg>
    )
}