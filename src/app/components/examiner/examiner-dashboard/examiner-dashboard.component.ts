// examiner-dashboard.component.ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-examiner-dashboard',
  templateUrl: './examiner-dashboard.component.html',
  styleUrls: ['./examiner-dashboard.component.css'],
})
export class ExaminerDashboardComponent implements AfterViewInit {
  displayedColumns: string[] = [
    // 'Action',
    // 'Publish',
    'Exam Name',
    'Class',
    'Division',
    'Subject',
    'Year',
    'Semester',
    'Exam Date',


  ];

  dataSource = new MatTableDataSource<any>([
    {
      'Exam Name': 'Final Exam',
      Class: 'B.F.A',
      Division: 'B',
      Subject: 'Painting',
      Year: '2022',
      Semester: '3rd Sem',
      'Exam Date': '25/08/2022',
    },
    {
      'Exam Name': 'Final Exam',
      Class: 'B.P.A',
      Division: 'C',
      Subject: 'Dance',
      Year: '2022',
      Semester: '3rd Sem',
      'Exam Date': '25/08/2022',
    },
    {
      'Exam Name': 'Final Exam',
      Class: 'B.P.A',
      Division: 'C',
      Subject: 'Dance',
      Year: '2022',
      Semester: '3rd Sem',
      'Exam Date': '25/08/2022',
    },
    {
      'Exam Name': 'Final Exam',
      Class: 'B.P.A',
      Division: 'C',
      Subject: 'Dance',
      Year: '2022',
      Semester: '3rd Sem',
      'Exam Date': '25/08/2022',
    },
    {
      'Exam Name': 'Final Exam',
      Class: 'B.P.A',
      Division: 'C',
      Subject: 'Dance',
      Year: '2022',
      Semester: '3rd Sem',
      'Exam Date': '25/08/2022',
    },
    {
      'Exam Name': 'Final Exam',
      Class: 'B.P.A',
      Division: 'C',
      Subject: 'Dance',
      Year: '2022',
      Semester: '3rd Sem',
      'Exam Date': '25/08/2022',
    },

    // Add more data objects here...
  ]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterName: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  publish() {
    // Implement your publish logic here
  }

  constructor() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterName = filterValue.trim().toLowerCase();
    // this.getProducts();
    // console.log(this.filterName);
    /*if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }*/
    this.dataSource.filter = this.filterName;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
