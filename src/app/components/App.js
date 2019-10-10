import React, { Component } from "react";
import PropTypes from 'prop-types';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";

import Table from "./Table/Table";
import Preview from "./Preview/Preview";
import FormAddDisplate from "./FormAddDisplate/FormAddDisplate";

import { connect } from "react-redux";
import { fetchData, deleteRow, addRow } from "../actions";

import "./App.css";

const override = css`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

class App extends Component {
  state = { selectedDisplateId: 0 };

  componentDidMount() {
    this.props.fetchData();
  }

  handleSelectedDisplateId = selectedDisplateId => {
    this.setState({ selectedDisplateId });
  }

  render() {
    const { data, loading, deleteRow, addRow } = this.props;
    const selectedDisplate = data.find(el => el.id === this.state.selectedDisplateId);

    if (loading) {
      return (
        <BeatLoader
          color={"#1185ed"}
          css={override}
          loading={loading}
          size={25}
          sizeUnit={"px"}
        />
      );
    }

    return (
      <div className="App">
        <div className="container">
          <Table
            data={data}
            onDelete={deleteRow}
            onSelectChange={selectedDisplateId => this.handleSelectedDisplateId(selectedDisplateId)}
            selectedDisplateId={this.state.selectedDisplateId}
          />
          <Preview
            onDelete={deleteRow}
            selectedDisplate={selectedDisplate}
          />
        </div>
        <FormAddDisplate
          onAdd={addRow}
        />
      </div>
    );
  }
}

const mapStatToProps = state => ({
  data: state.displates.displatesList,
  loading: state.displates.loading
});

App.propTypes = {
  addRow: PropTypes.func,
  data: PropTypes.array,
  deleteRow: PropTypes.func,
  fetchData: PropTypes.func,
  loading: PropTypes.bool
};

export default connect(mapStatToProps, {
  addRow,
  deleteRow,
  fetchData
})(App);