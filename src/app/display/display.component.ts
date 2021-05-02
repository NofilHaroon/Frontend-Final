import { Component, OnInit } from '@angular/core';
import { SharedService, listing_service } from 'src/app/shared.service';
import { TestService } from '../test.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { Moment } from 'moment';



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  info: any = {
    ListingId: 1,
    VendorName: "string",
    Category: "string",
    Description: "string",
    Rating: 1,
    Thumbnail: "string",
    Img_one: "string",
    Img_two: "string",
    Img_three: "string",
    Contact: "string",
    StartDate: "2021/5/2",
    EndDate: "2021/6/2"
  };
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  choose = new FormGroup({
    start: new FormControl()
    // end: new FormControl()
  });

  show: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private service: SharedService, private RandomUser: SharedService, private test_service: SharedService, private router: Router) { }
  
  profileForm = this.formBuilder.group({
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    date: ['',[Validators.required]],
    address: ['',[Validators.required]],
    timeslot: ['',[Validators.required]]
  });
  
  Listinginfo: any = [];
  Bookinginfo: any = [];
  Thumbnail: string = "";
  ThumbnailPath: string = "";
  Path_Thumbnail: string = "assets\\Cards\\";
  email = new FormControl('', [Validators.required, Validators.email]);
  
  ngOnInit(): void {
    this.info = this.test_service.get_info();

  }

  refreshListing() {
    this.service.getListing().subscribe(data => {
      this.Listinginfo = data;
    });
  }


  booking() {
    this.service.getBooking().subscribe(data => {
      this.Bookinginfo = data;
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.Thumbnail = data.toString();
      this.ThumbnailPath = this.service.ThumbnailUrl + this.Thumbnail;
    })
  }
  
  send_info() {
    // console.log(test)
    // this.test_service.set_extra(test)
    // this.router.navigate(['../Bookslot'])
    this.show = !this.show; 
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  dateError = 'Please choose a correct date within the avaliability';
  showerr = false;  
  saveForm() {
    if ((Date.parse(this.profileForm.value.date) < Date.parse(this.info.StartDate)) || 
    (Date.parse(this.profileForm.value.date) > Date.parse(this.info.EndDate))){
      this.showerr = true;
      console.log(true);
    }
    else{
      // this.showerr = true;
      // throw Error("Please enter a correct date")
      console.log(false)
    }
    console.log('Form data is ', this.profileForm.value);
  }

}


