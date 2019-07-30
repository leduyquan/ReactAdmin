import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { showNotification } from "react-admin";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { AppConstant } from "../../providers/constants";

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = { photo: "", name: "" };
  }

  handleUpload = () => {
    const { push, recordId, showNotification, type, field } = this.props;
    const uploadRecord = { type: type, field: field, data: this.userData };
    console.log("record", recordId);
    fetch(`${AppConstant.API_URL}/${type}/${recordId}`, {
      method: "POST",
      body: uploadRecord
    })
      .then(response => {
        if (response.status !== 200) {
          this.setState({ photo: "" });
          this.userData.set("photo", null);
          showNotification("Error: Upload failed", "warning");
        } else {
          this.setState({ photo: "" });
          this.userData.set("photo", null);
          showNotification("Upload successfully");
          push(`/places-admin/${recordId}`);
        }
      })
      .catch(e => {
        this.setState({ photo: "" });
        this.userData.set("photo", null);
        showNotification("Error: Upload failed", "warning");
      });
  };

  componentDidMount = () => {
    this.userData = new FormData();
  };

  handleChange = event => {
    const value = event.target.files[0];
    this.userData.set("photo", value);
    this.setState({ photo: value });
  };

  cancelUpload = event => {
    this.setState({ photo: "" });
  };

  render() {
    return (
      <div style={{ display: "inline-block" }} key={this.props.key}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id={`icon-button-file_${this.props.name}`}
          type="file"
          onChange={e => this.handleChange(e)}
        />

        {this.state.photo === "" ? (
          <label
            htmlFor={`icon-button-file_${this.props.name}`}
            id="labelButtonFile"
          >
            <Button
              id="buttonBrowse"
              style={{
                marginLeft: 10,
                marginBottom: 20,
                verticalAlign: "middle"
              }}
              variant="contained"
              color="primary"
              component="span"
            >
              Browse
            </Button>
          </label>
        ) : (
          <div>
            <Button
              style={{
                marginLeft: 10,
                marginBottom: 20,
                verticalAlign: "middle"
              }}
              variant="contained"
              color="primary"
              component="span"
              onClick={this.handleUpload}
            >
              Upload
            </Button>
            <Button
              style={{
                marginLeft: 10,
                marginBottom: 20,
                verticalAlign: "middle"
              }}
              variant="contained"
              color="secondary"
              component="span"
              onClick={this.cancelUpload}
            >
              Cancel
            </Button>
            <span style={{ marginLeft: "10px" }}>
              {this.state.photo ? this.state.photo.name : ""}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  {
    showNotification,
    push
  }
)(UploadButton);
