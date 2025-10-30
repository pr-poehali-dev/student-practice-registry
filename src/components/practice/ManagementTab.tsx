import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ManagementTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Управление системой</CardTitle>
          <CardDescription>Настройки и администрирование реестра практик</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start gap-3 h-auto p-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Users" className="text-blue-600" size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium">Управление пользователями</div>
                <div className="text-sm text-slate-500">Добавление и редактирование учётных записей</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start gap-3 h-auto p-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="Download" className="text-green-600" size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium">Экспорт данных</div>
                <div className="text-sm text-slate-500">Выгрузка в Excel, CSV, PDF</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start gap-3 h-auto p-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="FileText" className="text-purple-600" size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium">Шаблоны документов</div>
                <div className="text-sm text-slate-500">Настройка форм и договоров</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start gap-3 h-auto p-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" className="text-orange-600" size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium">Отчёты и аналитика</div>
                <div className="text-sm text-slate-500">Статистика и визуализация данных</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
