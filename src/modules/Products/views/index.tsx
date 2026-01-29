import { useFeatureFlag } from "../../feature-flags";
import { NewProducts } from "../new-ui/views";
import { OldProducts } from "../old-ui/views";

export const Products = () => {
  const {isNewProductsUIEnabled}=useFeatureFlag();

  if(isNewProductsUIEnabled) 
    return <NewProducts/>
  else return <OldProducts/>
  
};
