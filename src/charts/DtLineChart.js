import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { injectIntl } from "react-intl";

// ==== Components ====
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
// ==== Components ====

const DtLineChart = ({
  chartTitle,
  chartSubTitle,
  yAxisVar,
  xAxisVar,
  yAxisUnits,
  xAxisUnits,
  series,
  language,
  ...props
}) => {
  const {
    intl: { formatMessage },
  } = props;

  const timezone = new Date().getTimezoneOffset();

  Highcharts.setOptions({
    global: {
      timezoneOffset: timezone,
    },
  });

  const options = {
    title: {
      text: formatMessage({ id: `${chartTitle}` }),
    },

    subtitle: {
      text: formatMessage({ id: `${chartSubTitle}` }),
    },

    yAxis: {
      title: {
        text: formatMessage({ id: `${yAxisVar}` }),
      },
    },

    xAxis: {
      title: {
        text: formatMessage({ id: `${xAxisVar}` }),
      },
      labels: {
        format: "{value:%e %b %H:%M:%S}",
      },
      accessibility: {
        rangeDescription: formatMessage({ id: `${yAxisVar}` }),
        type: "datetime",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    tooltip: {
      formatter: function () {
        let tooltip = ``;

        tooltip +=
          "<br><span>" +
          formatMessage({ id: "name" }) +
          "</span>: <b>" +
          this.series.name;

        tooltip +=
          `<br><span style="text-transform:capitalize">` +
          formatMessage({ id: `${yAxisVar}` }) +
          "</span>: <b>" +
          `${this.y} ` +
          formatMessage({ id: `${yAxisUnits}` });

        tooltip +=
          `<br><span style="text-transform:capitalize">` +
          `${formatMessage({ id: `${xAxisVar}` })}` +
          "</span>: <b>" +
          Highcharts.dateFormat(
            "%A %b %e, %Y",

            new Date(this.x)
          );

        tooltip +=
          "<br><span>" +
          formatMessage({ id: "time" }) +
          "</span>: <b>" +
          Highcharts.dateFormat(
            "%H:%M:%S",

            new Date(this.x)
          );

        return tooltip;
      },
    },

    series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const [chartOptions, setChartOptions] = useState(options);

  useEffect(() => {
    setChartOptions(options);
  }, [props.intl.locale]);

  return (
    <DtLineChartWrapper>
      {series ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <div className="text-title no-data-text">
          {formatMessage({ id: "noData" })}
        </div>
      )}
    </DtLineChartWrapper>
  );
};

const DtLineChartWrapper = styled.div`
  .no-data-text {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default injectIntl(DtLineChart);
