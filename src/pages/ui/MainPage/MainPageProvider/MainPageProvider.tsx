import cls from './MainPageProvider.module.scss';
import { Button, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { ProjectBar, ProjectCalendar, ProjectCanban, ProjectEnumValue, ProjectReview } from '@entities/project';
import { ReactNode } from 'react';

interface Provider {
    children: ReactNode;
}

export const MainPageProvider = ({ children }: Provider) => {
    return (
        <div className={cls.wrapper}>
            <ProjectBar />
            {children}
        </div>
    );
};

