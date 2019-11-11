import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';

@Component({
  selector: 'jhi-product-category',
  templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  productCategories: IProductCategory[];
  eventSubscriber: Subscription;

  constructor(protected productCategoryService: ProductCategoryService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => {
      this.productCategories = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInProductCategories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProductCategory) {
    return item.id;
  }

  registerChangeInProductCategories() {
    this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', () => this.loadAll());
  }
}
