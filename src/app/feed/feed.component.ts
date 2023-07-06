import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ColDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, AfterViewInit {
  useId: any;
  mapImgObj: any = {};
  userData = [];
  userProfileData: any = {};
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    console.log('Hello');
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      this.getUserData(userId);
    });
  }
  ngAfterViewInit(): void {}

  getUserData(userId) {
    this.spinner.show();
    this.sharedService.getUserDetailsById(userId).subscribe(
      (res: any) => {
        console.log('res', res);
        if (res.items) {
          this.userProfileData = JSON.parse(localStorage.getItem('userData'));
          this.spinner.hide();
          this.userData = res.items;
          this.userData.filter((ele) => {
            if (ele.like_count) {
              ele.like_count =
                ele.like_count > 999999
                  ? (ele.like_count / 1000000).toFixed(2) + 'M'
                  : ele.like_count > 9999
                  ? (ele.like_count / 10000).toFixed(2) + 'K'
                  : ele.like_count;
            }
            if (ele.comment_count) {
              ele.comment_count =
                ele.comment_count > 9999
                  ? (ele.comment_count / 1000).toFixed(2) + 'K'
                  : ele.comment_count;
            }
            return ele;
          });
        }
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
}
