export type Practice = {
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

export type Organization = {
  id: number;
  name: string;
  industry: string;
  city: string;
  practicesCount: number;
};

export type Filters = {
  year: string;
  university: string;
  faculty: string;
  type: string;
  status: string;
  student: string;
};

export const mockPractices: Practice[] = [
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

export const mockOrganizations: Organization[] = [
  { id: 1, name: 'ООО "Технологии Будущего"', industry: 'IT и разработка ПО', city: 'Москва', practicesCount: 45 },
  { id: 2, name: 'АО "Инновационные решения"', industry: 'Консалтинг', city: 'Санкт-Петербург', practicesCount: 32 },
  { id: 3, name: 'НИИ "Прогресс"', industry: 'Научные исследования', city: 'Москва', practicesCount: 28 },
  { id: 4, name: 'ПАО "Энергия"', industry: 'Энергетика', city: 'Екатеринбург', practicesCount: 19 },
];

export const getStatusColor = (status: Practice['status']) => {
  switch (status) {
    case 'Планируется': return 'bg-blue-100 text-blue-800';
    case 'В процессе': return 'bg-yellow-100 text-yellow-800';
    case 'Завершена': return 'bg-green-100 text-green-800';
    case 'Отменена': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
