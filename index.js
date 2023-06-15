const express = require('express')
const app = express()
const port = process.env.PORT || 5500
const {database, firestore} = require('./firebase_module')
const { onValue, ref } = require('firebase/database')
const { addDoc, collection, query, orderBy, limit, getDocs } = require('firebase/firestore')
const SECOND_TO_DRAW = 5

const getRowsData = async (number) => {
    const docRef = collection(firestore, "data");
    const queryRef = query(docRef, orderBy("time", "desc"), limit(number))
    const querySnapshot = await getDocs(queryRef);
    const dataStore = []
    querySnapshot.forEach((doc) => {
      dataStore.push(doc.data())
    });

    return dataStore.reverse()
}

const addDocumentToFirestore = (data) => {
  
  addDoc(collection(firestore, 'data'), {
    ...data,
    time: new Date().getTime()
  })  
}

onValue(ref(database, '/'), async (snapshot) => {
  console.log("🚀 ~ file: firebase.js:18 ~ ref.on ~ snapshot:", snapshot.val())
  const currentData = await getRowsData(1)
  if (currentData && currentData.length > 0) {
    const miliseconds = currentData[0].time
    let date = new Date(miliseconds).setSeconds(new Date(miliseconds).getSeconds() + SECOND_TO_DRAW)
    date = new Date(date)
    if (date.getTime() <= new Date().getTime()) {
      addDocumentToFirestore(snapshot.val())
    }
  } else {
    addDocumentToFirestore(snapshot.val())
  }
})

app.get('/', (req, res) => {
  res.send("Server started")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})