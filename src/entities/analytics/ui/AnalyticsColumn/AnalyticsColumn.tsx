import cls from './AnalyticsColumn.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { Column } from '@ant-design/plots';

export const AnalyticsColumn = () => {
    const data = [
        { date: '2024-08-1', frequency: 0.08167 },
        { date: '2024-08-2', frequency: 0.01492 },
        { date: '2024-08-3', frequency: 0.02782 },
        { date: '2024-08-4', frequency: 0.04253 },
        { date: '2024-08-5', frequency: 0.12702 },
        { date: '2024-08-6', frequency: 0.01702 },
        { date: '2024-08-7', frequency: 0.02702 },
    ];


    const config = {
        data,
        xField: 'date',
        yField: 'frequency',
        label: {
            text: (d: { frequency: number }) => `${(d.frequency * 100).toFixed(1)}%`,
            textBaseline: 'bottom',
        },
        axis: {
            y: {
                labelFormatter: '.0%',
            },
        },
        style: {
            // 圆角样式
            radiusTopLeft: 10,
            radiusTopRight: 10,
        },
    };
    return (
        <div className={cls.wrapper}>
            <Text.Paragraph
                size={SizeEnum.H4}
                color={ColorEnum.TEXT}
            >
                График рисков
            </Text.Paragraph>
            <div className={cls.chart}>
                <Column {...config} />
            </div>
        </div>
    );
};

