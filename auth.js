import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { auth } from "./firebase";
export const Logins =(email,senha)=>{
    signInWithEmailAndPassword(auth,email,senha).then(()=>{
        alert('Logado');
    }).catch(err=>{
        console.log(err)
    })
}
export const CadastrosLogin =(email,senha)=>{
    createUserWithEmailAndPassword(auth,email,senha).then((userCredentials)=>{
        const user = userCredentials.user;
        uploadDataToFirestore(user);
        alert('Inscrito');
    }).catch(err=>{
        console.log(err)
    })
}
export const Logout =()=>{
    signOut(auth).then(()=>{
        alert('Sair');
    }).catch(err=>{
        console.log(err)
    })
}
export const getLoggedInUserUid = () => {
    const user = auth.currentUser;
    if (user) {
      // O usuário está autenticado, então podemos acessar o UID
      const userUid = user.uid;
      console.log('UID do usuário logado:', userUid);
      return userUid;
    } else {
      console.log('Nenhum usuário autenticado.');
      return null;
    }
  };