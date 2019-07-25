import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  LongTextInput,
  ArrayInput,
  SimpleFormIterator,
  required
} from 'react-admin';
import PlaceTitle from './PlaceTitle';

const PlaceEdit = props => (
  <Edit title={<PlaceTitle type="Edit" />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="code" validate={required()} />
      <LongTextInput source="makerIcon" />
      <LongTextInput source="thumbnail" />
      {/* <ArrayInput source="images">
        <SimpleFormIterator>
          <TextInput source="url" />
        </SimpleFormIterator>
      </ArrayInput> */}
      <TextInput source="subType" />
      <TextInput source="type" />
      <TextInput source="owner" />
    </SimpleForm>
  </Edit>
);

export default PlaceEdit;