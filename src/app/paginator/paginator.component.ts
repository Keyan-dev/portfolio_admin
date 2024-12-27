import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface PaginationData {
  limit: number;
  page: number;
}

@Component({
  selector: 'app-paginator',
  imports: [FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  standalone:true
})
export class PaginatorComponent {
  @Input() limitArray: number[] = [5, 10, 20];
  @Input() total: number = 1;
  @Input() limit: number = 5;
  @Output() currentPage = new EventEmitter<PaginationData>();

  page: number = 1;
  totalPages: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.total / this.limit);
  }

  onLimitChange(): void {
    this.calculateTotalPages();
    this.page = 1;
    this.emitPageData();
  }

  changePage(countPage: number): void {
    this.page += countPage;
    this.emitPageData();
  }

  goToPage(pageNumber: number): void {
    this.page = pageNumber;
    this.emitPageData();
  }

  emitPageData(): void {
    this.currentPage.emit({
      limit: +this.limit,
      page: +this.page,
    });
  }
}
