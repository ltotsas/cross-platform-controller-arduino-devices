import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GroupParameters } from '@app/groups/models/group.model';

const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private httpClient: HttpClient) {}

  jsonify(...args: any[]) {
    args.forEach((_arg, index) => {
      _arg = JSON.stringify(_arg);
      args[index] = _arg;
    });
    return args;
  }

  setState(command: string, ids: string[]): Observable<any> {
    const [JSONcommand, JSONids] = this.jsonify(command, ids);
    // command = JSON.stringify(command);
    return this.httpClient
      .cache()
      .post('/status', '{"devices": ' + JSONids + ', "status": ' + JSONcommand + '}', _options)
      .pipe(
        map((body: any) => console.log(body)), // create error if body is empty?
        catchError(() => of('Error, could not change status for these devices :-('))
      );
  }

  openGroup(ids: string[]): Observable<any> {
    const [JSONids] = this.jsonify(ids);
    return this.httpClient
      .cache()
      .post('/open/group', '{"devices": ' + JSONids + '}', _options)
      .pipe(
        map((body: any) => console.log(body)), // create error if body is empty?
        catchError(() => of('Error, could not change status for these devices :-('))
      );
  }

  closeGroup(ids: string[]): Observable<any> {
    const [JSONids] = this.jsonify(ids);
    return this.httpClient
      .cache()
      .post('/close/group', '{"devices": ' + JSONids + '}', _options)
      .pipe(
        map((body: any) => console.log(body)), // create error if body is empty?
        catchError(() => of('Error, could not change status for these devices :-('))
      );
  }

  blinkGroup(ids: string[]): Observable<any> {
    const [JSONids] = this.jsonify(ids);
    return this.httpClient
      .cache()
      .post('/prepare_to_open/group', '{"devices": ' + JSONids + '}', _options)
      .pipe(
        map((body: any) => console.log(body)), // create error if body is empty?
        catchError(() => of('Error, could not change status for these devices :-('))
      );
  }

  blinkGroupStop(ids: string[]): Observable<any> {
    const [JSONids] = this.jsonify(ids);
    return this.httpClient
      .cache()
      .post('/cancel_preparation/group', '{"devices": ' + JSONids + '}', _options)
      .pipe(
        map((body: any) => console.log(body)), // create error if body is empty?
        catchError(() => of('Error, could not change status for these devices :-('))
      );
  }

  setGroupParameters(ids: string[], params: GroupParameters): Observable<any> {
    const [JSONparams, JSONids] = this.jsonify(params, ids);
    return this.httpClient
      .cache()
      .post('/set_params/group', '{"devices": ' + JSONids + ', "params": ' + JSONparams + '}', _options)
      .pipe(
        map((body: any) => console.log(body)), // create error if body is empty?
        catchError(() => of('Error, could not change status for these devices :-('))
      );
  }
}
