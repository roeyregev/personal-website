import { SVGProps } from 'react';

interface IconDownloadProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

const IconDownload = ({ className, ...props }: IconDownloadProps) => {

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M16 8L16 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M22 24L10 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M21.818 15.3639L17.4142 19.7677C16.6332 20.5487 15.3668 20.5487 14.5858 19.7677L10.182 15.3639"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round" />
        </svg>
    );
}

export default IconDownload;