import * as functions from "firebase-functions/v1";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";

initializeApp();

const firestore = new Firestore();

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);

  logger.info(`User Created: ${JSON.stringify(userInfo)}`);

  return;
});
