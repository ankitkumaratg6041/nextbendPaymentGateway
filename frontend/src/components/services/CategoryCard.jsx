import Card from "./Card";

/**
 * 
 * Only job of this component is to create all the cards and keep them in one container
 * 
 */

const CategoryCard = ({data}) => {
    return (
      <div className="flex flex-col gap-5">
        {
          data.map((dataItem, index) => (
            <Card key={index} category={dataItem.category} services={dataItem.services} addons={dataItem.addons}/>
          ))
        }
      </div>
    )
  };
  
  export default CategoryCard;
  