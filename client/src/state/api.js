import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react"; // used to create & configure an Api for making requests to a server

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), // using fetchBaseQuery to make requests to our url
  reducerPath: "adminApi", // path in the global state where the api's request will be stored
  tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard"],
  endpoints: (build) => ({

    getUser: build.query({ 
      query: (id) => `general/user/${id}`, // retrieving the data located under the ID to hit end point
      providesTags: ["User"] // returning the user 
    }),

    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],

    }),
    
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"]
    }),

    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search},
      }),
      providesTags: ["Transactions"]
    }),

    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"]
    }),

    getSales: build.query ({
      query: () => "sales/sales",
      providesTags: ["Sales"]
    }),

    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"]
    }),

    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"]
    }),

    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"]
    })

  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashboardQuery } = api;