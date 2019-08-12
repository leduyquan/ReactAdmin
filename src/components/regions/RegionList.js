import React from "react";
import {
  Filter,
  SearchInput,
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  FunctionField,
  ReferenceField
} from "react-admin";
import RegionTitle from "./RegionTitle";
import { AppConstant } from "../../providers/constants";

const RegionFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
);

const RegionList = props => (
  <List
    title={<RegionTitle type="Regions" />}
    filters={<RegionFilter />}
    {...props}
  >
    <Datagrid>
      <TextField label="Name" source="translations[0].title" />
      <FunctionField
        label="Image"
        render={record => {
          if (record.defaultImage === null || record.defaultImage === "") {
            return null;
          }
          return (
            <img
              alt={record.defaultImage}
              src={`${AppConstant.SERVER_IMAGE}${record.defaultImage}`}
              width={80}
              height={80}
            />
          );
        }}
      />
      <ReferenceField label="Place" source="parentID" reference="places-admin">
        <TextField source="translations[0].title" />
      </ReferenceField>
      <TextField source="type" />
      <TextField source="owner" />
      <TextField source="rating" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default RegionList;
