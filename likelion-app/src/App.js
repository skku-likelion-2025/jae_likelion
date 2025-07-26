import logo from './logo.svg';
import './App.css';

function Nav(props) {
  // const lis = [
  //   <li><a href="/read/1">html</a></li>,
  //   <li><a href="/read/2">css</a></li>,
  //   <li><a href="/read/3">js</a></li>
  // ]
  const lis = [];
  for(let i=0; i<props.topics.length; i++) {
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
      <h2>Welcome to React</h2>
      <h3>{props.id}</h3>
    </article>
  );

}
function Header(props) {
  console.log('props', props, props.title, props.love)
  return (
    <header>
      <h1>
        <a href="" onClick={(event) => {
          event.preventDefault();
          props.onChangeMode();
        }}>
          WEB {props.love}
        </a>
      </h1>
    </header>
  );
}

function App() {
  const mode='WELCOME';
  const topics = [
    { id: 1, title: "html" },
    { id: 2, title: "css" },
    { id: 3, title: "javascript" }
  ]
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ') {

  }
  return (
    <div>
      <Header title="titleinside" love="loveinside" onChangeMode ={() => {
        alert('Header');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id);
      }}></Nav>

{/* <Nav topics={topics} onChangeMode={(id) => {
  alert(id);
}} />
onChangeMode is a prop you're passing into the Nav component (the one on top)

Inside the Nav component, when you write:

props.onChangeMode(event.target.id); 

You’re calling that function and passing it an argument (event.target.id)

That argument becomes the id in (id) => alert(id)

✅ So: t.id (from the topics array) is passed to the DOM element as the attribute id, and then retrieved via event.target.id and sent back up.*/}
      
    </div>
  );
}

export default App;

//function() = {} is same as () => {}