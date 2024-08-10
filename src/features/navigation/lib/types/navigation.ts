import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

export interface INavigation extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    label: string;
    path: string;
    icon: string;
}
