import { Injectable } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { switchMap, take } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted', req);
        return this.store.select('auth')
                .pipe(
                    take(1),
                    switchMap( (authState: fromAuth.State) => {
                        const copieReq = req.clone({params: req.params.set('auth', authState.token)});
                        return next.handle(copieReq);
                    } )
                );
    }
}