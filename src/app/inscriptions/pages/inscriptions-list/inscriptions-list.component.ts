import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { loadStudents } from 'src/app/store/features/students/students.actions';
import { selectStudentsSuccess } from 'src/app/store/features/students/students.selectors';
import { Student } from 'src/app/students/interfaces/student.interface';
import { StudentsService } from 'src/app/students/services/students.service';


@Component({
  selector: 'app-inscriptions-list',
  templateUrl: './inscriptions-list.component.html',
  styleUrls: ['./inscriptions-list.component.scss']
})
export class InscriptionsListComponent implements OnInit {

  subscriptions: Subscription = new Subscription();
  loading: boolean = false;

  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  user!: User | null;
  studentsData!: Student[];

  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Inscripciones');
    this.loading = true;
    this.getUserData();
    this.getStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getUserData() {
    this.subscriptions.add(
      this.authService.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getStudents() {
    this.store.select(selectStudentsSuccess).subscribe((studentsData) => {
      if(studentsData.students.length === 0) { //Si no estan cargados los alumnos en el store       
        this.store.dispatch(loadStudents());
      }
      this.dataSource.data = studentsData.students;
      this.loading = studentsData.loading;
    })
  }

  onClickDetails(student: Student) {
    this.router.navigate([`dashboard/inscriptions/${student.id}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
