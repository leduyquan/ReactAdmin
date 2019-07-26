import React from "react";
import {
  Edit,
  TextInput,
  LongTextInput,
  TabbedForm,
  FormTab,
  NumberInput,
  SelectInput,
  required,
  ArrayInput,
  SimpleFormIterator
} from "react-admin";
import PlaceTitle from "./PlaceTitle";
import withStyles from "@material-ui/core/styles/withStyles";

export const styles = {
  translations: { display: "inline-block", width: "90%" }
};

const PlaceEdit = ({ classes, ...props }) => (
const typeOptions = [
  { id: 'sightseeing', name: 'Sightseeing' },
  { id: 'hotel', name: 'Hotel' },
  { id: 'restaurant', name: 'Restaurant' },
  { id: 'restroom', name: 'Restroom' },
];

const PlaceEdit = props => (
  <Edit title={<PlaceTitle type="Edit" />} {...props}>
    <TabbedForm>
      <FormTab label="SUMMARY">
        <TextInput source="code" validate={required()} />
        <SelectInput source="type" validate={required()} choices={typeOptions} />
        <TextInput source="subType" validate={required()} />
        <TextInput source="owner" />
        <LongTextInput source="makerIcon" />
        <LongTextInput source="thumbnail" />
        <NumberInput source="distance" />
        <NumberInput source="rating" />
      </FormTab>
      <FormTab label="TRANSLATIONS">
        <ArrayInput source="translations" className={classes.translations}>
          <SimpleFormIterator>
            <TextInput label="Name" source="title" validate={required()} />
            <TextInput label="Language code" source="languageCode" />
            <LongTextInput
              label="Short description"
              source="shortDescription"
            />
            <TextInput source="audio" />
            <TextInput source="video" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="IMAGES">
        <ArrayInput source="images">
          <SimpleFormIterator>
            <TextInput source="url" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="LOCATION">
        <TextInput label="Type" source="location.type" />
      </FormTab>
      <FormTab label="BOUDARY">
        <TextInput label="Type" source="boundary.type" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default withStyles(styles)(PlaceEdit);
