import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Employee} from './employee';

export class EmployeeData implements InMemoryDbService {

  createDb() {
    const employees: Employee[] = [
      { id: 1, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
      { id: 2, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
      { id: 3, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
      { id: 4, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
      { id: 5, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
      { id: 6, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
      { id: 7, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
      { id: 8, firstName: 'Christian', lastName: 'Noubi Simeu', username: 'cno123', password: '12345678', email: 'noubichristian@cno.com' },
    ];
    return { employees };
  }
}
