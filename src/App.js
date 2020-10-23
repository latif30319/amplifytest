import React, {useEffect, useState} from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  //For rendering state
  const [people, updatePeople] = useState([]); //Will create an empty Array, to be updated by updatePeople


  //For invoking APIs
  async function callApi(){
    try {
      const peopleData = await API.get('mainappapi', '/people');
      console.log('peopleData: ', peopleData);
      //Once data is back from the API call, update
      updatePeople(peopleData.people);

    }
    catch(err) {
      console.log({err})
    }
  }

  useEffect(() => {
    callApi()},[])

  return (
    <div className="App">
      <h1>The Beatles People App</h1>
        {
          people.map((p, i) => <h2>{p.name}</h2>)
        }


      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

