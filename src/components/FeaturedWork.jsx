const FeaturedWork = ({featuredWorkData}) => {

  
    const shuffleArray = (array) => {
        for (let i = array.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const randomizeData  = (data) => {
        const shuffledData = shuffleArray([...data]);
        const displayData = shuffledData.slice(0, 4);
        return displayData;
    }

    const featuredItems = randomizeData(featuredWorkData);
    console.log('Featured Items:', featuredItems);



    return (
        <>
            <p>Featured Work Section</p>
        </>
    );
};

export default FeaturedWork;