import { onAuthStateChanged } from 'firebase/auth';
import { SignedInStack, SignedOutStack } from './navigation';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

export default function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(null)

  const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

  useEffect(() => onAuthStateChanged(auth, (user) => { userHandler(user), setLoading(true) }),
    []
  )

  if (!loading) {
    return null;
  }
  else {
    return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
  }

}