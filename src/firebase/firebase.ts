const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert(require('../../firebase-service-account.json')),
    databaseURL: 'https://friday-the-assistant-default-rtdb.asia-southeast1.firebasedatabase.app'
})

export const db = admin.database()