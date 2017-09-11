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
