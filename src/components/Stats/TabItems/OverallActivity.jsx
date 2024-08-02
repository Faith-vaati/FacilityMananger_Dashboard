import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheatAwn,  } from "@fortawesome/free-solid-svg-icons";
import CustomLineChart from "../CustomLineGraph";
import agroimg from "../../../assets/images/agrodealer.png";
import farm from "../../../assets/images/farm.png";

export default function Activity() {

    return (
        <div className="activity">
            <div className="outer">
                <div className="card-item">
                    <FontAwesomeIcon icon={faWheatAwn} className="ts" />
                    <div>
                        <h4>300</h4>
                        <p>Crops</p>
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