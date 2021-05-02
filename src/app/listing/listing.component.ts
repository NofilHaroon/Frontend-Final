import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
// import {ListingtestService, listing_service} from '../listingtest.service';
import { SharedService, listing_service } from 'src/app/shared.service';
// import { from } from 'rxjs';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  Category = '';
  SearchCat = '';
  Today = new Date();
  totalRecords: string = "";
  page: number = 1;
  dikhao = false;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  constructor(private service: SharedService, private RandomUser: SharedService, private test_service: SharedService, private router: Router) { }

  ServiceList: any = [
    { ServiceName: "Interior" },
    { ServiceName: "Architecture" },
    { ServiceName: "Repair" },
    { ServiceName: "Plumbing" },
    { ServiceName: "Contractors" },
    { ServiceName: "Materials" }
  ];
  Timeslot: any = 
    {Time: "8:30 PM",Time2: "9:00 PM",Time3: "9:30 PM"};
  Listinginfo: any = [];
  Listinginfo2: any = [];

  result: any = [{
    ListingId: 1,
    VendorId: 1,
    VendorName: "string",
    Category: "string",
    Description: "string",
    Rating: 1,
    Thumbnail: "string",
    Img_one: "string",
    Img_two: "string",
    Img_three: "string",
    Contact: "string",
    Profilepic: "string"
  }];

  Thumbnail: string = "";
  ThumbnailPath: string = "";
  Path_Thumbnail: string = "assets\\Cards\\";

  // const Listinginfo2 = Object.assign([], this.Listinginfo);

  ngOnInit(): void {
    this.refreshListing();
    // console.log(this.Categories);
  }

  refreshListing() {
    this.service.getListing().subscribe(data => {
      this.Listinginfo = data;
      // console.log(this.Listinginfo);
    });

    this.service.getListing().subscribe(data => {
      this.Listinginfo2 = data;
      console.log(this.Listinginfo2);
    });
  }


  send_info(test: listing_service) {
    // console.log(test)
    this.test_service.set_extra(test)
    this.router.navigate(['../display'])
  }

  onCategoryFilter() {
    this.SearchCat = this.Category;

  }
  onCategoryFilterClear() {
    this.SearchCat = '';
    this.Category = '';
  }
  getServ(test: '') {
    console.log(test)
    this.SearchCat = test;
  }

  // index: any = []
  // S_Date = '';

  clearfilter() {
    // this.router.navigate(['../listing'])
    // console.log(this.Listinginfo2);
    this.Listinginfo = this.Listinginfo2;
    // console.log(this.Listinginfo);
  }


  onDate(){
    this.dikhao = true;
    var temp = [];
    // this.Listinginfo=this.Listinginfo2;
    // console.log("this.Listinginfo2=",this.Listinginfo2);
    // console.log(this.Listinginfo2);
    // console.log(formatDate(this.range.value["end"], 'yyyy-MM-dd', 'en-US'));
    for(var i = 0; i<this.Listinginfo.length;i++){
      
      if((Date.parse(this.Listinginfo[i].StartDate) > Date.parse(this.range.value["start"]) &&
      Date.parse(this.Listinginfo[i].StartDate) < Date.parse(this.range.value["end"])) ||
      
      (Date.parse(this.Listinginfo[i].EndDate) > Date.parse(this.range.value["start"]) &&
      Date.parse(this.Listinginfo[i].EndDate) < Date.parse(this.range.value["end"])) ||
      
      (Date.parse(this.Listinginfo[i].StartDate) < Date.parse(this.range.value["start"]) &&
      Date.parse(this.Listinginfo[i].EndDate) > Date.parse(this.range.value["end"]))
      ){
        console.log(true)
      }
      else{
        // this.index.push(item);
        // this.Listinginfo.pop();
        // for
        temp.push(this.Listinginfo[i]);
        // console.log(false)
      }
    }
    
    for(var i = 0;i<temp.length;i++){
      var x = this.Listinginfo.indexOf(temp[i]);
      this.Listinginfo.splice(x,1);
    }
    
    // this.refreshListing();
    console.log(temp);
    // console.log(this.Listinginfo);
  }
}
