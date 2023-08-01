import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBXU0cuh9AZkjXMQqT_0Nns2Cq35cIOtj0",
	authDomain: "lily-image-catalog.firebaseapp.com",
	projectId: "lily-image-catalog",
	storageBucket: "lily-image-catalog.appspot.com",
	messagingSenderId: "146762051324",
	appId: "1:146762051324:web:18d51c706eb902f93fb179",
	measurementId: "G-E5EYJXH9WL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;

