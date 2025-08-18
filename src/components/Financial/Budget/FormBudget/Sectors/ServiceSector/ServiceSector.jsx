import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TitleContainer,
  ServiceContainer,
  TableContainer,
  ButtonCloseTable,
} from "./ServiceSector.styled.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import ServiceItem from "./ServiceItem";
import TableServiceTypes from "@components/Management/ServiceTypes/TableServiceTypes/TableServiceTypes";

const createServiceFactory =
  (idRef) =>
  (
    defCode,
    defServiceType,
    defServiceValue,
    defStep,
    defQuantity,
    defMunicipality,
    defLocality,
    defLocation
  ) => ({
    id: idRef.current++,
    code: defCode ?? "",
    serviceType: defServiceType ?? "",
    serviceValue: defServiceValue ?? "",
    step: defStep ?? "",
    quantity: defQuantity ?? 1,
    municipality: defMunicipality ?? "",
    locality: defLocality ?? "",
    location: defLocation ?? "",
  });

const ServiceSector = ({
  services,
  setServices,
  code,
  serviceType,
  serviceValue,
  stepOpts,
  step,
  quantity,
  municipalities,
  municipality,
  locality,
  location,
  errors,
}) => {
  const idRef = useRef(0);

  const createService = useMemo(() => createServiceFactory(idRef), []);

  const [serviceTypesOpts, setServiceTypesOpts] = useState([]);
  const [serviceValuesOpts, setServiceValuesOpts] = useState({});
  const [serviceObjValues, setServiceObjValues] = useState({});
  const [infoTable, setInfoTable] = useState(null);

  const updateService = useCallback(
    (id, field, value) => {
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      );
    },
    [setServices]
  );

  const addNewService = useCallback(
    (e) => {
      e.preventDefault();
      setServices((prev) => [...prev, createService()]);
    },
    [setServices, createService]
  );

  const removeService = useCallback(
    (e, id) => {
      e.preventDefault();
      setServices((prev) => prev.filter((it) => it.id !== id));
    },
    [setServices, createService]
  );

  const showTable = useCallback((id) => {
    setInfoTable(
      services.map((it) => {
        if (it.id === id) return serviceObjValues[it.serviceType];
      })[0]
    );
  });

  useEffect(() => {
    console.log(infoTable);
  }, [infoTable]);

  useEffect(() => {
    // Service Types
    (async () => {
      try {
        const response = await api.post("/serviceType/getAll");

        const data = response.data;

        if (data) {
          const sorted = [...data.serviceTypes].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          const valuesPayload = sorted.reduce((acc, obj) => {
            acc[obj.name] = obj.values.map((val) => ({ label: val }));
            return acc;
          }, {});

          const typesPayload = sorted.map((obj) => ({
            label: obj.name,
          }));

          setServiceValuesOpts(valuesPayload);
          setServiceTypesOpts(typesPayload);
          setServiceObjValues(data.objValues);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) return setUserLogged(null);

        toast.error(msg);
      }
    })();
  }, []);

  useEffect(() => {
    const initial = serviceType
      ? serviceType.map((t, i) =>
          createService(
            code[i],
            t,
            serviceValue[i],
            step[i],
            quantity[i],
            municipality[i],
            locality[i],
            location[i]
          )
        )
      : [createService()];

    setServices(initial);
  }, [
    code,
    serviceType,
    serviceValue,
    step,
    quantity,
    municipality,
    locality,
    location,
    createService,
  ]);

  return (
    <>
      {infoTable && (
        <TableContainer>
          <div>
            <ButtonCloseTable type="button" onClick={() => setInfoTable("")}>
              X
            </ButtonCloseTable>
          </div>
          {Object.entries(infoTable).map(([key, val], index) => (
            <TableServiceTypes
              key={`${index}-${key}`}
              title={key + " ha"}
              array={Object.values(val)}
            />
          ))}
        </TableContainer>
      )}

      <TitleContainer>
        <h3>Identificação do Serviço</h3>
        <button type="button" onClick={addNewService}>
          +
        </button>
      </TitleContainer>
      {services.map((s, idx) => {
        return (
          <ServiceContainer key={`service${s.id}`}>
            {idx !== 0 && (
              <button type="button" onClick={(e) => removeService(e, s.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}

            <ServiceItem
              key={s.id}
              idx={idx}
              service={s}
              options={{
                serviceTypesOpts,
                serviceValuesOpts,
                stepOpts,
                municipalities,
              }}
              btnInfo={{
                icon: faTable,
                click: () => {
                  showTable(s.id);
                },
              }}
              updateService={updateService}
              removeService={() => removeService(s.id)}
              errors={errors}
            />
          </ServiceContainer>
        );
      })}
    </>
  );
};

export default ServiceSector;
