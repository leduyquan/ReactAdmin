import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  LongTextInput,
  TabbedForm
} from 'react-admin';
import PlaceTitle from './PlaceTitle';

const PlaceEdit = props => (
  <Edit title={<PlaceTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <LongTextInput source="title" />
    </SimpleForm>
  </Edit>
);

export default PlaceEdit;