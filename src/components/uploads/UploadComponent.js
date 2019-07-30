import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { showNotification } from "react-admin";
import { push } from "react-router-redux";

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = { photo: "", name: "" };
  }

  handleClick = () => {
    const { push, record, showNotification } = this.props;
    const updatedRecord = { ...record, is_approved: true };
    // fetch(`/comments/${record.id}`, { method: "PUT", body: updatedRecord })
    //   .then(() => {
    //     showNotification("Comment approved");
    //     push("/comments");
    //   })
    //   .catch(e => {
    //     showNotification("Error: comment not approved", "warning");
    //   });
  };

  componentDidMount = () => {
    // this.userData = new FormData();
  };

  handleChange = event => {
    const value = event.target.files[0];
    // this.userData.set("photo", value);
    this.setState({ photo: value });
  };

  textChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    console.log("props", this.props);
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
            >
              Upload
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

export default UploadButton;
