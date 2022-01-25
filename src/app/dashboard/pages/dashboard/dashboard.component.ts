import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockHttpResponse } from '../../../core/models';
import { SubscriptionAbstract } from '../../../shared/directives';
import { takeUntil } from 'rxjs/operators';

/**
 * TEST COMPONENT | Authenticated User
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends SubscriptionAbstract {
  content: any;

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private _httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this._fetchDashboardData();
  }

  getTitle(): string {
    return this.content?.title;
  }

  private _fetchDashboardData(): void {
    this._httpClient
      .get(`${this.baseUrl}/api/dashboard`)
      .pipe(takeUntil(this.getDestroyInterceptor())) // Check README.md for usage
      .subscribe((response: MockHttpResponse) => {
        this.content = response?.data;
      });
  }
}
