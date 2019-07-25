import React from 'react';

import {
  Create,
  TextInput,
  LongTextInput,
  ArrayInput,
  ReferenceInput,
  SimpleFormIterator,
  SelectInput,
  SimpleForm,
  required
} from 'react-admin';
import PureChipField from '../../common/simpleArray'
import PlaceTitle from './PlaceTitle';

const PlaceCreate = props => (
  <Create title={<PlaceTitle type="Create" />} {...props}>
    <SimpleForm>
      <TextInput label="Name" source="translations[0].title" validate={required()} />
      <TextInput source="code" />
      <TextInput source="type" />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;