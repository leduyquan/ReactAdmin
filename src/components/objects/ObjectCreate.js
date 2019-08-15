import React from "react";

import { Create, TextInput, SimpleForm, required, ReferenceInput, SelectInput } from "react-admin";

const ObjectCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        label="Name"
        source="translations[0].title"
        validate={required()}
      />
      <ReferenceInput label="Region" validate={required()} source="regionID" reference="regions-admin">
        <SelectInput optionText="translations[0].title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default ObjectCreate;
