import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
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
  );
}
