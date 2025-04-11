import logo from './logo.svg';
import './App.css';

function Nav(props) {
  const lis = [
    <li><a href="/read/1">html</a></li>,
    <li><a href="/read/2">css</a></li>,
    <li><a href="/read/3">js</a></li>
  ]
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/' + t.id}>{t.title}</a></li>)
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
        <a href="">
          WEB {props.love}
        </a>
      </h1>
    </header>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html" },
    { id: 2, title: "css" },
    { id: 3, title: "javascript" }
  ]
  return (
    <div>
      <Header title="titleinside" love="loveinside" onChangeMode ={function(){
        alert('Header');
      }}></Header>
      <Nav topics={topics}></Nav>
      <Article ></Article>
    </div>
  );
}

export default App;
