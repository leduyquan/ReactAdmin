import React from "react";
import users from "./components/users";
import places from "./components/places";
import regions from "./components/regions";
import objects from "./components/objects";
import languages from "./components/languages";
import dashboard from "./components/dashboard";
import authProvider from "./providers/authProvider";
import myDataProvider from "./providers/myDataProvider";
import { Admin, Resource } from "react-admin";
import { AppConstant } from "./providers/constants";
import vietnameseMessages from "ra-language-vietnamese";
import englishMessages from "ra-language-english";
import "./App.css";

const dataProvider = myDataProvider(AppConstant.API_URL);
const displayLabel = name => ({ label: name });
const messages = {
  vi: vietnameseMessages,
  en: englishMessages
};

const i18nProvider = locale => messages[locale];

const App = () => (
  <Admin
    locale="en"
    i18nProvider={i18nProvider}
    dashboard={dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="users-admin" options={displayLabel("Users")} {...users} />
    <Resource
      name="places-admin"
      options={displayLabel("Places")}
      {...places}
    />
    <Resource
      name="regions-admin"
      options={displayLabel("Regions")}
      {...regions}
    />
    <Resource
      name="objects-admin"
      options={displayLabel("Objects")}
      {...objects}
    />
    <Resource
      name="languages"
      options={displayLabel("Languages")}
      {...languages}
    />
  </Admin>
);

export default App;
