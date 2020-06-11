import firebase from 'firebase/app';
import 'firebase/database';


const config =require('./config');
if(!firebase.app.length){
    firebase.initializeApp(config);
}
export default firebase();
