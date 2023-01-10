import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { request } from '../../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestsFirebaseService {
  requestsCollection!: AngularFirestoreCollection<request>
  constructor(private fireStore: AngularFirestore) {
    this.requestsCollection =this.fireStore.collection("requests")
   }

   addRequest (request:request){
    let addeddStartup= this.requestsCollection?.add(request);
    return from(addeddStartup);
  }

  getRequests (): Observable <request[]>{
    return this.requestsCollection.valueChanges({"idField":'id'});
  }
  deleteRequest(id:string){
    return this.requestsCollection.doc<request>(id).delete();
  }
  getRequest(id: string){
    return this.requestsCollection.doc<request>(id).valueChanges();
 }

}


