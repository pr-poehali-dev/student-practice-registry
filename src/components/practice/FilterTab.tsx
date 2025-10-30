import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Filters, Practice } from './types';

type FilterTabProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  practices: Practice[];
};

export default function FilterTab({ filters, setFilters, practices }: FilterTabProps) {
  const uniqueUniversities = Array.from(new Set(practices.map(p => p.university)));
  const uniqueFaculties = Array.from(new Set(practices.map(p => p.faculty)));
  const uniqueTypes = Array.from(new Set(practices.map(p => p.type)));
  const uniqueYears = Array.from(new Set(practices.map(p => p.year))).sort((a, b) => b - a);
  const uniqueOrganizations = Array.from(new Set(practices.map(p => p.organization)));
  
  const resetFilters = () => {
    setFilters({
      year: '',
      university: '',
      faculty: '',
      type: '',
      status: '',
      student: ''
    });
  };

  const filteredCount = practices.filter(practice => {
    if (filters.year && practice.year.toString() !== filters.year) return false;
    if (filters.university && practice.university !== filters.university) return false;
    if (filters.faculty && practice.faculty !== filters.faculty) return false;
    if (filters.type && practice.type !== filters.type) return false;
    if (filters.status && practice.status !== filters.status) return false;
    if (filters.student && !practice.student.toLowerCase().includes(filters.student.toLowerCase())) return false;
    return true;
  }).length;

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Расширенная фильтрация</CardTitle>
              <CardDescription>
                Настройте параметры для точного поиска практик
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-primary font-medium">
                    (активно фильтров: {activeFiltersCount})
                  </span>
                )}
              </CardDescription>
            </div>
            {activeFiltersCount > 0 && (
              <Button variant="outline" onClick={resetFilters} className="gap-2">
                <Icon name="X" size={16} />
                Сбросить все
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              Временные параметры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Год практики</Label>
                <Select value={filters.year || 'all'} onValueChange={(value) => setFilters({...filters, year: value === 'all' ? '' : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все годы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все годы</SelectItem>
                    {uniqueYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Статус практики</Label>
                <Select value={filters.status || 'all'} onValueChange={(value) => setFilters({...filters, status: value === 'all' ? '' : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все статусы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="Планируется">Планируется</SelectItem>
                    <SelectItem value="В процессе">В процессе</SelectItem>
                    <SelectItem value="Завершена">Завершена</SelectItem>
                    <SelectItem value="Отменена">Отменена</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Вид практики</Label>
                <Select value={filters.type || 'all'} onValueChange={(value) => setFilters({...filters, type: value === 'all' ? '' : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все виды" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все виды</SelectItem>
                    {uniqueTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Icon name="School" size={16} className="text-primary" />
              Образовательные параметры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Учебное заведение</Label>
                <Select value={filters.university || 'all'} onValueChange={(value) => setFilters({...filters, university: value === 'all' ? '' : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все ВУЗы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все ВУЗы</SelectItem>
                    {uniqueUniversities.map(uni => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Факультет</Label>
                <Select value={filters.faculty || 'all'} onValueChange={(value) => setFilters({...filters, faculty: value === 'all' ? '' : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все факультеты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все факультеты</SelectItem>
                    {uniqueFaculties.map(fac => (
                      <SelectItem key={fac} value={fac}>{fac}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Icon name="Search" size={16} className="text-primary" />
              Поиск по студенту
            </h3>
            <div className="space-y-2">
              <Label>ФИО студента</Label>
              <Input
                placeholder="Введите имя, фамилию или отчество..."
                value={filters.student}
                onChange={(e) => setFilters({...filters, student: e.target.value})}
                className="max-w-xl"
              />
              {filters.student && (
                <p className="text-sm text-slate-500">
                  Поиск по запросу: <span className="font-medium text-slate-700">"{filters.student}"</span>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            Результаты фильтрации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900">{filteredCount}</p>
              <p className="text-sm text-slate-600 mt-1">
                {filteredCount === practices.length 
                  ? 'Все практики' 
                  : `из ${practices.length} практик`}
              </p>
            </div>
            <div className="text-right space-y-1">
              {activeFiltersCount > 0 ? (
                <>
                  <p className="text-sm text-slate-600">Применено фильтров:</p>
                  <p className="text-2xl font-bold text-primary">{activeFiltersCount}</p>
                </>
              ) : (
                <p className="text-sm text-slate-500">Фильтры не применены</p>
              )}
            </div>
          </div>
          
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs font-medium text-slate-600 mb-2">Активные фильтры:</p>
              <div className="flex flex-wrap gap-2">
                {filters.year && (
                  <div className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                    <span className="text-slate-500">Год:</span>
                    <span className="font-medium">{filters.year}</span>
                  </div>
                )}
                {filters.university && (
                  <div className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                    <span className="text-slate-500">ВУЗ:</span>
                    <span className="font-medium">{filters.university}</span>
                  </div>
                )}
                {filters.faculty && (
                  <div className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                    <span className="text-slate-500">Факультет:</span>
                    <span className="font-medium">{filters.faculty}</span>
                  </div>
                )}
                {filters.type && (
                  <div className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                    <span className="text-slate-500">Тип:</span>
                    <span className="font-medium">{filters.type}</span>
                  </div>
                )}
                {filters.status && (
                  <div className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                    <span className="text-slate-500">Статус:</span>
                    <span className="font-medium">{filters.status}</span>
                  </div>
                )}
                {filters.student && (
                  <div className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                    <span className="text-slate-500">Студент:</span>
                    <span className="font-medium">{filters.student}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}