import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerService } from 'src/app/services/examiner.service';
import { InstituteService } from 'src/app/services/institute.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  editExaminerid: any;
  res: any;
  result: any;
  examinerres: any;
  institutelist: any;
  institutedata: any;
  editExaminer: any;
  hide = true;
  getImgExt: any;
  selectedFile: any;
  ImgUrl: any;
  imgName: any;
  date1: any;
  data: any;

  PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  NAME_REGEX = /^[a-zA-Z ]*$/;

  constructor(
    private router: Router,
    private _examinerService: ExaminerService,
    private _institute: InstituteService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editExaminerid = this.route.snapshot.params.id;
    this.getInstitutes();
    this.teacherDetails();
  }

  getInstitutes() {
    this._institute.getInstituteList().subscribe((res) => {
      this.institutedata = res;
      this.institutelist = this.institutedata.data;
      //console.log(this.institutelist);
    });
  }

  teacherDetails() {
    const formData = new FormData();
    formData.append('user_id', this.editExaminerid);
    this._examinerService.editExaminer(formData).subscribe((res) => {
      this.result = res;
      this.examinerres = this.result.data;
      console.log(this.examinerres);
      this.teacherEdit(this.examinerres);
    });
  }

  teacherEdit(data: any) {
    this.editExaminer = this.fb.group({
      institute: [data.institute_id, Validators.compose([Validators.required])],
      employee_id: [data.uid_number, Validators.compose([Validators.required])],
      firstname: [
        data.firstname,
        [Validators.required, Validators.pattern(this.NAME_REGEX)],
      ],
      lastname: [
        data.lastname,
        [Validators.required, Validators.pattern(this.NAME_REGEX)],
      ],
      user_mobile: [
        data.mobile,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      user_email: [
        data.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      user_password: [
        data.user_password,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.PASSWORD_REGEX),
        ]),
      ],
      user_dob: [data.date_of_birth, Validators.compose([Validators.required])],
      aadhar_number: [
        data.aadhar_number,
        Validators.compose([
          Validators.required,
          Validators.minLength(12),
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      address: [data.address, Validators.compose([Validators.required])],
    });
    this.ImgUrl = data.image_url;
  }
  // Custom method to check if password and confirm_password fields match
  isPasswordConfirmed(): boolean {
    const password = this.editExaminer.get('user_password')?.value;
    const confirmPassword = this.editExaminer.get('confirm_password')?.value;
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
    const formData = new FormData();

    let getDatePicker1 = this.editExaminer.value.user_dob;
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;

    formData.append('id', this.editExaminerid);
    formData.append('institute_id', this.editExaminer.value.institute);
    formData.append('uid_number', this.editExaminer.value.employee_id);
    formData.append('name', this.editExaminer.value.user_name);
    formData.append('email', this.editExaminer.value.user_email);
    formData.append('user_password', this.editExaminer.value.password);
    formData.append(
      'confirm_password',
      this.editExaminer.value.confirm_password
    );
    formData.append('mobile', this.editExaminer.value.user_mobile);
    formData.append('date_of_birth', this.date1);
    formData.append('aadhar_number', this.editExaminer.value.aadhar_number);
    formData.append('address', this.editExaminer.value.address);
    formData.append('image', this.selectedFile);
    formData.append('lastname', this.editExaminer.value.lastname);
    formData.append('firstname', this.editExaminer.value.firstname);
    this._examinerService.updateExaminer(formData).subscribe((res) => {
      this.data = res;
      if (this.data.success == true) {
        this.openSnackBar('Teacher Updated Successfully!', 'dismiss');
        this.router.navigate(['../../../admin/list-teacher'], {
          relativeTo: this.route,
        });
      } else {
        this.openSnackBar(this.data.message, 'dismiss');
      }
      //console.log('success');

      //console.log(this.data);
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
