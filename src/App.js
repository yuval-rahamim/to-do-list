import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, getFirestore, deleteDoc, doc, runTransaction } from 'firebase/firestore';
import './App.css';
import Todo from './Todo';

function App() {
  const db = getFirestore();

  // Define state variables for input fields
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [whattodo, setWhattodo] = useState();
  const [tempe, sete] = useState('everyOne');
  const [theEmail, setEmail] = useState();
  const [explain, setExplain] = useState();

  // Step 1: Define initial state for posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(!theEmail)
    {
      localStorage.setItem('todos', JSON.stringify(posts));
    }
  }, [posts]);

  // Step 2 & 3: Use useEffect to fetch data from Firestore
  useEffect(() => {
    if (theEmail) { // Only fetch items if email is provided
      const fetchData = async () => {
        try {
          setLoading(true);
          const listCollection = collection(db, 'lists', theEmail, 'todos');
          const querySnapshot = await getDocs(listCollection);
          const listData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPosts(listData);

        } catch (error) {
          console.error('Error fetching list data:', error);
        }
        finally {
          setLoading(false); // Set loading to false after fetching data (whether successful or not)
        }
      };

      fetchData();
    }else{
      const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setPosts(JSON.parse(storedTodos));
    }
  }
  }, [db, theEmail]); // Run effect when database or email changes

  const addListItem = async (newItem) => {
    try {
      const listCollection = collection(db, 'lists',theEmail,'todos');
      const docRef = await addDoc(listCollection, newItem);
      setPosts(prevList => [...prevList, { id: docRef.id, ...newItem }]);
    } catch (error) {
      console.error('Error adding list item:', error);
    }
  };

  const whatsEmail = (event) =>{
    sete(event.target.value);
  };

  const handleChange = (event) => {
    setWhattodo(event.target.value);
  };

  const ExplainIt = (event) => {
    setExplain(event.target.value);
  };

  function saveEmail()
  {
    window.alert("Your email was saved, and added to the db!");
    setEmail(tempe);
  }

  const clicked = () => {
    const newPost = {
      title: whattodo,
      content: explain,
      isChe: false
    };
    if(!theEmail){
      setPosts(prevList => [...prevList, newPost]);
    }else{
      addListItem(newPost); // Call addListItem to add the new item to Firestore
    }
  };

  const onCheckedEmail = async (id) => {
    if (theEmail) {
      try {
        const postRef = doc(db, 'lists', theEmail, 'todos', id);
  
        await runTransaction(db, async (transaction) => {
          const postSnapshot = await transaction.get(postRef);
          if (postSnapshot.exists()) {
            const postData = postSnapshot.data();
            // Toggle the isChe field
            const updatedIsChe = !postData.isChe;
            transaction.update(postRef, { isChe: updatedIsChe });
          }
        });
      } catch (error) {
        console.error('Error toggling isChe:', error);
      }
    }else{
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === id) {
            return { ...post, isChe: !post.isChe };
          }
          return post;
        })
      );
    }
  };  

  const handleToDo = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (!theEmail) {
        // If email is not provided, delete the todo item from the local list
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      } else {
        try {
          await runTransaction(db, async (transaction) => {
            const postRef = doc(db, 'lists',theEmail,'todos', id);
            await deleteDoc(postRef);
          });
          // Update local state to reflect the deletion
          setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
        <div className="title-container">
          <h1 className="title">{theEmail?theEmail:'My'} To Do List</h1>
          <div className="title-line"></div>
        </div>
        <ol>
          <Todo posts={posts} onclicked={handleToDo} onChecked={onCheckedEmail}/>
        </ol>
        <h2>What do you need to do?</h2>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="To do name" required="" onChange={handleChange} maxLength="50"/>
          <label htmlFor="To do name" className="form__label">To do name</label>
        </div>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="To do explain" required="" onChange={ExplainIt} maxLength="100"/>
          <label htmlFor="To do explain" className="form__label">To do explain</label>
        </div>
        <button onClick={clicked}>Add New</button>
        <div className="section-banner">
          <div id="star-1">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>
          <div id="star-2">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-3">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-4">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-5">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-6">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>
          <div id="star-7">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>
        </div>
        <input type='email' id='em' placeholder="What is your email" onChange={whatsEmail}></input>
        <button onClick={saveEmail}>send</button>
        </>
        )}
      </header>
    </div>
  );
}

export default App;
