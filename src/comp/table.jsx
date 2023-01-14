import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import auctionServices from "../services/auction.services";

function Table({ getId }) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const data = await auctionServices.getAll();
    console.log(data.docs);
    setItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const searchData = (e) => {
    const search = e.target.value.toLowerCase();
    const filterName = item.filter((names) =>
      names.Customer.toLowerCase().includes(search)
    );
    setItem(filterName);
  };

  const deleteHandler = async (id) => {
    await auctionServices.deleteData(id);
    getdata();
  };

  return (
    <>
      <div class="container">
        <div className="search d-flex justify-content-center">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => searchData(e)}
            />
          </form>
        </div>
        <br></br>
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">S.no.</div>
            <div class="col ">Customer Name</div>
            <div class="col ">Product</div>
            <div class="col ">Amount</div>
            <div class="col ">Action</div>
          </li>

          {item.map((doc, index) => {
            return (
              <li class="table-row">
                <div class="col col-1" data-label="Job Id">
                  {index + 1}
                </div>
                <div class="col " data-label="Customer Name">
                  {doc.Customer}
                </div>
                <div class="col " data-label="Product">
                  {doc.Product}
                </div>
                <div class="col " data-label="Amount">
                  {doc.Price}
                </div>
                <div class="col " data-label="Payment Status">
                  <div class="d-flex flex-row">
                    <div class="p-2">
                      <button
                        type="button"
                        class="btn btn-grey"
                        onClick={(e) => getId(doc.id)}
                      >
                        Edit
                      </button>
                    </div>
                    <div class="p-2">
                      <button
                        type="button"
                        class="btn btn-dgrey"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="d-flex justify-content-center">
          <h2>
            Total : Rs.
            {item
              .map((doc) => parseInt(doc.Price))
              .reduce((pre, doc) => doc + pre, 0)}
          </h2>
        </div>
        <div class="refresh d-flex justify-content-center">
          <button type="button" class="btn btn-secondary" onClick={refreshPage}>
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
