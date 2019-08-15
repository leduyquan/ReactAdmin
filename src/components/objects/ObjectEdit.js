import React from 'react';
import {
  TabbedForm,
  FormTab,
  Edit,
  TextInput,
  ArrayInput,
  LongTextInput,
  SimpleFormIterator,
  required,
  DisabledInput,
  ReferenceInput,
  SelectInput,
  FormDataConsumer
} from 'react-admin';
import ObjectTitle from './ObjectTitle';
import UploadButton from "../uploads/UploadComponent";
import Button from "@material-ui/core/Button";
import { AppConstant } from "../../providers/constants";
import { styles } from "../../common/styleField";

const removeImage = (recordId, url) => {
  const img = {
    images: [{ url: url }]
  };
  fetch(`${AppConstant.API_URL}/objects-admin/${recordId}/delete`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(img)
  })
    .then(response => {
      window.location.reload();
      // }
    })
    .catch(e => {
      console.log("error remove ", e);
    });
};

const ObjectEdit = props => (
  <Edit title={<ObjectTitle type="Edit" />} {...props}>
    <TabbedForm>
      <FormTab label="SUMMARY">
        <DisabledInput
          source="code"
          validate={required()}
          style={styles.inputInline}
        />
        <ReferenceInput label="Region" validate={required()} source="regionID" reference="regions-admin">
          <SelectInput optionText="translations[0].title" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="TRANSLATIONS">
        <ArrayInput source="translations" style={styles.translations}>
          <SimpleFormIterator>
            <TextInput label="Name" source="title" validate={required()} />
            <TextInput label="Language code" source="languageCode" />
            <LongTextInput
              label="Short description"
              source="shortDescription"
            />
            <LongTextInput label="Audio" source="audio" disabled={true} />
            <FormDataConsumer>
              {({ formData, scopedFormData, getSource, ...rest }) => {
                if (scopedFormData && scopedFormData.languageCode) {
                  return (
                    <UploadButton
                      name="audioUploadButton"
                      type="objects-admin"
                      field="audio"
                      fileType="audio/*"
                      recordId={props.id}
                      languageCode={scopedFormData.languageCode}
                    />
                  );
                } else {
                  return null;
                }
              }}
            </FormDataConsumer>

            <LongTextInput label="Video" source="video" disabled={true} />
            <FormDataConsumer>
              {({ formData, scopedFormData, getSource, ...rest }) => {
                if (scopedFormData && scopedFormData.languageCode) {
                  return (
                    <UploadButton
                      name="videoUploadButton"
                      type="objects-admin"
                      field="video"
                      fileType="video/*"
                      recordId={props.id}
                      languageCode={scopedFormData.languageCode}
                    />
                  );
                } else {
                  return null;
                }
              }}
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="IMAGES">
        <ArrayInput source="images" style={styles.images}>
          <SimpleFormIterator disableRemove>
            <FormDataConsumer>
              {({ formData, scopedFormData, getSource, ...rest }) => {
                if (scopedFormData && scopedFormData.url) {
                  return (
                    <React.Fragment>
                      <img
                        alt={scopedFormData.url}
                        src={`${AppConstant.SERVER_IMAGE}${
                          scopedFormData.url
                          }`}
                        width={80}
                        height={80}
                        style={{ display: "inline-block" }}
                      />
                      <Button
                        key={scopedFormData.url}
                        style={{
                          marginLeft: 10,
                          marginBottom: 20,
                          verticalAlign: "middle"
                        }}
                        variant="contained"
                        color="secondary"
                        component="span"
                        onClick={() =>
                          removeImage(props.id, scopedFormData.url)
                        }
                      >
                        Remove
                          </Button>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <UploadButton
                      name={"imageUploadButton" + props.id}
                      type="objects-admin"
                      field="images"
                      recordId={props.id}
                      fileType="image/*"
                    />
                  );
                }
              }}
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ObjectEdit;