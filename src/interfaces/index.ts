export interface IProduct {
  id: number;
  qty:number;
  attributes:{
    title: string;
    description: string;
    stock:number;
    price: number;
    thumbnail: {
      data :{
        attributes:{
          id: number,
          url: string;
        }
      }
    }
    category: {
      data :{
        attributes:{
          id: number,
          title: string;
        }
      }

    };

  }


}

// export interface IFormInput {
//   id: string;
//   name: 'title' | 'description' | 'imageURL' | 'price';
//   label: string;
//   type: string;
// }

export interface IUserLogin {
  identifier: string;
  password: string;
}