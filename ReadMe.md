### Query SQL##
1. SEELECT * FROM user WHERE UID=1;
2. SEELECT * FROM user WHERE Email='test@gmail.com';
3. SEELECT * FROM user LIMIT 10;
4. SEELECT * FROM user WHERE Name LIKE 'D%';
5. SEELECT * FROM user AGE < 50;
6. SEELECT * FROM user AGE > 50;
7. SEELECT * FROM user AGE >= 20 && AGE<=50;
8. SEELECT * FROM user AGE = 20 && location='jaykittiwat';

### Query Firebase Realtime Database ### 
                  ประกาศตัวแปล
 
 # const rootRef = firebase.database().ref();
 
1. const oneRef   = rootRef.child('user').child('1');
2. const twoRef   = rootRef.child('user').orderByChild('Email').equalTo('test@gamil.com');
3. const threeRef = rootRef.child('user').limitToFirst(10);
4. const fourRef  = rootRef.child('user').orderByChild('NAME').startAt('D').endAt('D\uf8ff');
5. const fiveRef  = rootRef.child('user').orderByChild('AGE').endAt(49);
6. const sixRef   = rootRef.child('user').orderByChild('AGE').startAt(51);
7. const sevenRef = rootRef.child('user').orderByChild('AGE').startAt(20).endAt(50);
8. const eightRef = rootRef.child('user').orderByChild('AGE').equalTo(20).orderByChild('location').equalTo('jaykittiwat');


// เพิ่มเติม จัดการUser id
https://firebase.google.com/docs/auth/admin/manage-users#node.js