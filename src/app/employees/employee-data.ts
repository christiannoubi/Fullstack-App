import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Employee} from './employee';

export class EmployeeData implements InMemoryDbService {

  createDb() {
    const employees: Employee[] = [
     ];
    return { employees };
  }
}
