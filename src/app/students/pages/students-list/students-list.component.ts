import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { deleteStudent, loadStudents, studentToEdit } from 'src/app/store/features/students/students.actions';
import { selectStudentsSuccess } from 'src/app/store/features/students/students.selectors';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, AfterViewInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  loading:boolean = true;

  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  user!:User | null;

  studentsData!:Student[];
  studentsData$: Observable<Student[]> = new Observable()


  displayedColumns = ['id', 'name', 'email', 'profile', 'actions'];
  dataSource = new MatTableDataSource<Student>();

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 
    // store.dispatch(setTitle({title: 'Alumnos'}))
    this.store.select(selectStudentsSuccess).subscribe((data) => {    
      this.dataSource.data = [...data.students]; // data es 'readonly' hago una copia de su contenido
      this.loading = data.loading;
    }); //recupero los estudiantes desde el store
  }

  ngOnInit(): void {
    this.getUserData();
    this.getStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getUserData() {
    this.subscriptions.add(
      this.store.select(selectUserData).subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getStudents() {
    this.store.dispatch(loadStudents());
  }

  onClickDetails(student:Student) {
    this.router.navigate([`dashboard/students/${student.id}`]);
  }

  onDeleteStudent(id:number) {
    this.store.dispatch(deleteStudent({ id }));
    this._snackBar.open('Se eliminó el alumno', 'Cerrar');
  }

  onClickAdd() {
    this.store.dispatch(studentToEdit({ studentToEdit: null }))
    this.router.navigate(['dashboard/students/form'])
  }

  onClickEdit(student:Student) { //Actualiza el estudiante a editar en el servicio
    this.store.dispatch(studentToEdit({ studentToEdit: student }));
    this.router.navigate(['dashboard/students/form']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
