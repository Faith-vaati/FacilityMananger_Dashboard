import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,  } from "@fortawesome/free-solid-svg-icons";
// import { GiFarmer } from "react-icons/gi";
import CustomLineChart from "../CustomLineGraph";
import { AiOutlineTransaction } from "react-icons/ai";
import agroimg from "../../../assets/images/agrodealer.png";
import farm from "../../../assets/images/farm.png";

export default function Users() {

    return (
        <div className="activity">
            <div className="outer">
                <div className="card-item">
                    {/* <GiFarmer className="ts" /> */}
                    <div>
                        <h4>20</h4>
                        <p>Farmers Registered</p>
                    </div>
                </div>
                <div className="card-item">
                    <img src={agroimg} alt=""/>
                    <div>
                        <h4>20</h4>
                        <p>Registered Agrodealers</p>
                    </div>
                </div>
                <div className="card-item">
                    <img src={farm} alt="" className="ts"/>
                    <div>
                        <h4>200</h4>
                        <p>Farms</p>
                    </div>
                </div>
            </div>
            <div className="chart">
                <p>chart</p>
                <CustomLineChart aspect={2} />
            </div>
        </div>
    );
};