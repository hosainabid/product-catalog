import React, { useState } from "react";
import Product from "../Product/Product";
import "./style.css";

const SingleProduct = (props) => {
	const [showingProduct, setShowingProduct] = useState(false);

	function handleShowProduct() {
		props.carrier(props.idx);
		setShowingProduct(true);
	}

	function handleHideProduct() {
		props.carrier(null);
		setShowingProduct(false);
	}

	return (
		<div className="single-product">
			{showingProduct ? (
				<div className="one-product">
					<button onClick={() => handleHideProduct()}>Back</button>
					<Product
						img={props.img}
						name={props.name}
						desc={props.desc}
						cat={props.category}
					/>
				</div>
			) : (
				<div className="single-product-list">
					<img
						src={props.img[0]}
						alt=""
						onClick={() => handleShowProduct()}
					/>
					<h1 onClick={() => handleShowProduct()}>{props.name}</h1>
					<h2 onClick={() => handleShowProduct()}>
						{props.category}
					</h2>
				</div>
			)}
		</div>
	);
};

export default SingleProduct;
