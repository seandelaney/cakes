import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

let Form = props => {
  	const { submitting, formStatus, buttonLabel, handleSubmit, handleDelete, initialValues, showDeleteButton } = props;
	
	const yumFactors = [1, 2, 3, 4, 5];
	
	let deleteButton = null;
	
	if (showDeleteButton) {
		deleteButton = (<button type="button" name="delete" id="delete" className="btn btn-danger float-right" title="Delete Cake" onClick={event => handleDelete(event, initialValues)}>Delete Cake</button>)
	}
	
	return (
		<div className="row">
			<div className="col-sm-12 col-md-6 col-lg-4">
				{formStatus === 'error' ? <p className="text-danger">Sorry, there was an issue saving your cake. Please try again.</p> : ''}
				<form onSubmit={handleSubmit}>
					<Field type="text" name="name" id="name" component={renderField} label="Name" />
					<Field type="textarea" name="comment" id="comment" component={renderField} label="Comment" />
					<Field type="text" name="imageUrl" id="imageUrl" component={renderField} label="Image Url" />
					<Field type="select" name="yumFactor" id="yumFactor" component={renderField} options={yumFactors} label="Yum Factor" />
					<div className="clearfix">
						<button type="submit" name="submit" id="submit" className="btn btn-primary float-left" title="Submit" disabled={submitting}>{buttonLabel ? buttonLabel : 'Submit'}</button>
						{deleteButton}
					</div>
				</form>
			</div>
		</div>
	);
};

Form.propTypes = {
	formStatus: PropTypes.string,
	buttonLabel: PropTypes.string,
	handleSubmit: PropTypes.func.isRequired
};

const renderField = props => {
	const { id, type, input, label, options, className, meta: { touched, error }} = props;
	
	if (type === 'textarea') {
		return (
			<div className="form-group">
				<label htmlFor={id}>{label} <span className="text-danger">&#42;</span></label>
				<textarea {...input} id={id} className={className} title={label} rows="5" className="form-control" required></textarea>
				{touched && (error && <span className="form-text text-danger">{error}</span>)}
			</div>
		);
	} else if (type === 'select') {
		return (
			<div className="form-group">
				<label htmlFor={id}>{label} <span className="text-danger">&#42;</span></label>
				<select {...input} id={id} className={className} title={label} className="form-control" required>
					<option />
					{options.map(option => (<option value={option} key={option}>{option}</option>))}
				</select>
				{touched && (error && <span className="form-text text-danger">{error}</span>)}
			</div>
		);
	} else {
		return (
			<div className="form-group">
				<label htmlFor={id}>{label} <span className="text-danger">&#42;</span></label>
				<input type={type} {...input} id={id} className={className} title={label} className="form-control" required />
				{touched && (error && <span className="form-text text-danger">{error}</span>)}
			</div>
		);
	}
};

/* Validates the fields onblur, onchange... */
const validate = values => {
	const errors = {};
	
	if (!values.name) {
		errors.name = 'Name is required';
	}
	
	if (!values.comment) {
		errors.comment = 'Comment is required';
	}
	
	if (!values.imageUrl) {
		errors.imageUrl = 'Image Url is required';
	}
	
	if (!values.yumFactor) {
		errors.yumFactor = 'Yum Factor is required';
	}
		
	return errors;
};

Form = reduxForm({
	validate,
	form: 'cake'
})(Form);

export default hot(module)(Form);
