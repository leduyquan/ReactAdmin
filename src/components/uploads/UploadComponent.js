import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { AppConstant } from "../../providers/constants";
import { CircularProgress } from "@material-ui/core";
import myDataProvider from "../../providers/myDataProvider";
import PropTypes from "prop-types";

import { GET_ONE, withDataProvider } from "react-admin";

const dataProvider = myDataProvider(AppConstant.API_URL);

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", name: "", loading: false };
  }

  handleUpload = () => {
    const { recordId, showNotification, type, field } = this.props;
    this.userData.set("type", type);
    this.userData.set("field", field);

    this.setState({ loading: true });

    // const uploadRecord = { type: type, field: field, images: [this.userData] };
    if (this.props.fileType === "image/*") {
      fetch(`${AppConstant.API_URL}/${type}/${recordId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: this.userData
      })
        .then(response => {
          this.setState({ loading: false });
          if (response.status !== 200) {
            this.setState({ file: "" });
            this.userData.set("images[]", null);
            showNotification("Error: Upload failed", "warning");
          } else {
            this.setState({ file: "" });
            this.userData.set("images[]", null);
            const { dataProvider, dispatch, record } = this.props;
            dataProvider(
              GET_ONE,
              "places-admin",
              { id: recordId },
              {
                onSuccess: {
                  notification: { body: "Upload sucessfully", level: "info" }
                },
                onError: {
                  notification: {
                    body: "Error: Upload failed.",
                    level: "warning"
                  }
                }
              }
            );
          }
        })
        .catch(e => {
          this.setState({ file: "", loading: false });
          this.userData.set("file", null);
          showNotification("Error: Upload failed", "warning");
        });
    }

    if (
      this.props.fileType === "audio/*" ||
      this.props.fileType === "video/*"
    ) {
      this.userData.set("languageCode", this.props.languageCode);
      fetch(`${AppConstant.API_URL}/${type}/${recordId}/media`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: this.userData
      })
        .then(response => {
          this.setState({ loading: false });
          if (response.status !== 200) {
            this.setState({ file: "" });
            this.userData.set("file", null);
            showNotification("Error: Upload failed", "warning");
          } else {
            this.setState({ file: "" });
            this.userData.set("file", null);
            showNotification("Upload successfully");
            window.location.reload();
          }
        })
        .catch(e => {
          this.setState({ file: "", loading: false });
          this.userData.set("file", null);
          showNotification("Error: Upload failed", "warning");
        });
    }
  };

  componentDidMount = () => {
    this.userData = new FormData();
  };

  handleClickInputFile = event => {
    event.target.value = "";
  };

  handleChange = event => {
    console.log("state loading", this.state.loading);
    if (this.props.fileType === "image/*") {
      this.userData.delete("images[]");
      const values = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        this.userData.append("images[]", values[i]);
      }

      this.setState({ file: values[0] });
    }

    if (
      this.props.fileType === "audio/*" ||
      this.props.fileType === "video/*"
    ) {
      this.userData.delete("file");
      const value = event.target.files[0];
      this.userData.set("file", value);
      this.setState({ file: value });
    }
  };

  cancelUpload = event => {
    this.setState({ file: "" });
  };

  render() {
    return (
      <div style={{ display: "inline-block" }} key={this.props.key}>
        <input
          accept={this.props.fileType}
          style={{ display: "none" }}
          id={`icon-button-file_${this.props.name}`}
          type="file"
          onChange={e => this.handleChange(e)}
          onClick={this.handleClickInputFile}
        />

        {this.state.file === "" ? (
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
            {this.state.loading && (
              <CircularProgress style={{ color: "secondary", size: 24 }} />
            )}

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
              {this.state.file ? this.state.file.name : ""}
            </span>
          </div>
        )}
      </div>
    );
  }
}

UploadButton.propTypes = {
  dataProvider: PropTypes.func.isRequired,
  record: PropTypes.object
};

export default withDataProvider(UploadButton);
