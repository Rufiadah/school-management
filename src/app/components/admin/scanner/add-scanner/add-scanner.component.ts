import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ExaminerService } from 'src/app/services/examiner.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InstituteService } from 'src/app/services/institute.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-add-scanner',
  templateUrl: './add-scanner.component.html',
  styleUrls: ['./add-scanner.component.css'],
})
export class AddScannerComponent implements OnInit {
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

  PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  NAME_REGEX = /^[a-zA-Z ]*$/;

  constructor(
    private fb: FormBuilder,
    private _examiner: ExaminerService,
    private _institute: InstituteService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

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
    this.addexaminer = this.fb.group({
      institute: ['', Validators.compose([Validators.required])],
      // employee_id: ['', Validators.compose([Validators.required])],
      user_name: ['', Validators.compose([Validators.required, this.noSpecialCharsOrNumbers()])],
      last_name: ['', Validators.compose([Validators.required, this.noSpecialCharsOrNumbers()])],

      user_email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      user_mobile: [
        '',
        Validators.compose([Validators.required,
        this.noSpecialCharsOrAlphabets(),
        Validators.minLength(8),
        Validators.maxLength(15),
          // Validators.maxLength(10),
          // Validators.minLength(10),
        ]),
      ],
      // user_password: [
      //   '',
      //   Validators.compose([Validators.required, Validators.minLength(6), this.passwordValidator()]),
      // ],
      user_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.PASSWORD_REGEX),
        ])],
      confirm_password: ['', Validators.compose([Validators.required])],
      user_dob: ['', Validators.compose([Validators.required])],
      aadhar_number: ['', Validators.compose([Validators.required, Validators.minLength(12),
      this.noSpecialCharactersOrAlphabets()])],
      address: ['', Validators.compose([Validators.required])],
      // profilePicture: [null, Validators.required],
      profilePicture: ['', Validators.compose([Validators.required])],
    }, {
      validator: ConfirmedValidator('user_password', 'confirm_password')
    });
  }


  // Custom Validator Function for no special characters or numbers in Last Name & first Name
  noSpecialCharsOrNumbers(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pattern = /^[A-Za-z]+$/; // Only allows letters (no special characters or numbers)
      if (control.value != "" && !pattern.test(control.value)) {
        return { noSpecialCharsOrNumbers: true };
      }
      return null;
    };
  }


  // Custom Validator Function for no special characters, alphabets, and length between 8 and 15
  noSpecialCharsOrAlphabets(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pattern = /^[0-9]+$/; // Only allows numbers (no special characters or alphabets)
      if (control.value != "" && !pattern.test(control.value)) {
        return { noSpecialCharsOrAlphabets: true };
      }
      return null;
    };
  }


  // Custom Validator Function for complex password validation
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const hasNumber = /\d/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(value);

      const valid = hasNumber && hasUpperCase && hasLowerCase && hasSpecialCharacter;

      if (control.value != "" && !valid) {
        return { passwordInvalid: true };
      }

      return null;
    };
  }


  // Custom Validator Function for no special characters or alphabets in Aadhar Number
  noSpecialCharactersOrAlphabets(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const hasSpecialCharactersOrAlphabets = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?a-zA-Z]/.test(value);

      if (hasSpecialCharactersOrAlphabets) {
        return { hasSpecialCharactersOrAlphabets: true };
      }

      return null;
    };
  }

  // Custom Validator Function for file type validation
  // fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     if ( control.value != "" &&  control.value) {
  //       const file = control.value;
  //       const fileExt = file.name.split('.').pop()?.toLowerCase();
  //       if (!allowedTypes.includes(fileExt)) {
  //         return { invalidFileType: true };
  //       }
  //     }
  //     return null;
  //   };
  // }


  //Getters for confirm password validation
  get f() {
    return this.addexaminer.controls;
  }

  // onSubmit() {
  //   console.log(this.addexaminer)
  //   const formData = new FormData();

  //   let getDatePicker1 = this.addexaminer.value.user_dob;
  //   //let dateFormat1 = this.datepipe.transform(getDatePicker1, 'dd-MM-yyyy');
  //   let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
  //   this.date1 = dateFormat1;
  //   this.role = 5;

  //   formData.append('institute_id', this.addexaminer.value.institute);
  //   formData.append('uid_number', this.addexaminer.value.employee_id);
  //   formData.append('firstname', this.addexaminer.value.user_name);
  //   formData.append('lastname', this.addexaminer.value.last_name);
  //   formData.append('email', this.addexaminer.value.user_email);
  //   formData.append('password', this.addexaminer.value.user_password);
  //   formData.append('mobile', this.addexaminer.value.user_mobile);
  //   formData.append('date_of_birth', this.date1);
  //   formData.append('aadhar_number', this.addexaminer.value.aadhar_number);
  //   formData.append('address', this.addexaminer.value.address);
  //   formData.append('image', this.selectedFile);
  //   formData.append('role', this.role);

  //   this._examiner.saveExaminer(formData).subscribe((res) => {
  //     this.data = res;
  //     if (this.data.success == true) {
  //       this.openSnackBar('Scanner Added Successfully!', 'dismiss');
  //       this.router.navigate(['../../admin/list-scanner'], {
  //         relativeTo: this.route,
  //       });
  //     } else {
  //       this.openSnackBar(this.data.message, 'dismiss');
  //     }

  //     console.log(this.data);
  //   });
  // }



  onSubmit(formdata: any) {

    // console.log("Form dt is:",formdata);
    const formData = new FormData();

    let getDatePicker1 = this.addexaminer.value.user_dob;
    //let dateFormat1 = this.datepipe.transform(getDatePicker1, 'dd-MM-yyyy');
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;
    this.role = 5;

    formData.append('institute_id', this.addexaminer.value.institute);
    // formData.append('uid_number', this.addexaminer.value.employee_id);
    formData.append('firstname', this.addexaminer.value.user_name);
    formData.append('lastname', this.addexaminer.value.last_name);
    formData.append('mobile', this.addexaminer.value.user_mobile);
    formData.append('email', this.addexaminer.value.user_email);
    formData.append('password', this.addexaminer.value.user_password);
    formData.append('confirm_password', this.addexaminer.value.confirm_password);
    formData.append('date_of_birth', this.date1);
    formData.append('aadhar_number', this.addexaminer.value.aadhar_number);
    formData.append('address', this.addexaminer.value.address);
    formData.append('image', this.selectedFile);
    formData.append('role', this.role);


    if (formdata.valid) {
      // alert("form filled");
      this._examiner.saveExaminer(formData).subscribe((res) => {
        this.data = res;
        if (this.data.success == true) {
          this.openSnackBar('Scanner Added Successfully!', 'dismiss');
          this.router.navigate(['../../admin/list-scanner'], {
            relativeTo: this.route,
          });
        } else {
          this.openSnackBar(this.data.message, 'dismiss');
        }

        console.log(this.data);
      });
    } else {
      this.openSnackBar("Please fill all the field", 'dismiss');
    }

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