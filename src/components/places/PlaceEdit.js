import React, { Component } from "react";
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
  FormDataConsumer,
  DisabledInput,
  REDUX_FORM_NAME
} from "react-admin";
import Button from "@material-ui/core/Button";
import { change } from "redux-form";
import PlaceTitle from "./PlaceTitle";
import { styles } from "../../common/styleField";
import { AppConstant } from "../../providers/constants";
import UploadButton from "../uploads/UploadComponent";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./leaflet.css";

const typeOptions = [
  { id: "sightseeing", name: "Sightseeing" },
  { id: "hotel", name: "Hotel" },
  { id: "restaurant", name: "Restaurant" },
  { id: "restroom", name: "Restroom" }
];

const removeImage = (recordId, url) => {
  const img = {
    images: [{ url: url }]
  };
  fetch(`${AppConstant.API_URL}/places-admin/${recordId}/delete`, {
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

class PlaceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      marker: {
        lat: 0,
        lng: 0
      },
      zoom: 18,
      draggable: true
    };
    this.refmarker = React.createRef();
  }

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  };

  updatePosition = dispatch => {
    const marker = this.refmarker.current;

    if (marker != null) {
      const updatedMarker = marker.leafletElement.getLatLng();
      this.setState({
        marker: updatedMarker
      });

      if (dispatch !== undefined && dispatch !== null) {
        dispatch(
          change(REDUX_FORM_NAME, "location.coordinates.lat", updatedMarker.lat)
        );
        dispatch(
          change(
            REDUX_FORM_NAME,
            "location.coordinates.long",
            updatedMarker.lng
          )
        );
      }
    }
  };

  render() {
    const props = this.props;
    let position = [this.state.center.lat, this.state.center.lng];
    let markerPosition = [this.state.marker.lat, this.state.marker.lng];
    return (
      <Edit title={<PlaceTitle type="Edit" />} {...props}>
        <TabbedForm redirect="edit">
          <FormTab label="SUMMARY">
            <DisabledInput
              source="code"
              validate={required()}
              style={styles.inputInline}
            />
            <SelectInput
              source="type"
              validate={required()}
              choices={typeOptions}
            />
            <DisabledInput source="owner" />
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

            <DisabledInput source="distance" style={styles.inputInline} />
            <DisabledInput source="rating" />
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
                          type="places-admin"
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
          <FormTab label="LOCATION">
            <TextInput label="Type" source="location.type" />
            <FormDataConsumer>
              {({ formData, scopedFormData, getSource, dispatch, ...rest }) => {
                return (
                  <NumberInput
                    label="Coordinates lat"
                    source="location.coordinates.lat"
                    style={styles.inputInline}
                    onChange={() => this.updatePosition(null)}
                  />
                );
              }}
            </FormDataConsumer>

            <NumberInput
              label="Coordinates long"
              source="location.coordinates.long"
              onChange={() => this.updatePosition(null)}
            />
            <FormDataConsumer>
              {({ formData, scopedFormData, getSource, dispatch, ...rest }) => {
                if (
                  formData.location === undefined ||
                  formData.location === null
                ) {
                  position[0] = 0;
                  position[1] = 0;
                  markerPosition[0] = 0;
                  markerPosition[1] = 0;
                } else {
                  if (position[0] === 0 && position[1] === 0) {
                    position[0] = formData.location.coordinates.lat;
                    position[1] = formData.location.coordinates.long;
                  }

                  if (markerPosition[0] === 0 && markerPosition[1] === 0) {
                    markerPosition[0] = formData.location.coordinates.lat;
                    markerPosition[1] = formData.location.coordinates.long;
                  }
                }

                if (position[0] === 0 && position[1] === 0) {
                  position[0] = 16.46772;
                  position[1] = 107.57914;
                }

                if (markerPosition[0] === 0 && markerPosition[1] === 0) {
                  markerPosition[0] = 16.46772;
                  markerPosition[1] = 107.57914;
                }

                return (
                  <div id="mapId" className="leaflet-container">
                    <Map center={position} zoom={18}>
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        draggable={this.state.draggable}
                        onDragend={() => this.updatePosition(dispatch)}
                        position={markerPosition}
                        ref={this.refmarker}
                      >
                        >
                        <Popup minWidth={90}>
                          <span onClick={this.toggleDraggable}>
                            {this.state.draggable
                              ? "DRAG MARKER"
                              : "MARKER FIXED"}
                          </span>
                        </Popup>
                      </Marker>
                    </Map>
                  </div>
                );
              }}
            </FormDataConsumer>
          </FormTab>
          <FormTab label="BOUNDARY">
            <TextInput label="Type" source="boundary.type" />
            <ArrayInput
              label="Coordinates"
              source="boundary.coordinates"
              style={styles.boundaries}
            >
              <SimpleFormIterator>
                <NumberInput
                  label="North long"
                  source="north[0]"
                  style={styles.inputInline}
                />
                <NumberInput
                  label="North lat"
                  source="north[1]"
                  style={styles.inputInline}
                />
                <NumberInput
                  label="South long"
                  source="south[0]"
                  style={styles.inputInline}
                />
                <NumberInput label="South lat" source="south[1]" />
                <NumberInput
                  label="West long"
                  source="west[0]"
                  style={styles.inputInline}
                />
                <NumberInput
                  label="West lat"
                  source="west[1]"
                  style={styles.inputInline}
                />
                <NumberInput
                  label="East long"
                  source="east[0]"
                  style={styles.inputInline}
                />
                <NumberInput label="East lat" source="east[1]" />
              </SimpleFormIterator>
            </ArrayInput>
          </FormTab>
        </TabbedForm>
      </Edit>
    );
  }
}

export default PlaceEdit;
