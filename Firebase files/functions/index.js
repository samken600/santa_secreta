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
            lists: firebase.firestore.FieldValue.arrayUnion(db.doc("/lists/" + doc.id))
        });

        return doc.id;
    } catch (e) {
        console.error(e);
        return null;
    }
});


exports.delete_list = functions.region('europe-west1').https.onCall(async (data, context) => {
    const userId = data.userId;
    const listId = data.listId;

    const users = db.collection('users');
    const lists = db.collection('lists');

    try {
        await lists.doc(listId).delete().then(function () {
            console.log("List deleted from database");
            return null;
        }).catch(function (error) {
            console.error("Error removing list: ", error);
        });

        await users.doc(userId).update({
            lists: firebase.firestore.FieldValue.arrayRemove(db.doc("/lists/" + listId))
        }).then(function () {
            console.log("List reference removed from user");
            return null;
        }).catch(function (error) {
            console.error("Error removing list reference: ", error);
        });

        return true;

    } catch (e) {
        console.error(e);
        return null;
    }


});

exports.reshuffle_list = functions.region('europe-west1').https.onCall(async (data, context) => {
    const listId = data.listId;

    const lists = db.collection('lists');

    try {
        let list = lists.doc(listId);
        let persons = [];
        return list.get().then(async function (doc) {
            if(doc.exists) {
                console.log("Document exists, data: ", doc.data());
                persons = doc.data().persons;
                persons = shuffle(persons);

                await lists.doc(listId).update({
                    persons: persons
                });
                return true;

            } else {
                console.log("No such document!");
                return false;
            }
        }).catch(function (error) {
            console.error("Error getting document: ", error);
            return null;
        });


    } catch (e) {
        console.error(e);
        return null;
    }
});


exports.get_listIds = functions.region('europe-west1').https.onCall(async (data, context) => {
    const userId = data.userId;

    const users = db.collection('users');

    try {
        let user = users.doc(userId);
        let listIds = [];
        return user.get().then(async function (doc) {
            if(doc.exists) {
                console.log("Document exists, data: ", doc.data());

                let lists = doc.data().lists;

                lists.forEach(function (ref) {
                    listIds.push(ref.id);
                });

                return listIds;


            } else {
                console.log("No such document!");
                return false;
            }
        }).catch(function (error) {
            console.error("Error getting document: ", error);
            return null;
        });

    } catch (e) {
        console.error(e);
        return null;
    }

});


exports.add_person = functions.region('europe-west1').https.onCall(async (data, context) => {
    const person = data.person;
    const listId = data.listId;

    const lists = db.collection('lists');

    try {

        return await lists.doc(listId).update({
            persons: firebase.firestore.FieldValue.arrayUnion(person)
        }).then(function () {
            console.log("Added person: ", person);
            return true;
        }).catch(function (error) {
            console.error("Error adding person to list: ", error);
            return null;
        });

    } catch (e) {
        console.error(e);
        return null;
    }
});


exports.remove_person = functions.region('europe-west1').https.onCall(async (data, context) => {
    const person = data.person;
    const listId = data.listId;

    const lists = db.collection('lists');

    try {

        return await lists.doc(listId).update({
            persons: firebase.firestore.FieldValue.arrayRemove(person)
        }).then(function () {
            console.log("Added person: ", person);
            return true;
        }).catch(function (error) {
            console.error("Error adding person to list: ", error);
            return null;
        });

    } catch (e) {
        console.error(e);
        return null;
    }
});

exports.get_list = functions.region('europe-west1').https.onCall(async (data, context) => {
    const listId = data.listId;

    const lists = db.collection('lists');

    let list = [];

    try {

        return lists.doc(listId).get().then(async function (doc) {
            console.log("Got document: ", doc.data());
            doc.data().persons.forEach(function (person) {
                list.push(person);
            });
            return shuffle(list);
        }).catch(function (error) {
            console.error("Error fetching document: ", error);
            return null;
        });

    } catch (e) {
        console.error(e);
        return null;
    }
});

/*

Everyone in list must be unique (unique name)

*/