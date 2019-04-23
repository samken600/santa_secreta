const functions = require('firebase-functions');
const firebase =  require('firebase-admin');

firebase.initializeApp();

let db = firebase.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.login = functions.region('europe-west1').https.onCall(async (data, context) => {
    const email = data.email.trim();
    const username = data.username.trim();
    const users = db.collection('users');

    try{
        const querySnapshot = await  users.where("email", "==", email)
            .where("username", "==", username)
            .get();
        let userId = null;
        if(querySnapshot.size > 0) {
            querySnapshot.forEach(function (doc) {
                userId = doc.id;
            });
        } else {
            const emailQuerySnapshot = await  users.where("email", "==", email).get();
            const usernameQuerySnapshot = await  users.where("username", "==", username).get();
            if(emailQuerySnapshot.size === 0 && usernameQuerySnapshot.size === 0) {
                const doc = await users.add({
                    email: email,
                    username: username,
                    lists: []
                });

                userId = doc.id;
            } else {
                console.warn("Email/username exists");
            }
        }
        return userId;


    } catch (e) {
        console.error(e);
        return null;
    }
});

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


exports.create_list = functions.region('europe-west1').https.onCall(async (data, context) => {
    const userId = data.userId;
    const people = data.people;
    const name = data.name;

    const users = db.collection('users');
    const lists = db.collection('lists');

    let persons = shuffle(people);

    try {
        const doc = await lists.add({
            name: name,
            persons: persons
        });

        await users.doc(userId).update({
            lists: firebase.firestore.FieldValue.arrayUnion(doc.id)
        });

        return doc.id;
    } catch (e) {
        console.error(e);
        return null;
    }
});

/*
exports.delete_list = functions.region('europe-west1').https.onCall(async (data, context) => {

});

exports.reshuffle_list = functions.region('europe-west1').https.onCall(async (data, context) => {


});
*/