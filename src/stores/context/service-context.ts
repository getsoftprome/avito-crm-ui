import { createContext, useContext } from "react";

import { Services } from "../services";

export const ServicesContext = createContext<Services>(null!);
export const ServicesProvider = ServicesContext.Provider;
export const ServicesConsumer = ServicesContext.Consumer;

export const useServices = () => useContext(ServicesContext);