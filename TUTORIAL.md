# Tutorial
Ionic-Firebase-Storage-Pictures Template

Last Update: 09. September 2017

## How to create this template?

1. Open the folder where the project should be created and run the command below. If you are in folder 'c:\projects\' the folder 'c:\projects\ionic-firebase-storage-pictures' will be created with all necessary files of the ionic project.
  ```bash
  $ ionic start ionic-firebase-storage-pictures blank
  ```
2. Open the folder, which you created the step before and run the command below. If everything was installed successfully a web browser will be open and show you the Ionic blank page of the project.
  ```bash
  $ ionic serve
  ```
3. Generate two tabs with command below. The name of the tabs-page is 'tabs' and the names of the single tabs are 'gallery' and 'camera'.
  ```bash
  $ ionic g tabs tabs
  ```
4. Add the 'TabsPage' to the 'app.module.ts'.
  ```bash
  declarations: [ ... TabsPage, ... ], 
  entryComponents: [ ... TabsPage, ... ],
  ```
5. Import the page 'TabsPage' and change the rootPage from 'HomePage' to 'TabsPage' in the file '/src/app/app.component.ts'.
  ```bash
  import { TabsPage } from '../pages/tabs/tabs';
  rootPage: any = TabsPage;
  ```
6. Install the Ionic Native plugin 'camera' and the packages 'angularfire2' and 'firebase' to the file '/package.json'::
  ```bash
  $ npm install @ionic-native/camera@3.12.1
  $ npm install angularfire2@4.0.0-rc.2
  $ npm install firebase@4.3.0
  ```
7. Add the Cordova plugin 'cordova-plugin-camera' to the file '/config.xml':
  ```bash
  $ ionic cordova plugin add cordova-plugin-camera@2.4.1
  ```
8. Create the folder '/src/environments':
  ```bash
  /src/environments/
  ```
9. Add the file '/src/environments/environment.ts' with your Firebase credentials to the folder '/src/environments':
  ```ts
  export const environment = {
    production: false,
    firebase: {
      apiKey:             "yourApiKey",
      authDomain:         "domain.firebaseapp.com",
      databaseURL:        "https://domain.firebaseio.com",
      storageBucket:      "domain.appspot.com",
      messagingSenderId:  "yourSenderId"
    }
  };
  ```
10. Create the folder '/src/providers/':
  ```bash
  /src/providers/
  ```
11. Create the folder '/src/providers/firebase-database-pictures':
  ```bash
  /src/providers/firebase-database-pictures/
  ```
12. Add the file '/src/providers/firebase-database-pictures/firebase-database-pictures.service.ts':
  ```ts
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
  ```
13. Create the folder '/src/providers/firebase-storage-pictures':
  ```bash
  /src/providers/firebase-storage-pictures/
  ```
14. Add the file '/src/providers/firebase-storage-pictures/firebase-storage-pictures.service.ts':
  ```ts
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
  ```
15. Add the module 'AngularFireDatabaseModule' to the file '/src/app/app.module.ts':
  ```ts
  import { AngularFireDatabaseModule } from 'angularfire2/database';
  imports: [ ...  AngularFireDatabaseModule, ... ],
  ```
16. Add the module 'AngularFireModule' with your Firebase credentials to the file '/src/app/app.module.ts':
  ```ts
  import { AngularFireModule } from 'angularfire2';
  import { environment } from '../environments/environment';
  imports: [ ... AngularFireModule.initializeApp(environment.firebase), ... ],
  ```
17. Add the provider 'FirebaseDatabasePicturesService' to the file '/src/app/app.module.ts':
  ```ts
  import { FirebaseDatabasePicturesService } from '../providers/firebase-database-pictures/firebase-database-pictures.service';
  providers: [ ... FirebaseDatabasePicturesService ... ]
  ```
18. Add the provider 'FirebaseStoragePicturesService' to the file '/src/app/app.module.ts':
  ```ts
  import { FirebaseStoragePicturesService } from '../providers/firebase-storage-pictures/firebase-storage-pictures.service';
  providers: [ ... FirebaseStoragePicturesService ... ]
  ```
19. Add the provider 'Camera' to the '/src/app/app.module.ts':
  ```ts
  import { Camera } from '@ionic-native/camera';
  providers: [ ... Camera ... ]
  ```
17. Add the following code to the page '/src/pages/camera/camera.ts':
  ```ts
  import { Component, NgZone } from '@angular/core';
  import { IonicPage, NavController, NavParams } from 'ionic-angular';
  import { Camera, CameraOptions } from '@ionic-native/camera';
  import { FirebaseStoragePicturesService } from '../../providers/firebase-storage-pictures/firebase-storage-pictures.service';
  
  /**
   * Generated class for the CameraPage page.
   *
   * See http://ionicframework.com/docs/components/#navigation for more info
   * on Ionic pages and navigation.
   */
  
  @IonicPage()
  @Component({
    selector: 'page-camera',
    templateUrl: 'camera.html',
  })
  export class CameraPage {
  
    public picture: string;
    public pictureSrc: string;
  
    constructor(
      private _camera: Camera,
      private _firebaseStoragePicturesService: FirebaseStoragePicturesService,
      private _ngZone: NgZone,
      public navCtrl: NavController,
      public navParams: NavParams
    ) {}
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad CameraPage');
    }
  
    public takePicture(): void {
  
      const options: CameraOptions = {
        quality:            25,
        destinationType:    this._camera.DestinationType.DATA_URL,
        encodingType:       this._camera.EncodingType.JPEG,
        // encodingType:       this._camera.EncodingType.PNG,
        mediaType:          this._camera.MediaType.PICTURE,
        sourceType:         this._camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum:   false,
        correctOrientation: true,
        allowEdit:          true,
        targetWidth:        300,
        targetHeight:       300
      };
  
      this._camera.getPicture(options).then(
        (base64Src) => {
          this._ngZone.run(() => {
            this.pictureSrc = base64Src;
            // this.picture = 'data:image/png;base64,' + this.pictureSrc;
            this.picture = 'data:image/jpeg;base64,' + this.pictureSrc;
          });
        },
        (error) => {
          // Handle error:
          console.log(error);
        }
      );
    }
  
    public addPictureToStorage(): void {
      this._firebaseStoragePicturesService.addPicture(this.pictureSrc);
      // Reset source of picture:
      this.picture = null;
      this.pictureSrc = null;
    }
  
    public cancel(): void {
      // Reset source of picture:
      this.picture = null;
      this.pictureSrc = null;
    }
  }
  ```
18. Add the following code to the page '/src/pages/camera/camera.html':
  ```html
  <ion-header>
    <ion-navbar>
      <ion-title>Camera</ion-title>
    </ion-navbar>
  </ion-header>
  
  <ion-content padding>
    <!-- No picture taken -->
    <div *ngIf="!picture">
      <p ion-text>No Picture taken.</p>
      <button ion-button full (click)="takePicture()">Take Picture</button>
    </div>
    <!-- Picture taken -->
    <div *ngIf="picture">
      <img [src]="picture">
      <button ion-button full (click)="addPictureToStorage()">Send to Storage</button>
      <button ion-button full color="danger" (click)="cancel()">Cancel</button>
    </div>
  </ion-content>
  ```
19. Add the following code to the page '/src/pages/gallery/gallery.ts':
  ```ts
  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams } from 'ionic-angular';
  import { FirebaseListObservable } from 'angularfire2/database';
  import { FirebaseStoragePicturesService } from '../../providers/firebase-storage-pictures/firebase-storage-pictures.service';
  import { FirebaseDatabasePicturesService } from '../../providers/firebase-database-pictures/firebase-database-pictures.service';
  
  /**
   * Generated class for the GalleryPage page.
   *
   * See http://ionicframework.com/docs/components/#navigation for more info
   * on Ionic pages and navigation.
   */
  
  @IonicPage()
  @Component({
    selector: 'page-gallery',
    templateUrl: 'gallery.html',
  })
  export class GalleryPage {
  
    public picturesDatabase: FirebaseListObservable<any[]>;
  
    constructor(
      private _firebaseDatabasePicturesService: FirebaseDatabasePicturesService,
      private _firebaseStoragePicturesService: FirebaseStoragePicturesService,
      public navCtrl: NavController,
      public navParams: NavParams
    ) {
      this._firebaseStoragePicturesService.getPicturesUrLs().subscribe(
        (result: any) => {
          console.log(result);
  
        }
      );
      this.picturesDatabase = this._firebaseDatabasePicturesService.getPicturesUrLs();
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad GalleryPage');
  
    }
  
    public removePicture(id: string, key: string): void {
      this._firebaseStoragePicturesService.removePicture(id, key);
    }
  }
  ```
20. Add the following code to the page '/src/pages/gallery/gallery.html':
  ```html
  <ion-header>
    <ion-navbar>
      <ion-title>Gallery</ion-title>
    </ion-navbar>
  </ion-header>
  
  <ion-content padding>
    <ion-card *ngFor="let picture of picturesDatabase | async">
      <img [src]="picture.url"/>
      <ion-card-content>
        <button ion-button color="danger" full (click)="removePicture(picture.file, picture.$key)">Remove Picture</button>
      </ion-card-content>
    </ion-card>
  </ion-content>
  ```
21. Build the project:
  ```bash
  $ npm run build
  ```

