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
  SimpleFormIterator,
  FunctionField,
  FormDataConsumer
} from "react-admin";
import PlaceTitle from "./PlaceTitle";
import { styles } from "../../common/styleField";
import { AppConstant } from "../../providers/constants";
import UploadButton from "../uploads/UploadComponent";

const typeOptions = [
  { id: "sightseeing", name: "Sightseeing" },
  { id: "hotel", name: "Hotel" },
  { id: "restaurant", name: "Restaurant" },
  { id: "restroom", name: "Restroom" }
];

const PlaceEdit = props => {
  return (
    <Edit title={<PlaceTitle type="Edit" />} {...props}>
      <TabbedForm redirect="edit">
        <FormTab label="SUMMARY">
          <TextInput
            source="code"
            validate={required()}
            style={styles.inputInline}
          />
          <SelectInput
            source="type"
            validate={required()}
            choices={typeOptions}
            style={styles.inputInline}
          />
          <TextInput source="owner" />
          <FunctionField
            id="markerIcon"
            label="Marker Icon"
            render={record => {
              if (record.makerIcon === null || record.makerIcon === "") {
                return (
                  <UploadButton
                    name="thumbnailUploadButton"
                    type="places-admin"
                    field="thumbnail"
                    recordId={record.id}
                    fileType="image/*"
                  />
                );
              }
              return (
                <div>
                  <img
                    alt={record.makerIcon}
                    src={`${AppConstant.SERVER_IMAGE}${record.makerIcon}`}
                    width={80}
                    height={80}
                    style={{ display: "inline-block" }}
                  />
                  <UploadButton
                    name="markerUploadButton"
                    type="places-admin"
                    field="makerIcon"
                    recordId={record.id}
                    fileType="image/*"
                  />
                </div>
              );
            }}
          />

          <FunctionField
            id="thumbnailIcon"
            label="Thumbnail Icon"
            render={record => {
              if (record.thumbnail === null || record.thumbnail === "") {
                return (
                  <UploadButton
                    name="thumbnailUploadButton"
                    type="places-admin"
                    field="thumbnail"
                    recordId={record.id}
                    fileType="image/*"
                  />
                );
              }
              return (
                <div>
                  <img
                    alt={record.thumbnail}
                    src={`${AppConstant.SERVER_IMAGE}${record.thumbnail}`}
                    width={80}
                    height={80}
                    style={{ display: "inline-block" }}
                  />
                  <UploadButton
                    name="thumbnailUploadButton"
                    type="places-admin"
                    field="thumbnail"
                    recordId={record.id}
                    fileType="image/*"
                  />
                </div>
              );
            }}
          />

          <NumberInput source="distance" style={styles.inputInline} />
          <NumberInput source="rating" />
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
                        type="places-admin"
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
                        type="places-admin"
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
            <SimpleFormIterator>
              <FunctionField
                id="images"
                label="Image"
                render={record => {
                  console.log("record", record);
                  if (
                    record.url === undefined ||
                    record.url === null ||
                    record.url === ""
                  ) {
                    return (
                      <UploadButton
                        name={"imageUploadButton" + props.id}
                        type="places-admin"
                        field="images"
                        recordId={props.id}
                        fileType="image/*"
                      />
                    );
                  }
                  return (
                    <div>
                      <img
                        alt={record.url}
                        src={`${AppConstant.SERVER_IMAGE}${record.url}`}
                        width={80}
                        height={80}
                        style={{ display: "inline-block" }}
                      />
                      <UploadButton
                        name={"imageUploadButton" + props.id}
                        type="places-admin"
                        field="images"
                        recordId={props.id}
                        fileType="image/*"
                      />
                    </div>
                  );
                }}
              />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="LOCATION">
          <TextInput label="Type" source="location.type" />
          <NumberInput
            label="Coordinates lat"
            source="location.coordinates.lat"
            style={styles.inputInline}
          />
          <NumberInput
            label="Coordinates long"
            source="location.coordinates.long"
          />
        </FormTab>
        <FormTab label="BOUDARY">
          <TextInput label="Type" source="boundary.type" />
          <ArrayInput
            label="Coordinates"
            source="boundary.coordinates"
            style={styles.boundaries}
          >
            <SimpleFormIterator>
              <NumberInput
                label="North lat"
                source="north[0]"
                style={styles.inputInline}
              />
              <NumberInput
                label="North long"
                source="north[1]"
                style={styles.inputInline}
              />
              <NumberInput
                label="South lat"
                source="south[0]"
                style={styles.inputInline}
              />
              <NumberInput label="South long" source="south[1]" />
              <NumberInput
                label="West lat"
                source="west[0]"
                style={styles.inputInline}
              />
              <NumberInput
                label="West long"
                source="west[1]"
                style={styles.inputInline}
              />
              <NumberInput
                label="East lat"
                source="east[0]"
                style={styles.inputInline}
              />
              <NumberInput label="East long" source="east[1]" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default PlaceEdit;
