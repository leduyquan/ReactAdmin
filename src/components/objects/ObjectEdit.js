import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required
} from 'react-admin';
import ObjectTitle from './ObjectTitle';


const ObjectEdit = props => (
  <Edit title={<ObjectTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="code" validate={required()} />
      <TextInput source="regionCode" validate={required()} />
      <ArrayInput source="images">
        <SimpleFormIterator>
          <TextInput source="url"/>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default ObjectEdit;