import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { BorderEnum, ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';


export enum ButtonTypeEnum {
    FILLED = 'filled',
    DEFAULT = 'default',
    DASHED = 'dashed',
}


export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isLoading?: boolean;
    color?: ColorEnum;
    size?: SizeEnum;
    buttonType?: ButtonTypeEnum;
    border?: BorderEnum;
}