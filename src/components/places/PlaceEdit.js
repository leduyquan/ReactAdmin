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
  FunctionField
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

const PlaceEdit = props => (
  <Edit title={<PlaceTitle type="Edit" />} {...props}>
    <TabbedForm>
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
        <TextInput
          source="subType"
          validate={required()}
          style={styles.inputInline}
        />
        <TextInput source="owner" />
        <FunctionField
          id="markerIcon"
          label="Marker Icon"
          render={record => {
            if (record.makerIcon === null || record.makerIcon === "") {
              return null;
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
                  field="markerIcon"
                  recordId={record.id}
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
              return null;
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
            <TextInput source="audio" />
            <TextInput source="video" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="IMAGES">
        <ArrayInput source="images" style={styles.images}>
          <SimpleFormIterator>
            <TextInput source="url" />
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

export default PlaceEdit;
