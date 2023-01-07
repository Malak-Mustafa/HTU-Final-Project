import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { sector } from '../../interfaces/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorsFirebaseServiceService {
sectorsCollection!: AngularFirestoreCollection<sector>

  constructor(private fireStore: AngularFirestore) {
    this.sectorsCollection =this.fireStore.collection("sectors")
   }

  addSector (sector:sector){
    let addeddSector= this.sectorsCollection?.add(sector);
    return from(addeddSector);
  }

  getSectors (): Observable <sector[]>{
    return this.sectorsCollection.valueChanges();
  }
}
