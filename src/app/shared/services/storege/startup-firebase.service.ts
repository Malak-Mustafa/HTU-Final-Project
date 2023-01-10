import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { startup } from '../../interfaces/startup';
@Injectable({
  providedIn: 'root'
})
export class StartupFirebaseService {
  startupsCollection!: AngularFirestoreCollection<startup>
  constructor(private fireStore: AngularFirestore) {
    this.startupsCollection =this.fireStore.collection("startups")
   }

   addStartup (startup:startup){
    let addeddStartup= this.startupsCollection?.add(startup);
    return from(addeddStartup);
  }

  getStartups (): Observable <startup[]>{
    return this.startupsCollection.valueChanges({"idField":'id'});
  }
  deleteStartup(id:string){
    return this.startupsCollection.doc<startup>(id).delete();
  }
  getStartup(id: string){
    return this.startupsCollection.doc<startup>(id).valueChanges();
 }

  updateStartup(id:string, startup:startup){
    let updatedStartup= this.startupsCollection?.doc<startup>(id).update({...startup});
    return from(updatedStartup)
  }
}
