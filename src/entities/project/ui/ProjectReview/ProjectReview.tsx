import cls from './ProjectReview.module.scss';
import { Tag } from '@shared/ui/Tag';
import { BorderEnum, ColorEnum, SizeEnum, useAppSelector, WeightEnum } from '@shared/lib';
import { Text } from '@shared/ui';
import { ProjectTypeEnum, selectedProject, useLazyFindOneProjectQuery } from '@entities/project';
import { useEffect } from 'react';

export const ProjectReview = () => {
    const project = useAppSelector(selectedProject);
    const [trigger, { data }] = useLazyFindOneProjectQuery();
    useEffect(() => {
        if (project) {
            trigger(project);
        }
    }, [project]);
    const projectTypeTranslations: Record<ProjectTypeEnum, string> = {
        [ProjectTypeEnum.INPROGRESS]: 'В процессе',
        [ProjectTypeEnum.ASSIGNED]: 'Назначен',
        [ProjectTypeEnum.PENDING]: 'Ожидание',
        [ProjectTypeEnum.INREVIEW]: 'На проверке',
        [ProjectTypeEnum.BLOCKED]: 'Заблокирован',
        [ProjectTypeEnum.COMPLETED]: 'Завершен',
        [ProjectTypeEnum.REJECTED]: 'Отклонен',
        [ProjectTypeEnum.CANCELLED]: 'Отменен',
        [ProjectTypeEnum.SCHEDULED]: 'Запланирован',
        [ProjectTypeEnum.DEFERRED]: 'Отложен',
    };

    /**
     * Преобразует строку в формат YYYY-MM-DD HH:mm:ss в объект Date.
     *
     * @param dateString - Строка даты
     * @returns Объект Date
     */
    function parseDateString(dateString: string): Date {
        // Преобразуем строку в объект Date, добавляя временную зону UTC
        return new Date(dateString + 'Z');
    }

    /**
     * Вычисляет разницу в днях между двумя датами.
     *
     * @param startDateStr - Начальная дата в формате YYYY-MM-DD HH:mm:ss
     * @param endDateStr - Конечная дата в формате YYYY-MM-DD HH:mm:ss
     * @returns Разница в днях между двумя датами
     */
    function calculateDateDifference(startDateStr: string, endDateStr: string): number {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        // Убедимся, что startDate не позднее endDate
        if (startDate > endDate) {
            throw new Error('Начальная дата не может быть позднее конечной даты');
        }

        // Получаем разницу в миллисекундах
        const timeDifference = endDate.getTime() - startDate.getTime();

        // Преобразуем миллисекунды в дни
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return dayDifference;
    }

    function formatDays(days: number): string {
        if (days === 1) {
            return `${days} день`;
        } else if (days > 1 && days < 5) {
            return `${days} дня`;
        } else {
            return `${days} дней`;
        }
    }

    if (data) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.heading}>
                    <Tag
                        size={SizeEnum.H3}
                        bgColor={ColorEnum.SECONDARY}
                        border={BorderEnum.H2}
                        color={ColorEnum.WHITE}

                    >
                        {projectTypeTranslations[data.type]}
                    </Tag>
                    <Tag
                        size={SizeEnum.H3}
                        bgColor={ColorEnum.PRIMARY}
                        border={BorderEnum.H2}
                        color={ColorEnum.WHITE}

                    >
                        {formatDays(calculateDateDifference(data.startDate.toString(), data.endDate.toString()))}
                    </Tag>
                </div>
                <div className={cls.body}>
                    <div className={cls.title}>
                        <Text.Heading
                            size={SizeEnum.H5}
                            weight={WeightEnum.MEDIUM}
                            color={ColorEnum.TEXT}
                        >
                            {data.title}
                        </Text.Heading>
                        <Text.Paragraph
                            size={SizeEnum.H3}
                            weight={WeightEnum.MEDIUM}
                            color={ColorEnum.TEXT}
                        >
                            Осталось {formatDays(calculateDateDifference(new Date().toString(), data.endDate.toString()))}
                        </Text.Paragraph>
                    </div>
                    <div className={cls.content}>
                        <div className={cls.description}>
                            <Text.Paragraph
                                size={SizeEnum.H1}
                                weight={WeightEnum.MEDIUM}
                                color={ColorEnum.TEXT}
                            >
                                Описание
                            </Text.Paragraph>
                            <Text.Paragraph
                                size={SizeEnum.H2}
                                color={ColorEnum.TEXT}
                            >
                                {data.description}
                            </Text.Paragraph>
                        </div>
                        <div className={cls.members}>
                            <Text.Paragraph
                                size={SizeEnum.H1}
                                weight={WeightEnum.MEDIUM}
                                color={ColorEnum.TEXT}
                            >
                                Участники
                            </Text.Paragraph>
                            <ul className={cls.list}>
                                {[3, 4, 2].map((item) => (
                                    <li key={item} className={cls.member}></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

