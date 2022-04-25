import { DefaultPersistenceResultHandler, EntityAction } from '@ngrx/data';
import { Action } from '@ngrx/store';
import { CustomersPayload } from './customers-payload';

export class AdditionalPersistenceResultHandler extends DefaultPersistenceResultHandler {
  override handleSuccess(
    originalAction: EntityAction
  ): (data: CustomersPayload) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    return (data: CustomersPayload) => {
      const action = actionHandler.call(this, data);
      if (action && data.content) {
        Object.assign((action as unknown as { payload: unknown }).payload, {
          data: data.content,
          content: data.content,
          total: data.total,
        });
      }
      return action;
    };
  }
}
