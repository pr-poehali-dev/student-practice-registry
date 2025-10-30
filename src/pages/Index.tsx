import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type Practice = {
  id: number;
  student: string;
  organization: string;
  university: string;
  faculty: string;
  type: string;
  year: number;
  status: 'Планируется' | 'В процессе' | 'Завершена' | 'Отменена';
  startDate: string;
  endDate: string;
};

type Organization = {
  id: number;
  name: string;
  industry: string;
  city: string;
  practicesCount: number;
};

const mockPractices: Practice[] = [
  {
    id: 1,
    student: 'Иванов Иван Иванович',
    organization: 'ООО "Технологии Будущего"',
    university: 'МГУ',
    faculty: 'Факультет информационных технологий',
    type: 'Производственная',
    year: 2024,
    status: 'В процессе',
    startDate: '2024-09-01',
    endDate: '2024-11-30'
  },
  {
    id: 2,
    student: 'Петрова Анна Сергеевна',
    organization: 'АО "Инновационные решения"',
    university: 'МГТУ',
    faculty: 'Факультет прикладной математики',
    type: 'Учебная',
    year: 2024,
    status: 'Завершена',
    startDate: '2024-06-01',
    endDate: '2024-08-31'
  },
  {
    id: 3,
    student: 'Сидоров Петр Александрович',
    organization: 'НИИ "Прогресс"',
    university: 'МГУ',
    faculty: 'Физический факультет',
    type: 'Научно-исследовательская',
    year: 2025,
    status: 'Планируется',
    startDate: '2025-02-01',
    endDate: '2025-05-31'
  },
  {
    id: 4,
    student: 'Кузнецова Мария Дмитриевна',
    organization: 'ООО "Технологии Будущего"',
    university: 'СПбГУ',
    faculty: 'Факультет экономики',
    type: 'Производственная',
    year: 2024,
    status: 'В процессе',
    startDate: '2024-10-01',
    endDate: '2024-12-31'
  },
];

const mockOrganizations: Organization[] = [
  { id: 1, name: 'ООО "Технологии Будущего"', industry: 'IT и разработка ПО', city: 'Москва', practicesCount: 45 },
  { id: 2, name: 'АО "Инновационные решения"', industry: 'Консалтинг', city: 'Санкт-Петербург', practicesCount: 32 },
  { id: 3, name: 'НИИ "Прогресс"', industry: 'Научные исследования', city: 'Москва', practicesCount: 28 },
  { id: 4, name: 'ПАО "Энергия"', industry: 'Энергетика', city: 'Екатеринбург', practicesCount: 19 },
];

export default function Index() {
  const [practices, setPractices] = useState<Practice[]>(mockPractices);
  const [organizations] = useState<Organization[]>(mockOrganizations);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<Practice | null>(null);

  const [filters, setFilters] = useState({
    year: '',
    university: '',
    faculty: '',
    type: '',
    status: '',
    student: ''
  });

  const filteredPractices = practices.filter(practice => {
    if (filters.year && practice.year.toString() !== filters.year) return false;
    if (filters.university && practice.university !== filters.university) return false;
    if (filters.faculty && practice.faculty !== filters.faculty) return false;
    if (filters.type && practice.type !== filters.type) return false;
    if (filters.status && practice.status !== filters.status) return false;
    if (filters.student && !practice.student.toLowerCase().includes(filters.student.toLowerCase())) return false;
    return true;
  });

  const [newPractice, setNewPractice] = useState<Partial<Practice>>({
    student: '',
    organization: '',
    university: '',
    faculty: '',
    type: '',
    year: 2024,
    status: 'Планируется',
    startDate: '',
    endDate: ''
  });

  const handleAddPractice = () => {
    if (!newPractice.student || !newPractice.organization) {
      toast.error('Заполните обязательные поля');
      return;
    }

    const practice: Practice = {
      id: practices.length + 1,
      student: newPractice.student!,
      organization: newPractice.organization!,
      university: newPractice.university!,
      faculty: newPractice.faculty!,
      type: newPractice.type!,
      year: newPractice.year!,
      status: newPractice.status as Practice['status'],
      startDate: newPractice.startDate!,
      endDate: newPractice.endDate!
    };

    setPractices([...practices, practice]);
    setIsAddDialogOpen(false);
    setNewPractice({
      student: '',
      organization: '',
      university: '',
      faculty: '',
      type: '',
      year: 2024,
      status: 'Планируется',
      startDate: '',
      endDate: ''
    });
    toast.success('Практика успешно добавлена');
  };

  const handleEditPractice = () => {
    if (!editingPractice) return;

    setPractices(practices.map(p => p.id === editingPractice.id ? editingPractice : p));
    setEditingPractice(null);
    toast.success('Практика успешно обновлена');
  };

  const getStatusColor = (status: Practice['status']) => {
    switch (status) {
      case 'Планируется': return 'bg-blue-100 text-blue-800';
      case 'В процессе': return 'bg-yellow-100 text-yellow-800';
      case 'Завершена': return 'bg-green-100 text-green-800';
      case 'Отменена': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: practices.length,
    active: practices.filter(p => p.status === 'В процессе').length,
    completed: practices.filter(p => p.status === 'Завершена').length,
    planned: practices.filter(p => p.status === 'Планируется').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
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
              <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 shadow-md">
                <Icon name="Plus" size={18} />
                Добавить практику
              </Button>
            </nav>
            <Button onClick={() => setIsAddDialogOpen(true)} className="md:hidden gap-2">
              <Icon name="Plus" size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-white border border-slate-200">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="registry" className="gap-2">
              <Icon name="FileText" size={16} />
              Реестр практик
            </TabsTrigger>
            <TabsTrigger value="organizations" className="gap-2">
              <Icon name="Building2" size={16} />
              Организации
            </TabsTrigger>
            <TabsTrigger value="management" className="gap-2">
              <Icon name="Settings" size={16} />
              Управление
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="registry" className="space-y-6 animate-fade-in">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
                <CardDescription>Настройте параметры для поиска практик</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <Label>Год</Label>
                    <Select value={filters.year} onValueChange={(value) => setFilters({...filters, year: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все годы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все годы</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>ВУЗ</Label>
                    <Select value={filters.university} onValueChange={(value) => setFilters({...filters, university: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все ВУЗы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все ВУЗы</SelectItem>
                        <SelectItem value="МГУ">МГУ</SelectItem>
                        <SelectItem value="МГТУ">МГТУ</SelectItem>
                        <SelectItem value="СПбГУ">СПбГУ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Вид практики</Label>
                    <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все виды" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все виды</SelectItem>
                        <SelectItem value="Учебная">Учебная</SelectItem>
                        <SelectItem value="Производственная">Производственная</SelectItem>
                        <SelectItem value="Научно-исследовательская">Научно-исследовательская</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Статус</Label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все статусы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все статусы</SelectItem>
                        <SelectItem value="Планируется">Планируется</SelectItem>
                        <SelectItem value="В процессе">В процессе</SelectItem>
                        <SelectItem value="Завершена">Завершена</SelectItem>
                        <SelectItem value="Отменена">Отменена</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Студент</Label>
                    <Input
                      placeholder="Поиск по ФИО студента..."
                      value={filters.student}
                      onChange={(e) => setFilters({...filters, student: e.target.value})}
                    />
                  </div>
                </div>

                {Object.values(filters).some(v => v) && (
                  <Button 
                    variant="outline" 
                    className="mt-4 gap-2" 
                    onClick={() => setFilters({year: '', university: '', faculty: '', type: '', status: '', student: ''})}
                  >
                    <Icon name="X" size={16} />
                    Сбросить фильтры
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Список практик</CardTitle>
                    <CardDescription>Найдено записей: {filteredPractices.length}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Студент</TableHead>
                        <TableHead>Организация</TableHead>
                        <TableHead>ВУЗ</TableHead>
                        <TableHead>Факультет</TableHead>
                        <TableHead>Вид практики</TableHead>
                        <TableHead>Год</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Даты</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPractices.map((practice) => (
                        <TableRow key={practice.id}>
                          <TableCell className="font-medium">{practice.student}</TableCell>
                          <TableCell>{practice.organization}</TableCell>
                          <TableCell>{practice.university}</TableCell>
                          <TableCell>{practice.faculty}</TableCell>
                          <TableCell>{practice.type}</TableCell>
                          <TableCell>{practice.year}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(practice.status)}>{practice.status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-slate-500">
                            {practice.startDate} — {practice.endDate}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingPractice(practice)}
                            >
                              <Icon name="Pencil" size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-6 animate-fade-in">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Организации-партнёры</CardTitle>
                <CardDescription>Список компаний и учреждений для прохождения практики</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {organizations.map((org) => (
                    <Card key={org.id} className="border-slate-200 hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="Building2" className="text-primary" size={24} />
                          </div>
                          <Badge variant="secondary">{org.practicesCount} практик</Badge>
                        </div>
                        <CardTitle className="text-lg mt-4">{org.name}</CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Icon name="Briefcase" size={14} />
                            <span>{org.industry}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="MapPin" size={14} />
                            <span>{org.city}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-6 animate-fade-in">
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
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" className="text-white" size={20} />
                </div>
                <span className="font-bold text-slate-900">Реестр практик</span>
              </div>
              <p className="text-sm text-slate-600">Единая информационная система управления учебными практиками студентов</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Разделы</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Главная</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Реестр практик</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Организации</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Управление</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Поддержка</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Документация</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Инструкции</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Техподдержка</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Контакты</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-slate-600">
                  <Icon name="Mail" size={16} className="text-primary" />
                  support@practices.edu
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <Icon name="Phone" size={16} className="text-primary" />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  Москва, ул. Примерная, 1
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2024 Реестр учебных практик. Все права защищены.</p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новую практику</DialogTitle>
            <DialogDescription>Заполните информацию о практике студента</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student">ФИО студента *</Label>
              <Input
                id="student"
                value={newPractice.student}
                onChange={(e) => setNewPractice({...newPractice, student: e.target.value})}
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Организация *</Label>
              <Input
                id="organization"
                value={newPractice.organization}
                onChange={(e) => setNewPractice({...newPractice, organization: e.target.value})}
                placeholder="ООО «Компания»"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">Учебное заведение</Label>
              <Input
                id="university"
                value={newPractice.university}
                onChange={(e) => setNewPractice({...newPractice, university: e.target.value})}
                placeholder="МГУ"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Факультет</Label>
              <Input
                id="faculty"
                value={newPractice.faculty}
                onChange={(e) => setNewPractice({...newPractice, faculty: e.target.value})}
                placeholder="Факультет информационных технологий"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Вид практики</Label>
              <Select value={newPractice.type} onValueChange={(value) => setNewPractice({...newPractice, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Учебная">Учебная</SelectItem>
                  <SelectItem value="Производственная">Производственная</SelectItem>
                  <SelectItem value="Научно-исследовательская">Научно-исследовательская</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Год</Label>
              <Select value={newPractice.year?.toString()} onValueChange={(value) => setNewPractice({...newPractice, year: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select value={newPractice.status} onValueChange={(value) => setNewPractice({...newPractice, status: value as Practice['status']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Планируется">Планируется</SelectItem>
                  <SelectItem value="В процессе">В процессе</SelectItem>
                  <SelectItem value="Завершена">Завершена</SelectItem>
                  <SelectItem value="Отменена">Отменена</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Дата начала</Label>
              <Input
                id="startDate"
                type="date"
                value={newPractice.startDate}
                onChange={(e) => setNewPractice({...newPractice, startDate: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="endDate">Дата окончания</Label>
              <Input
                id="endDate"
                type="date"
                value={newPractice.endDate}
                onChange={(e) => setNewPractice({...newPractice, endDate: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddPractice}>Добавить практику</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editingPractice !== null} onOpenChange={(open) => !open && setEditingPractice(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать практику</DialogTitle>
            <DialogDescription>Обновите информацию о практике студента</DialogDescription>
          </DialogHeader>

          {editingPractice && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-student">ФИО студента</Label>
                <Input
                  id="edit-student"
                  value={editingPractice.student}
                  onChange={(e) => setEditingPractice({...editingPractice, student: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-organization">Организация</Label>
                <Input
                  id="edit-organization"
                  value={editingPractice.organization}
                  onChange={(e) => setEditingPractice({...editingPractice, organization: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-university">Учебное заведение</Label>
                <Input
                  id="edit-university"
                  value={editingPractice.university}
                  onChange={(e) => setEditingPractice({...editingPractice, university: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-faculty">Факультет</Label>
                <Input
                  id="edit-faculty"
                  value={editingPractice.faculty}
                  onChange={(e) => setEditingPractice({...editingPractice, faculty: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-type">Вид практики</Label>
                <Select value={editingPractice.type} onValueChange={(value) => setEditingPractice({...editingPractice, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Учебная">Учебная</SelectItem>
                    <SelectItem value="Производственная">Производственная</SelectItem>
                    <SelectItem value="Научно-исследовательская">Научно-исследовательская</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-year">Год</Label>
                <Select value={editingPractice.year.toString()} onValueChange={(value) => setEditingPractice({...editingPractice, year: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Статус</Label>
                <Select value={editingPractice.status} onValueChange={(value) => setEditingPractice({...editingPractice, status: value as Practice['status']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Планируется">Планируется</SelectItem>
                    <SelectItem value="В процессе">В процессе</SelectItem>
                    <SelectItem value="Завершена">Завершена</SelectItem>
                    <SelectItem value="Отменена">Отменена</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Дата начала</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={editingPractice.startDate}
                  onChange={(e) => setEditingPractice({...editingPractice, startDate: e.target.value})}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-endDate">Дата окончания</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={editingPractice.endDate}
                  onChange={(e) => setEditingPractice({...editingPractice, endDate: e.target.value})}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPractice(null)}>
              Отмена
            </Button>
            <Button onClick={handleEditPractice}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}