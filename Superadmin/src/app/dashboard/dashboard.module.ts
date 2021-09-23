import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DistrictComponent } from './district/district.component';
import { FormsModule } from '@angular/forms';
import { SchoolComponent } from './school/school.component';
import { AdminComponent } from './admin/admin.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { DistrictCalendarComponent } from './district-calendar/district-calendar.component';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';


@NgModule({
  declarations: [DashboardComponent, DistrictComponent, SchoolComponent, AdminComponent, TeacherComponent, StudentComponent, DistrictCalendarComponent, SchoolCalendarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
