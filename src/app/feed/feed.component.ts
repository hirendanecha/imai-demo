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
export class FeedComponent implements OnInit, OnChanges, AfterViewInit {
  useId: any;
  mapImgObj: any = {};
  userData = [];
  userProfileData: any = {};
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.useId = this.route.url['_value'][1].path;
    console.log(this.useId);
    this.userProfileData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
    console.log(this.userProfileData);
  }

  ngOnChanges(): void {}
  ngAfterViewInit(): void {
    this.spinner.show();
    if (this.useId) {
      this.sharedService.getUserDetailsById(this.useId).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('res', res);
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
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    }
  }
}
