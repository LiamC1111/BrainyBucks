
import { db, auth } from '../firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const addEventForm = document.getElementById('addEventForm');
const eventList = document.getElementById('eventList');

async function loadEvents() {
  const querySnapshot = await getDocs(collection(db, 'events'));
  eventList.innerHTML = '';
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.className = 'event-box';
    div.innerHTML = `
      <h4>${data.title}</h4>
      <img src="${data.imageURL}" alt="Event Image" style="max-width: 100%; border-radius: 8px;" />
      <p>${data.description}</p>
      <p><strong>Date:</strong> ${new Date(data.eventDate.seconds * 1000).toLocaleDateString()}</p>
      <button class="btn btn-danger btn-sm mt-2" onclick="deleteEvent('${docSnap.id}')">Delete</button>
    `;
    eventList.appendChild(div);
  });
}

window.deleteEvent = async function(id) {
  await deleteDoc(doc(db, 'events', id));
  loadEvents();
};

addEventForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const imageURL = document.getElementById('imageURL').value;
  const description = document.getElementById('description').value;
  const eventDate = new Date(document.getElementById('eventDate').value);

  await addDoc(collection(db, 'events'), {
    title,
    imageURL,
    description,
    eventDate
  });

  addEventForm.reset();
  loadEvents();
});

loadEvents();
