import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormControlName, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee: IEmployee;
  pageTitle: string;
  validationMessages = {
    fullName: {
      'required': 'Full name is required',
      'minlength': 'Full name must be greater than 2 characters',
      'maxlength': 'Full name must be less than 10 characters',
    },

    'email': {
      'required': 'Email is required',
      'emailDomain': 'Email domain should be yahoo.com'
    },
    'confirmEmail': {
      'required': 'Confirm email is required'
    },
    emailGroup: {
      'emailMismatch': 'Email and Confirm email do not match'
    },
    'phone': {
      'required': 'Phone is required'
    },
  };

  formErrors = {

  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {

  }
  ngOnInit() {
    this.employeeForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
        contactPreference: ['email'],
        emailGroup: this.fb.group({
          email: ['', [Validators.required, CustomValidators.emailDomain('yahoo.com')]],
          confirmEmail: ['', Validators.required],
        }, { validator: matchEmail }),

        phone: [''],

        skills: this.fb.array([
          this.addSkillFormGroup()
        ])
      }
    );

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.pageTitle = 'Edit Employee';
        this.getEmployee(empId);
      } else {
        this.pageTitle = 'Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []

        };
      }
    });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployee) => {
        this.editEmployee(employee);
        this.employee = employee;
      },
      (err: any) => console.log(err)
    );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    // console.log(this.employeeForm.controls);
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  // osama lul
  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });
    return formArray;
  }




  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }


  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
    console.log(this.employeeForm.get('skills').value);
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  onContactPreferenceChange(selectedValue: string) {
    const emailControl = this.employeeForm.get('emailGroup').get('email');
    const conEmailControl = this.employeeForm.get('emailGroup').get('confirmEmail');
    const phoneControl = this.employeeForm.get('phone');

    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
      conEmailControl.clearValidators();

    } else {
      phoneControl.clearValidators();
      emailControl.setValidators([Validators.required, CustomValidators.emailDomain('yahoo.com')]);

    }
    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
    conEmailControl.updateValueAndValidity();

  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }

      // }
    });
  }

  onLoadDataClick(): void {
    // ****** FormArray using  array() method of form builder class*****
    const formArray1 = this.fb.array([
      new FormControl('Jhon', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);
    formArray1.push(new FormControl('Mark', Validators.required));

    // console.log(formArray1.value);
    // console.log(formArray1.valid);
    // console.log(formArray1.at(3).value);

    const formGroup = this.fb.group([
      new FormControl('Jhon', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);
    //console.log(formArray1);
    //console.log(formGroup);

    //   console.log(formArray.length);
    //   for (const control of formArray.controls) {
    //     if (control instanceof FormControl) {
    //       console.log('Control is FormControl');
    //     }
    //     if (control instanceof FormGroup) {
    //       console.log('Control is FormGroup');
    //     }
    //     if (control instanceof FormArray) {
    //       console.log('Control is FormArray');
    //     }
    //   }
  }



  onSubmit(): void {
    // console.log(this.employeeForm.value);
    this.mapFormValuesToEmployeeModel();
    if(this.employee.id){
    this.employeeService.updateEmployee(this.employee).subscribe(
      () => this.router.navigate(['list']),
      (err: any) => console.log(err)
    );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err)
      );
    }
  }
  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }

}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}

