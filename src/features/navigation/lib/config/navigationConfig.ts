import { INavigation } from '@features/navigation';
import Home from '@assets/icons/home.svg';
import Docs from '@assets/icons/docs.svg';
import Calendar from '@assets/icons/calendar.svg';
import Anal from '@assets/icons/anal.svg';
import Bim from '@assets/icons/bim.svg';
import Access from '@assets/icons/access.svg';

export const NavigationConfig: INavigation[] = [
    { path: '/home', label: 'Главная', icon: Home },
    { path: '/documents', label: 'Документы', icon: Docs },
    { path: '/calendar', label: 'Календарь', icon: Calendar },
    { path: '/bim', label: 'BIM-менеджмент', icon: Bim },
    { path: '/analytics', label: 'Аналитика', icon: Anal },
    { path: '/access', label: 'Доступы', icon: Access },
];
