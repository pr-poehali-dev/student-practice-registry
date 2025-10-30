import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Practice, Organization, getStatusColor } from './types';

type DashboardTabProps = {
  practices: Practice[];
  organizations: Organization[];
};

export default function DashboardTab({ practices, organizations }: DashboardTabProps) {
  const stats = {
    total: practices.length,
    active: practices.filter(p => p.status === 'В процессе').length,
    completed: practices.filter(p => p.status === 'Завершена').length,
    planned: practices.filter(p => p.status === 'Планируется').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Всего практик</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">В процессе</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-yellow-600">{stats.active}</div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Icon name="Clock" className="text-yellow-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Завершено</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Планируется</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-600">{stats.planned}</div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Последние добавленные практики</CardTitle>
            <CardDescription>Недавно внесённые записи в систему</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {practices.slice(-3).reverse().map(practice => (
                <div key={practice.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{practice.student}</p>
                    <p className="text-sm text-slate-500">{practice.organization}</p>
                  </div>
                  <Badge className={getStatusColor(practice.status)}>{practice.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Топ организаций-партнёров</CardTitle>
            <CardDescription>По количеству принятых студентов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {organizations.slice(0, 3).map((org, index) => (
                <div key={org.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{org.name}</p>
                    <p className="text-sm text-slate-500">{org.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{org.practicesCount}</p>
                    <p className="text-xs text-slate-500">практик</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
