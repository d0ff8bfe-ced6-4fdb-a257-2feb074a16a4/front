import cls from './ProjectBar.module.scss';
import { Button, Select, Text } from '@shared/ui';
import { BorderEnum, classNames, ColorEnum, SizeEnum, useAppDispatch, useAppSelector } from '@shared/lib';
import {
    changeCalendar,
    changeProject,
    ProjectCalendar,
    ProjectEnumValue, ProjectModal,
    selectCalendar,
    selectedProject, useGetAllProjectsQuery,
} from '@entities/project';
import Calendar from '@assets/icons/calendar.svg';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const ProjectBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const project = useAppSelector(selectedProject);
    const { pathname } = useLocation();
    const { data } = useGetAllProjectsQuery(null);
    const dispatch = useAppDispatch();
    const calendar = useAppSelector(selectCalendar);

    return (
        <div className={cls.wrapper}>
            <ProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <ProjectCalendar />
            {data &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                <Select options={data} placeholder={'Выберите проект'} onChange={(newValue) => {
                    dispatch(changeProject(newValue.value));
                }} />}
            {project
                &&
                <ul className={cls.list}>
                    <li className={cls.listItem}>
                        <Text.Link
                            to="/home/review"
                            color={pathname.includes(ProjectEnumValue.REVIEW) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                            size={SizeEnum.H2}
                        >
                            Обзор
                        </Text.Link>
                    </li>
                    <li className={cls.listItem}>
                        <Text.Link
                            to="/home/tasks"
                            color={pathname.includes(ProjectEnumValue.TASKS) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                            size={SizeEnum.H2}
                        >
                            Задачи
                        </Text.Link>
                    </li>
                    <li className={cls.listItem}>
                        <Text.Link
                            to="/home/gant"
                            color={pathname.includes(ProjectEnumValue.GANT) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                            size={SizeEnum.H2}
                        >
                            Гант
                        </Text.Link>
                    </li>
                    <li className={cls.listItem}>
                        <Text.Link
                            to="/home/docs"
                            color={pathname.includes(ProjectEnumValue.DOCUMENTS) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                            size={SizeEnum.H2}
                        >
                            Документы
                        </Text.Link>
                    </li>
                    <li
                        onClick={() => {
                            dispatch(changeCalendar(!calendar));
                        }}
                        className={cls.listItem}>
                        <div className={classNames(cls.icon, {
                            [cls.active]: calendar,
                        }, [])}>
                            <Calendar />
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            setIsOpen(true);
                        }}
                        className={cls.listItem}>
                        <Button
                            onClick={() => setIsOpen(true)}
                            size={SizeEnum.H4}
                            className={cls.add}
                            border={BorderEnum.H3}
                        >
                            <Text.Paragraph
                                size={SizeEnum.H4}
                                color={ColorEnum.WHITE}
                            >
                                Добавить проект
                            </Text.Paragraph>
                        </Button>
                    </li>
                </ul>
            }
        </div>
    )
        ;
};

