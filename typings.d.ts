interface Products {
    name: string
    price: number
    salesPrize?: number
    tags?: string[]
    description: string
    size?: string[]
    height?: number
    width?: number 
    _id: string,
    quantity?: number
  slug?: {
    current: string;
  },
  index?: number; 
  image: string,
  
};

interface ProductsCard{
  _id: string;
  name: string,
  height: number,
  width: number,
  salesPrize: string,
  price: number
  image: string;
  slug:{
    current: string | null;
  }
}



