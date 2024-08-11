import cls from './Navbar.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import Logo from '@assets/icons/logo.svg';

export const Navbar = () => {
    return (
        <nav className={cls.wrapper}>
            <Logo />
            <Text.Heading
                size={SizeEnum.H5}
                color={ColorEnum.PRIMARY}
                weight={WeightEnum.BOLD}
            >
                Техград
            </Text.Heading>
        </nav>
    );
};

