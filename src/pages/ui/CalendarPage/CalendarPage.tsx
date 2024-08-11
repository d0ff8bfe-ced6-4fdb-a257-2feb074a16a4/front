import cls from './CalendarPage.module.scss';
import { Calendar, ProjectTasks } from '@entities/project';
import ScrollableFeed from 'react-scrollable-feed';

export const CalendarPage = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.tasks}>
                <ProjectTasks />
            </div>
            <div className={cls.calendar}>
                <ScrollableFeed>
                    <Calendar />
                </ScrollableFeed>
            </div>
        </div>
    );
};

