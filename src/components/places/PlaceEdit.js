import React from 'react';
import {
  Edit,
  TextInput,
  TabbedForm,
  FormTab,
  NumberInput,
  required
} from 'react-admin';
import PlaceTitle from './PlaceTitle';

const PlaceEdit = props => (
  <Edit title={<PlaceTitle type="Edit" />} {...props}>
    <TabbedForm>
      <FormTab label="SUMMARY">
        <TextInput source="code" validate={required()} />
        <TextInput source="type" validate={required()} />
        <TextInput source="subType" validate={required()} />
        <TextInput source="owner" />
        <NumberInput source="distance" />
        <NumberInput source="rating" />
      </FormTab>
      <FormTab label="TRASLATION">
        <TextInput label="Name" source="translations[0].title" validate={required()} />
        <TextInput label="Language code" source="translations[0].languageCode" />
        <TextInput label="Short description" source="translations[0].shortDescription" />
        <TextInput label="Video" source="translations[0].video" />
        <TextInput label="Audio" source="translations[0].audio" />
      </FormTab>
      <FormTab label="IMAGES">
        <TextInput source="makerIcon" />
        <TextInput source="thumbnail" />
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

export default PlaceEdit;