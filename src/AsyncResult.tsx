import React, { useState, useEffect, MouseEvent } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";


const AsyncResult = ({ data, multi }: any) => {
    const animatedComponents = makeAnimated();
    return (
        <>{
            multi === true ? (<AsyncSelect
                isMulti
                components={animatedComponents}
                defaultValue={data}
            />) : (<AsyncSelect
                components={animatedComponents}
                defaultValue={data}
            />)
        }
        </>
    );
};

export default AsyncResult;