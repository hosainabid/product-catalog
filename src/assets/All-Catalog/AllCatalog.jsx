import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import SingleProduct from "../Single-Product/SingleProduct";
import "./style.css";

const AllCatalog = () => {
	const [downloadedImages, setDownloadedImages] = useState([]);
	const [products, setProducts] = useState([]);
	const [showingSingleProd, setShowingSingleProd] = useState(null);

	function setShowingSingleProdCarrier(idx) {
		setShowingSingleProd(idx);
	}

	console.log("showingSingleProd~~> ", showingSingleProd);

	useEffect(() => {
		async function fetchData() {
			const querySnapshot = await getDocs(
				collection(db, "image-catalog")
			);

			const awaitFetchCompletion = async () => {
				let productsTemp;
				querySnapshot.forEach((doc) => {
					let data = doc.data();
					console.log("data~~> ", data);
					setDownloadedImages(data.images);
					productsTemp = productsTemp
						? [...productsTemp, data]
						: [data];
				});
				return productsTemp;
			};
			setProducts(await awaitFetchCompletion());
		}
		fetchData();
	}, []);

	return (
		<div id="all-products">
			{/* <button onClick={(e) => fetchData(e)}>Fetch your data</button>; */}
			{products &&
				(products.length > 0 ? (
					products.map((pd, key) => {
						console.log("Product", pd);
						return (
							<>
								<div
									className={
										showingSingleProd === null
											? "product-div"
											: "single-prod-div"
									}
									key={key}
								>
									{showingSingleProd === key ? (
										<SingleProduct
											img={pd.images}
											name={pd.name}
											desc={pd.description}
											category={pd.category}
											idx={key}
											carrier={
												setShowingSingleProdCarrier
											}
										/>
									) : showingSingleProd === null ? (
										<SingleProduct
											img={pd.images}
											name={pd.name}
											desc={pd.description}
											category={pd.category}
											idx={key}
											carrier={
												setShowingSingleProdCarrier
											}
										/>
									) : (
										<></>
									)}
									{/* <a href={URL.createObjectURL(pd.images[0])}>
										Download
									</a> */}
								</div>
							</>
						);
					})
				) : (
					// <img src={downloadedImages[0]} alt="" />
					<p>Loading...</p>
				))}
		</div>
	);
};

export default AllCatalog;
