import {createContext, useContext, type PropsWithChildren } from "react";

const ProductsContext = createContext<string | null>(null);
type ProductProviderProps =PropsWithChildren <{
    value:string;

}>;
export const ProductProvider = ({value,children}:ProductProviderProps)=>(
    <ProductsContext.Provider value={value}>
       {children}
    </ProductsContext.Provider>
)

export const useProducts = () =>{
    const context = useContext(ProductsContext);
    if(context === null){
        throw new Error("useProducts must be used with a ProductsProvider")
    }
    return context;

}

