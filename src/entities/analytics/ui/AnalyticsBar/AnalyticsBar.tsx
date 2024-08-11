import cls from './AnalyticsBar.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { Column } from '@ant-design/plots';
import { forEach, groupBy } from 'lodash-es';

export const AnalyticsBar = () => {
    const data = [
        { year: '1991', value: 3, type: 'Lon' },
        { year: '1992', value: 4, type: 'Lon' },
        { year: '1993', value: 3.5, type: 'Lon' },
        { year: '1994', value: 5, type: 'Lon' },
        { year: '1995', value: 4.9, type: 'Lon' },
        { year: '1996', value: 6, type: 'Lon' },
        { year: '1997', value: 7, type: 'Lon' },
        { year: '1998', value: 9, type: 'Lon' },
        { year: '1999', value: 13, type: 'Lon' },
        { year: '1991', value: 3, type: 'Bor' },
        { year: '1992', value: 4, type: 'Bor' },
        { year: '1993', value: 3.5, type: 'Bor' },
        { year: '1994', value: 5, type: 'Bor' },
        { year: '1995', value: 4.9, type: 'Bor' },
        { year: '1996', value: 6, type: 'Bor' },
        { year: '1997', value: 7, type: 'Bor' },
        { year: '1998', value: 9, type: 'Bor' },
        { year: '1999', value: 13, type: 'Bor' },
    ];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const annotations = [];
    forEach(groupBy(data, 'year'), (values, k) => {
        const value = values.reduce((a, b) => a + b.value, 0);
        annotations.push({
            type: 'text',
            data: [k, value],
            style: {
                textAlign: 'center',
                fontSize: 14,
                fill: 'rgba(0,0,0,0.85)',
            },
            xField: 'year',
            yField: 'value',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            style: {
                text: `${value}`,
                textBaseline: 'bottom',
                position: 'top',
                textAlign: 'center',
            },
            tooltip: false,
        });
    });

    const config = {
        data,
        xField: 'year',
        yField: 'value',
        stack: true,
        colorField: 'type',
        label: {
            text: 'value',
            textBaseline: 'bottom',
            position: 'inside',
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        annotations,
    };
    return (
        <div className={cls.wrapper}>
            <Text.Paragraph
                size={SizeEnum.H4}
                color={ColorEnum.TEXT}
            >
                Количества ошибок в документации
                до и после внедрения системы
            </Text.Paragraph>
            <div className={cls.chart}>
                <Column {...config} />
            </div>
        </div>
    );
};

