export interface ScriptProps {
    src: HTMLScriptElement['src'] | null;
    checkForExisting?: boolean;
    [key: string]: any;
}
declare type ErrorState = ErrorEvent | null;
export default function useScript({ src, checkForExisting, ...attributes }: ScriptProps): [boolean, ErrorState];
export {};
