import { useContext } from 'react';
import AppContext from '../context';
import { Link } from 'react-router-dom';

export default function Adopt() {
  const context = useContext(AppContext);
  const { people, message, name } = context;

  return (
    <div>
      <header id='page-header' className='links'>
        <div>Petful</div>
        <Link to='/'>
          <img
            id='dog-header-logo'
            alt='header dog logo'
            src='/dog-logo-home.png'
          />
        </Link>
      </header>

      <div id='petContainer'>
        <div>
          {context.getNextCat()}
          {people[0] === name && (
            <button id='adoptCat' onClick={context.handleAdoptCat}>
              Adopt Me!
            </button>
          )}
        </div>
        <div>
          {context.getNextDog()}
          {people[0] === name && (
            <button id='adoptDog' onClick={context.handleAdoptDog}>
              Adopt Me!
            </button>
          )}
        </div>
      </div>

      <br />
      <div> {message} </div>
      <div className='info'>
        <div id='name-form'>
          <form
            onSubmit={(e) => {
              context.handleSubmit(e);
            }}
          >
            <label>Get added to the queue:</label>
            <br />
            <input type='text' name='name' required />
            <button type='submit' id='name-btn'>
              Add
            </button>
          </form>
        </div>
        <br />

        <div></div>

        <br />
        <div id='adoption-list'>
          <b className='center-list'>Adoption Line:</b>
          <br />
          {people.length === 0 && <p>No one in line.</p>}
          {people.map((person, index) => {
            return (
              <p person={person} key={index} className='center-list'>
                <li> {person + ' '} </li>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
