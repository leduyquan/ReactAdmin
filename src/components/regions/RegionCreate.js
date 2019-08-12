import React from "react";

import {
  Create,
  TextInput,
  SimpleForm,
  SelectInput,
  required,
  ReferenceInput
} from "react-admin";
import RegionTitle from "./RegionTitle";

const typeOptions = [
  { id: "sightseeing", name: "Sightseeing" },
  { id: "hotel", name: "Hotel" },
  { id: "restaurant", name: "Restaurant" },
  { id: "restroom", name: "Restroom" }
];

const redirect = (basePath, id, data) => {
  return `/regions-admin/${id}`;
};

const RegionCreate = props => (
  <Create title={<RegionTitle type="Create" />} {...props}>
    <SimpleForm redirect={redirect}>
      <TextInput
        label="Name"
        source="translations[0].title"
        validate={required()}
      />
      <ReferenceInput label="Place" validate={required()} source="parentID" reference="places-admin">
        <SelectInput optionText="translations[0].title" />
      </ReferenceInput>
      <SelectInput source="type" validate={required()} choices={typeOptions} />
      <TextInput source="owner" />
    </SimpleForm>
  </Create>
);

export default RegionCreate;
