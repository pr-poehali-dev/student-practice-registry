import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Practice } from './types';

type AddDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  newPractice: Partial<Practice>;
  setNewPractice: (practice: Partial<Practice>) => void;
  onAdd: () => void;
};

export function AddPracticeDialog({ isOpen, onClose, newPractice, setNewPractice, onAdd }: AddDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onAdd}>Добавить практику</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type EditDialogProps = {
  practice: Practice | null;
  onClose: () => void;
  setPractice: (practice: Practice) => void;
  onSave: () => void;
};

export function EditPracticeDialog({ practice, onClose, setPractice, onSave }: EditDialogProps) {
  if (!practice) return null;

  return (
    <Dialog open={practice !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать практику</DialogTitle>
          <DialogDescription>Обновите информацию о практике студента</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-student">ФИО студента</Label>
            <Input
              id="edit-student"
              value={practice.student}
              onChange={(e) => setPractice({...practice, student: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-organization">Организация</Label>
            <Input
              id="edit-organization"
              value={practice.organization}
              onChange={(e) => setPractice({...practice, organization: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-university">Учебное заведение</Label>
            <Input
              id="edit-university"
              value={practice.university}
              onChange={(e) => setPractice({...practice, university: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-faculty">Факультет</Label>
            <Input
              id="edit-faculty"
              value={practice.faculty}
              onChange={(e) => setPractice({...practice, faculty: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-type">Вид практики</Label>
            <Select value={practice.type} onValueChange={(value) => setPractice({...practice, type: value})}>
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
            <Select value={practice.year.toString()} onValueChange={(value) => setPractice({...practice, year: parseInt(value)})}>
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
            <Select value={practice.status} onValueChange={(value) => setPractice({...practice, status: value as Practice['status']})}>
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
              value={practice.startDate}
              onChange={(e) => setPractice({...practice, startDate: e.target.value})}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="edit-endDate">Дата окончания</Label>
            <Input
              id="edit-endDate"
              type="date"
              value={practice.endDate}
              onChange={(e) => setPractice({...practice, endDate: e.target.value})}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSave}>Сохранить изменения</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
