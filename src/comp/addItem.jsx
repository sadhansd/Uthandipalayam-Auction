import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import auctionServices from "../services/auction.services";
import "./form.css";

function AddItem({ id, setId }) {
  const [Customer, setCustomer] = useState("");
  const [Product, setProduct] = useState("");
  const [Price, setPrice] = useState("");
  const [msg, setMsg] = useState({ error: false, msg: "" });

  const editHandler = async () => {
    try {
      const docsnap = await auctionServices.getdata(id);
      setCustomer(docsnap.data().Customer);
      setProduct(docsnap.data().Product);
      setPrice(docsnap.data().Price);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (Customer === "" || Product === "" || Price === "") {
      setMsg({ error: true, msg: "All fields are mandatory !" });
      return;
    }
    const newdata = {
      Customer,
      Product,
      Price,
    };

    try {
      if (id !== undefined && id !== "") {
        await auctionServices.updateData(id, newdata);
        setMsg({ error: false, msg: "Successfully Updated" });
        setId("");
        window.location.reload(false);
      } else {
        await auctionServices.adddata(newdata);
        setMsg({ error: false, msg: "Successfully added " });
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }

    setCustomer("");
    setProduct("");
    setPrice("");
  };

  return (
    <>
      <div className="containers">
        <div className="d-flex justify-content-center">
          <h1>ADD ITEM</h1>
        </div>

        {msg?.msg && (
          <div
            class="alert alert-dark alert-dismissible fade show"
            role="alert"
          >
            {msg?.msg}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setMsg("")}
            ></button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div class="input-group mb-3">
            <input
              type="text"
              class="textbox form-control"
              placeholder="Customer"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={Customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <input
              type="text"
              class="textbox form-control"
              placeholder="Product"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={Product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <input
              type="text"
              class="textbox form-control"
              placeholder="Price"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div class="refresh d-flex justify-content-center">
            <button type="Submit" class="btn btn-secondary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddItem;
