import React from "react";
import { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const Context = ({ children }) => {
  return <AppContext.Provider value={"hello"}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { Context, useGlobalContext };
