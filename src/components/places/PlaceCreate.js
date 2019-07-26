import React from 'react';

import {
  Create,
  TextInput,
  SimpleForm,
  SelectInput,
  required
} from 'react-admin';
import PlaceTitle from './PlaceTitle';

const typeOptions = [
  { id: 'sightseeing', name: 'Sightseeing' },
  { id: 'hotel', name: 'Hotel' },
  { id: 'restaurant', name: 'Restaurant' },
  { id: 'restroom', name: 'Restroom' },
];

const PlaceCreate = props => (
  <Create title={<PlaceTitle type="Create" />} {...props}>
    <SimpleForm>
      <TextInput label="Name" source="translations[0].title" validate={required()} />
      <TextInput source="code" validate={required()} />
      <SelectInput source="type" validate={required()}  choices={typeOptions} />
      <TextInput source="subType" validate={required()} />
      <TextInput source="owner" />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;