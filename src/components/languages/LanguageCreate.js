import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Create,
  LongTextInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
} from 'react-admin';

const LanguageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <LongTextInput source="title" />
    </SimpleForm>
  </Create>
);

export default LanguageCreate;