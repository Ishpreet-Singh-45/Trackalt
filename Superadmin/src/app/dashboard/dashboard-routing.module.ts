import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DistrictComponent } from './district/district.component';
import { SchoolComponent } from './school/school.component';
import { AdminComponent } from './admin/admin.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { DistrictCalendarComponent } from './district-calendar/district-calendar.component';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '/dashboard', component: DashboardComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'student', component: StudentComponent },
  { path: 'district-calendar', component: DistrictCalendarComponent },
  { path: 'school-calendar', component: SchoolCalendarComponent },
  {path:'**',redirectTo: 'dashboard' ,pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
