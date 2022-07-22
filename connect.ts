import {firebase, firebaseApp} from "./database";
export default function connect(req: any, res: any) {
    return firebase
        .database()
        .ref("/data/")
        .once("value", (snapshot: any) => res.send(snapshot.val()));
}
