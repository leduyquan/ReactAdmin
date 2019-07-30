import React from "react";
import {
  Filter,
  SearchInput,
  List,
  Datagrid,
  TextField,
  EditButton
} from "react-admin";

const ObjectFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
);

const ObjectList = props => (
  <List filters={<ObjectFilter />} {...props}>
    <Datagrid>
      <TextField label="Name" source="translation[0].title" />
      <TextField source="code" />
      <TextField source="regionCode" />
      <EditButton />
    </Datagrid>
  </List>
);

export default ObjectList;
