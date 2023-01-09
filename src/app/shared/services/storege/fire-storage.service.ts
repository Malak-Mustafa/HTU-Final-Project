import { Injectable } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { last, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private fireStorage:AngularFireStorage) { }

  uploadFile(file:File , path:string){
    const filePath = `${path}/${file.name}`
    const storageRef = this.fireStorage.ref(filePath);
   return storageRef.put(file).snapshotChanges().pipe(
      last(),switchMap((val)=>{
        return storageRef.getDownloadURL()
      })
    )
  }
 
}
