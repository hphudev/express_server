const express = require('express')
const app = express()
const port = 5000
const {database, firestore} = require('./firebase_module')
const { onValue, ref } = require('firebase/database')
const { addDoc, collection } = require('firebase/firestore')

const addDocumentToFirestore = (data) => {
  console.log("🚀 ~ file: index.js:9 ~ addDocumentToFirestore ~ data:", data)
  
  addDoc(collection(firestore, 'data'), {
    ...data,
    time: new Date().getTime()
  })  
}

onValue(ref(database, '/'), (snapshot) => {
  console.log("🚀 ~ file: firebase.js:18 ~ ref.on ~ snapshot:", snapshot.val())
  addDocumentToFirestore(snapshot.val())
})

app.get('/', (req, res) => {
 res.send("Server started")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})