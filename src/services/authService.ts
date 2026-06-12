import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; 

export const loginAndVerifyUser = async (email: string, password: string) => {
  try {
    // Step 1: Check Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Check Firestore for a matching user document
    // This assumes your Firestore collection is named "users" and the document ID is the user's UID
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // Step 3: If no Firestore doc exists, log them out of Auth and throw an error
      await signOut(auth);
      throw new Error("User authenticated, but no profile record found in the database.");
    }

    // Success! Return the user data and the profile details
    return {
      uid: user.uid,
      email: user.email,
      profile: userDocSnap.data()
    };

  } catch (error: any) {

    console.error("Firebase Error Code:", error.code);
    console.error("Firebase Error Message:", error.message);
    
    throw error;
  }
};


// Define an interface for our structured sign-up payload
interface SignUpData {
  email: string;
  password?: string; // Optional here since we don't save the password to Firestore
  name: string;
  businessName: string;
  businessCategory: string; // The chosen category .val string
  businessTagline?: string;  // Optional
  brandTone: string;        // The chosen tone .val string
  language: string;         // The chosen language .val string
}
//register and create profile logic 
export const registerAndCreateProfile = async (data: SignUpData) => {
  if (!data.password) throw new Error("Password is required.");

  try {
    // Step 1: Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    // Step 2: Prepare the profile payload for Firestore (exclude password!)
    const profileData: Omit<SignUpData, 'password'> & { uid: string; createdAt: Date } = {
      uid: user.uid,
      name: data.name,
      email: data.email,
      businessName: data.businessName,
      businessCategory: data.businessCategory,
      businessTagline: data.businessTagline || "", // default to empty string if left blank
      brandTone: data.brandTone,
      language: data.language,
      createdAt: new Date()
    };

    // Step 3: Write to Firestore using the Auth UID as the document ID
    await setDoc(doc(db, "users", user.uid), profileData);

    return { user, profile: profileData };

  } catch (error: any) {
    throw error;
  }
};