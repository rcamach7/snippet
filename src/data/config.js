// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnVoGRdldcNBYm62mVGbXOgnU116qLrnw",
  authDomain: "snippet-5354e.firebaseapp.com",
  projectId: "snippet-5354e",
  storageBucket: "snippet-5354e.appspot.com",
  messagingSenderId: "94008350674",
  appId: "1:94008350674:web:100079795b865fe22c5a0b",
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
