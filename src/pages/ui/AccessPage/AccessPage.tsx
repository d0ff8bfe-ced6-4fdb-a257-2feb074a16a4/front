import cls from './AccessPage.module.scss';
import { useMemo, useState } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { Badge } from '@mantine/core';
import { ProjectTypeEnum } from '@entities/project';
import { Button, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';

// Переводы статусов
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

// Цвета для статусов
const statusColors: Record<ProjectTypeEnum, string> = {
    [ProjectTypeEnum.INPROGRESS]: 'blue',
    [ProjectTypeEnum.ASSIGNED]: 'cyan',
    [ProjectTypeEnum.PENDING]: 'yellow',
    [ProjectTypeEnum.INREVIEW]: 'orange',
    [ProjectTypeEnum.BLOCKED]: 'red',
    [ProjectTypeEnum.COMPLETED]: 'green',
    [ProjectTypeEnum.REJECTED]: 'red',
    [ProjectTypeEnum.CANCELLED]: 'gray',
    [ProjectTypeEnum.SCHEDULED]: 'purple',
    [ProjectTypeEnum.DEFERRED]: 'gray',
};

export const AccessPage = () => {
    // Примерные данные для таблицы
    const initialData = [
        {
            id: 1,
            status: ProjectTypeEnum.INPROGRESS,
            name: 'Документ 1',
            role: 'Админ',
            user: 'Иван Иванов',
            date: '2024-01-10',
            access: 'Полный',
        },
        {
            id: 2,
            status: ProjectTypeEnum.BLOCKED,
            name: 'Документ 2',
            role: 'Пользователь',
            user: 'Петр Петров',
            date: '2024-02-15',
            access: 'Ограниченный',
        },
        {
            id: 3,
            status: ProjectTypeEnum.COMPLETED,
            name: 'Документ 3',
            role: 'Модератор',
            user: 'Сергей Сергеев',
            date: '2024-03-20',
            access: 'Полный',
        },
        {
            id: 4,
            status: ProjectTypeEnum.CANCELLED,
            name: 'Документ 4',
            role: 'Админ',
            user: 'Алексей Алексеев',
            date: '2024-04-25',
            access: 'Полный',
        },
    ];

    const [data, setData] = useState(initialData);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'status',
                header: 'Статус',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                Cell: ({ cell }) => {
                    const status = cell.getValue() as ProjectTypeEnum;
                    const translatedStatus = projectTypeTranslations[status];
                    const color = statusColors[status];

                    return <Badge color={color}>{translatedStatus}</Badge>;
                },
            },
            {
                accessorKey: 'name',
                header: 'Название',
            },
            {
                accessorKey: 'role',
                header: 'Роль',
            },
            {
                accessorKey: 'user',
                header: 'Пользователь',
            },
            {
                accessorKey: 'date',
                header: 'Дата регистрации',
            },
            {
                accessorKey: 'access',
                header: 'Доступ',
            },
            {
                accessorKey: 'actions',
                header: 'Действия',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                Cell: ({ row }) => (
                    <Button
                        size={SizeEnum.H4}
                        border={BorderEnum.H6}
                        color={ColorEnum.DANGER}
                        onClick={() => setData(data.filter((item) => item.id !== row.original.id))}
                    >
                        <Text.Paragraph
                            size={SizeEnum.H4}
                            color={ColorEnum.WHITE}
                        >
                            Удалить
                        </Text.Paragraph>
                    </Button>
                ),
            },
        ],
        [data],
    );

    return (
        <div className={cls.wrapper}>
            <MantineReactTable columns={columns} data={data} />
        </div>
    );
};
