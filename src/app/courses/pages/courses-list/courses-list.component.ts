import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { courseToEdit, deleteCourse, loadCourses } from 'src/app/store/features/courses/courses.actions';
import { selectCoursesSuccess } from 'src/app/store/features/courses/courses.selectors';
import { Course } from '../../interfaces/course.interface';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, AfterViewInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!: User | null;
  loading: boolean = false;

  courses!: Course[];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['id', 'name', 'professor', 'email', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private titleService: Title,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 
    store.select(selectCoursesSuccess).subscribe((res) => {
      this.dataSource.data = res.courses;
      this.loading = res.loading;
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Cursos');
    this.loading = true;
    this.getUserData();
    this.getCourses();
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

  getCourses() {
    this.store.dispatch(loadCourses());
  }

  onClickAdd() {
    this.store.dispatch(courseToEdit({ courseToEdit: null }));
    this.router.navigate(['dashboard/courses/form']);
  }

  onClickDetails(course:Course) {
    this.router.navigate([`dashboard/courses/${course.id}`]);
  }

  onClickEdit(course: Course) { //actualiza el curso a editar en el servicio
    this.store.dispatch(courseToEdit({ courseToEdit: course }));
    this.router.navigate(['dashboard/courses/form']);
  }

  onClickDelete(course: Course) {
    this.store.dispatch(deleteCourse({ id: course.id }))
    this._snackBar.open(`El curso de ${course.course} ha sido eliminado`, 'Cerrar');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
