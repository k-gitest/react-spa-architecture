import { Moon, Sun, Laptop } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/hooks/use-theme-provider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('system');
        break;
      case 'system':
        setTheme('light');
        break;
      default:
        setTheme('light');
    }
  };

  return (
    <Toggle aria-label="Toggle theme mode" onClick={toggleTheme}>
      {theme === 'dark' && <Laptop className="h-4 w-4" />}
      {theme === 'system' && <Sun className="h-4 w-4" />}
      {theme === 'light' && <Moon className="h-4 w-4" />}
    </Toggle>
  );
}
