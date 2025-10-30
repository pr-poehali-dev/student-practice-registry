import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type HeaderProps = {
  onAddClick: () => void;
};

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="GraduationCap" className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Реестр учебных практик</h1>
              <p className="text-sm text-slate-600">Система управления практиками студентов</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-slate-600 hover:text-primary transition-colors font-medium">Главная</a>
            <a href="#" className="text-slate-600 hover:text-primary transition-colors font-medium">О системе</a>
            <a href="#" className="text-slate-600 hover:text-primary transition-colors font-medium">Помощь</a>
            <Button onClick={onAddClick} className="gap-2 shadow-md">
              <Icon name="Plus" size={18} />
              Добавить практику
            </Button>
          </nav>
          <Button onClick={onAddClick} className="md:hidden gap-2">
            <Icon name="Plus" size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
