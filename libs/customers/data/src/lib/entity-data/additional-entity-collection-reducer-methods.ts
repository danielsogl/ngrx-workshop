import {
  EntityAction,
  EntityCollection,
  EntityCollectionReducerMethods,
  EntityDefinition,
} from '@ngrx/data';
import { CustomersPayload } from './customers-payload';

export class AdditionalEntityCollectionReducerMethods<
  T
> extends EntityCollectionReducerMethods<T> {
  constructor(
    public override entityName: string,
    public override definition: EntityDefinition<T>
  ) {
    super(entityName, definition);
  }
  protected override queryAllSuccess(
    collection: EntityCollection<T>,
    action: EntityAction<T[]>
  ): EntityCollection<T> {
    const ec = super.queryManySuccess(collection, action);
    if ((action.payload as unknown as CustomersPayload).total) {
      (ec as unknown as CustomersPayload).total = (
        action.payload as unknown as CustomersPayload
      ).total;
    }
    console.log(ec);
    return ec;
  }
}
