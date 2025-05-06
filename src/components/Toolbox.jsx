import { useState, useEffect, useRef } from 'react';
import Isotope from 'isotope-layout';
import { REST_PATH } from '../globals/globals';

const Toolbox = () => {
    const toolsRestPath = `${REST_PATH}ahdesigns-tools?acf_format=standard&filter[orderby]=slug&order=asc&per_page=100`

    const [restToolsData, setToolsData] = useState([])    
    const [toolsLoaded, setToolsLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(toolsRestPath)
            if (!response.ok) {
                setToolsLoaded(false)
            } else {

                const data = await response.json()
                setToolsData(data)
                setToolsLoaded(true)
            }
        }
        fetchData()
    }, [toolsRestPath])

    // Ref for Isotope
    const isotope = useRef(null);
    // Store the filter keyword in a state
    const [filterKey, setFilterKey] = useState('*');

    // Initialize Isotope after data is fetched and component is rendered
    useEffect(() => {
        if (toolsLoaded) {
            isotope.current = new Isotope('.filter-container', {
                itemSelector: '.filter-item',
                layoutMode: 'fitRows',
            });
        }
    }, [toolsLoaded]);

    // Handling filter key change
    useEffect(() => {
        if (isotope.current) {
            filterKey === '*'
                ? isotope.current.arrange({ filter: '*' })
                : isotope.current.arrange({ filter: `.${filterKey}` });
        }
    }, [filterKey]);

    const handleFilterKeyChange = key => () => {
        if (document.getElementById(key).classList.contains('button-checked')) {
            if (key === "*") {
                return;
            } else {
                document.getElementById(key).classList.remove('button-checked');
                document.getElementById('*').classList.add('button-checked');
                setFilterKey('*');
            }
        } else {
            const removebuttons = Array.from(document.getElementsByClassName('button-checked'));
            removebuttons.forEach(button => {
                button.classList.remove('button-checked');
            });
            document.getElementById(key).classList.add('button-checked');
            setFilterKey(key);
        }
    };

    return (
        <div>
            {toolsLoaded ? (
                <div>
                    <div className="selector-buttons">
                        <button className='button-checked' id="*" onClick={handleFilterKeyChange('*')}>All</button>
                        <button className='' id="Favourite" onClick={handleFilterKeyChange('Favourite')}>Favourites</button>
                        <button className='' id="Development" onClick={handleFilterKeyChange('Development')}>Develop</button>
                        <button className='' id="Design" onClick={handleFilterKeyChange('Design')}>Design</button>
                        <button className='' id="Other" onClick={handleFilterKeyChange('Other')}>Other</button>
                    </div>
                    <hr />
                    <ul className='filter-container'>
                            {restToolsData.map((projects, i) => 
                                        <div className= {`filter-item ${projects.acf.tool_category.join(" ")}`} key={i}>
                                            <img src={projects.acf.tool_image} alt={`Small card showing ${projects.title.rendered} logo with name in text underneath`}/>
                                        </div>
                                    )
                                }
                    </ul>
                </div>
            ) : (
                <p>Content not loaded</p>
            )}
        </div>
    );
};

export default Toolbox;