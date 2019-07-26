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
import { styles } from '../../common/styleField';

const typeOptions = [
  { id: "sightseeing", name: "Sightseeing" },
  { id: "hotel", name: "Hotel" },
  { id: "restaurant", name: "Restaurant" },
  { id: "restroom", name: "Restroom" }
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
        <NumberInput source="distance" style={styles.inputInline} />
        <NumberInput source="rating" />
      </FormTab>
      <FormTab label="TRANSLATIONS">
        <ArrayInput source="translations" style={styles.translations}>
          <SimpleFormIterator>
            <TextInput label="Name" source="title" validate={required()} />
            <TextInput label="Language code" source="languageCode" />
            <LongTextInput label="Short description" source="shortDescription" />
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
        <NumberInput label="North lat" source="location.coordinates.north[0]" style={styles.inputInline} />
        <NumberInput label="North long" source="location.coordinates.north[1]" />
        <NumberInput label="South lat" source="location.coordinates.south[0]" style={styles.inputInline} />
        <NumberInput label="South long" source="location.coordinates.south[1]" />
        <NumberInput label="West lat" source="location.coordinates.west[0]" style={styles.inputInline} />
        <NumberInput label="West long" source="location.coordinates.west[1]" />
        <NumberInput label="East lat" source="location.coordinates.east[0]" style={styles.inputInline} />
        <NumberInput label="East long" source="location.coordinates.east[1]" />
      </FormTab>
      <FormTab label="BOUDARY">
        <TextInput label="Type" source="boundary.type" />
        <ArrayInput label="Coordinates" source="boundary.coordinates">
          <SimpleFormIterator>
            <NumberInput label="North lat" source="north[0]" />
            <NumberInput label="North long" source="north[1]" />
            <NumberInput label="South lat" source="south[0]" />
            <NumberInput label="South long" source="south[1]" />
            <NumberInput label="West lat" source="west[0]" />
            <NumberInput label="West long" source="west[1]" />
            <NumberInput label="East lat" source="east[0]" />
            <NumberInput label="East long" source="east[1]" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default PlaceEdit;
