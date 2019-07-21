import React from 'react';
import users from './components/users';
import places from './components/places';
import objects from './components/objects';
import languages from './components/languages';
import dashboard from './components/dashboard';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import server from 'ra-data-json-server'
import { Admin, Resource } from 'react-admin';
import './App.css';


//const dataProvider = server('http://localhost:8000')
const App = () => (
  <Admin dashboard={dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="users" {...users} />
    <Resource name="places" {...places} />
    <Resource name="objects" {...objects} />
    <Resource name="languages" {...languages} />
  </Admin>
)

export default App;
