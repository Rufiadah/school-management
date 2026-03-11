import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-result-management',
  templateUrl: './result-management.component.html',
  styleUrls: ['./result-management.component.css']
})
export class ResultManagementComponent implements OnInit {
  filterName: any;
  length: any;
  pageSize: any;
  pageIndex: any;
  
  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = [
    'Document Name',
    'Subject',
    'Class',
    'Division',
    'Date',
    'Total Students',
    'Upload By',
    // 'Action'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  dataSource: any[] = [
    {
      'Document Name': 'Sample Folder 1',
      'Subject': 'Math',
      'Class': 'Class A',
      'Division': 'Division 1',
      'Date': '2023-09-15', // Use a valid date format
      'Total Students': 53,
      'Upload By': 'John Doe',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },
    {
      'Document Name': 'Sample Folder 2',
      'Subject': 'Science',
      'Class': 'Class B',
      'Division': 'Division 2',
      'Date': '2022-09-14', // Use a valid date format
      'Total Students': 45,
      'Upload By': 'Alice Smith',
      'Action': 'Publish'
    },

  ];

  publish(){
    console.log("clicked!");
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.filterName = filterValue.trim().toLowerCase();
  //   // this.getProducts();
  //   // console.log(this.filterName);
  //   /*if (this.dataSource.paginator) {
  //       this.dataSource.paginator.firstPage();
  //     }*/
  //   this.dataSource.filter = this.filterName;
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
