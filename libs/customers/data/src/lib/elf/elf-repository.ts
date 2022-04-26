import { createStore } from '@ngneat/elf';
import { addEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { Customer } from '@eternal/customers/model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '@eternal/shared/config';
import { firstValueFrom } from 'rxjs';
import { updatePaginationData, withPagination } from '@ngneat/elf-pagination';
import { tap } from 'rxjs/operators';

const store = createStore(
  { name: 'customers' },
  withEntities<Customer>(),
  withPagination()
);

)

@Injectable({ providedIn: 'root' })
export class ElfRepository {
  constructor(private httpClient: HttpClient, private config: Configuration) {}

  async load(page: number = 1) {
      this.httpClient.get<{Customer[]}>(`${this.config.baseUrl}customers`).pipe(tap(customers => store.update(addEntities(customers), updatePaginationData({currentPage: page, total: }))))

  }
}
