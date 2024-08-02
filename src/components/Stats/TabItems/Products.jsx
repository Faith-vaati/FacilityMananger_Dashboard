import React, { useState } from "react";
import CustomBarChart from "../CustomBarChart";
import herbicide from "../../../assets/images/herbicide.jpg";
import fertilizer from "../../../assets/images/fertilizer.png";

const data = [
  { name: "Fertilizers", value: 400 },
  { name: "Animal Feeds", value: 200 },
  { name: "Seeds", value: 500 },
  { name: "Pesticides", value: 800 },
  { name: "Herbicides", value: 300 },
  { name: "Insecticides", value: 50 },
  { name: "Irrigation Equipment", value: 200 },
  { name: "Farm Machinery and Tools", value: 200 },
  { name: "Animal Health Products", value: 200 },
];

export default function Products() {
    return (
      <div className="products">
        <div className="left">
          <div className="bar">
            <div></div>
            <h2>Top requested products</h2>
          </div>

          <div className="list">
          <div className="single">
              <div className="image">
                <img src={fertilizer} alt="seed" />
              </div>
              <div className="details">
                <h4>Fertilizer</h4>
                <p>500 requests</p>
              </div>
            </div>
            <div className="single">
              <div className="image">
                <img src={herbicide} alt="seed" />
              </div>
              <div className="details">
                <h4>Animal Feeds</h4>
                <p>300 requests</p>
              </div>
            </div>
            <div className="single">
              <div className="image">
                <img src={herbicide} alt="seed" />
              </div>
              <div className="details">
                <h4>Seeds</h4>
                <p>200 requests</p>
              </div>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="bar">
            <div></div>
            <h2>Top Selling Farm Produce</h2>
          </div>
          <div className="list">
            <div className="single">
              <div className="image">
                <img src={herbicide} alt="seed" />
              </div>
              <div className="details">
                <h4>Wheat</h4>
                <p>500 requests</p>
              </div>
            </div>
            <div className="single">
              <div className="image">
                <img src={herbicide} alt="seed" />
              </div>
              <div className="details">
                <h4>Milk</h4>
                <p>300 requests</p>
              </div>
            </div>
            <div className="single">
              <div className="image">
                <img src={herbicide} alt="seed" />
              </div>
              <div className="details">
                <h4>Eggs</h4>
                <p>200 requests</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="bar">
            <div></div>
            <h2>Stock Levels</h2>
          </div>

          <div className="chart">
            <p className="title">Products in Stock</p>
            <CustomBarChart 
              data={data}
              colors={["#F48F87", "#FFB21E", "#0298C8", "#F1736A"]}
              aspect={2}
            />
          </div>          
        </div>
      </div>
    );
};