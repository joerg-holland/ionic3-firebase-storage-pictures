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
