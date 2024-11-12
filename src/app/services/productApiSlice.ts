import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiseServices from "../../services/CookiseServices";

interface IProductId {
  id: number;
}
export const productApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query({
      query: (arg) => {
        const {page} = arg
        return {
          url: `/api/products?populate=thumbnail,category&pagination[pageSize]=10&pagination[page]=${page} `,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: IProductId) => ({
                type: "Products",
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    //Create
    createDashboardProduct:builder.mutation({
      query:({body}) =>({
      
          url: `/api/products`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CookiseServices.get("jwt")}`,
          },
          body:body
        
          
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApiSlice.util.updateQueryData('getDashboardProducts', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }

      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    //Update
    updateDashboardProduct:builder.mutation({
      query:({id,body}) =>({
      
          url: `/api/products/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${CookiseServices.get("jwt")}`,
          },
          body:body
        
          
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApiSlice.util.updateQueryData('getDashboardProducts', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }

      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    //Delete
    deleteDashboardProduct:builder.mutation({
      query(id){
        return {
          url: `/api/products/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${CookiseServices.get("jwt")}`,
          },
        }
          
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    })
  }),
});

export const { useGetDashboardProductsQuery ,useDeleteDashboardProductMutation,useUpdateDashboardProductMutation,useCreateDashboardProductMutation} = productApiSlice;
