import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FirebaseDatabasePicturesService } from '../firebase-database-pictures/firebase-database-pictures.service';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseStoragePicturesService {

  constructor(
    private _firebaseDatabasePicturesService: FirebaseDatabasePicturesService
  ) {}

  public addPicture(result: string): void {
    const image = `data:image/jpeg;base64,${result}`;

    // Create a timestamp as filename:
    const filename = Math.floor(Date.now() / 1000);

    // Create a references:
    let storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`pictures/${filename}.jpeg`);

    imageRef.putString(image, 'data_url').then(
      (snapshot: any) => {
        let downloadURL = snapshot.downloadURL;
        /// Write the download URL to the Realtime Database:
        this._firebaseDatabasePicturesService.addPictureUrl({
          file: snapshot.metadata.fullPath,
          url: downloadURL
        });
      }
    );
  }

  public getPicturesUrLs(): Observable<any> {
    return Observable.create((observer) => {
      this._firebaseDatabasePicturesService.getPicturesUrLs().subscribe(
        (result: any[]) => {

          let observableBatch: any = [];

          result.forEach((imageUrl, key) => {
              const storageRef = firebase.storage().ref().child(imageUrl.file);
              observableBatch.push(
                storageRef.getDownloadURL().then(
                  (res) => {
                    return res;
                  }
                )
              );
            }
          );

          return Observable.forkJoin(observableBatch);
        },
        (error: any) => {
          // Handle error:
          console.error(error);

          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  removePicture(path: string, key: string): void {
    let obj = this;

    // Create a references:
    let storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(path);

    imageRef.delete().then(function() {
      obj._firebaseDatabasePicturesService.removePictureUrl(key);

    }).catch(function(error) {
      // Handle error:
      console.error(error);

    });
  }
}

