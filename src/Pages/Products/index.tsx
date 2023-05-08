import React from "react";
import Headers from "../../Components/Headers/index";
import Modals from "./ModalsSucces";
import { Button, Table } from "react-bootstrap";
import Folletos from "../../assets/folletos.jpg";
export function Products() {
  const [products, setProducts] = React.useState([] as any[]);
  const newId = React.useRef<HTMLInputElement>(null);
  const newName = React.useRef<HTMLInputElement>(null);
  const newPrice = React.useRef<HTMLInputElement>(null);
  const newStock = React.useRef<HTMLInputElement>(null);
  const newDescription = React.useRef<HTMLInputElement>(null);

  function loadProducts() {
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  React.useEffect(() => {
    loadProducts();
  }, []);

  function deleteProduct(id: number) {
    fetch(`http://localhost:3001/api/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      loadProducts();
    });
  }

  function addProduct() {
    fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: +(newId.current?.value || 0),
        name: newName.current?.value,
        price: +(newPrice.current?.value || 0),
        description: +(newDescription.current?.value || 0),
      }),
    }).then(() => {
      loadProducts();
    });
  }

  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Headers />
      <h2 style={{ margin: "20px auto", fontSize: "100px" }}>YOUR PRODUCTS </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Eliminar/Agregar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          <tr key={0}>
            <td>
              <input
                className="form-control"
                type="text"
                id="new-id"
                ref={newName}
              />
            </td>
            <td>
              <input
                className="form-control"
                type="number"
                id="new-name"
                ref={newPrice}
              />
            </td>
            <td>
              <input
                className="form-control"
                type="number"
                id="new-price"
                ref={newStock}
              />
            </td>
            <td>
              <input
                className="form-control"
                type="text"
                id="new-stock"
                ref={newDescription}
              />
            </td>
            <td>
              <Button variant="success" onClick={() => addProduct()}>
                Agregar
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div style={{ margin: "30px" }}>
        <Modals />
      </div>
      <h1 style={{ fontSize: "200px" }}>MAKEA</h1>
    </div>
  );
}
