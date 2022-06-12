import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <header id='page-header'>
        <div>Petful</div>
        <img id='dog-header-logo' src='/dog-logo.png' alt='header dog logo' />
      </header>

      <img id='dogs-cats' src='/dogs-cats.jpg' alt='multiple dogs and cats' />

      <section>
        You can view pets get adopted in real time. <br />
        Click the button below to get started.
        <br />
        Once you feel you are ready to adopt enter your name to get added to the
        wait list. <br />
        Once you're next to adopt you will have ten seconds to decide which pet
        to adopt. <br />
        Thank you for saving a life!
      </section>

      <div id='btn-section'>
        <Link to='/adopt'>
          <button id='btn-to-adopt-page'>Adopt Today!</button>
        </Link>
      </div>
    </div>
  );
}
