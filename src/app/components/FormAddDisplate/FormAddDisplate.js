import React from "react";
import PropTypes from 'prop-types';

import { Form, Field } from "react-final-form";
import shortid from "shortid";

import "./Form.css";

const required = value => (value ? undefined : "Required");

const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const FormAddDisplate = ({ onAdd }) => {
  const onSubmit = objValues => {
    const formattedPrice = {
      formatted: objValues['price']
    };

    const id = shortid.generate();
    const sendData = { ...objValues, id };

    sendData.price = formattedPrice;

    onAdd(sendData);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form
          className="add_form"
          onSubmit={handleSubmit}
        >

          <Field name="title" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Title</label>
                <input {...input} type="text" placeholder="title" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field name="artStyle" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>ArtStyle</label>
                <input {...input} type="text" placeholder="artStyle" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field name="orientation" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Orientation</label>
                <input {...input} type="text" placeholder="orientation" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field name="price" validate={composeValidators(required, mustBeNumber)}>
            {({ input, meta }) => (
              <div>
                <label>Price</label>
                <input {...input} type="text" placeholder="price" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <button
            className="add_form__button"
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
          <button
            className="add_form__button"
            type="button"
            onClick={form.reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </form>
      )}
    />
  )
};

FormAddDisplate.propTypes = {
  onAdd: PropTypes.func
};

export default FormAddDisplate;