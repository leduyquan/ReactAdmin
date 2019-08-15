import React from "react";
import {
  Filter,
  SearchInput,
  List,
  Datagrid,
  TextField,
  EditButton,
  ReferenceField,
  DeleteButton,
  FunctionField
} from "react-admin";
import { AppConstant } from "../../providers/constants";
import ObjectTitle from "./ObjectTitle";

const ObjectFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
);

const ObjectList = props => (
  <List filters={<ObjectFilter />} title={<ObjectTitle type="Objects" />} {...props}>
    <Datagrid>
      <TextField label="Name" source="translation[0].title" />
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
      <ReferenceField label="Region" source="regionID" reference="regions-admin">
        <TextField source="translations[0].title" />
      </ReferenceField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ObjectList;
