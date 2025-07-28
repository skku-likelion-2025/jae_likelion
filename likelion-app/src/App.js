import { useState } from 'react';
import './App.css';

function Header(props) {
  console.log('props', props, props.title)
  return (
    <header>
      <h1>
        <a href="/" onClick={(event) => {
          event.preventDefault();
          props.onChangeMode();
        }}>
          WEB
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  // const lis = [
  //   <li><a href="/read/1">html</a></li>,
  //   <li><a href="/read/2">css</a></li>,
  //   <li><a href="/read/3">js</a></li>
  // ]
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}>{t.title}</a>
    </li>)
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault(); // Prevent the default form submission behavior
        const title = event.target.title.value; // Get the value of the title input
        const body = event.target.body.value; // Get the value of the body textarea
        props.onCreate(title, body); // Call the onCreate function passed as a prop with title and body
      }}>
        <p><input type="text" name="title" placeholder="Title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create" /></p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody]= useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event => {
        event.preventDefault(); // Prevent the default form submission behavior
        const title = event.target.title.value; // Get the value of the title input
        const body = event.target.body.value; // Get the value of the body textarea
        props.onUpdate(title, body); // Call the onCreate function passed as a prop with title and body
      }}>
        <p><input type="text" name="title" placeholder="Title" value={title} onChange={event => {
          console.log(event.target.value);
          setTitle(event.target.value); // Update the title state with the input value
        }} /></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={event => {
          setBody(event.target.value); // Update the body state with the textarea value
        }}></textarea></p>
        <p><input type="submit" value="Update" /></p>
      </form>
    </article>
  );
}

function App() {
  // useState is a React Hook that lets you add state to functional components
  // It returns an array with two elements: the current state and a function to update it
  // The first element is the current state value, and the second element is a function that updates the state
  const [mode, setMode] = useState('WELCOME'); // useState returns an array with the current state and a function to update it
  const [id, setId] = useState(null); // This state is not used in the current code but can be used for further functionality
  const [nextId, setNextId] = useState(4); // This state is used to keep track of the next ID for new topics
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "HTML is HyperText Markup Language." },
    { id: 2, title: "css", body: "CSS is Cascading Style Sheets." },
    { id: 3, title: "javascript", body: "JavaScript is a programming language." },
  ]);
  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);

      if (topics[i].id === Number(id)) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
    <li><a href={'/update/' + id} onClick={(event) => {
      event.preventDefault();
      setMode('UPDATE'); // This updates the mode state to 'UPDATE'
    }}>Update</a></li><input type="button" value="Delete" onClick={()=> {
      const newTopics = []
      for (let i = 0; i < topics.length; i++) {
        if (topics[i].id !== Number(id)) {
          newTopics.push(topics[i]); // Add all topics except the one with the current id
        }
      }
      setTopics(newTopics); // Update the topics state with the new array
      setMode('WELCOME'); // Change the mode to 'WELCOME' after deleting the topic
    }}/>
    </>
  }
  else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics]; // Create a new array with the existing topics and the new topic
      console.log("Before:", mode, id, nextId,);

      newTopics.push(newTopic);
      setTopics(newTopics); // Update the topics state with the new array
      setMode("READ"); // Change the mode to 'READ' after creating a new topic
      setId(nextId); // Set the id to the nextId so that the new topic can be displayed
      setNextId(nextId + 1); // Increment the nextId for the next new topic

      console.log("After:", mode, id, nextId,);

    }}></Create>
  }
  else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === Number(id)) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      console.log(title, body);
      const newTopics = [...topics]; // Create a new array with the existing topics
      const updatedTopic = { id: id, title: title, body: body};
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === Number(id)) {
          newTopics[i] = updatedTopic; // Update the topic with the new title and body
          break;
        }
      }
      setTopics(newTopics); // Update the topics state with the new array
      setMode('READ'); // Change the mode to 'READ' after updating the topic
    }}></Update>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        setMode('READ'); // This updates the mode state to 'READ'
        setId(id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={(event) => {
            event.preventDefault();
            setMode('CREATE'); // This updates the mode state to 'CREATE'
          }}>Create</a>
        </li>
        {contextControl}
      </ul>


    </div>
  );

}

export default App;


/*
<Nav topics={topics} onChangeMode={(id) => {
  alert(id);
}} />
onChangeMode is a prop you're passing into the Nav component (the one on top)
Inside the Nav component, when you write:

props.onChangeMode(event.target.id);

You’re calling that function and passing it an argument (event.target.id)

That argument becomes the id in (id) => alert(id)

✅ So: t.id (from the topics array) is passed to the DOM element as the attribute id, and then retrieved via event.target.id and sent back up.*/

//function() = {} is same as () => {}

// 생성(Create), 읽기(Read), 갱신/수정(Update), 삭제(Delete)