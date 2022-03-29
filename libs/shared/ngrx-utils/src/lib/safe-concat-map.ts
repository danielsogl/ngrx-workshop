import { TypedAction } from '@ngrx/store/src/models';
import { catchError, concatMap, Observable, of, OperatorFunction } from 'rxjs';
import { noopAction } from './noop.action';

export function safeConcatMap<S, T extends string>(
  project: (value: S) => Observable<TypedAction<T>>,
  errorMessage: string = 'Error happened'
): OperatorFunction<S, TypedAction<T | 'NOOP'>> {
  return (source$: Observable<S>): Observable<TypedAction<T | 'NOOP'>> =>
    source$.pipe(
      concatMap((value) =>
        project(value).pipe(catchError(() => of(noopAction())))
      )
    );
}
