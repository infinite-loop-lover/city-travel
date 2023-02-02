import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";


const AsyncSearchBar = ({ setValues, multi, text, setFetchError }: any) => {
    const animatedComponents = makeAnimated();
    const loadOptions = async (inputValue: string) => {
        const res = await fetch(`http://localhost:4000/cities?query=${inputValue}`);
        const tempArray = await res.json();
        if (tempArray[0] === 'failed') {
            setFetchError(true);
        } else {
            let array = tempArray.map((item: { id: number, city: string }) =>
                ({ id: item.id, value: item.city, label: item.city })
            )
            setFetchError(false);
            return array;
        }
    };
    return (
        <>{
            multi === true ? (<AsyncSelect
                isMulti
                components={animatedComponents}
                loadOptions={loadOptions}
                onChange={(value) => setValues(value)}
                placeholder={text}
            />) : (<AsyncSelect
                components={animatedComponents}
                loadOptions={loadOptions}
                onChange={(value) => setValues(value)}
                placeholder={text}
            />)
        }
        </>
    );
};

export default AsyncSearchBar;