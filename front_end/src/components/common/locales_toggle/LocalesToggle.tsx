import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LocalesToggle = () => {
  const { i18n } = useTranslation();

  const setLocale = (locale: string) => {
    i18n.changeLanguage(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {i18n.language === 'en' && (
            <span className="text-xs font-semibold">EN</span>
          )}
          {i18n.language === 'vi' && (
            <span className="text-xs font-semibold">VI</span>
          )}
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale('en')}>EN</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('vi')}>VI</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocalesToggle;
