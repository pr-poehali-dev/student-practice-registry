import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Organization } from './types';

type OrganizationsTabProps = {
  organizations: Organization[];
};

export default function OrganizationsTab({ organizations }: OrganizationsTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
}
