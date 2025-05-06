
import { db } from '../firebase.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const eventList = document.getElementById('eventList');

async function loadEvents() {
  const querySnapshot = await getDocs(collection(db, 'events'));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.className = 'event-box';
    div.innerHTML = `
      <h4>${data.title}</h4>
      <img src="${data.imageURL}" alt="Event Image" class="event-img" />
      <p>${data.description}</p>
      <p><strong>Date:</strong> ${new Date(data.eventDate.seconds * 1000).toLocaleDateString()}</p>
      <button class="btn btn-primary">Join Event</button>
    `;
    eventList.appendChild(div);
  });
}

loadEvents();
