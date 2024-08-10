import cls from './NavigationItem.module.scss';
import { INavigation } from '@features/navigation';
import { Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import { useLocation } from 'react-router-dom';

export const NavigationItem = (
    {
        path,
        icon: Icon,
        label,
        ...props
    }: INavigation) => {
    const { pathname } = useLocation();
    return (
        <li
            {...props}
            className={classNames(cls.link, {
                [cls.active]: pathname.includes(path),
            }, [])}>
            <Text.Link
                size={SizeEnum.H3}
                color={pathname.includes(path) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                to={path}
            >
                <Icon />
                {label}
            </Text.Link>
        </li>
    );
};

