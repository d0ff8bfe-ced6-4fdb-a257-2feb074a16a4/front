import cls from './ProjectModal.module.scss';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { Button, Input, Select, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import RangePicker from 'react-range-picker';
import { ProjectTypeEnum, useCreateProjectMutation } from '@entities/project';

export interface IProjectModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ProjectModal = ({ isOpen, setIsOpen }: IProjectModal) => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [type, setType] = useState<ProjectTypeEnum>(ProjectTypeEnum.INPROGRESS);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [showTime, setShowTime] = useState<boolean>(false);
    const [trigger, { data, isLoading }] = useCreateProjectMutation();
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
        }
    }, [setIsOpen]);

    const handleClickOverlay = useCallback((e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setIsOpen(false);
        }
    }, [setIsOpen]);

    const handleSave = () => {
        // Handle save logic here
        if (startDate && endDate) {
            trigger({
                startDate,
                endDate,
                type,
                title,
                description,
            });
        }
        // Close modal after saving
        setIsOpen(false);
    };

    const placeholder = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
        if (!startDate) {
            return <div className={cls.placeholder}>
                <Text.Paragraph
                    size={SizeEnum.H3}
                    color={ColorEnum.TEXT}
                >
                    Выберите промежуток
                </Text.Paragraph>
            </div>;
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyPress);
            return () => {
                document.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [isOpen, handleKeyPress]);

    if (!isOpen) return null;

    return (
        <div
            className={cls.overlay}
            onClick={handleClickOverlay}
        >
            <div className={cls.modal}>
                <button
                    className={cls.closeButton}
                    onClick={() => setIsOpen(false)}
                >
                    &times;
                </button>
                <Input
                    label="Название проекта"
                    value={title}
                    size={SizeEnum.H3}
                    border={BorderEnum.H6}
                    onChange={(e) => setTitle(e.target.value)}
                />


                <Input
                    label="Описание проекта"
                    value={description}
                    size={SizeEnum.H3}
                    border={BorderEnum.H6}
                    onChange={(e) => setDescription(e.target.value)}
                />


                <Button
                    border={BorderEnum.H6}
                    size={SizeEnum.H4}
                    onClick={() => setShowTime(!showTime)}
                >
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.WHITE}
                    >
                        Выберите сроки
                    </Text.Paragraph>
                </Button>
                {showTime && (
                    <RangePicker
                        placeholder={placeholder}
                        selectTime
                        onDateSelected={(f: Date, l: Date) => {
                            setStartDate(f);
                            setEndDate(l);
                        }}
                        onClose={() => {
                            setShowTime(false);
                        }}
                    />
                )}
                {startDate && endDate &&
                    <div className={cls.placeholderDate}>
                        <Text.Paragraph
                            size={SizeEnum.H2}
                            color={ColorEnum.TEXT}
                        >
                            {startDate.toLocaleString()}
                        </Text.Paragraph>
                        <Text.Paragraph
                            size={SizeEnum.H2}
                            color={ColorEnum.TEXT}
                        >
                            {endDate.toLocaleString()}
                        </Text.Paragraph>
                    </div>
                }

                <Select
                    placeholder="Статус проекта"
                    onChange={({ value, label }: { value: ProjectTypeEnum, label: ProjectTypeEnum, }) => setType(value)}
                    options={Object.values(ProjectTypeEnum).map(value => ({
                        value,
                        label: value,
                    }))}
                />
                <Button
                    border={BorderEnum.H6}
                    size={SizeEnum.H4}
                    onClick={handleSave}
                    isLoading={isLoading}
                >
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.WHITE}
                    >
                        Сохранить
                    </Text.Paragraph>
                </Button>
            </div>
        </div>
    );
};
