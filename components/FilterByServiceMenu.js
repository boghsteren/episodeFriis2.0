import React from "react";
import { Label, Checkbox } from "semantic-ui-react";

const FilterByServiceMenu = ({
  series,
  selectedService,
  setService,
  filterSeries,
}) => {
  const services = [
    ...new Set(series.map((show) => show.fields.udbyder).sort()),
  ];
  return (
    <div>
      {services.map(
        (service) =>
          service && (
            <div key={service}>
              <Checkbox
                label={service}
                style={{ marginRight: "5px" }}
                onClick={() =>
                  selectedService === service
                    ? setService()
                    : setService(service)
                }
                checked={selectedService === service}
              />
              <Label circular>
                {
                  filterSeries.filter((show) => show.fields.udbyder === service)
                    .length
                }
              </Label>
            </div>
          )
      )}
    </div>
  );
};

export default FilterByServiceMenu;
