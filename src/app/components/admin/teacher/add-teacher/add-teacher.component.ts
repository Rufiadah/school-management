import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ExaminerService } from 'src/app/services/examiner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InstituteService } from 'src/app/services/institute.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  hide = true;
  addexaminer: any;
  data: any;
  date1: any;
  res: any;
  institutelist: any;
  institutedata: any;
  getImgExt: any;
  selectedFile: any;
  ImgUrl: any;
  imgName: any;
  role: any;

  password: any = 123;

  PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  NAME_REGEX = /^[a-zA-Z ]*$/;

  constructor(
    private fb: FormBuilder,
    private _examiner: ExaminerService,
    private _institute: InstituteService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getInstitutes();
  }

  getInstitutes() {
    this._institute.getInstituteList().subscribe((res) => {
      this.institutedata = res;
      this.institutelist = this.institutedata.data;
      console.log(this.institutelist);
    });
  }
  loadForm() {
    this.addexaminer = this.fb.group(
      {
        institute: ['', Validators.compose([Validators.required])],
        lastname: [
          '',
          [Validators.required, Validators.pattern(this.NAME_REGEX)],
        ],
        firstname: [
          '',
          [Validators.required, Validators.pattern(this.NAME_REGEX)],
        ],
        user_email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        user_mobile: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern('^[0-9]+$'),
          ]),
        ],
        user_password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(this.PASSWORD_REGEX),
          ]),
        ],
        confirm_password: ['', Validators.compose([Validators.required])],
        user_dob: ['', Validators.compose([Validators.required])],
        aadhar_number: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(12),
            Validators.pattern('^[0-9]+$'),
          ]),
        ],
        address: ['', Validators.compose([Validators.required])],
      },
      {
        validator: this.ConfirmedValidator('user_password', 'confirm_password'),
      }
    );
  }

  // Getter for confirm password
  get f() {
    return this.addexaminer.controls;
  }

  // Custom method to check if password and confirm_password fields match
  isPasswordConfirmed(): boolean {
    const password = this.addexaminer.get('user_password')?.value;
    const confirmPassword = this.addexaminer.get('confirm_password')?.value;
    return password === confirmPassword;
  }

  // Custom validator function for confirming passwords
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (!this.isPasswordConfirmed()) {
      // If passwords don't match, show an error message or take appropriate action
      this.openSnackBar(
        'Password and Confirm Password do not match.',
        'dismiss'
      );
      return;
    }
    const formData = new FormData();

    let getDatePicker1 = this.addexaminer.value.user_dob;
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;
    this.role = 3;

    formData.append('institute_id', this.addexaminer.value.institute);
    formData.append('uid_number', this.addexaminer.value.employee_id);
    formData.append('firstname', this.addexaminer.value.firstname);
    formData.append('lastname', this.addexaminer.value.lastname);
    formData.append('email', this.addexaminer.value.user_email);
    formData.append('password', this.addexaminer.value.user_password);
    formData.append(
      'confirm_password',
      this.addexaminer.value.confirm_password
    );
    formData.append('mobile', this.addexaminer.value.user_mobile);
    formData.append('date_of_birth', this.date1);
    formData.append('aadhar_number', this.addexaminer.value.aadhar_number);
    formData.append('address', this.addexaminer.value.address);
    formData.append('image', this.selectedFile);
    formData.append('role', this.role);

    console.log(formData);
    this._examiner.saveExaminer(formData).subscribe((res) => {
      this.data = res;
      if (this.data.success == true) {
        this.openSnackBar('Teacher Added Successfully!', 'dismiss');
        this.router.navigate(['../../admin/list-teacher'], {
          relativeTo: this.route,
        });
      } else {
        this.openSnackBar(this.data.message, 'dismiss');
      }

      console.log(this.data);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  readUrl(event: any) {
    let selResult = event.target.value.split('.');
    this.getImgExt = selResult.pop();
    this.getImgExt.toLowerCase();
    if (
      this.getImgExt == 'png' ||
      this.getImgExt == 'jpg' ||
      this.getImgExt == 'jpeg'
    ) {
      this.selectedFile = <File>event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.ImgUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.imgName = event.target.files[0].name;
      }
    } else {
      /*this.matSnackBar.open("Profile image allowed only jpg or png format", 'Close', {
        duration: 5000,
      });*/
    }
  }
}
