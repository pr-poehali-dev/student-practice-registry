import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Practice, Filters, mockPractices, mockOrganizations } from '@/components/practice/types';
import Header from '@/components/practice/Header';
import Footer from '@/components/practice/Footer';
import DashboardTab from '@/components/practice/DashboardTab';
import FilterTab from '@/components/practice/FilterTab';
import RegistryTab from '@/components/practice/RegistryTab';
import OrganizationsTab from '@/components/practice/OrganizationsTab';
import ManagementTab from '@/components/practice/ManagementTab';
import { AddPracticeDialog, EditPracticeDialog } from '@/components/practice/PracticeDialogs';

export default function Index() {
  const [practices, setPractices] = useState<Practice[]>(mockPractices);
  const [organizations] = useState(mockOrganizations);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<Practice | null>(null);

  const [filters, setFilters] = useState<Filters>({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header onAddClick={() => setIsAddDialogOpen(true)} />

      <main className="flex-1 container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-5 bg-white border border-slate-200">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="filter" className="gap-2">
              <Icon name="Filter" size={16} />
              Фильтрация
            </TabsTrigger>
            <TabsTrigger value="registry" className="gap-2">
              <Icon name="FileText" size={16} />
              Реестр
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

          <TabsContent value="dashboard">
            <DashboardTab practices={practices} organizations={organizations} />
          </TabsContent>

          <TabsContent value="filter">
            <FilterTab filters={filters} setFilters={setFilters} practices={practices} />
          </TabsContent>

          <TabsContent value="registry">
            <RegistryTab practices={filteredPractices} onEdit={setEditingPractice} />
          </TabsContent>

          <TabsContent value="organizations">
            <OrganizationsTab organizations={organizations} />
          </TabsContent>

          <TabsContent value="management">
            <ManagementTab />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      <AddPracticeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        newPractice={newPractice}
        setNewPractice={setNewPractice}
        onAdd={handleAddPractice}
      />

      <EditPracticeDialog
        practice={editingPractice}
        onClose={() => setEditingPractice(null)}
        setPractice={setEditingPractice}
        onSave={handleEditPractice}
      />
    </div>
  );
}
