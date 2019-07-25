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
      <TextInput source="code" validate={required()} />
      <LongTextInput source="makerIcon" />
      <LongTextInput source="thumbnail" />
      {/* <ArrayInput source="images">
        <SimpleFormIterator>
          <TextInput source="url"/>
        </SimpleFormIterator>
      </ArrayInput> */}
      <TextInput source="subType" />
      <TextInput source="type" />
      <TextInput source="owner" />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;