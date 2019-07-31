import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { showNotification } from "react-admin";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { AppConstant } from "../../providers/constants";
import { CircularProgress } from "@material-ui/core";

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = { photo: "", name: "", loading: false };
  }

  handleUpload = () => {
    const { recordId, showNotification, type, field } = this.props;
    this.userData.set("type", type);
    this.userData.set("field", field);

    // const uploadRecord = { type: type, field: field, images: [this.userData] };
    this.setState({ loading: true });
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
          this.setState({ photo: "" });
          this.userData.set("images[]", null);
          showNotification("Error: Upload failed", "warning");
        } else {
          this.setState({ photo: "" });
          this.userData.set("images[]", null);
          showNotification("Upload successfully");
          window.location.reload();
        }
      })
      .catch(e => {
        this.setState({ photo: "", loading: false });
        this.userData.set("photo", null);
        showNotification("Error: Upload failed", "warning");
      });
  };

  componentDidMount = () => {
    this.userData = new FormData();
  };

  handleClickInputFile = event => {
    event.target.value = "";
  };

  handleChange = event => {
    this.userData.delete("images[]");
    const values = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      this.userData.append("images[]", values[i]);
    }

    this.setState({ photo: values[0] });
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
          onClick={this.handleClickInputFile}
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
