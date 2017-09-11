import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseDatabasePicturesService {

  private _path: string = '/storage/pictures/';

  constructor(
    public angularFireDatabase: AngularFireDatabase
  ) {}

  addPictureUrl(value: any): void {
    this.angularFireDatabase.list(this._path).push(value);
  }

  getPicturesUrLs(): FirebaseListObservable<any[]> {
    return this.angularFireDatabase.list(this._path);
  }

  removePictureUrl(id: string): void {
    this.angularFireDatabase.list(this._path).remove(id);
  }
}
