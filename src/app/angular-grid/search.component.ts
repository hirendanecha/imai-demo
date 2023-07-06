import { Component, OnInit, Output } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  userList: any;
  myControl = new FormControl();
  @Output() userId: any;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  getUser(e) {
    this.spinner.show();
    console.log(e.target.value);
    const userName = e.target.value;
    this.sharedService.getUser(userName).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.userList = res.data;
        this.userList.filter((ele) => {
          return (ele.followers =
            ele.followers > 999999
              ? (ele.followers / 1000000).toFixed(2) + 'M'
              : ele.followers > 9999
              ? (ele.followers / 10000).toFixed(2) + 'K'
              : ele.followers);
        });
        console.log(this.userList);
      },
      (error) => {
        this.spinner.hide();


        
        console.log(error)                   ;
      }
    );
  }

  goToProfile(userInfo) {
    console.log(userInfo);
    this.router.navigateByUrl(`profile/${userInfo.user_id}`);
    localStorage.setItem('userData', JSON.stringify(userInfo));
  }
}
