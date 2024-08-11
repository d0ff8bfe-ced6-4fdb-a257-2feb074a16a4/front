import React, { useState } from 'react';
import cls from './ProjectGant.module.scss';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

export const ProjectGant = () => {
    const currentDate = new Date();
    const initialTasks: Task[] = [
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 29, 22),
            name: 'Command project - Project documentation',
            id: 'builder_1',
            progress: 45,
            type: 'task',
            project: 'builderProject',
            displayOrder: 2,
        },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleExpanderClick = (task: Task) => {
        setTasks(prevTasks => {
            const newTasks = prevTasks.map(t => {
                if (t.id === task.id) {
                    return { ...t, hideChildren: !t.hideChildren };
                }
                return t;
            });
            return newTasks;
        });
    };

    return (
        <div className={cls.wrapper}>
            <Gantt
                listCellWidth={''}
                viewMode={ViewMode.Day}
                locale="ru"
                tasks={tasks}
                onExpanderClick={handleExpanderClick}
            />
        </div>
    );
};
