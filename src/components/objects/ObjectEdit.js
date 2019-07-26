import React from 'react';
import {
  TabbedForm,
  FormTab,
  Edit,
  TextInput,
  ArrayInput,
  LongTextInput,
  SimpleFormIterator,
  required
} from 'react-admin';
import ObjectTitle from './ObjectTitle';

const ObjectEdit = props => (
  <Edit title={<ObjectTitle />} {...props}>
    <TabbedForm>
      <FormTab label="SUMMARY">
        <TextInput source="code" validate={required()} />
        <TextInput source="regionCode" validate={required()} />
      </FormTab>
      <FormTab label="TRANSLATIONS">
        <ArrayInput source="translations">
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
    </TabbedForm>
  </Edit>
);

export default ObjectEdit;