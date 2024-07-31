// import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';






// GoogleSignin.configure({
//     webClientId: '106922038659-ohqeeon6o913eik20j9148st38nc3kst.apps.googleusercontent.com',
// });

// interface UserProfile {
//     firstName: string | null;
//     lastName: string | null;
//     email: string | null;
//     photoURL: string | null;
//     uid: string;
//     // phoneNumber:any
// }


// export const googleLogIn = async (): Promise<UserProfile | void> => {
//     // console.log('googlePressed1');
//     try {
//         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//         // Get the user's ID token and other details
//         const userInfo: User = await GoogleSignin.signIn();
//         const { idToken, user } = userInfo;
//         // console.log('User Info:', user);

//         // Create a Google credential with the token
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//         // console.log('Credential:', googleCredential);

//         // Sign-in the user with the credential
//         await auth().signInWithCredential(googleCredential);

//         // Get the user profile from Firebase
//         const currentUser: FirebaseAuthTypes.User | null = auth().currentUser;
//         if (currentUser) {
//             // console.log('Firebase User Info:', currentUser.providerData);

//             const displayName = currentUser.displayName ?? '';
//             const [firstName, ...lastNameParts] = displayName.split(' ');
//             const lastName = lastNameParts.join(' ') || null;

//             // Extract profile details
//             const profile: UserProfile = {
//                 firstName: firstName || null,
//                 lastName: lastName || null,
//                 email: currentUser.email,
//                 photoURL: currentUser.photoURL,
//                 uid: currentUser.uid,
                

//             };
//             // console.log('Profile Details:', profile);

//             return profile;
//         } else {
//             throw new Error('No user is signed in');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };


