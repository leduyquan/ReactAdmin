import React from 'react';
import users from './components/users';
import places from './components/places';
import objects from './components/objects';
import languages from './components/languages';
import dashboard from './components/dashboard';
import authProvider from './providers/authProvider';
//import dataProvider from './providers/dataProvider';
import myDataProvider from './providers/myDataProvider';
import server from 'ra-data-json-server'
import { Admin, Resource } from 'react-admin';
import { AppConstant } from "./providers/constants";
import './App.css';


const dataProvider = myDataProvider(AppConstant.API_URL);
//const dataProvider = server('http://localhost:8000')
const displayLabel = name => ({ label: name })
const App = () => (
  <Admin dashboard={dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="users-admin" options={displayLabel('Users')} {...users} />
    <Resource name="places" options={displayLabel('Places')} {...places} />
    <Resource name="objects" options={displayLabel('Objects')} {...objects} />
    <Resource name="languages" options={displayLabel('Languages')} {...languages} />
  </Admin>
)

export default App;
