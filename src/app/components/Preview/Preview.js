import React from "react";
import PropTypes from 'prop-types';

import "./Preview.css";

const Preview = ({ selectedDisplate, onDelete }) => {
	if (selectedDisplate === undefined) {
		return null;
	}

	const { imageUrl, title, price, id, artStyle, orientation, author } = selectedDisplate;

	return (
		<div className="preview_wrapper">
			<div className="preview_wrapper__image">
				{
					imageUrl
						? <img src={`https://displate.com${imageUrl}`} alt={title} />
						: <img src={`https://via.placeholder.com/280x392/D3D3D3`} alt="placeholder" />
				}
			</div>
			<div className="preview_wrapper__details">
				<h5 className="heading">{title}</h5>
				<p className="price">{price.formatted}</p>
				<p className="description">
					{id},
					{artStyle},
					{orientation},
					{
						author && author.fullName
							? author.fullName
							: ''
					}
				</p>
			</div>
			<div className="preview_wrapper__buttons">
				<button
					className="button"
					onClick={() => {
						onDelete(id);
				}}>
					Delete
        </button>
			</div>
		</div>
	)
};

Preview.propTypes = {
	onDelete: PropTypes.func,
	selectedDisplate: PropTypes.shape({
		artStyle: PropTypes.string,
		author: PropTypes.shape({
			fullName: PropTypes.string
		}),
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		orientation: PropTypes.string,
		price: PropTypes.shape({
			formatted: PropTypes.string
		}),
		title: PropTypes.string,
	})
};

export default Preview;