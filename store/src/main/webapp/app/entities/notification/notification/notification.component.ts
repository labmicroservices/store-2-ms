import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { INotification } from 'app/shared/model/notification/notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'jhi-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: INotification[];
  eventSubscriber: Subscription;

  constructor(protected notificationService: NotificationService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.notificationService.query().subscribe((res: HttpResponse<INotification[]>) => {
      this.notifications = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInNotifications();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INotification) {
    return item.id;
  }

  registerChangeInNotifications() {
    this.eventSubscriber = this.eventManager.subscribe('notificationListModification', () => this.loadAll());
  }
}
