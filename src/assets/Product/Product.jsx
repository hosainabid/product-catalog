import React from "react";
import "./style.css";

const Product = (props) => {
	console.log("props.img~~> ", props.img);

	return (
		<div className="pd-page">
			<div className="pd-headlines">
				<h1>{props.name}</h1>
				<h2>{props.cat}</h2>
				<p>{props.desc}</p>
			</div>
			<div className="pd-images">
				{props.img.map((img, key) => {
					return (
						<div key={key} className="img-with-download">
							<img src={img} alt="" />
							<button
								onClick={async () => {
									const res = await fetch(img);
									const blob = await res.blob();
									const href = URL.createObjectURL(blob);
									const anchorTag =
										document.createElement("a");
									anchorTag.href = href;
									anchorTag.download = blob;
									document.body.appendChild(anchorTag);
									anchorTag.click();
								}}
							>
								Download
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Product;
