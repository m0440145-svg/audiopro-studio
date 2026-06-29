const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.checkAdmin = onCall(async (request) => {

    if (!request.auth) {
        throw new Error("Unauthenticated");
    }

    const uid = request.auth.uid;

    const doc = await admin.firestore()
        .collection("admins")
        .doc(uid)
        .get();

    if (!doc.exists) {
        return {
            admin: false
        };
    }

    return {
        admin: true,
        data: doc.data()
    };

});
