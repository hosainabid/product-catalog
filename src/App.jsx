import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import CatalogForm from "./assets/Form/CatalogForm";
import AllCatalog from "./assets/All-Catalog/AllCatalog";
import Product from "./assets/Product/Product";
import { useState } from "react";

function App() {
	const [htmlClass, setHtmlClass] = useState(false);
	const [catalogClass, setCatalogClass] = useState(false);
	const [mainClass, setMainClass] = useState(true);
	return (
		<div id="main-page" className={mainClass ? "main-page-flex" : null}>
			<div className="logo">
				<img src="Lily-Red-Logo.png" alt="" />
			</div>
			<div className={catalogClass ? "nav-bar-catalog" : "nav-bar-main"}>
				<nav>
					<ul>
						<li>
							<Link
								to="/"
								onClick={() => {
									setHtmlClass(false);
									setCatalogClass(false);
								}}
							>
								Catalog Form
							</Link>
						</li>
						<li>
							<Link
								to="/all-catalog"
								onClick={() => {
									setCatalogClass(true);
									setMainClass(false);
								}}
							>
								All Catalogs
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div>
				<Routes>
					<Route path="/" element={<CatalogForm />} />
					<Route path="/all-catalog" element={<AllCatalog />} />
					<Route path="/product" element={<Product />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
