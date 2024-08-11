import cls from './AnalyticsLine.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { Line } from '@ant-design/plots';

export const AnalyticsLine = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
    };
    return (
        <div className={cls.wrapper}>
            <Text.Paragraph
                size={SizeEnum.H4}
                color={ColorEnum.TEXT}
            >
                Сокращение времени обработки проектной документации
            </Text.Paragraph>
            <div className={cls.chart}>
                <Line {...config} />
            </div>
        </div>
    );
};

