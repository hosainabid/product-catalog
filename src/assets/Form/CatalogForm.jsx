import { collection, addDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";
import "./style.css";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

function CatalogForm() {
	const valid_formats = ["jpg", "png", "jpeg"];
	const storage = getStorage();

	const [products, setProducts] = useState([]);

	const metadata = {
		contentType: "image/jpeg",
	};

	function checkImageFormat(images) {
		let validity = false;
		for (let i = 0; i < images.length; i++) {
			let current = images[i].name.length - 1;
			let format = "";

			console.log("current~~> ", current);
			console.log("images~~> ", images);
			console.log("images[i].name[current]~~> ", images[i].name[current]);

			while (images[i].name[current] !== ".") {
				format = [images[i].name[current], ...format];
				current--;
			}

			let joinedFormat = format.join("");

			for (let j = 0; j < valid_formats.length; j++) {
				if (joinedFormat.includes(valid_formats[j])) {
					validity = true;
				}

				if (validity === false) {
					return validity;
				}
			}
		}
		return validity;
	}

	async function postData(input, urls) {
		console.log("IN postData() urls~~> ", urls);

		try {
			const docRef = await addDoc(collection(db, "image-catalog"), {
				name: input.name,
				productId: input.productId,
				description: input.description,
				category: input.category,
				images: urls,
			});

			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	const [formFields, setFormFields] = useState({
		name: "",
		productId: "",
		description: "",
		category: "Kamiz",
		images: undefined,
	});

	async function handleSubmit(e) {
		e.preventDefault();

		console.log("e.target~~> ", e.target.length);
		console.log("formFields~~> ", formFields);
		console.log("formFields.images~~> ", formFields.images);

		checkImageFormat(formFields.images);
		let urlList = [];

		for (let i = 0; i < formFields.images.length; i++) {
			const storageRef = ref(
				storage,
				"images/" + Math.random() * 1000 + formFields.images[i].name
			);
			const uploadTask = uploadBytesResumable(
				storageRef,
				formFields.images[i],
				metadata
			);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				(error) => {
					switch (error.code) {
						case "storage/unauthorized":
							break;
						case "storage/canceled":
							break;
						case "storage/unknown":
							break;
					}
				},
				async () => {
					let downloadURL = await getDownloadURL(
						uploadTask.snapshot.ref
					);
					urlList.push(downloadURL);
					console.log("urlList~~> ", urlList);
					console.log("File available at", downloadURL);
					if (urlList.length === formFields.images.length) {
						await postData(formFields, urlList);
						alert("Product Uploaded successfully!");
						location.reload();
					}
				}
			);
		}
	}

	function handleNameChange(e) {
		setFormFields({ ...formFields, name: e.target.value });
	}

	function handleProductIdChange(e) {
		setFormFields({ ...formFields, productId: e.target.value });
	}

	function handleDescriptionChange(e) {
		setFormFields({ ...formFields, description: e.target.value });
	}

	function handleCategoryChange(e) {
		setFormFields({ ...formFields, category: e.target.value });
	}

	function handleImagesChange(e) {
		console.log("e.target~~> ", e.target);
		console.log("e.target.value~~> ", e.target.value);
		console.log("e.target.files~~> ", e.target.files);

		setFormFields({
			...formFields,
			images: formFields.images
				? [...formFields.images, e.target.files[0]]
				: [e.target.files[0]],
		});
	}

	function handleDeleteImg(idx) {
		setFormFields({
			...formFields,
			images: formFields.images.filter((_, index) => {
				return index !== idx;
			}),
		});
	}

	console.log("products~~> ", products);

	return (
		<div id="form-main">
			<form action="" method="POST" onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					name="name"
					id=""
					placeholder="Product Name"
					onChange={(e) => handleNameChange(e)}
				/>
				<input
					type="text"
					name="productId"
					id=""
					onChange={(e) => handleProductIdChange(e)}
					placeholder="Product ID"
				/>

				<input
					type="text"
					name="description"
					id=""
					onChange={(e) => handleDescriptionChange(e)}
					placeholder="Product Description"
				/>

				<select
					name="category"
					id=""
					onChange={(e) => handleCategoryChange(e)}
				>
					<option value="Kamiz">Kamiz</option>
					<option value="Saree">Saree</option>
					<option value="Western">Western</option>
					<option value="Traditional">Traditional</option>
				</select>

				{console.log("formFields.images~~> ", formFields.images)}
				<input
					type="file"
					onChange={(e) => handleImagesChange(e)}
					className="custom-file-input"
				/>
				<div className="img-blob">
					{formFields.images &&
						formFields.images.map((img, idx) => {
							let url = URL.createObjectURL(img);
							console.log("url~~> ", url);
							return (
								<>
									<img
										src={url}
										alt=""
										key={idx}
										onClick={(e) => handleDeleteImg(idx)}
									/>
								</>
							);
						})}
				</div>
				{/*  <input type='file' onChange={e => handleImagesChange(e)} />  */}
				{/*  <input type='file' onChange={e => handleImagesChange(e)} />  */}
				<input type="submit" value="Submit" />
			</form>

			{/* <h2>List of products</h2>
			{products.length > 0 ? (
				products.map((prod) => {
					console.log("prod~~> ", prod);
					console.log("prod.images~~> ", prod.images);
					return (
						<>
							<p>Prod name: {prod.name}</p>
						</>
					);
				})
			) : (
				<p>No products fetched</p>
			)} */}
		</div>
	);
}

export default CatalogForm;
