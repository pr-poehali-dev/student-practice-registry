import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Practice, getStatusColor } from './types';

type RegistryTabProps = {
  practices: Practice[];
  onEdit: (practice: Practice) => void;
};

export default function RegistryTab({ practices, onEdit }: RegistryTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Список практик</CardTitle>
              <CardDescription>Найдено записей: {practices.length}</CardDescription>
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
                {practices.map((practice) => (
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
                        onClick={() => onEdit(practice)}
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
    </div>
  );
}
