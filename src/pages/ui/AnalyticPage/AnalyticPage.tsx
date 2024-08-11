import cls from './AnalyticPage.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { AnalyticsBar, AnalyticsColumn, AnalyticsLine } from '@entities/analytics';

export const AnalyticPage = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.project}>
                <Text.Heading
                    size={SizeEnum.H5}
                    color={ColorEnum.TEXT}
                >
                    Аналитика проекта
                </Text.Heading>
                <AnalyticsLine />
                <AnalyticsBar />
            </div>
            <div className={cls.risk}>
                <Text.Heading
                    size={SizeEnum.H5}
                    color={ColorEnum.TEXT}
                >
                    Анализ рисков
                </Text.Heading>
                <AnalyticsColumn />
                <div className={cls.text}>
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.TEXT}
                    >
                        Несовместимость новой системы с существующими ИТ-инфраструктурами:
                    </Text.Paragraph>
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.TEXT}
                    >

                        - <span>Прогноз:</span>, новая система управления документацией не будет полностью интегрирована с
                        уже
                        существующими ИТ-системами, что может вызвать сбои в работе и потерю данных.
                    </Text.Paragraph>
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.TEXT}
                    >
                        - Прогноз: В случае выявления несовместимости возможны задержки в проекте
                        на <span>1 - 2</span> месяца для решения
                        технических проблем.
                    </Text.Paragraph>
                </div>
            </div>
        </div>
    );
};

