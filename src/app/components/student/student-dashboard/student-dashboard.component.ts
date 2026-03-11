import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

export interface ExamData {
  examName: string;
  examDate: string;
  subject: string;
  totalMarks: number;
  marks: number;
  classDivision: string;
  dueDate: string;
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  examData: ExamData[] = [
    {
      examName: 'Final Exam',
      examDate: '25/08/2022',
      subject: 'Painting',
      totalMarks: 100,
      marks: 59,
      classDivision: 'Class XII - Div C',
      dueDate: '28/12/2022',
    },
    {
      examName: 'Mid Term Exam',
      examDate: '25/08/2022',
      subject: 'Mathematics',
      totalMarks: 100,
      marks: 75,
      classDivision: 'Class XI - Div A',
      dueDate: '20/12/2022',
    },
    {
      examName: 'Mid Term Exam',
      examDate: '25/08/2022',
      subject: 'Mathematics',
      totalMarks: 100,
      marks: 75,
      classDivision: 'Class XI - Div A',
      dueDate: '20/12/2022',
    },
    {
      examName: 'Mid Term Exam',
      examDate: '25/08/2022',
      subject: 'Mathematics',
      totalMarks: 100,
      marks: 75,
      classDivision: 'Class XI - Div A',
      dueDate: '20/12/2022',
    },
    // Add more objects as needed...
  ];
  selectbox: any;
  filterName: any;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.selectbox = this.fb.group({
      // exam_name: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      class: ['', Validators.compose([Validators.required])],
    });
  }

  navigateToEvalAns() {
    this.router.navigate(['./student/student/app-student-eval-paper']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterName = filterValue.trim().toLowerCase();
    // this.getProducts();
    // console.log(this.filterName);
    /*if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }*/
    // this.dataSource.filter = this.filterName;
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
